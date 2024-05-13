import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitile/PageTitle";

import { getWorkoutStatus } from "../../services/WorkoutStatus";
import AddWorkoutStatus from "../../components/Workout_Status/AddWorkoutStatus";
import WorkoutStatus from "../../components/Workout_Status/WorkoutStatus";

function SoloWorkoutStatus() {

    const { workoutStatusId } = useParams();

    const [workoutStatus, setWorkoutStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchWorkoutStatus = async () => {
        try {
          const data = await getWorkoutStatus(workoutStatusId);
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
        <PageTitle title={workoutStatus.description} subtitle="View Details" />

        <AddWorkoutStatus />

        <div>
            <WorkoutStatus key={workoutStatus?.workoutId} {...workoutStatus} otherControl='1' />
        </div>
    </div>
  )
}

export default SoloWorkoutStatus