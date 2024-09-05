import React from 'react'
import { useSelector } from 'react-redux';
import AllTodos from '../components/AllTodos';

function Home() {

 const authStatus = useSelector(state=>state.auth.status)

  return (
    <div>
      {
        authStatus ? <AllTodos/> : <div>Please Login to see Todos</div>
      }
    </div>
  )
}

export default Home
