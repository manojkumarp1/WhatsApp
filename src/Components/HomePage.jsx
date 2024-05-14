import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiSmile, BsFilter, BsMic, BsThreeDotsVertical } from "react-icons/bs";
import ChatCard from './CharCard/ChatCard';
import React, { useEffect, useRef, useState } from 'react';
import { ImAttachment } from "react-icons/im";
import "./HomePage.css";
import whatsapp from '../images/whatsapp.png';
import MessageCard from "./MessageCard/MessageCard";
import Profile from "./Profile/Profile";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessage } from "../Redux/Message/Action";
import SockJS from "sockjs-client";
import { over } from "stompjs";

function HomePage() {
    const [querys, setQuerys] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [content, setContent] = useState("");
    const [isProfile, setIsProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isGroup, setIsGroup] = useState(false);
    const dispatch = useDispatch();
    const { auth,chat,message } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [connected,setConnected] = useState();

    const [stompClient,setStompCLient]=useState();
    const [messages,setMessages]=useState([])

    const connect=()=>
    {
        const sock = new SockJS("http://localhost:8080/ws")
        const temp=over(sock)
        setStompCLient(temp);
        console.log(`Bearer ${token}`)
        console.log("mango")
        const headers={
            Authorization: `Bearer ${token}`
          }
        temp.connect(headers,onConnect,onError);
    }
    const onError=(error)=>
    {
        setConnected(true)
        console.log("error",error)
    }
    const onConnect=()=>
    {
        setConnected(true)
        console.log("connected")
    }

    const getCookie=(name)=>
    {
        const value=`${document.cookie}`
        console.log(value,"val ")
        const parts=value.split(`; ${name}=`)
        if(parts.length===2)
        {
            return parts.pop().split(";").shift();
        }
    }

    useEffect(()=>
    {
        if(message.newMessage && stompClient)
        {
            setMessages([...messages,message.newMessage])
            console.log("manSim",message.newMessage)
            stompClient?.send("/app/message",{},JSON.stringify(message.newMessage))
            console.log("message sent")
        }

    },[message.newMessage])

    const onMessageRecieve=(payload)=>
    {
        console.log("recieve message",JSON.parse(payload.body));
        const recievedMessage=JSON.parse(payload.body);
        

        setMessages([...messages,recievedMessage])
        dispatch(getAllMessage({chatId:currentChat.id,token}))
        console.log([...messages,recievedMessage])

    }
    useEffect(()=>
    {

        if(connected && stompClient && auth.requser && currentChat)
        {
            console.log("id ",currentChat.id.toString())
            const subscription = stompClient.subscribe("/group/"+currentChat.id.toString(),onMessageRecieve)
            console.log("success")
            return ()=>
            {
                subscription.unsubscribe();
            }

        }
    })

    useEffect(()=>
    {
        connect();
    },[])
    useEffect(()=>
    {
        setMessages(message.messages)

    },[message.messages])

    // Ref for scrolling to bottom of messages
const messagesEndRef = useRef(null);

useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
}, [messages]);



    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleClick = (e) => {
        
        setAnchorEl(e.currentTarget);
    };

    

    

    const handleSearch = (keyword) => {
        dispatch(searchUser({ keyword, token }));
    };

    const handleClickOnChatcard = (userId) => {
        dispatch(createChat({ token, data: { userId } }));
       
        setQuerys("")

    };

    const handleNavigate = () => {
        setIsProfile(true);
    };

    const handleCloseOpenProfile = () => {
        setIsProfile(false);
    };

    const handleCreateGroup = () => {
        setIsGroup(true);
    };

    const handleCreateGroupFalse = () => {
        setIsGroup(false);
    };
    const handleCreateNewMessage = (e)=>
    {
        dispatch(createMessage({token,data:{chatId:currentChat.id,content:content}}))

    }

    const handleCurrentChat=(item)=>
    {
        console.log(item.id,"f");
        setCurrentChat(item);
    }

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate("/signin");
    };
    
    useEffect(() => {
        if (token) {
            dispatch(currentUser(token));
        }
    }, [token, dispatch]);
    
    useEffect(()=>
    {
        dispatch(getUsersChat({token}))
        console.log("mao cha",chat)
    },[chat.createdChat,chat.createdGroup])
    useEffect(()=>
    {
        console.log("currentCHa ",currentChat)
        if(currentChat?.id)
        dispatch(getAllMessage({chatId:currentChat.id,token}))
    },[currentChat,message.newMessage])
    

    useEffect(() => {
        if (!auth.requser) {
            navigate("/signin");
        }
    }, [auth.requser, navigate]);

    return (
        <div className="relative bg-slate-400">
            <div className="py-14 bg-[#00a884] w-full"></div>
            <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-6 left-4 w-full">
                <div className="left w-[25%] bg-[#e8e9ec] h-full">
                    {isGroup && <CreateGroup setIsGroup={setIsGroup} handleCreateGroupFalse={handleCreateGroupFalse} />}
                    {isProfile && <div className="w-full h-full"> <Profile handleCloseOpenProfile={handleCloseOpenProfile} /> </div>}
                    {!isProfile && !isGroup && (
                        <div className="w-full">
                            <div className="flex justify-between items-center p-3">
                                <div onClick={handleNavigate} className="flex items-center space-x-3">
                                    <img className="rounded-full w-10 h-10 cursor-pointer" src={auth.requser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                    <p>{auth.requser?.fullName}</p>
                                </div>
                                <div className="space-x-3 text-2xl flex">
                                    <TbCircleDashed className="cursor-pointer" onClick={() => navigate("/status")} />
                                    <BiCommentDetail />
                                    <div>
                                        <BsThreeDotsVertical
                                            className="cursor-pointer"
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        />
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
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center items-center bg-white py-4 px-3">
                                <input
                                    className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                                    type="text"
                                    placeholder="Search or start a chart"
                                    onChange={(e) => {
                                        setQuerys(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                    value={querys}
                                />
                                <AiOutlineSearch className="left-5 top-7 absolute" />
                                <div>
                                    <BsFilter className="ml-4 text-3xl" />
                                </div>
                            </div>
                            <div className="bg-white overflow-y-scroll h-[70vh] px-3">
                                {querys && auth.searchuser?.map((item) => (
                                    <div key={item.id} onClick={() => handleClickOnChatcard(item.id)}>
                                        <hr />
                                        
                                        <ChatCard 
                                        name={item.fullName}
                                        userImg={
                                            item.profilePicture ||
                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                        } />
                                    </div>
                                ))}

                                {chat.chats && chat.chats.length>0 && !querys && chat.chats?.map((item) => 
                                
                                    
                                
                                    (
                                    <div key={item.id} onClick={() => handleCurrentChat(item)}>
                                        <hr />
                                        {
                                           
                                        item.group?(
                                        <ChatCard 
                                        name={item.chatName}
                                        userImg={
                                            item.chatImage ||
                                            
                                            "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
                                        } />
                            
                                        ):(
                                            <ChatCard
                                                isChat={true}
                                                chatId={item.id }
                                                
                                                name={
                                                   
                                                    auth.requser?.id!==item?.users[0].id?
                                                    item.users[0].fullName
                                                    :item.users[1].fullName
                                                }
                                                userImg={
                                                    auth.requser.id!==item.users[0].id?
                                                    item.users[0].profilePicture || 
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                                    : item.users[1].profilePicture || 
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                                }
                                            />

                                        
                                        
                                        )}
                                       
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                                <img className="w-10 h-10 rounded-full" src={currentChat.group?currentChat.chatImage || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png" : (auth.requser.id!==currentChat.users[0].id?
                                                    currentChat.users[0].profilePicture || 
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                                    : currentChat.users[1].profilePicture || 
                                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")} alt="" />
                                <p>
                                    {currentChat.group? currentChat.chatName : (auth.requser?.id===currentChat?.users[0].id?currentChat?.users[1].fullName:currentChat.users[0].fullName)}
                                </p>
                            </div>
                            <div className='py-3 flex space-x-4 items-center'>
                                <AiOutlineSearch/>
                                <BsThreeDotsVertical />
                            </div>

                           
                         </div>
                    </div>

                    <div className="px-10 h-[81vh] overflow-y-scroll bg-blue-200" ref={messagesEndRef}>
                        <div className="space-y-1 flex flex-col justify-center  mt-20 py-2">
                            {message.messages && message.messages.length>0 && message.messages?.map((item,i) => <MessageCard group={currentChat.group} userName={item.user.fullName} profilePicture={item.user.profilePicture}isReqUserMessage={item.user.id!==auth.requser.id} content={item.content}/>)}
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

