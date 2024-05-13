import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkout } from "../../services/WorkoutPlans";

import PageTitle from "../../components/PageTitile/PageTitle";
import WorkoutComponent from "../../components/Workout/Workout";
import AddWorkout from "../../components/Workout/AddWorkout";

function Workout() {
    const {workoutId} = useParams();

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const data = await getWorkout(workoutId);
                setWorkout(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchWorkout();

        // Clean-up function if needed
        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">Loading...</div>;
    }

    if (error) {
        return (
            <div className="w-full h-[85vh] flex flex-col justify-center items-center bg-slate-800 rounded-2xl">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>

                </div>
                <div className="font-semibold text-2xl text-white">
                    The requested resource was deleted or could not be found.
                </div>
            </div>
        );
    }


  return (
    <div>
        <PageTitle title={workout?.routines} subtitle="Workout Plan"/>

        <AddWorkout />
        <div>
            <WorkoutComponent key={workout?.workoutId} {...workout} otherControl='1'/>
        </div>
        
    </div>
  )
}

export default Workout