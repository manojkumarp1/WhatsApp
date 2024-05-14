import React from 'react';

function MessageCard({ isReqUserMessage, content, userName, profilePicture,group }) {
    return (
        <div className={`flex items-center ${!isReqUserMessage ? 'flex-row-reverse' : 'flex-row'}`}>
            {group && isReqUserMessage && <img src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt={userName} className="w-8 h-8 rounded-full mr-2" />}
            <div className={`py-2 px-3 rounded-md max-w-[70%] ${isReqUserMessage ? 'bg-white' : 'bg-[#d9fdd3]'}`}>
                {group && isReqUserMessage && <p className="text-xs text-red-500 mb-1 font-semibold">{"~"+userName}</p>}
                <p>{content}</p>
            </div>
        </div>
    );
}

export default MessageCard;
