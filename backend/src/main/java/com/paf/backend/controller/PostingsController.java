package com.paf.backend.controller;
import com.paf.backend.model.Postings;
import com.paf.backend.service.PostingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postings")
public class PostingsController {
    @Autowired
    private PostingsService postingsService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Postings> createPosting(@RequestBody Postings postings){
        Postings createdPosting = postingsService.addPosting(postings);
        return addSelfLink(createdPosting);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<Postings> getAllPostings() {
        List<Postings> postings = postingsService.findAllPostings();
        postings.forEach(this::addSelfLink);
        return postings;
    }

    @GetMapping("/{postId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Postings> getPosting(@PathVariable String postId){
        Postings postings = postingsService.getPostingsBypostId(postId);
        return addSelfLink(postings);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Postings> modifyPosting(@RequestBody Postings postings){
        Postings updatedPostings = postingsService.updatedPostings(postings);
        return addSelfLink(updatedPostings);
    }
    @PutMapping("/update/{postId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Postings> modifyPosting(@PathVariable String postId, @RequestBody Postings postings){
        Postings existingPostings = postingsService.getPostingsBypostId(postId);
        existingPostings.setDescription(postings.getDescription());

        Postings updatedPostings = postingsService.updatedPostings(existingPostings);
        return addSelfLink(updatedPostings);
    }
    @DeleteMapping("/delete/{postId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public String deleteFaculty(@PathVariable String postId){
        postingsService.deletePostings(postId);
        return postId + " Post deleted successfully";
    }

    private EntityModel<Postings> addSelfLink(Postings postings) {
        Link selfLink = WebMvcLinkBuilder.linkTo(PostingsController.class)
                .slash(postings.getPostId())
                .withSelfRel();
        return EntityModel.of(postings, selfLink);
    }
}
