import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function SelectedMember({handleRemoveMember,member}) {
    return (
        <div className='flex items-center bg-slate-300 rounded-full' >
            <img className="w-7 h-7 rounded-full" src="https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_640.jpg"
            alt="" />
            <p className="px-2">username</p>
            <AiOutlineClose onClick={handleRemoveMember} className="pr-1 cursor-pointer" 
            />
            
        </div>
    );
}

export default SelectedMember;