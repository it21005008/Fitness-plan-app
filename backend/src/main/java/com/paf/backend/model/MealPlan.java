package com.paf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Meal_Plans")
public class MealPlan {

    @Id
    private String mealId;
    private String mealName;
    private String recipe;
    private String ingredients;
    private String portionSize;
    private String preference;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @DBRef
    private UserInfo createdBy;
}
