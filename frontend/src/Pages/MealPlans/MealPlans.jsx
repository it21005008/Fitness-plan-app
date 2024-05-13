import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitile/PageTitle";
import { listMealPlans } from "../../services/MealPlans";
import AddMeal from "../../components/Meal/AddMeal";
import Meal from "../../components/Meal/Meal";

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const data = await listMealPlans();
        setMealPlans(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMealPlans();

    // Clean-up function if needed
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewMeal = async (newMeal) => {
    try {
      // Fetch updated meal plans
      const updatedMealPlans = await listMealPlans();
      setMealPlans(updatedMealPlans);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center text-blue-900 rounded-2xl animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[85vh] flex justify-center items-center text-blue-900 rounded-2xl animate-pulse">
        {error}
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Meal Plans" subtitle="My Meal Plans" />

      <AddMeal addNewMeal={addNewMeal} />

      <div>
        {mealPlans
          .slice()
          .reverse()
          .map((mealPlan) => (
            <Meal key={mealPlan.mealId} {...mealPlan} otherControl="0" />
          ))}
      </div>
    </div>
  );
}

export default MealPlans;
