import {useState,useEffect} from "react"
import {useAuth} from "../../context/auth"
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../component/Spinner"

export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const [auth]=useAuth();

    useEffect(()=>{
       
       const authCheck= async ()=>{
        const res=await axios.get("http://localhost:5000/auth/user-auth",{
             headers:{
                authorization:auth?.token
             }
        }
        )
        if(res.data.ok){
            setOk(true)
        }else{
            setOk(false)
        }
       }

       if(auth?.token){
        authCheck()
       }

    },[auth?.token])

    return ok? <Outlet/> :<Spinner />
}