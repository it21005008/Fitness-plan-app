import React from 'react';
import Suggestion from '../Suggestion/Suggestion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SideBar() {
    const navigate = useNavigate(); // Define navigate function

    return (
        <div className='fixed top-12 h-full bg-blue-200 w-96 border-r border-green-300'>
            <div className='p-3 flex flex-col justify-between h-full'>
                <div className='mt-5 space-y-3'>
                    <div className='space-y-5 py-5 border-l-2 pl-4 border-gray-400'>
                        <div>
                            <button className='flex items-center gap-2 font-semibold text-sm text-blue-900' onClick={() => navigate('/')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    Home
                                </div>
                            </button>
                        </div>

                        <div>
                            <button className='flex items-center gap-2 font-semibold text-sm text-blue-900' onClick={() => navigate('/mealplans')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    Meal Plans
                                </div>
                            </button>
                        </div>

                        <div>
                            <button className='flex items-center gap-2 font-semibold text-sm text-blue-900' onClick={() => navigate('/workoutplans')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
                                    </svg>
                                </div>
                                <div>
                                    Workout Plans
                                </div>
                            </button>
                        </div>

                        <div>
                            <button className='flex items-center gap-2 font-semibold text-sm text-blue-900' onClick={() => navigate('/workoutstatus')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
                                    </svg>
                                </div>
                                <div>
                                    Workout Status
                                </div>
                            </button>
                        </div>

                    </div>
                    <div className='border-t pt-3 border-gray-700'>
                        <div className='flex items-center justify-between'>
                            <div className='text-xs font-semibold text-blue-900'>
                                Suggested for you
                            </div>
                            <div>
                                <button className='text-xs font-semibold text-green-600'>
                                    See All
                                </button>
                            </div>
                        </div>
                        <div className='mt-3 space-y-2'>
                            <Suggestion />
                            <Suggestion />
                            <Suggestion />
                            <Suggestion />
                            <Suggestion />

                        </div>
                    </div>
                </div>

                <div className='mb-12 text-xs text-white/60'>
                    © FitFlex 2024 | All rights reserved
                </div>
            </div>
        </div>
    );
}

export default SideBar;




