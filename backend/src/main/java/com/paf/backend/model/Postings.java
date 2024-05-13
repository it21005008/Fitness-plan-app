package com.paf.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Postings")

public class Postings {
    @Id
    private String postId;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
