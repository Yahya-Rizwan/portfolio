import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading,setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
     authService.getCurrentUser()
     .then((userdata)=>{
        if(userdata){
          dispatch(login({userdata}))
        }else{
          dispatch(logout())
        }
     })
     .finally(()=>setloading(false))
    
  }, [])

  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-4000'>
      <div className='w-full block'>
        <Header/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
      </div></div>
  ):null
}

export default App
