import { Avatar, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs';
import CreateGroup from './CreateGroup';
import { useDispatch } from 'react-redux';
import { createGroupChat } from '../../Redux/Chat/Action';


function NewGroup({groupMember,setIsGroup,handleNewGroup}) {
 

    const [isImageUploading,setIsImageUploading]=useState(false);
    const [groupName,setGroupName]=useState()
    const [groupImg,setGroupImg]=useState(null)
    const dispatch=useDispatch()
    const token=localStorage.getItem("token")
    const uploadToCloudinary=(pics)=>
    {
        setIsImageUploading(true)
        console.log("dine opic")
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset","whatsapp")
        data.append("cloud_name","dybstlmvp")

        fetch("https://api.cloudinary.com/v1_1/dybstlmvp/image/upload",
        {
            method:"POST",
            body:data
        }
        )
        .then((res)=>res.json())
        .then((data)=>
        {
            setGroupImg(data.secure_url)
            console.log("img url",data.secure_url);
            
           setIsImageUploading(false)
        })
    

    }
    const handleCreateGroup =()=>
    {
        console.log(groupMember)
        let userIds=[];
        for(let user of groupMember)
        {
            userIds.push(user.id)
        }
        const group={
            userIds,
            chatName:groupName,
            chatImage:groupImg
        }
        const data={
            group,
            token 
        }
        dispatch(createGroupChat(data))
        setIsGroup(false)
    }
    
    return (
        <div className='w-full h-full'>

            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft onClick={handleNewGroup} className="cursor-pointer text-2xl font-bold" />
                <p className='text-xl font-semibold'>New group</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput" className="realtive">
                    <Avatar sx={{width:"15rem",height:"15rem"}} alt="group" src={groupImg || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"} />
                    {isImageUploading && <CircularProgress className="absolute top-[5rem] left-[6rem]"/>}
                </label>
                <input
                type="file"
                id="imgInput"
                className="hidden"
                onChange={(e)=>uploadToCloudinary(e.target.files[0])
                }
                
                />
            </div>
            <div className="w-full flex justify-between items-center py-2 px-5">
                    <input type="text" className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent" onChange={(e)=>setGroupName(e.target.value)} 
                    placeholder="Group Subject"
                    value={groupName}
                    />
            </div>
            {groupName && <div className="py-10 bg-slate-200 flex items-center justify-center">

                <Button onClick={handleCreateGroup} ><div className="bg-[#0c977d] rounded-full p-4">
                    <BsCheck2 className="text-white font-bold text-3xl"/>

                </div>
                </Button>
                </div>}
        </div>
    );
}

export default NewGroup;