package com.paf.backend.controller;
import com.paf.backend.model.Posts;
import com.paf.backend.model.UserInfo;
import com.paf.backend.repository.CommentsRepository;
import com.paf.backend.repository.LikesRepository;
import com.paf.backend.repository.UserInfoRepository;
import com.paf.backend.service.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.reactive.WebFluxLinkBuilder.methodOn;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image-metadata")
public class PostsController {

    @Autowired
    private PostsService postsService;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public Posts uploadImageWithCaption(@RequestParam("image") MultipartFile imageFile,
                                        @RequestParam("caption") String caption) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(username);
        if (userOptional.isEmpty()) {
            System.out.println("Error fetching user");
            // Handle error appropriately
        }

        UserInfo user = userOptional.get();

        System.out.println("Image received");
        // Call the service method with the image file, caption, and user information
        return postsService.uploadImageWithCaption(imageFile, caption, user);
    }

    @PostMapping("/{postId}/like")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void likePost(@PathVariable String postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        postsService.likePost(postId, username);
    }

    @PostMapping("/{postId}/unlike")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void unlikePost(@PathVariable String postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        postsService.unlikePost(postId, username);
    }

    @PostMapping("/{postId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void addComment(@PathVariable String postId, @RequestBody String commentText) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        postsService.addComment(postId, username, commentText);
    }

    @PutMapping("/{postId}/comments/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void updateComment(@PathVariable String postId, @PathVariable String commentId, @RequestBody String commentText) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        postsService.updateComment(postId, commentId, username, commentText);
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        postsService.deleteComment(postId, commentId, username);
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<EntityModel<Posts>> getAllImageMetadata() {
        List<Posts> postsList = postsService.findAll();
        return postsList.stream()
                .map(this::toEntityModelWithLikesAndComments)
                .collect(Collectors.toList());
    }

    private EntityModel<Posts> toEntityModelWithLikesAndComments(Posts posts) {
        Link selfLink = WebMvcLinkBuilder.linkTo(methodOn(PostsController.class).getImageMetadataById(posts.getId())).withSelfRel();
        posts.setLikesCount(likesRepository.countByPost(posts));
        posts.setCommentsCount(commentsRepository.countByPost(posts));
        return EntityModel.of(posts, selfLink);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public ResponseEntity<EntityModel<Posts>> getImageMetadataById(@PathVariable String id) {
        return postsService.findById(id)
                .map(this::toEntityModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void updateImageMetadata(@PathVariable String id,
                                    @RequestParam(value = "caption", required = false) String caption,
                                    @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {
        postsService.updateImageMetadata(id, caption, imageFile);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public void deleteImageMetadata(@PathVariable String id) {
        postsService.deleteImageMetadata(id);
    }

    @GetMapping("/allByUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<Posts> getgetPostsByIdByUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        Optional<UserInfo> user = userInfoRepository.findByEmail(userId);

        if (user.isPresent()) {
            List<Posts> mealPlans = postsService.getPostsByUserId(user.get().getId());
            mealPlans.forEach(this::addSelfLink);
            return mealPlans;
        } else {
            return Collections.emptyList();
        }
    }

    private EntityModel<Posts> addSelfLink(Posts metadata) {
        Link selfLink = WebMvcLinkBuilder.linkTo(PostsController.class)
                .slash(metadata.getId())
                .withSelfRel();
        return EntityModel.of(metadata, selfLink);
    }

    private EntityModel<Posts> toEntityModel(Posts posts) {
        Link selfLink = WebMvcLinkBuilder.linkTo(methodOn(PostsController.class).getImageMetadataById(posts.getId())).withSelfRel();
        return EntityModel.of(posts, selfLink);
    }
}
