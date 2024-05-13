import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitile/PageTitle";

import Workout from "../../components/Workout/Workout";

import { listWorkoutPlans } from "../../services/WorkoutPlans";
import AddWorkout from "../../components/Workout/AddWorkout";
import WorkoutPlanTab from "../../components/Workout/WorkoutPlanTab";

function WorkoutPlans() {

    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchWorkoutPlans = async () => {
        try {
          const data = await listWorkoutPlans();
          setWorkoutPlans(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchWorkoutPlans();

      // Clean-up function if needed
      return () => {};

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
      return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
  return (
    <div>
        <PageTitle title="Workout Plans" subtitle="My Workout Plans" />

        <AddWorkout />

        <div className="space-y-1 mt-3">           
            {workoutPlans.map((workoutPlan) => (
                <Workout key={workoutPlan.workoutId} {...workoutPlan} otherControl='0'  />
            ))}
        </div>
    </div>
  )
}

export default WorkoutPlans