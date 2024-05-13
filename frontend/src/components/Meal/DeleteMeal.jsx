import React from 'react'
import { deleteMealPlan } from '../../services/MealPlans'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DeleteMeal(meal) {
    const navigate = useNavigate(); // Define navigate function

    const handleDeleteModelClose = (mealId) => {
        //hide div delete-meal + mealId
        document.getElementById('delete-meal' + mealId).classList.add('hidden');
        //console.log(mealId)
    };

    const handleDelete = async (mealId) => {
        try {
            await deleteMealPlan(mealId);
            //hide div delete-meal + mealId
            console.log('deleted')
            navigate('/mealPlans')

            //refresh page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };
  return (
    <div id={'delete-meal' + meal.mealId} className='fixed left-0 bottom-0 right-0 top-0 z-50 bg-black/80 flex items-center justify-center hidden'>
        <div className='bg-slate-800 p-5 rounded-lg w-full max-w-md space-y-2'>
            <div className='text-xl font-semibold text-center'>
                Are you sure you want to delete this meal plan?
            </div>
            <div className='text-xs text-white/50 text-center'>
                {meal.mealId}
            </div>

            <div className='flex justify-center gap-1 pt-3'>
                <button onClick={() => handleDelete(meal.mealId)} className='text-sm bg-red-600 px-3 py-2 text-white font-semibold rounded-lg '>
                    Yes, I'm sure
                </button>
                <button onClick={() => handleDeleteModelClose(meal.mealId)} className='text-sm bg-slate-700 px-3 py-2 text-white font-semibold rounded-lg '>
                    Close
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteMeal