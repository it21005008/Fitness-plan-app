import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navigation from "./components/navigation/Navigation";
import SideBar from "./components/navigation/SideBar";

import Home from "./Pages/Home";
import Login from "./Pages/Login";


import MealPlans from "./Pages/MealPlans/MealPlans";
import Meal from "./Pages/MealPlans/SoloMealPlans";


import WorkoutStatus from "./Pages/WorkoutStatus/WorkoutStatus";
import SoloWorkoutStatus from "./Pages/WorkoutStatus/SoloWorkoutStatus";


import WorkoutPlans from './Pages/WorkoutPlans/WorkoutPlans';
import Workout from "./Pages/WorkoutPlans/SoloWorkout";

import Post from "./Pages/Post/Post";

async function ValidateToken(token) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/user/validate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function SendLogout(token) {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      // Token exists, user is logged in
      //setIsLoggedIn(true);

      const isValidToken = async () => {
        const isValid = await ValidateToken(token);
        if (!isValid) {
          console.log("Token is not valid");
          setIsLoggedIn(false);
        } else {
          console.log("Token is valid");
          setIsLoggedIn(true);
        }

        setLoading(false); // Set loading to false after validation
      };

      isValidToken();
    } else {
      setLoading(false); // Set loading to false if there is no token
    }
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center "></div>
    ); // Render a loading indicator while checking the token
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    //get token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    //send logout request
    const sendLogout = async () => {
      const response = await SendLogout(token);
      console.log(response);
    };

    sendLogout();

    // Remove token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {isLoggedIn ? (
          <div>
            <Navigation onLogout={handleLogout} />
            <SideBar />
            <div className="pl-96 pt-12">
              <div className="p-5 space-y-4">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/mealplans" element={<MealPlans />} />
                  <Route path="/mealplans/:mealId" element={<Meal />} />

                  <Route path="/workoutstatus" element={<WorkoutStatus />} />
                  <Route path="/workoutstatus/:workoutStatusId" element={<SoloWorkoutStatus />} />


                  <Route path="/workoutplans" element={<WorkoutPlans />} />        
                  <Route path="/workoutplans/:workoutId" element={<Workout />} />

                  <Route path="/post/:postId" element={<Post />} />


                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
