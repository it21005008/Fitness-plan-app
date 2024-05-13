package com.paf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String email;
    @NonNull
    private String password;
    private String roles;

}
