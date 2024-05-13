package com.paf.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "workout_status")
public class Workout {

    @Id
    private String statusId;
    private String startdate;
    private String enddate;
    private String status;
    private String distancerunperday;
    private String pushupscount;
    private String oldweight;
    private String newweight;
    private String description;

    @DBRef
    private UserInfo createdBy;


}

