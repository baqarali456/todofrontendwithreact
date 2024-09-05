import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllTodos from './components/AllTodos.jsx'
import Home from './pages/Home.jsx'
import SubTodos from './components/SubTodos.jsx'
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"all-todos",
        element:<AllTodos/>
      },
      {
        path:"subTodo/:todoId",
        element:<SubTodos/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </StrictMode>,
)
