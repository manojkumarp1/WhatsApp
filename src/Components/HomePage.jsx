
import {TbCircleDashed} from "react-icons/tb";
import {BiCommentDetail} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";
import {BsEmojiSmile,BsFilter, BsMic, BsThreeDotsVertical} from "react-icons/bs";
import ChatCard from './CharCard/ChatCard';
import React, { useState } from 'react';
import {ImAttachment} from "react-icons/im";
import "./HomePage.css"
import whatsapp from '../images/whatsapp.png';
import MessageCard from "./MessageCard/MessageCard";
import Profile from "./Profile/Profile";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import CreateGroup from "./Group/CreateGroup";



function HomePage() {
    const [querys,setQuerys]=useState(null);
    const [currentChat,setCurrentChat]=useState(null)
    const [content,setContent] =useState("");
    const [isProfile,setIsProfile]=useState(false)
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isGroup,setIsGroup]=useState(false)

    
    const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
      };
      
    const handleSearch=()=>
    {

    }
    const handleClickOnChatcard=()=>
    {
        setCurrentChat(true)
    }
    const handleCreateNewMessage=()=>
    {

    }
    const handleNavigate=()=>
    {
        setIsProfile(true)
        
    }
    const handleCloseOpenProfile=()=>
    {
        setIsProfile(false)
    }
    const handleCreateGroup=()=>
    {
        setIsGroup(true)
    }
    const handleCreateGroupFalse=()=>
    {
        setIsGroup(false)
    }
    return (
        <div classname="relative bg-slate-400" >
            <div className='py-14 bg-[#00a884] w-full'></div>
            <div className='flex bg-[#f0f2f5] h-[90vh] absolute top-6 left-4 w-full'>
                <div className='left w-[25%] bg-[#e8e9ec] h-full'>
                {isGroup && <CreateGroup  handleCreateGroupFalse={handleCreateGroupFalse}/>}
                {isProfile && <div className="w-full h-full">  <Profile handleCloseOpenProfile={handleCloseOpenProfile} /> </div>}
                    {!isProfile && !isGroup && <div className="w-full">
                        
                     <div className='flex justify-between items-center p-3' >
                        <div onClick={handleNavigate} className="flex items-center space-x-3">
                            <img  
                            className='rounded-full w-10 h-10 cursor-pointer' 
                            src="https://cdn.pixabay.com/photo/2024/03/05/20/48/church-8615302_640.jpg" 
                            alt="" 
                            />
                            <p>username</p>
                        </div>
                        <div className="space-x-3 text-2xl flex">
                            <TbCircleDashed className="cursor-pointer" onClick={()=>navigate("/status")} />
                            <BiCommentDetail/>
                            <div>
        
                                <BsThreeDotsVertical 
                                className="cursor-pointer"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}/>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleCreateGroup}>Create group</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                            </div>

                        </div>
                    </div>
                    <div className="relative flex justify-center items-center bg-white py-4 px-3">
                        <input className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                        type="text" 
                        placeholder='Search or start a chart'
                        onChange={(e)=>
                            {
                                setQuerys(e.target.value)
                                handleSearch(e.target.value)
                            }
                        }
                        value={querys}
                        />
                        <AiOutlineSearch className="left-5 top-7 absolute"/>
                        <div>
                            <BsFilter className="ml-4 text-3xl"/>
                        </div>

                    </div>
                    <div className='bg-white overflow-y-scroll h-[70vh] px-3'>
                        <div onClick={handleClickOnChatcard}>
                            {querys && [1,1,1,1,1,1,1,1,1].map((item)=><div><hr /><ChatCard/></div>)}
                        </div>
                    </div>
                    
                </div>}
                </div>
                {!currentChat && <div className="right">
                        <div className="w-[100%] flex flex-col items-center justify-center h-full">
                            <div className='max-w-[90%] text-center'>
                                <img  className="" src={whatsapp} alt="" />    
                            </div>
                        </div>
                </div>}
                {/* message part */}
                {currentChat && <div className='w-[73%] relative' >
                    <div className="header absolute top-0 w-full bg-[#f0f2f5]">
                        <div class="flex justify-between">
                            <div className='py-3 space-x-4 flex items-center px-3'>
                                <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2023/03/20/20/35/sunset-7865844_640.jpg" alt="" />
                                <p>
                                    username
                                </p>
                            </div>
                            <div className='py-3 flex space-x-4 items-center'>
                                <AiOutlineSearch/>
                                <BsThreeDotsVertical />
                            </div>

                           
                         </div>
                    </div>

                    <div className="px-10 h-[90vh] overflow-y-scroll bg-blue-200">
                        <div className="space-y-1 flex flex-col justify-center  mt-20 py-2">
                            {[1,1,1,1,1,1].map((item,i) => <MessageCard isReqUserMessage={i%2===0} content={"message"}/>)}
                        </div>
                        
                    </div>
                    <div className="footer bg-[a#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
                        <div className="flex justify-between items-center px-5 relative">
                        
                            <BsEmojiSmile className="cursor-pointer"/>
                            <ImAttachment />
                        

                        <input className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[90%] "
                        type="text" 
                        onChange={(e)=>setContent(e.target.value)} 
                        placeholder="Type message"
                        value={content}
                        onKeyPress={(e)=>
                        {
                            if(e.key==="Enter")
                            {
                                handleCreateNewMessage()
                                setContent("")
                            }
                        }}

                        />
                        <BsMic />
                    </div>
                </div>
                </div>}
            </div>
        </div>
    );
}

export default HomePage;

