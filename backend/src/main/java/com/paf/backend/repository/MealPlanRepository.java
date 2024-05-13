package com.paf.backend.repository;

import com.paf.backend.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
    boolean existsByMealId(String mealId);

    List<MealPlan> findByCreatedBy_Id(String userId);
}
