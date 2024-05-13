import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { updateMealPlan } from "../../services/MealPlans";
import DeleteMeal from "./DeleteMeal";
import { TimestampConverter } from "../../services/Date";

function Meal(mealPlan) {
  const navigate = useNavigate();

  const [mealName, setMealName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preference, setPreference] = useState("");
  const [portionSize, setPortionSize] = useState("");
  //const [date, setDate] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    setMealName(mealPlan.mealName);
    setRecipe(mealPlan.recipe);
    setIngredients(mealPlan.ingredients);
    setPreference(mealPlan.preference);
    setPortionSize(mealPlan.portionSize);
    //setDate(mealPlan.date);
  }, [mealPlan]);

  const handleEdit = (mealId) => {
    const divs = document.querySelectorAll(".updatefield");

    divs.forEach((div) => {
      div.contentEditable = true;
      div.classList.add(
        "px-3",
        "py-1",
        "border",
        "border-slate-700",
        "rounded-xl",
        "w-fit",
        "bg-slate-900",
        "mt-2"
      );
    });

    //hide editBtn
    document.querySelector("#editBtn").classList.add("hidden");
    //unhide updateBtn
    document.querySelector("#updateBtn").classList.remove("hidden");
  };

  const handleDeleteModel = (mealId) => {
    document.getElementById("delete-meal" + mealId).classList.remove("hidden");
  };

  const handleUpdate = async (mealId) => {
    const divs = document.querySelectorAll(".updatefield");

    let filled = true;
    divs.forEach((div) => {
      if (div.textContent.trim() === "") {
        filled = false;
      }
    });

    if (!filled) {
      setError("Please fill out all required fields");
    } else {
      divs.forEach((div) => {
        div.contentEditable = false;
        div.classList.remove(
          "px-3",
          "py-1",
          "border",
          "border-slate-700",
          "rounded-xl",
          "w-fit",
          "bg-slate-900",
          "mt-2"
        );
      });

      // Get updated values from the DOM
      const mealName = document.getElementById("mealName").innerText.trim();
      const recipe = document.getElementById("recipe").innerText.trim();
      const ingredients = document
        .getElementById("ingredients")
        .innerText.trim();
      const preference = document.getElementById("preference").innerText.trim();
      const portionSize = document
        .getElementById("portionSize")
        .innerText.trim();

      // Update meal
      const updatedMeal = {
        mealId: mealId,
        mealName: mealName,
        recipe: recipe,
        ingredients: ingredients,
        preference: preference,
        portionSize: portionSize,
      };

      try {
        const response = await updateMealPlan(updatedMeal);
        console.log(response);

        //unhide editBtn
        document.querySelector("#editBtn").classList.remove("hidden");
        //hide updateBtn
        document.querySelector("#updateBtn").classList.add("hidden");
      } catch (error) {
        console.log(error);
        // Handle error
      }
    }
  };

  const [ingredientNutrition, setIngredientNutrition] = useState([]);

  useEffect(() => {
    const fetchCalories = async () => {
      const ingredientsList = mealPlan.ingredients.split(",");
      const promises = ingredientsList.map(async (ingredient) => {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/nutrition?query=${ingredient.trim()}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "DaedPXJ54n0Cy37a+Gl5Jg==nVI0ufUXRmztKb5Y",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        return result;
      });
      const ingredientCalorieData = await Promise.all(promises);
      setIngredientNutrition(ingredientCalorieData);
    };

    fetchCalories();
  }, [mealPlan.ingredients]);

  return (
    <div key={mealPlan.mealId}>
      <div className="space-y-1 mt-3">
        <div className="bg-slate-800 p-5 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 id="error" className="text-red-400 text-lg mb-2">
                {error}
              </h2>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold updatefield" id="mealName">
                  {mealName}
                </h1>

                <div
                  style={{
                    display: mealPlan.otherControl == 0 ? "block" : "none",
                  }}
                >
                  <button
                    onClick={() => navigate(`/mealplans/${mealPlan.mealId}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mt-2 hover:text-blue-500"
                    >
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                style={{
                  display: mealPlan.otherControl == 1 ? "block" : "none",
                }}
              >
                <button
                  id="editBtn"
                  className="bg-black/40 p-2 rounded-full"
                  onClick={() => handleEdit(mealPlan.mealId)}
                  title={"Edit " + mealPlan.mealName}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                </button>
              </div>

              <button
                id="updateBtn"
                className="bg-black/40 p-2 rounded-full text-green-500 hidden"
                onClick={() => handleUpdate(mealPlan.mealId)}
                title={"Save " + mealPlan.mealName}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                className="bg-black/40 p-2 rounded-full text-red-500"
                onClick={() => handleDeleteModel(mealPlan.mealId)}
                title={"Delete " + mealPlan.mealName}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div className="text-lg text-white/60">Recipe:</div>
            <div
              className="updatefield"
              id="recipe"
              onInput={(e) => setRecipe(mealPlan.mealId, e)}
            >
              {mealPlan.recipe}
            </div>
          </div>

          <div>
            <div className="text-lg text-white/60">Ingredients:</div>
            <div
              className="updatefield"
              id="ingredients"
              onInput={(e) => setIngredients(mealPlan.mealId, e)}
            >
              {mealPlan.ingredients}
            </div>
          </div>

          <div>
            <div className="text-lg text-white/60">Preference:</div>
            <div
              className="updatefield"
              id="preference"
              onInput={(e) => setPreference(mealPlan.mealId, e)}
            >
              {mealPlan.preference}
            </div>
          </div>

          <div>
            <div className="text-lg text-white/60">Portion Size:</div>
            <div
              className="updatefield"
              id="portionSize"
              onInput={(e) => setPortionSize(mealPlan.mealId, e)}
            >
              {mealPlan.portionSize}
            </div>

            <div className="mt-3 text-white/50">
              <h4 className="text-lg font-semibold text-center">
                Ingredient Nutritional Information (per 100g):
              </h4>
              <table className="table-auto border-collapse border border-white/50 mx-auto">
                <thead>
                  <tr className="text-center bg-gray-900">
                    <th className="border border-white/50 p-2">Ingredient</th>
                    <th className="border border-white/50 p-2">Calories</th>
                    <th className="border border-white/50 p-2">
                      Carbohydrates (g)
                    </th>
                    <th className="border border-white/50 p-2">Protein (g)</th>
                    <th className="border border-white/50 p-2">Fat (g)</th>
                    <th className="border border-white/50 p-2">Sodium (mg)</th>
                    <th className="border border-white/50 p-2">Sugar (mg)</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientNutrition.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No ingredient data available
                      </td>
                    </tr>
                  ) : (
                    <>
                      {ingredientNutrition.map((ingredient, index) => {
                        if (
                          !ingredient ||
                          !ingredient[0] ||
                          !ingredient[0].name
                        ) {
                          return null; // Skip rendering if data is incomplete
                        }
                        const {
                          calories,
                          carbohydrates_total_g,
                          protein_g,
                          fat_total_g,
                          sodium_mg,
                          sugar_g,
                        } = ingredient[0];
                        return (
                          <tr key={index} className="text-center">
                            <td className="border border-white/50 p-2">
                              {ingredient[0].name.charAt(0).toUpperCase() +
                                ingredient[0].name.slice(1)}
                            </td>
                            <td className="border border-white/50 p-2">
                              {calories || 0}
                            </td>
                            <td className="border border-white/50 p-2">
                              {carbohydrates_total_g || 0}
                            </td>
                            <td className="border border-white/50 p-2">
                              {protein_g || 0}
                            </td>
                            <td className="border border-white/50 p-2">
                              {fat_total_g || 0}
                            </td>
                            <td className="border border-white/50 p-2">
                              {sodium_mg || 0}
                            </td>
                            <td className="border border-white/50 p-2">
                              {sugar_g || 0}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="text-center bg-gray-900">
                        <td className="border border-white/50 p-2">Total</td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) => acc + (curr[0]?.calories || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) =>
                                acc + (curr[0]?.carbohydrates_total_g || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) => acc + (curr[0]?.protein_g || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) => acc + (curr[0]?.fat_total_g || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) => acc + (curr[0]?.sodium_mg || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border border-white/50 p-2">
                          {ingredientNutrition
                            .reduce(
                              (acc, curr) => acc + (curr[0]?.sugar_g || 0),
                              0
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DeleteMeal mealId={mealPlan.mealId} />
      </div>
    </div>
  );
}

export default Meal;
