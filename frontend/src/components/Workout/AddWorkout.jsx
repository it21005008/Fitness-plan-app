import React, { useState } from 'react'
import Logo from '../../img/logo.png'
import { useNavigate } from 'react-router-dom';

import {createWorkoutPlan} from '../../services/WorkoutPlans'

function AddWorkout() {
    const navigate = useNavigate(); // Define navigate function

    const closeModal = () => {
        document.getElementById('add-meal-plan-modal').classList.add('hidden')
    }

    const openModal = () => {
        document.getElementById('add-meal-plan-modal').classList.remove('hidden')
    }


    const [inputs, setInputs] = useState([{ exercise: '', sets: '' }]);
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([]);

    //error handling
    const [error, setError] = useState(null);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index][name] = value;
        setInputs(newInputs);
        // Update exercises and sets arrays
        if (name === 'exercise') {
        const newExercises = [...exercises];
        newExercises[index] = value;
        setExercises(newExercises);
        } else if (name === 'sets') {
        const newSets = [...sets];
        newSets[index] = value;
        setSets(newSets);
        }
    };
    const handleAddInput = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setInputs([...inputs, { exercise: '', sets: '' }]);
        setExercises([...exercises, '']);
        setSets([...sets, ''])

        setError(null);

        console.log(inputs, exercises, sets)
    };

    const handleDeleteInput = (index, event) => {
        event.preventDefault(); // Prevent default button behavior
        
        // Check if there's only one input left
        if (inputs.length === 1) {
            setError('You must keep at least one input');
            return;
        }else {
            setError(null);
        }
    
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        
        const newExercises = [...exercises];
        newExercises.splice(index, 1);
        setExercises(newExercises);
        
        const newSets = [...sets];
        newSets.splice(index, 1);
        setSets(newSets);
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if all required fields are filled out
        const routinesInput = document.getElementById('routines');
        const repetitionsInput = document.getElementById('repetitions');
        if (!routinesInput.value || !repetitionsInput.value || inputs.some(input => !input.exercise || !input.sets)) {
            //set error
            setError('Please fill out all required fields');
            return;
        }else {
            setError(null);
        }
    
        const newWorkoutPlan = {
            routines: routinesInput.value,
            repetitions: repetitionsInput.value,
            exercises: exercises,
            sets: sets
        };
    
   
        const response = await createWorkoutPlan(newWorkoutPlan);
        //console.log(response.workoutId);
        navigate(`/workoutplans/${response.workoutId}`);
        return response.workoutId;
    };
    
    



  return (
            <div>
                <div className='flex justify-end mt-3'>
                    <button className='bg-indigo-600 p-0.5 rounded-full' title='Add Meal Plan' onClick={openModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                    </button>
                </div>
                <div id='add-meal-plan-modal' className='fixed z-50 top-0 left-0 bottom-0 right-0 bg-black/80 flex items-center justify-center hidden'>
                    <div className='max-w-xl w-full bg-slate-700 p-5 rounded-lg shadoe-md'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <div><img src={Logo} className='w-5 h-5 mr-2' alt="" /></div>
                                <div className='text-sm text-white font-semibold'>Add Workout Plan</div>
                                <div className='text-xs text-white/40'> / FitFlex</div>
                            </div>
                            <div>
                                <button onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 hover:text-red-500">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <form className='mt-3 space-y-1'>
                            <div>
                                <label htmlFor="routines">Routine</label>
                                <input type="text" name="routines" id="routines" required/>
                            </div>

                            <div>
                                <div className='flex items-center justify-between mt-4'>
                                    <div>
                                        <label htmlFor="exercises">Exercises</label>
                                    </div>
                                    <div>
                                        <button onClick={handleAddInput} className='p-0.5 rounded-full bg-blue-500'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div >
                                    
                                        {inputs.map((input, index) => (
                                            <div key={index} className='grid grid-cols-2 gap-1'>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name={`exercise`}
                                                        placeholder='Exercise'
                                                        value={input.exercise}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                    />
                                                </div>
                                                <div className='flex'>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name={`sets`}
                                                            placeholder='Set Count'
                                                            value={input.sets}
                                                            onChange={(event) => handleInputChange(index, event)}
                                                            className='w-60'
                                                        />
                                                    </div>
                                                    <div className='flex items-center justify-center w-full'>
                                                        <button onClick={(event) => handleDeleteInput(index, event)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 hover:text-red-400">
                                                                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    
                                </div>
                            </div>

                            <div>
                                <label htmlFor="repetitions">Repetitions</label>
                                <input type="number" name="repetitions" id="repetitions" />
                            </div>

                            <div className='text-red-300 text-xs pb-2 pt-1' id='Error'>
                                {error && <p>{error}</p>}
                            </div>

                            <div className='mt-3'>
                                <button type="submit" className='w-full p-1.5 text-sm bg-blue-600 rounded-lg text-white font-semibold' onClick={handleSubmit}>
                                    Add Workout
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
  )
}

export default AddWorkout