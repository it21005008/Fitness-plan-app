import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {UpdateWorkoutStatus} from '../../services/WorkoutStatus'
import DeleteWorkoutStatusComponent from './DeleteWorkoutStatus';

function WorkoutStatus(workoutStatus) {
  const navigate = useNavigate(); // Define navigate function

  const handleEdit = (workoutStatusId) => {
    const divs = document.querySelectorAll('.updatefield');

    divs.forEach((div) => {
      div.contentEditable = true;
      div.classList.add('px-3', 'py-1', 'border', 'border-slate-700', 'rounded-xl', 'w-fit', 'bg-slate-900', 'mt-2');
    });

    //remove readonly on startdate and enddate
    document.getElementById('startdate').removeAttribute('readonly');
    document.getElementById('enddate').removeAttribute('readonly');

     //hide editBtn
     document.querySelector('#editBtn').classList.add('hidden');
     //unhide updateBtn
     document.querySelector('#updateBtn').classList.remove('hidden');

  };

  const handleUpdate = (workoutStatusId) => {
    const divs = document.querySelectorAll('.updatefield');

    let filled = true;
    divs.forEach((div) => {
      if (div.textContent.trim() === '') {
        filled = false;
      }
    });

    if (!filled) {
      setError('Please fill out all required fields');
    }else {
      divs.forEach((div) => {
        div.contentEditable = false;
        div.classList.remove(
          'px-3',
          'py-1',
          'border',
          'border-slate-700',
          'rounded-xl',
          'w-fit',
          'bg-slate-900',
          'mt-2'
        );
      });

      //hide editBtn
     document.querySelector('#editBtn').classList.remove('hidden');
     //unhide updateBtn
     document.querySelector('#updateBtn').classList.add('hidden');

     const updatedWorkoutStatus = {
        StatusId: workoutStatusId,
        startdate: startdate,
        enddate: enddate,
        status: status,
        distancerunperday: distancerunperday,
        pushupscount: pushupscount,
        oldweight: oldweight,
        newweight: newweight,
        description: description
      };

      try {
        const response = UpdateWorkoutStatus(updatedWorkoutStatus);
        console.log(response);

        //unhide editBtn
        document.querySelector('#editBtn').classList.remove('hidden');
        //hide updateBtn
        document.querySelector('#updateBtn').classList.add('hidden');
      } catch (error) {
        console.error(error);
      }

      
    }
  }
  

  const handleDeleteModel = (workoutStatusId) => {
    //navigate(`/workout-status/delete/${workoutStatusId}`);
    document.getElementById('delete-workout-status' + workoutStatusId).classList.remove('hidden');
  };

  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [status, setStatus] = useState('');
  const [distancerunperday, setDistancerunperday] = useState('');
  const [pushupscount, setPushupscount] = useState('');
  const [oldweight, setOldweight] = useState('');
  const [newweight, setNewweight] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStartdate(workoutStatus.startdate);
    setEnddate(workoutStatus.enddate);
    setStatus(workoutStatus.status);
    setDistancerunperday(workoutStatus.distancerunperday);
    setPushupscount(workoutStatus.pushupscount);
    setOldweight(workoutStatus.oldweight);
    setNewweight(workoutStatus.newweight);
    setDescription(workoutStatus.description);
  }, [workoutStatus]);

  return (
    <div>
      <div className="space-y-1 mt-3">
        <div className="bg-slate-800 p-5 rounded-xl space-y-3" >
          <div className='flex justify-between items-center'>
            <div>
              <h2 id='error' className='text-red-400 text-xs mb-2'>{error}</h2>
              <div className='flex items-center gap-2'>
                <h1 id='description' className="text-lg font-semibold updatefield" onInput={(e) => setDescription(e.target.innerText)}>{workoutStatus.description}</h1>
                <h3> : </h3>
                <h1 className='text-white/60' id="statusId">{workoutStatus.statusId}</h1>

                <div style={{ display: workoutStatus.otherControl == 0 ? 'block' : 'none' }}>
                  <button onClick={() => navigate(`/workoutstatus/${workoutStatus.statusId}`)} className="text-blue-500 hover:text-slate-300 mt-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                          <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                      </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div style={{ display: workoutStatus.otherControl == 1 ? 'block' : 'none' }}>
                  <button id='editBtn' className='bg-black/40 p-2 rounded-full'  onClick={() => handleEdit(workoutStatus.statusId)} title={'Edit ' + workoutStatus.description}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </svg>
                  </button>
              </div>

              <button id='updateBtn' className='bg-black/40 p-2 rounded-full text-green-500 hidden' onClick={() => handleUpdate(workoutStatus.statusId)} title={'Save ' + workoutStatus.description}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
              </button>

              <button className='bg-black/40 p-2 rounded-full text-red-500' onClick={() => handleDeleteModel(workoutStatus.statusId)} title={'Delete ' + workoutStatus.description}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                  </svg>
              </button>
            </div>

          </div>

          <div className='flex items-center gap-5'>
            <div>
              <div className="text-xs text-white/60">Start date</div>
              <div>
                
                <div className='updatefield' onInput={(e) => setStartdate(e.target.innerText)}>
                  {workoutStatus.startdate}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-white/60">End date</div>
              <div>
               
                <div className='updatefield' onInput={(e) => setEnddate(e.target.innerText)}>
                  {workoutStatus.enddate}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">Status</div>
            <div className='updatefield' onInput={(e) => setStatus(e.target.innerText)}>
              {workoutStatus.status}
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">Distancerunperday</div>
            <div className='updatefield' onInput={(e) => setDistancerunperday(e.target.innerText)}>
              {workoutStatus.distancerunperday}
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">Pushupscount</div>
            <div className='updatefield' onInput={(e) => setPushupscount(e.target.innerText)}>
              {workoutStatus.pushupscount}
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">Old weight</div>
            <div className='updatefield' onInput={(e) => setOldweight(e.target.innerText)}>
              {workoutStatus.oldweight}
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">New weight</div>
            <div className='updatefield' onInput={(e) => setNewweight(e.target.innerText)}>
              {workoutStatus.newweight}
            </div>
          </div>
        </div>

        <DeleteWorkoutStatusComponent statusId={workoutStatus.statusId} />
      </div>
    </div>
  )
}

export default WorkoutStatus