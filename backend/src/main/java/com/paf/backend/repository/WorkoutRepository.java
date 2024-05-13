package com.paf.backend.repository;

import com.paf.backend.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    boolean existsByStatusId(String statusId);

    List<Workout> findByCreatedBy_Id(String userId);
}
