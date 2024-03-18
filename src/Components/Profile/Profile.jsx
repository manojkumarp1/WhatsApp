import React, { useState } from 'react';
import { BsArrowLeft, BsPencil, BsCheck2 } from 'react-icons/bs';

function Profile({ handleCloseOpenProfile }) {
    const [username, setUsername] = useState(null);
    const [flag, setFlag] = useState(false);

    const handleFlag = () => {
        setFlag(true);
    };

    const handleCheck = () => {
        setFlag(false);
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className="w-full h-full">
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor-pointer text-2xl font-bold" onClick={handleCloseOpenProfile} />
                <p className="cursor-pointer font-semibold">Profile</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput" className="cursor-pointer">
                    <img className="rounded-full w-[15vw] h-[15vw]" src="https://cdn.pixabay.com/photo/2024/03/05/20/48/church-8615302_640.jpg" alt="" />
                </label>
                <input type="file" id="imgInput" className="hidden" />
            </div>
            <div className="bg-white px-3">
                <p className="py-3">Your Name</p>
                {!flag && (
                    <div className="w-full flex justify-between items-center">
                        <p className="py-3">{username || 'username'}</p>
                        <BsPencil onClick={handleFlag} className="cursor-pointer" />
                    </div>
                )}
                {flag && (
                    <div className="w-full flex justify-between items-center">
                        <input onChange={handleChange} className="w-[80%] outline-none border-b-2" type="text" placeholder="Enter your Name" />
                        <BsCheck2 onClick={handleCheck} className="cursor-pointer text-3xl" />
                    </div>
                )}
            </div>
            <div className="px-3 my-5">
                <p className="py-10">This is not your username, this name will be visible to your WhatsApp contacts.</p>
            </div>
        </div>
    );
}

export default Profile;
