import { useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header'
// import Signup from './components/Signup'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
// import Login from './components/Login'

function App() {

  
  const [error,setError] = useState(false)

  const dispatch = useDispatch()
  
  useEffect(()=>{
     if(JSON.parse(localStorage.getItem("accessToken"))){
      axios.get('http://localhost:8000/api/v1/users/get-user',{
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
        }
      })
     .then(response=>{
      setError(false)
       const userData = response.data.data
       if(userData){
         dispatch(login(userData))
       }
       else{
        dispatch(logout())
       }
     })
     .catch(()=>{
        setError(true)
     })
     }
     
  },[])


  const handlerefreshToken = async() =>{
    await axios.post('http://localhost:8000/api/v1/users/refresh-token','',{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('refreshToken'))}`
      }
    })
    .then(reponse=>{
      console.log("baqar")
       setError(false)
       localStorage.setItem("accessToken",JSON.stringify(reponse.data.data.accessToken))
    })
  }

  return (
         <>
        <Header/>
        
        {error ? <button onClick={handlerefreshToken} className=' text-white mt-4 ml-4 rounded-2xl font-serif text-2xl text-center bg-red-500 w-auto '>Token Expired</button>:
        <Outlet/>
        }
      </>
      
    
  )
}

export default App
