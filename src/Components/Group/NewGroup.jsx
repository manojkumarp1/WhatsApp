import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs';


function NewGroup({handleNewGroup}) {
   
    const [isImageUploading,setImageUploading]=useState(false);
    const [groupName,setGroupName]=useState()
    
    return (
        <div className='w-full h-full'>

            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft onClick={handleNewGroup} className="cursor-pointer text-2xl font-bold" />
                <p className='text-xl font-semibold'>New group</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput" className="realtive">
                    <img className="rounded-full h-25 w-25" src="https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_640.jpg" alt=""/>
                    {isImageUploading && <CircularProgress className="absolute top-[5rem] left-[6rem]"/>}
                </label>
                <input
                type="file"
                id="imgInput"
                className="hidden"
                onChange={()=>
                console.log("image Changed")}
                
                />
            </div>
            <div className="w-full flex justify-between items-center py-2 px-5">
                    <input type="text" className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent" onChange={(e)=>setGroupName(e.target.value)} 
                    placeholder="Group Subject"
                    value={groupName}
                    />
            </div>
            {groupName && <div className="py-10 bg-slate-200 flex items-center justify-center">
                <Button ><div className="bg-[#0c977d] rounded-full p-4">
                    <BsCheck2 className="text-white font-bold text-3xl"/>

                </div>
                </Button>
                </div>}
        </div>
    );
}

export default NewGroup;