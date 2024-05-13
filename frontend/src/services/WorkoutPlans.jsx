import axios from "axios";

const WORKOUT_URL = `${process.env.REACT_APP_API_DOMAIN}/api/workoutplan`;


export const listWorkoutPlans = () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .get(WORKOUT_URL + "/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            //console.log("List WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("List WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
};

export const createWorkoutPlan = (workoutPlan) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .post(WORKOUT_URL + "/add", workoutPlan, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Add WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("Add WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}

export const getWorkout = (workoutPlanId) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .get(WORKOUT_URL + "/" + workoutPlanId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            //console.log("List WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("List WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}

export const UpdateWorkoutPlan = (workoutPlan) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .put(WORKOUT_URL + "/update/" + workoutPlan.workoutId, workoutPlan, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            //console.log("Update WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("Update WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}

export const deleteWorkout = (workoutPlanId) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .delete(WORKOUT_URL + "/delete/" + workoutPlanId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            //console.log("Delete WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("Delete WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}