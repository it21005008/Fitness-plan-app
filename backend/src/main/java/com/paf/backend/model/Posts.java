package com.paf.backend.model;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Posts {
    @Id
    private String id;
    private String caption;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @DBRef
    private UserInfo createdBy;
    @DBRef
    private List<Likes> likes;
    @DBRef
    private List<Comments> comments;
    @Transient
    private long likesCount;
    @Transient
    private long commentsCount;
}
