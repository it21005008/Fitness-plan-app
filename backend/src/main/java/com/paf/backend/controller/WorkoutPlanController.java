package com.paf.backend.controller;


import com.paf.backend.model.UserInfo;
import com.paf.backend.model.WorkoutPlan;
import com.paf.backend.repository.UserInfoRepository;
import com.paf.backend.service.WorkoutPlanService;
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
@RequestMapping("/api/workoutplan")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @Autowired
    private UserInfoRepository userInfoRepository;


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(username);
        if (userOptional.isEmpty()) {
            System.out.println("Error fetching user");
        }

        UserInfo user = userOptional.get();
        WorkoutPlan createdWorkoutPlan = workoutPlanService.addWorkoutPlan(workoutPlan, user);
        return addSelfLink(createdWorkoutPlan);
    }



    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<WorkoutPlan> getAllWorkoutPlans() {
        List<WorkoutPlan> workoutPlans = workoutPlanService.findAllWorkoutPlans();
        workoutPlans.forEach(this::addSelfLink);
        return workoutPlans;
    }

    @GetMapping("/allByUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<WorkoutPlan> getAllWorkoutPlansByUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        Optional<UserInfo> user = userInfoRepository.findByEmail(userId);

        if (user.isPresent()) {
            List<WorkoutPlan> workoutPlans = workoutPlanService.getWorkoutPlansByUserId(user.get().getId());
            workoutPlans.forEach(this::addSelfLink);
            return workoutPlans;
        } else {
            return Collections.emptyList();
        }
    }



    @GetMapping("/{workoutId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<WorkoutPlan> getWorkoutPlan(@PathVariable String workoutId){
        WorkoutPlan workoutPlan = workoutPlanService.getWorkoutsByWorkoutId(workoutId);
        return addSelfLink(workoutPlan);
    }


//    @PutMapping("/update")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
//    public EntityModel<WorkoutPlan> modifyWorkoutPlan(@RequestBody WorkoutPlan workoutPlan){
//        WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(workoutPlan);
//        return addSelfLink(updatedWorkoutPlan);
//    }


    @PutMapping("/update/{workoutId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<WorkoutPlan> modifyWorkoutPlan(@PathVariable String workoutId, @RequestBody WorkoutPlan workoutPlan){
        WorkoutPlan existingWorkoutPlan = workoutPlanService.getWorkoutsByWorkoutId(workoutId);

        // Update the meal plan details
        existingWorkoutPlan.setExercises(workoutPlan.getExercises());
        existingWorkoutPlan.setRoutines(workoutPlan.getRoutines());
        existingWorkoutPlan.setExercises(workoutPlan.getExercises());
        existingWorkoutPlan.setSets(workoutPlan.getSets());
        existingWorkoutPlan.setRepetitions(workoutPlan.getRepetitions());

        WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(existingWorkoutPlan);
        return addSelfLink(updatedWorkoutPlan);
    }


    @DeleteMapping("/delete/{workoutId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public String deleteFaculty(@PathVariable String workoutId){
        workoutPlanService.deleteWorkoutPlan(workoutId);
        return workoutId + " Workout Plan deleted successfully";
    }



    // Helper method to add self link to WorkoutPlan
    private EntityModel<WorkoutPlan> addSelfLink(WorkoutPlan workoutPlan) {
        Link selfLink = WebMvcLinkBuilder.linkTo(WorkoutPlanController.class)
                .slash(workoutPlan.getWorkoutId())
                .withSelfRel();
        return EntityModel.of(workoutPlan, selfLink);
    }
}
