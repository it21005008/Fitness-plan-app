package com.paf.backend.model;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "comments")
public class Comments {

    @Id
    private String id;
    private String commentText;

    @DBRef
    private Posts post;

    @DBRef
    private UserInfo user;
}
