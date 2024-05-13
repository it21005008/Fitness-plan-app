// AddMeal.js
import React, { useState } from "react";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { addMealPlan } from "../../services/MealPlans";

function AddMeal() {
  const navigate = useNavigate(); // Define navigate function

  const [inputs, setInputs] = useState([
    {
      mealName: "",
      recipe: "",
      ingredients: "",
      preference: "",
      portionSize: "",
    },
  ]);

  const openModal = () => {
    document.getElementById("add-meal-plan-modal").classList.remove("hidden");
  };

  const closeModal = () => {
    document.getElementById("add-meal-plan-modal").classList.add("hidden");
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMealPlan = {
      mealName: inputs[0].mealName,
      recipe: inputs[0].recipe,
      ingredients: inputs[0].ingredients,
      preference: inputs[0].preference,
      portionSize: inputs[0].portionSize,
    };

    try {
      const response = await addMealPlan(newMealPlan);
      navigate(`/mealplans/${response.mealId}`);
      console.log("Meal plan added successfully:", response);
      closeModal();
      // Optionally, you can add logic to update state or show a success message
    } catch (error) {
      console.error("Error adding meal plan:", error);
      // Optionally, you can add logic to show an error message
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-3">
        <button
          className="bg-indigo-600 p-0.5 rounded-full"
          title="Add Meal Plan"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </button>
      </div>

      <div
        id="add-meal-plan-modal"
        className="fixed z-50 top-0 left-0 bottom-0 right-0 bg-black/80 flex items-center justify-center hidden"
      >
        <div className="max-w-xl w-full bg-slate-700 p-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div>
                <img src={Logo} className="w-5 h-5 mr-2" alt="" />
              </div>
              <div className="text-sm text-white font-semibold">
                Add Meal Plan
              </div>
              <div className="text-xs text-white/40"> / FitFlex</div>
            </div>
            <div>
              <button onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5 hover:text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <form className="mt-3 space-y-1" onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="mealName">Meal Name</label>
                <input
                  type="text"
                  name="mealName"
                  value={inputs[0].mealName}
                  onChange={(e) => handleInputChange(0, e)}
                  placeholder="Enter meal name"
                  required
                />
              </div>

              <div>
                <label htmlFor="recipe">Recipe</label>
                <textarea
                  name="recipe"
                  value={inputs[0].recipe}
                  onChange={(e) => handleInputChange(0, e)}
                  placeholder="Enter recipe"
                  required
                />
              </div>

              <div>
                <label htmlFor="ingredients">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  value={inputs[0].ingredients}
                  onChange={(e) => handleInputChange(0, e)}
                  placeholder="Enter ingredients"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="preference">Preference</label>
                  <select
                    name="preference"
                    value={inputs[0].preference}
                    onChange={(e) => handleInputChange(0, e)}
                    required
                  >
                    <option value="" hidden>
                      Choose
                    </option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non Vegetarian">Non Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="portionSize">Portion Size</label>
                  <select
                    name="portionSize"
                    value={inputs[0].portionSize}
                    onChange={(e) => handleInputChange(0, e)}
                    required
                  >
                    <option value="" hidden>
                      Choose
                    </option>
                    <option value="1 Serving">1 Serving</option>
                    <option value="2 Servings">2 Servings</option>
                    <option value="3 Servings">3 Servings</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full p-1.5 text-sm bg-blue-600 rounded-lg text-white font-semibold"
              >
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMeal;
