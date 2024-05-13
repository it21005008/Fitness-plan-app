import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitile/PageTitle";
import AddWorkoutStatus from "../../components/Workout_Status/AddWorkoutStatus";
import WorkoutStatusComponent from "../../components/Workout_Status/WorkoutStatus";

import {listWorkoutStatus} from "../../services/WorkoutStatus";
function WorkoutStatus() {
    const [workoutStatus, setWorkoutStatus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkoutStatus = async () => {
            try {
                const data = await listWorkoutStatus();
                setWorkoutStatus(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchWorkoutStatus();

        // Clean-up function if needed
        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">{error}</div>;
    }


  return (
    <div>
        <PageTitle title="Workout Status" subtitle="Workout Status" />
        
        <AddWorkoutStatus />

        <div className="space-y-1 mt-3">
            {workoutStatus.map((workoutStatus) => (
                <WorkoutStatusComponent key={workoutStatus.statusId} {...workoutStatus} otherControl='0' />
            ))}
        </div>
    </div>
  )
}

export default WorkoutStatus