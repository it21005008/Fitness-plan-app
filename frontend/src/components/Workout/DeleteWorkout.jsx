import React from 'react'
import {deleteWorkout} from '../../services/WorkoutPlans'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DeleteWorkout(workout) {
    const navigate = useNavigate(); // Define navigate function

    const handleDeleteModelClose = (workoutId) => {
        //hide div delete-workout + workoutId
        document.getElementById('delete-workout' + workoutId).classList.add('hidden');
        //console.log(workoutId)
    };

    const handleDelete = async (workoutId) => {
        try {
            await deleteWorkout(workoutId);
            //hide div delete-workout + workoutId
            console.log('deleted')
            navigate('/workoutPlans');

            //refresh page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    
  return (
    <div>
        <div id={'delete-workout' + workout.workoutId} className='fixed left-0 bottom-0 right-0 top-0 bg-black/80 flex items-center justify-center hidden'>
            <div className='bg-slate-800 p-5 rounded-lg w-full max-w-md space-y-2'>
                <div className='hidden justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                <div className='text-xl font-semibold text-center'>
                    Are you sure you want to delete this workout?
                </div>
                <div className='text-xs text-white/50 text-center'>
                    {workout.workoutId}
                </div>

                <div className='flex justify-center gap-1 pt-3'>
                    <button onClick={() => handleDelete(workout.workoutId)} className='text-sm bg-red-600 px-3 py-2 text-white font-semibold rounded-lg '>
                        Yes, I'm sure
                    </button>
                    <button onClick={() => handleDeleteModelClose(workout.workoutId)} className='text-sm bg-slate-700 px-3 py-2 text-white font-semibold rounded-lg '>
                        Close 
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteWorkout