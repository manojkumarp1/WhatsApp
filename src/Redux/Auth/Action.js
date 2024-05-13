import { BASE_API_URL } from "../config/api";
import { LOGIN, REGISTER, SEARCH_USER,UPDATE_USER,REQ_USER,LOGOUT_USER } from "./ActionType";


export const register=(data)=>async(dispatch)=>
{
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(data)
        })
        const resData=await res.json();
        console.log(resData)
        
        dispatch({type:REGISTER,payload:resData});
    }
    catch(error){
        console.log("catch error :",error);

    }
}

export const login=(data)=>async(dispatch)=>
{
    try{
        const res = await fetch(`${BASE_API_URL}/auth/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify(data)
        })
        const resData=await res.json();

        if(resData.token) 
        {
            localStorage.setItem("token",resData.token)
        }

        console.log("login",resData);
        dispatch({type:LOGIN,payload:resData});
    }
    catch(error){

        console.log("catch error :",error);

    }
}

export const currentUser=(data)=>async(dispatch)=>
{
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/profile`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data}`

            },
            
        })
        const resData=await res.json();
        console.log("currentUser",resData);
        dispatch({type:REQ_USER,payload:resData});
    }
    catch(error){
        console.log("catch error :",error);

    }
}

export const searchUser=(data)=>async(dispatch)=>
{
    console.log("search",data)
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/search?name=${data.keyword}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${data.token}`

            },
            
        })
        const resData=await res.json();
        console.log("search",resData);
        dispatch({type:SEARCH_USER,payload:resData});
    }
    catch(error){
        console.log("catch error :",error);

    }
}

export const updateUser=(data)=>async(dispatch)=>
{
    console.log(data.data)
    try{
        const res = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${data.token}`

            },
            body:JSON.stringify(data.data)
        })
        const resData=await res.json();
        console.log("register",resData);
        dispatch({type:UPDATE_USER,payload:resData});
    }
    catch(error){
        console.log("catch error :",error);

    }
}

export const logoutAction=()=>async(dispatch)=>
{
    localStorage.removeItem("token");
    dispatch({type:LOGOUT_USER,payload:null});
    dispatch({type:REQ_USER,payload:null})
}