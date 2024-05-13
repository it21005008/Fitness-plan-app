import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealPlan } from "../../services/MealPlans";

import PageTitle from "../../components/PageTitile/PageTitle";

import AddMeal from "../../components/Meal/AddMeal";
import MealComponent from "../../components/Meal/Meal";

function SoloMealPlans() {

    const {mealId} = useParams();

    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const data = await getMealPlan(mealId);
                setMealPlan(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchMealPlan();

        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-[85vh] flex justify-center items-center bg-slate-800 rounded-2xl animate-pulse">{error}</div>;
    }


  return (
    <div>
        <PageTitle title={mealPlan?.mealName} subtitle={mealPlan?.recipe} />

        <AddMeal />
        <div>
            <MealComponent key={mealPlan?.mealId} {...mealPlan} otherControl='1' />
        </div>
    </div>
  )
}

export default SoloMealPlans