import React from 'react';
import { useSelector } from 'react-redux';

function ChatCard({userImg,name,chatId}) {
    const { auth,chat,message } = useSelector(store => store);
    const time=()=>
    {
        console.log(message.messages,"message")
        
        const filter = message.messages && message?.messages[message.messages.length - 1]
        
        console.log(filter?.timestamp)
        const timestamp = filter?.timestamp;
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        

        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return time
    }
   
    return (
        
       
        <div className="flex items-center justify-center py-2 group cursor-pointer">
            <div className='w-[20%]'>
                <img className='h-14 w-14 rounded-full' src={userImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
            </div>
            <div className="pl-5 w-[80%]">
                <div className='flex justify-between items-center'>
                    <p className="text-lg"> {name} </p>
                    <p className="text-sm">{time()}</p> 
                </div>
                <div className="flex justify-between items-center">
                    <p >message....</p>
                    <div className='flex space-x-2 items-center'>
                        <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default ChatCard;