package com.paf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Workout_Plans")

public class WorkoutPlan {

    @Id
    private String workoutId;
    private String routines;
    private List<String> exercises;
    private List<String> sets;
    private String repetitions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @DBRef
    private UserInfo createdBy;


}
