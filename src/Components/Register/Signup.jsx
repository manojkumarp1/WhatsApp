import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/Auth/Action';

function Signup() {
    const [inputData,setInputData]=useState({fullName:"",email:"",password:""});
    const [openSnack,setOpenSnack]=useState(false);
    const {auth} = useSelector(store=>store)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log("handle submit",inputData)
        dispatch(register(inputData))
        setOpenSnack(true);
        
       
    }
    const handleSnack=()=>
    {
        setOpenSnack(false);
        navigate("/signin")
    }

    const handleChange=(e)=>
    {
        const {name,value}=e.target;
       
        setInputData((values)=>({...values,[name]:value}));
       
    }
    
    return (
        <div>
            <div className='flex justify-center h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>
                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <div>
                                <p className='mb-2'>UserName</p>
                                <input placeholder="Enter username" 
                                onChange={handleChange} 
                                value={inputData.fullName}
                                type="text" 
                                name="fullName"
                                className="py-2 outline outline-green-600 w-full rounded-md border"/>
                            </div>
                            <div>
                                <p className='mb-2'>Email</p>
                                <input placeholder="Enter your Email" 
                                onChange={handleChange} 
                                value={inputData.email}
                                type="text" 
                                name="email"
                                className="py-2 outline outline-green-600 w-full rounded-md border"/>
                            </div>

                            <div>
                                <p className='mb-2'>Password</p>
                                <input placeholder="Enter your Password" 
                                onChange={handleChange} 
                                value={inputData.password}
                                type="text" 
                                name="password"
                                className="py-2 outline outline-green-600 w-full rounded-md border"/>
                            </div>
                            <div>
                                <Button type="submit" sx={{bgcolor:"Green",padding:".5rem 0rem"}} className="w-full bg-green-600" variant='contained'>sign up</Button>
                            </div>

                            
                        </form>
                        <div className='flex space-x-3 items-center mt-5'>
                                <p className="m-0">Already have an account</p>
                                <Button variant="text" onClick={()=>navigate("/signin")}>sign in</Button>
                            </div>
                </div>
            </div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
                <Alert
                    onClose={handleSnack}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Account created Succesfully
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Signup;