package com.paf.backend.service;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.paf.backend.model.Comments;
import com.paf.backend.model.Likes;
import com.paf.backend.model.Posts;
import com.paf.backend.model.UserInfo;
import com.paf.backend.repository.CommentsRepository;
import com.paf.backend.repository.LikesRepository;
import com.paf.backend.repository.PostsRepository;
import com.paf.backend.repository.UserInfoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//import static jdk.internal.logger.DefaultLoggerFinder.SharedLoggers.system;

@Service
public class PostsService {

    @Autowired
    private PostsRepository postsRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    //azure blob storage details
    @Value(value = "${spring.cloud.azure.storage.blob.container-name}")
    private String containerName;
    @Value(value = "${azure.blob-storage.connection-string}")
    private String connectionString;

    //azure blob storage service
    private BlobServiceClient blobServiceClient;

    @PostConstruct
    public void init() {
        blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
    }

    public Posts save(Posts metadata) {
        return postsRepository.save(metadata);
    }

    public List<Posts> findAll() {
        return postsRepository.findAll();
    }

    //    public Optional<Posts> findById(String id) {
//        return postsRepository.findById(id);
////    }
//
    public Optional<Posts> findById(String id) {
        return postsRepository.findById(id).map(post -> {
            post.setLikes(likesRepository.findByPost(post));
            post.setComments(commentsRepository.findByPost(post));
            post.setLikesCount(likesRepository.countByPost(post));
            post.setCommentsCount(post.getComments().size());
            return post;
        });
    }


    public List<Posts> getPostsByUserId(String userId) {

        return postsRepository.findByCreatedBy_Id(userId);
    }


    public Posts uploadImageWithCaption(MultipartFile imageFile, String caption, UserInfo user) throws IOException {
        String blobFileName = imageFile.getOriginalFilename();
        BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobFileName);

        blobClient.upload(imageFile.getInputStream(), imageFile.getSize(), true);

        String imageUrl = blobClient.getBlobUrl();

        // Creating the post metadata
        Posts metadata = new Posts();
        metadata.setCaption(caption);
        metadata.setImageUrl(imageUrl);
        metadata.setCreatedAt(LocalDateTime.now());
        metadata.setCreatedBy(user); // Set the user who created the post

        return postsRepository.save(metadata);
    }



    public String uploadImage(MultipartFile imageFile) throws IOException {
        String blobFileName = imageFile.getOriginalFilename();
        BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobFileName);

        blobClient.upload(imageFile.getInputStream(), imageFile.getSize(), true);

        return blobClient.getBlobUrl();
    }

    public void updateImageMetadata(String id, String newCaption, MultipartFile newImageFile) throws IOException {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            Posts post = optionalPost.get();
            // Update caption
            post.setCaption(newCaption);

            // Update image
            if (newImageFile != null) {
                // Handle image update
                String imageUrl = uploadImage(newImageFile);
                post.setImageUrl(imageUrl);
            }

            post.setUpdatedAt(LocalDateTime.now());
            postsRepository.save(post);

        } else {
            // Handle case where post with given id is not found
            throw new RuntimeException("Post with id " + id + " not found");
        }
    }

    public void deleteImageMetadata(String id) {
        Optional<Posts> optionalPost = postsRepository.findById(id);
        if (optionalPost.isPresent()) {
            postsRepository.deleteById(id);
        } else {
            // Handle case where post with given id is not found
            throw new RuntimeException("Post with id " + id + " not found");
        }
    }

    public void likePost(String postId, String username) {
        Posts post = getPostById(postId);
        if (post != null) {
            UserInfo user = getUserByUsername(username);
            if (user != null) {
                // Check if the user has already liked the post
                Likes existingLike = likesRepository.findByPostAndUser(post, user);
                if (existingLike == null) {
                    Likes like = new Likes();
                    like.setPost(post);
                    like.setUser(user);
                    likesRepository.save(like);
                } else {
                    throw new RuntimeException("User has already liked the post");
                }
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void unlikePost(String postId, String username) {
        Posts post = getPostById(postId);
        if (post != null) {
            UserInfo user = getUserByUsername(username);
            if (user != null) {
                // Delete only the like associated with the user and post
                Likes like = likesRepository.findByPostAndUser(post, user);
                if (like != null) {
                    likesRepository.delete(like);
                } else {
                    throw new RuntimeException("User has not liked the post");
                }
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void addComment(String postId, String username, String commentText) {
        Posts post = getPostById(postId);
        if (post != null) {
            UserInfo user = getUserByUsername(username);
            if (user != null) {
                Comments comment = new Comments();
                comment.setPost(post);
                comment.setUser(user);
                comment.setCommentText(commentText);
                commentsRepository.save(comment);
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void updateComment(String postId, String commentId, String username, String commentText) {
        Posts post = getPostById(postId);
        if (post != null) {
            UserInfo user = getUserByUsername(username);
            if (user != null) {
                Comments comment = commentsRepository.findByIdAndPost_IdAndUser_Id(commentId, postId, user.getId());
                if (comment != null) {
                    comment.setCommentText(commentText);
                    commentsRepository.save(comment);
                } else {
                    throw new RuntimeException("Comment not found for the given post and user");
                }
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public void deleteComment(String postId, String commentId, String username) {
        Posts post = getPostById(postId);
        if (post != null) {
            UserInfo user = getUserByUsername(username);
            if (user != null) {
                Comments comment = commentsRepository.findByIdAndPost_IdAndUser_Id(commentId, postId, user.getId());
                if (comment != null) {
                    commentsRepository.delete(comment);
                } else {
                    throw new RuntimeException("Comment not found for the given post and user");
                }
            } else {
                throw new RuntimeException("User not found");
            }
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    private Posts getPostById(String postId) {
        return postsRepository.findById(postId).orElse(null);
    }

    private UserInfo getUserByUsername(String username) {
        return userInfoRepository.findByEmail(username).orElse(null);
    }

}