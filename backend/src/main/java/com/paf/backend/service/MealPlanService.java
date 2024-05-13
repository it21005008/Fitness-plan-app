package com.paf.backend.service;

import com.paf.backend.model.MealPlan;
import com.paf.backend.model.UserInfo;
import com.paf.backend.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MealPlanService {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    // add Meal Plan
    public MealPlan addMealPlan(MealPlan mealPlan, UserInfo user) {
        mealPlan.setCreatedBy(user);

        List<MealPlan> meals = mealPlanRepository.findAll(Sort.by(Sort.Direction.DESC, "mealId"));
        if (!meals.isEmpty()) {
            String lastMealId = meals.get(0).getMealId();
            String numericPart = lastMealId.substring(4);
            int newId = Integer.parseInt(numericPart) + 1;
            String newMealId = String.format("MP-%03d", newId);
            mealPlan.setMealId(newMealId);
        } else {
            mealPlan.setMealId("MP-001");
        }
        mealPlan.setCreatedAt(LocalDateTime.now());
        return mealPlanRepository.save(mealPlan);
    }

    // getting all meal plans
    public List<MealPlan> findAllMealPlans() {
        return mealPlanRepository.findAll();
    }


    // getting meal plans only by the created user
    public List<MealPlan> getMealPlansByUserId(String userId) {

        return mealPlanRepository.findByCreatedBy_Id(userId);
    }


    // getting meal plans by meal ID
    public MealPlan getMealsByMealId(String mealId) {
        return mealPlanRepository.findById(mealId).get();
    }


    // update meal plan
    public MealPlan updateMealPlan(MealPlan mealRequest) {

        MealPlan existingMealPlan = mealPlanRepository.findById(mealRequest.getMealId()).get();
        existingMealPlan.setRecipe(mealRequest.getRecipe());
        existingMealPlan.setMealName(mealRequest.getMealName());
        existingMealPlan.setIngredients(mealRequest.getIngredients());
        existingMealPlan.setPortionSize(mealRequest.getPortionSize());
        existingMealPlan.setPreference(mealRequest.getPreference());
        existingMealPlan.setUpdatedAt(LocalDateTime.now());

        return mealPlanRepository.save(existingMealPlan);
    }

   // delete meal plan
    public String deleteMealPlan(String mealId) {
        mealPlanRepository.deleteById(mealId);
        return mealId + " Meal Plan deleted from Successfully ";
    }


    public boolean doesFacultyExist(String facultyId) {
        return mealPlanRepository.existsById(facultyId);
    }

}
