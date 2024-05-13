import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsPencil, BsCheck2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, updateUser } from '../../Redux/Auth/Action';

function Profile({ handleCloseOpenProfile }) {
    const [username, setUsername] = useState(null);
    const [flag, setFlag] = useState(false)
    const {auth} = useSelector(store=>store);
    const [tempPicture,setTempPicture]=useState(null);
    const dispatch = useDispatch();

    const token =localStorage.getItem("token")

    const handleFlag = () => {
        setFlag(true);
    };

    const handleCheck = () => {
        setFlag(false);
        const data={
            id:auth.requser.id,
            token:localStorage.getItem("token"),
            data:{fullName:username}
        }
        
            dispatch(updateUser(data)).then(()=>
            dispatch(currentUser(token)))
            console.log(auth.requser,"m")
            
        
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };
    const uploadToCloudinary=(pics)=>
    {
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
            setTempPicture(data.secure_url)
            console.log("img url",data.secure_url);
            console.log(auth.requser)
            const dataa={
                id:auth.requser.id,
                token:localStorage.getItem("token"),
                data:{profilePicture:data.secure_url}
            }
            dispatch(updateUser(dataa)).then(()=> dispatch(currentUser(token)))

               
                console.log(auth.requser,"m")
            
        })
    

    }

    const handleUpdateName=(e)=>
    {
        
       
    }
    

    return (
        <div className="w-full h-full">
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor-pointer text-2xl font-bold" onClick={handleCloseOpenProfile} />
                <p className="cursor-pointer font-semibold">Profile</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput" className="cursor-pointer">
                    <img className="rounded-full w-[15vw] h-[15vw]" src={auth.requser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                </label>
                <input  type="file" id="imgInput" className="hidden"
                
                onChange={(e)=>uploadToCloudinary(e.target.files[0])}/>
            </div>
            <div className="bg-white px-3">
                <p className="py-3">Your Name</p>
                {!flag && (
                    <div className="w-full flex justify-between items-center">
                        <p className="py-3">{auth.requser?.fullName || username || 'username'}</p>
                        <BsPencil onClick={handleFlag} className="cursor-pointer" />
                    </div>
                )}
                {flag && (
                    <div className="w-full flex justify-between items-center">
                        <input onKeyPress={e=>handleUpdateName(e)} onChange={handleChange} className="w-[80%] outline-none border-b-2" type="text" placeholder="Enter your Name" />
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
