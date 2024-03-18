import React from 'react';
import { useNavigate } from 'react-router-dom';

function StatusUserCard() {
    const navigate=useNavigate()
    const handleNavigate=()=>
    {
        navigate(`/status/{userId}`)
    }
    return (
        <div onClick={handleNavigate} className="flex items-cente p-3 cursor-pointer">
            <div>
                <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/08/11/04/51/fireworks-8182800_640.jpg" alt=""/>
            </div>
            <div className="ml-2 text-white ">
                <p>manoj kumar</p>
            </div>
        </div>
    );
}

export default StatusUserCard;