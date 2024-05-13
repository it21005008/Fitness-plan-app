package com.paf.backend.service;

import com.paf.backend.model.UserInfo;
import com.paf.backend.model.WorkoutPlan;
import com.paf.backend.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlan addWorkoutPlan(WorkoutPlan workoutPlan, UserInfo user) {
        workoutPlan.setCreatedBy(user);
        List<WorkoutPlan> workouts = workoutPlanRepository.findAll(Sort.by(Sort.Direction.DESC, "workoutId"));
        if (!workouts.isEmpty()) {
            String lastFacultyId = workouts.get(0).getWorkoutId();
            String numericPart = lastFacultyId.substring(4);
            int newId = Integer.parseInt(numericPart) + 1;
            String newWorkoutId = String.format("WP-%03d", newId);
            workoutPlan.setWorkoutId(newWorkoutId);
        } else {
            workoutPlan.setWorkoutId("WP-001");
        }
        workoutPlan.setCreatedAt(LocalDateTime.now());
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<WorkoutPlan> findAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    //read one
    public WorkoutPlan getWorkoutsByWorkoutId(String workoutId) {
        return workoutPlanRepository.findById(workoutId).get();
    }

    public WorkoutPlan updateWorkoutPlan(WorkoutPlan workoutRequest) {
        //get the existing document from DB
        // populate new value from request to existing object/entity/document
        WorkoutPlan existingWorkoutPlan = workoutPlanRepository.findById(workoutRequest.getWorkoutId()).get();
        existingWorkoutPlan.setExercises(workoutRequest.getExercises());
        existingWorkoutPlan.setRoutines(workoutRequest.getRoutines());
        existingWorkoutPlan.setExercises(workoutRequest.getExercises());
        existingWorkoutPlan.setSets(workoutRequest.getSets());
        existingWorkoutPlan.setRepetitions(workoutRequest.getRepetitions());


        return workoutPlanRepository.save(existingWorkoutPlan);
    }

    public String deleteWorkoutPlan(String workoutId) {
        workoutPlanRepository.deleteById(workoutId);
        return workoutId + " Workout Plan deleted from Successfully ";
    }

    // getting meal plans only by the created user
    public List<WorkoutPlan> getWorkoutPlansByUserId(String userId) {

        return workoutPlanRepository.findByCreatedBy_Id(userId);
    }

    public boolean doesFacultyExist(String facultyId) {
        return workoutPlanRepository.existsById(facultyId);
    }
}






