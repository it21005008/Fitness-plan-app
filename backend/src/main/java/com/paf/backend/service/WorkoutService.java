package com.paf.backend.service;


import com.paf.backend.model.UserInfo;
import com.paf.backend.model.Workout;
import com.paf.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;

    //add
    public Workout addWorkout(Workout workout, UserInfo user) {
        workout.setCreatedBy(user);

        List<Workout> workouts = workoutRepository.findAll(Sort.by(Sort.Direction.DESC, "statusId"));
        if (!workouts.isEmpty()) {
            String lastWorkoutId = workouts.get(0).getStatusId();
            String numericPart = lastWorkoutId.substring(4);
            int newId = Integer.parseInt(numericPart) + 1;
            String newWorkoutId = String.format("WO-%03d", newId);
            workout.setStatusId(newWorkoutId);
        } else {
            workout.setStatusId("WO-001");
        }
        return workoutRepository.save(workout);
    }

        public List<Workout> findAllWorkout() {
            return workoutRepository.findAll();
        }

    public List<Workout> getWorkOutByUserId(String userId) {
        // Assuming you have a method in your repository to fetch meal plans by user ID
        return workoutRepository.findByCreatedBy_Id(userId);
    }

    //read one
    public Workout getWorkOutByStatusId(String statusId) {
        return workoutRepository.findById(statusId).get();
    }

    //update
    public Workout updateWorkout(Workout workoutRequest) {
        //get the existing document from DB
        // populate new value from request to existing object/entity/document
        Workout existingWorkout = workoutRepository.findById(workoutRequest.getStatusId()).get();
        existingWorkout.setStartdate(workoutRequest.getStartdate());
        existingWorkout.setEnddate(workoutRequest.getEnddate());
        existingWorkout.setStatus(workoutRequest.getStatus());
        existingWorkout.setDistancerunperday(workoutRequest.getDistancerunperday());
        existingWorkout.setPushupscount(workoutRequest.getPushupscount());
        existingWorkout.setOldweight(workoutRequest.getOldweight());
        existingWorkout.setNewweight(workoutRequest.getNewweight());
        existingWorkout.setDescription(workoutRequest.getDescription());

        return workoutRepository.save(existingWorkout);
    }

    public String deleteWorkout(String statusId) {
        workoutRepository.deleteById(statusId);
        return statusId + " Meal Plan Plan  deleted from Successfully ";
    }

   /* public boolean doesFacultyExist(String facultyId) {
        return workoutRepository.existsById(facultyId);
    }*/

}


