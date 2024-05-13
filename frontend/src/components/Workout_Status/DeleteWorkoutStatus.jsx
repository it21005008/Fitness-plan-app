import React from 'react';
import { deleteWorkoutStatus } from '../../services/WorkoutStatus';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DeleteWorkoutStatusComponent(workoutStatus) {
    const navigate = useNavigate();



    const handleDelete = async (statusId) => {
        try {
            await deleteWorkoutStatus(statusId);
            console.log('deleted');
            navigate('/workoutstatus');

            // Refresh page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting workout status:', error);
        }
    }

    const handleDeleteModelClose = (statusId) => {
        document.getElementById('delete-workout-status' + statusId).classList.add('hidden');
    }

    return (
        <div id={'delete-workout-status' + workoutStatus.statusId} className='fixed left-0 bottom-0 right-0 top-0 z-50 bg-black/80 flex items-center justify-center hidden'>
            <div className='bg-slate-800 p-5 rounded-lg w-full max-w-md space-y-2'>
                <div className='text-xl font-semibold text-center'>
                    Are you sure you want to delete this meal plan?
                </div>
                <div className='text-xs text-white/50 text-center'>
                    {workoutStatus.statusId}
                </div>

                <div className='flex justify-center gap-1 pt-3'>
                    <button onClick={() => handleDelete(workoutStatus.statusId)} className='text-sm bg-red-600 px-3 py-2 text-white font-semibold rounded-lg '>
                        Yes, I'm sure
                    </button>
                    <button onClick={() => handleDeleteModelClose(workoutStatus.statusId)} className='text-sm bg-slate-700 px-3 py-2 text-white font-semibold rounded-lg '>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWorkoutStatusComponent;
