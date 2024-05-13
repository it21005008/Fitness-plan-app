import axios from "axios";

const MEAL_URL = `${process.env.REACT_APP_API_DOMAIN}/api/mealplan`;

export const listMealPlans = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return axios
    .get(MEAL_URL + "/all", {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //console.log("List MealPlans Response:", response.data); // Log response for debugging
      return response.data;
    })
    .catch((error) => {
      console.error("List MealPlans Error:", error); // Log error for debugging
      throw error;
    });
};

export const listMyMealPlans = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("Token:", token); // Log token for debugging
  return axios
  .get(MEAL_URL + "/allByUser", {
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    //console.log("List MealPlans Response:", response.data); // Log response for debugging
    return response.data;
  })
  .catch((error) => {
    console.error("List MealPlans Error:", error); // Log error for debugging
    throw error;
  });
};

export const getMealPlan = (mealPlanId) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log('id:'+mealPlanId); // Log token for debugging
  return axios
  .get(MEAL_URL + "/" + mealPlanId, {
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log("List MealPlans Response:", response.data); // Log response for debugging
    return response.data;
  })
  .catch((error) => {
    console.error("List MealPlans Error:", error); // Log error for debugging
    throw error;
  });
};

export const addMealPlan = (mealPlan) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return axios
    .post(MEAL_URL + "/add", mealPlan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //console.log("Add MealPlan Response:", response.data); // Log response for debugging
      return response.data;
    })
    .catch((error) => {
      console.error("Add MealPlan Error:", error); // Log error for debugging
      throw error;
    });
}

export const updateMealPlan = (mealPlan) => {
  const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
  );
  return axios
    .put(MEAL_URL + "/update/" + mealPlan.mealId, mealPlan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Update MealPlan updated:", response.data); // Log response for debugging
      return response.data;
    })
    .catch((error) => {
      console.error("Update MealPlan Error:", error); // Log error for debugging
      throw error;
    });
}

export const deleteMealPlan = (mealPlanId) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return axios
    .delete(MEAL_URL + "/delete/" + mealPlanId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //console.log("Delete MealPlan Response:", response.data); // Log response for debugging
      return response.data;
    })
    .catch((error) => {
      console.error("Delete MealPlan Error:", error); // Log error for debugging
      throw error;
    });
}

