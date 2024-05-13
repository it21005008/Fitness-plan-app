import React from 'react'

function WorkoutPlanTab() {

    const openModal = () => {
        document.getElementById('add-workout-plan-modal').classList.remove('hidden')
    }
    
  return (
    <div className='flex justify-end mt-3'>
        <button className='bg-indigo-600 p-0.5 rounded-full' title='Add Meal Plan' onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
        </button>
    </div>
  )
}

export default WorkoutPlanTab