package com.paf.backend.controller;

import com.paf.backend.model.MealPlan;
import com.paf.backend.model.UserInfo;
import com.paf.backend.repository.UserInfoRepository;
import com.paf.backend.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/mealplan")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @Autowired
    private UserInfoRepository userInfoRepository;

    //adding the meal plan
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(username);
        if (userOptional.isEmpty()) {
            System.out.println("Error fetching user");
        }

        UserInfo user = userOptional.get();
        MealPlan createdMealPlan = mealPlanService.addMealPlan(mealPlan, user);
        return addSelfLink(createdMealPlan);
    }

    // getting all the meal plans
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<MealPlan> getAllMealPlans() {
        List<MealPlan> mealPlans = mealPlanService.findAllMealPlans();
        mealPlans.forEach(this::addSelfLink);
        return mealPlans;
    }

    // getting meal plans of the relevent user
    @GetMapping("/allByUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<MealPlan> getAllMealPlansByUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        Optional<UserInfo> user = userInfoRepository.findByEmail(userId);

        if (user.isPresent()) {
            List<MealPlan> mealPlans = mealPlanService.getMealPlansByUserId(user.get().getId());
            mealPlans.forEach(this::addSelfLink);
            return mealPlans;
        } else {
            return Collections.emptyList();
        }
    }

    //getting only one meal plan by id
    @GetMapping("/{mealId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<MealPlan> getMealPlan(@PathVariable String mealId){
        MealPlan mealPlan = mealPlanService.getMealsByMealId(mealId);
        return addSelfLink(mealPlan);
    }

    //updating the meal plan
    @PutMapping("/update/{mealId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<MealPlan> modifyMealPlan(@PathVariable String mealId, @RequestBody MealPlan mealPlan){
        MealPlan existingMealPlan = mealPlanService.getMealsByMealId(mealId);

        // Update the meal plan details
        existingMealPlan.setMealName(mealPlan.getMealName());
        existingMealPlan.setRecipe(mealPlan.getRecipe());
        existingMealPlan.setIngredients(mealPlan.getIngredients());
        existingMealPlan.setPortionSize(mealPlan.getPortionSize());
        existingMealPlan.setPreference(mealPlan.getPreference());

        MealPlan updatedMealPlan = mealPlanService.updateMealPlan(existingMealPlan);
        return addSelfLink(updatedMealPlan);
    }

    //deleting the meal plan
    @DeleteMapping("/delete/{mealId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public String deleteFaculty(@PathVariable String mealId){
        mealPlanService.deleteMealPlan(mealId);
        return mealId + " Meal Plan deleted successfully";
    }

    // Helper method to add self link to MealPlan
    private EntityModel<MealPlan> addSelfLink(MealPlan mealPlan) {
        Link selfLink = WebMvcLinkBuilder.linkTo(MealPlanController.class)
                .slash(mealPlan.getMealId())
                .withSelfRel();
        return EntityModel.of(mealPlan, selfLink);
    }
}

