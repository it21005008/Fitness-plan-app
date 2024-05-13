package com.paf.backend.repository;

import com.paf.backend.model.WorkoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan ,String> {
    boolean existsByWorkoutId(String workoutId);

    List<WorkoutPlan> findByCreatedBy_Id(String userId);
}
