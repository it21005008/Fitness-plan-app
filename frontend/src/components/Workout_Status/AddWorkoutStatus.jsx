import React, { useState } from 'react';
import Logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';
import { createWorkoutStatus } from '../../services/WorkoutStatus';

function AddWorkoutStatus() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    startdate: '',
    enddate: '',
    status: '',
    distancerunperday: '',
    pushupscount: '',
    oldweight: '',
    newweight: '',
    description: '',
  });

  const openModel = () => {
    document.querySelector('#addWorkoutStatusModel').classList.remove('hidden');
  };

  const closeModel = () => {
    document.querySelector('#addWorkoutStatusModel').classList.add('hidden');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createWorkoutStatus(input);
    closeModel();
    navigate(`/workoutstatus/${response.statusId}`);
    console.log('Successfully created workout status');
  };

  return (
    <div>
      <div className='flex justify-end mt-3'>
        <button className='bg-indigo-600 p-0.5 rounded-full' title='Add Meal Plan' onClick={openModel}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-7 h-7'>
            <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
          </svg>
        </button>
      </div>

      <div id='addWorkoutStatusModel' className='fixed z-50 top-0 left-0 bottom-0 right-0 bg-black/80 flex items-center justify-center hidden'>
        <div className='max-w-xl w-full bg-slate-700 p-5 rounded-lg shadow-md'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <div>
                <img src={Logo} className='w-5 h-5 mr-2' alt='' />
              </div>
              <div className='text-sm text-white font-semibold'>Add Workout Status</div>
              <div className='text-xs text-white/40'> / FitFlex</div>
            </div>

            <div>
              <button onClick={closeModel}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-5 h-5 hover:text-red-500'>
                  <path fillRule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z' clipRule='evenodd' />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mt-5 grid grid-cols-2 gap-2'>
              <div>
                <label htmlFor="startdate">Start Date</label>
                <input type='date' id="startdate" name="startdate" value={input.startdate} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </div>
              <div>
                <label htmlFor="enddate">End Date</label>
                <input type='date' id="enddate" name="enddate" value={input.enddate} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label htmlFor="status">Status</label>
                <input type='text' id="status" name="status" value={input.status} onChange={handleInputChange} placeholder="Status" />
              </div>
              <div>
                <label htmlFor="distancerunperday">Distance Run Per Day</label>
                <input type='text' id="distancerunperday" name="distancerunperday" value={input.distancerunperday} onChange={handleInputChange} placeholder="Distance Run Per Day" />
              </div>
            </div>
            <div className='grid grid-cols-3 gap-3'>
              <div>
                <label htmlFor="pushupscount">Pushups Count</label>
                <input type='text' id="pushupscount" name="pushupscount" value={input.pushupscount} onChange={handleInputChange} placeholder="Pushups Count" />
              </div>
              <div>
                <label htmlFor="oldweight">Old Weight</label>
                <input type='text' id="oldweight" name="oldweight" value={input.oldweight} onChange={handleInputChange} placeholder="Old Weight" />
              </div>
              <div>
                <label htmlFor="newweight">New Weight</label>
                <input type='text' id="newweight" name="newweight" value={input.newweight} onChange={handleInputChange} placeholder="New Weight" />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" value={input.description} onChange={handleInputChange} placeholder="Description" />
            </div>
            <button type="submit" className="w-full p-1.5 text-sm bg-blue-600 rounded-lg text-white font-semibold mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWorkoutStatus;
