import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'


export default function Protected({children , authentication= true}) {
  const navigate = useNavigate()
  const[load,setload] = useState(true)
  const authStatus = useSelector(state=>state.auth.status)

  useEffect(()=>{
    if(authentication && authStatus !== authentication){
        navigate("/login")
    }else if(!authentication && authStatus !== authentication){
        navigate("/")
    }
    setload(false)
  },[authStatus,navigate,authentication])

  return load ?<h1>Loading..</h1>:<>{children}</> 
    
  
}
