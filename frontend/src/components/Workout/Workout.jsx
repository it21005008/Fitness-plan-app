import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DeleteWorkout from './DeleteWorkout';
import {UpdateWorkoutPlan} from '../../services/WorkoutPlans'
import {TimestampConverter} from '../../services/Date'

function Workout(workoutPlans) {
    const navigate = useNavigate(); // Define navigate function

    const handleEdit = (workoutId) => {
        //make all the div has updatefield class edit
        const divs = document.querySelectorAll('.updatefield');
        //make content editable
        divs.forEach((div) => {
            div.contentEditable = true;
            div.classList.add('px-3', 'py-1', 'border', 'border-slate-700', 'rounded-xl', 'w-fit', 'bg-slate-900','mt-2');
        });

        //hide editBtn
        document.querySelector('#editBtn').classList.add('hidden');
        //unhide updateBtn
        document.querySelector('#updateBtn').classList.remove('hidden');
    };

    const [routines, setRoutines] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);

    // Update exercises and sets arrays
    useEffect(() => {
        // Create new arrays based on workoutPlans
        const newExercises = [...workoutPlans.exercises];
        const newSets = [...workoutPlans.sets];

        //routines
        const newRoutines = workoutPlans.routines;
        const newRepetitions = workoutPlans.repetitions;

        // Update state variables
        setExercises(newExercises);
        setSets(newSets);
        setRoutines(newRoutines);
        setRepetitions(newRepetitions);
    }, [workoutPlans]);

    //handleDelete
    const handleDeleteModel = (workoutId) => {
        //unhide div delete-workout + workoutId
        document.getElementById('delete-workout' + workoutId).classList.remove('hidden');
    };
    
    //handleExerciseInput
    const handleExerciseInput = (index,value) => {
        const newExercises = [...exercises];
        newExercises[index] = value;
        setExercises(newExercises);  
    }

    const handleSetsInput = (index,value) => {
        const newSets = [...sets];
        newSets[index] = value;
        setSets(null);
        setSets(newSets);
    }

    const handleUpdate = async (workoutId) => {
        const divs = document.querySelectorAll('.updatefield');
        

        //check all content is filled
        let filled = true;
        divs.forEach((div) => {
            if (div.textContent.trim() === '') {
                filled = false;
            }
        });

        if (!filled) {
            setError('Please fill out all required fields');
        }else {
            //make content editable
            divs.forEach((div) => {
                div.contentEditable = false;
                div.classList.remove('px-3', 'py-1', 'border', 'border-slate-700', 'rounded-xl', 'w-fit', 'bg-slate-900','mt-2');
            });
            
            //update workout
            const updatedWorkout = {
                workoutId: workoutId,
                routines: routines,
                repetitions: repetitions,
                sets: sets,
                exercises: exercises
            };

            //UpdateWorkoutPlan(updatedWorkout);
            try {
                const response = await UpdateWorkoutPlan(updatedWorkout);
                console.log('Successfully Updated');

                //unhide editBtn
                document.querySelector('#editBtn').classList.remove('hidden');
                //hide updateBtn
                document.querySelector('#updateBtn').classList.add('hidden');
            } catch (error) {
                console.error(error);
            }
        }
    }


    
    return (
        <div key={workoutPlans.workoutId}>
            <div className="space-y-1 mt-3">           
                
                    <div className="bg-slate-800 p-5 rounded-xl space-y-3" key={workoutPlans.workoutId}>
                        
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 id='error' className='text-red-400 text-xs mb-2'> {error} </h2>
                                <div className='flex items-center gap-2'>
                                    <h1  className="text-lg font-semibold updatefield" id='routines' onInput={(event) => setRoutines(event.target.innerHTML)}>{workoutPlans.routines}</h1>
                                    
                                    <div style={{ display: workoutPlans.otherControl == 0 ? 'block' : 'none' }}>
                                        <button onClick={() => navigate(`/workoutplans/${workoutPlans.workoutId}`)} className="text-blue-500 hover:text-slate-300 mt-2.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>

                            </div>
                            <div className='flex items-center gap-2'>
                                <div style={{ display: workoutPlans.otherControl == 1 ? 'block' : 'none' }}>
                                    <button id='editBtn' className='bg-black/40 p-2 rounded-full'  onClick={() => handleEdit(workoutPlans.workoutId)} title={'Edit ' + workoutPlans.routines}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                        </svg>
                                    </button>
                                </div>

                                <button id='updateBtn' className='bg-black/40 p-2 rounded-full text-green-500 hidden' onClick={() => handleUpdate(workoutPlans.workoutId)} title={'Save ' + workoutPlans.routines}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <button className='bg-black/40 p-2 rounded-full text-red-500' onClick={() => handleDeleteModel(workoutPlans.workoutId)} title={'Delete ' + workoutPlans.routines}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-white/60">Repetitions</div>
                            <div className='updatefield' id='repetitions' onInput={(event) => setRepetitions(event.target.innerHTML)}>
                                {workoutPlans.repetitions}
                            </div>
                        </div>
                        
                        <div>
                            <div className="text-xs text-white/60">Exercises</div>
                            <ul className="ml-5 text-sm space-y-2">
                                {workoutPlans.exercises.map((exercise, index) => (
                                    <div key={exercise}>
                                        <div className='flex items-center gap-2'><div id={'Exercise'+index} className="updatefield" onInput={(event) => handleExerciseInput(index, event.target.innerHTML)}>{exercise}</div> : <div id={'Sets'+index} className='updatefield' onInput={(event) => handleSetsInput(index, event.target.innerHTML)}>{workoutPlans.sets[index]}</div></div>
                                    </div>
                                ))}
                            </ul>
                        </div>

                     
                        <div className="text-xs text-white/50">

                            <TimestampConverter timestamp={workoutPlans.createdAt} />
                        </div>
                        
                    </div>

                    <DeleteWorkout workoutId={workoutPlans.workoutId} />
            
            </div>
        </div>
    )
}

export default Workout