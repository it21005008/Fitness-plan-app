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
@Document(collection = "likes")
public class Likes {

    @Id
    private String id;
    @DBRef
    private Posts post;
    @DBRef
    private UserInfo user;
}
