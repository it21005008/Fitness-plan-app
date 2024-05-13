package com.paf.backend.controller;



import com.paf.backend.model.UserInfo;
import com.paf.backend.model.Workout;
import com.paf.backend.repository.UserInfoRepository;
import com.paf.backend.service.WorkoutService;
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
@RequestMapping("/api/wstatus")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService ;

    @Autowired
    private UserInfoRepository userInfoRepository;
    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Workout> createMealPlan(@RequestBody Workout workout){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(username);
        if (userOptional.isEmpty()) {
            System.out.println("Error fetching user");
        }

        UserInfo user = userOptional.get();
        Workout createdWorkOut =  workoutService.addWorkout(workout, user);
        return addSelfLink(createdWorkOut);
    }
    private EntityModel<Workout> addSelfLink(Workout workout) {
        Link selfLink = WebMvcLinkBuilder.linkTo(WorkoutController.class)
                .slash(workout.getStatusId())
                .withSelfRel();
        return EntityModel.of(workout, selfLink);
    }

    //GET ALL
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<Workout> getAllWorkout() {
        List<Workout> workout = workoutService.findAllWorkout();
        workout.forEach(this::addSelfLink);
        return workout;
    }

    @GetMapping("/allByUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public List<Workout> getAllWorkOutByUser() {
        // Get authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        Optional<UserInfo> user = userInfoRepository.findByEmail(userId);

        // Check if user exists and fetch meal plans by user ID
        if (user.isPresent()) {
            List<Workout> workouts = workoutService.getWorkOutByUserId(user.get().getId());
            workouts.forEach(this::addSelfLink);
            return workouts;
        } else {
            // Handle case where user is not found
            // You might return an error response or handle it based on your application logic
            return Collections.emptyList(); // Return an empty list or handle appropriately
        }
    }

    @GetMapping("/{statusId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Workout> getWorkout(@PathVariable String statusId){
        Workout workout = workoutService.getWorkOutByStatusId(statusId);
        return addSelfLink(workout);
    }


    //Update
    @PutMapping("/update/{statusId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public EntityModel<Workout> modifyWorkout(@PathVariable String statusId, @RequestBody Workout workout){
        Workout existingWorkout = workoutService.getWorkOutByStatusId(statusId);

        // Update the meal plan details

        existingWorkout.setStartdate(workout.getStartdate());
        existingWorkout.setEnddate(workout.getEnddate());
        existingWorkout.setStatus(workout.getStatus());
        existingWorkout.setDistancerunperday(workout.getDistancerunperday());
        existingWorkout.setPushupscount(workout.getPushupscount());
        existingWorkout.setOldweight(workout.getOldweight());
        existingWorkout.setNewweight(workout.getNewweight());
        existingWorkout.setDescription(workout.getDescription());

        Workout updateWorkout = workoutService.updateWorkout(existingWorkout);
        return addSelfLink(updateWorkout);
    }

    @DeleteMapping("/delete/{statusId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
    public String deleteFaculty(@PathVariable String statusId){
        workoutService.deleteWorkout(statusId);
        return statusId + " WorkOut deleted successfully";
    }
}
