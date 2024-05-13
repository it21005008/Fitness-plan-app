import axios from "axios";

const WORKOUT_URL = `${process.env.REACT_APP_API_DOMAIN}/api/wstatus`;

export const listWorkoutStatus = () => {
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
}

export const createWorkoutStatus = (workoutStatus) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .post(WORKOUT_URL + "/add", workoutStatus, {
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

export const deleteWorkoutStatus = (workoutStatusId) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .delete(WORKOUT_URL + "/delete/" + workoutStatusId, {
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

export const getWorkoutStatus = (workoutStatusId) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .get(WORKOUT_URL + "/" + workoutStatusId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            //console.log("Get WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("Get WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}

export const UpdateWorkoutStatus = (workoutStatus) => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .put(WORKOUT_URL + "/update/" + workoutStatus.StatusId, workoutStatus, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Update WorkoutPlans Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("Update WorkoutPlans Error:", error); // Log error for debugging
            throw error;
        });
}

