import { useDispatch } from "react-redux"
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "./Input"
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addTodos, deleteTodos, editTodo, getTodos, updateTodo } from "../../src/store/todoSlice"
import { useNavigate } from "react-router-dom";
import SubTodos from "./SubTodos";






export default function AllTodos() {
    const dispatch = useDispatch();
    const allTodos = useSelector(state => state.todo.todos)
    const todoIndex = useSelector(state => state.todo?.todoIndex)
    const navigate = useNavigate()

    const editTodo = useSelector(state=>state.todo.edit)
    const editSubTodo = useSelector(state=>state.todo.editSubTodo)
    const [todosId,setTodosId] = useState("")

    

    const { register, handleSubmit,setValue } = useForm();

    const getAllTodos = useCallback(() => {
        axios.get('http://localhost:8000/api/v1/todos/getAll-userTodos', {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
            }
        })
            .then(response => {
                console.log('getallTodos', response.data.data)
                dispatch(getTodos(response.data.data))
            })
    }, [dispatch,editTodo,editSubTodo]);

    

    useEffect(() => {
        getAllTodos()
    }, [getAllTodos])


    // Add Todos

    const handleAddTodos = async (data) => {
       if(edit){
          console.log(data.name)
            try {
              let response = await axios.patch(`http://localhost:8000/api/v1/todos/update-todo/${todosId}`,data,{
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                    }
                })
              const name = data.name;
               dispatch(updateTodo({todosId,input:name}))
               dispatch(editTodo({index:undefined,Edit:false}))
            } catch (error) {
                console.log(error) 
            }
       }
       else{  
        try {
            let response = await axios.post('http://localhost:8000/api/v1/todos/add-todo', data, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                }
            })
            dispatch(addTodos({ todo: response.data.data }))
        } catch (error) {
            console.log(error);
        }
       }
    }


    //delete Todos

    const handleDelete = async (todoId) => {
        try {
            let response = await axios.delete(`http://localhost:8000/api/v1/todos/delete-todo/${todoId}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                }
            })
            dispatch(deleteTodos(todoId))
        } catch (error) {
            console.log(error)

        }
    }


    const handleEditTodo = (id) => {
       let index = allTodos.findIndex(todo => todo._id === id)
       
        if(index !== -1){
            dispatch(editTodo({index,Edit:true}))
            console.log(todoIndex)
            
            setTodosId(id)
        }
    }
    
    
    useEffect(()=>{
        setValue('name',allTodos[todoIndex]?.name)
    },[todoIndex])




    return (
        <>
            <div className=" mt-2 gap-3 flex flex-col w-full items-center">
                <form onSubmit={handleSubmit(handleAddTodos)}>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your Todo"
                        {...register('name', {
                            required: true
                        })}
                        className=" w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                        type="submit"
                        className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >{editTodo ? "Update Todo" : "Add Todo"}</button>
                </form>

            </div>
            <div className=" w-full ml-5 mr-5  mt-5 flex flex-row flex-wrap gap-3 ">
                {
                    allTodos.length ? allTodos.map(todo => {
                        return <div
                            onClick={() => navigate(`/subTodo/${todo._id}`)}
                            key={todo._id}
                            className={` bg-white pointer-events-auto w-[21rem] rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-2 ring-indigo-600`}>
                            <div
                                className="flex justify-between">
                                <div
                                    className="font-medium text-slate-900">{todo.name}</div>
                                <input
                                    id="selected"
                                    name="selected"
                                    type="checkbox"
                                    value={todo.selected}
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        !todo.selected
                                    }}
                                    className=" w-5 h-5"



                                />

                            </div>
                            <div className="mt-1 text-slate-700">Created By {todo.createdBy[0].username}</div>
                            <div
                                className="mt-6 font-medium text-slate-900">
                                created At {todo.createdAt.slice(0, todo.createdAt.lastIndexOf('.' + 1))}</div>
                            {todo.updatedAt && <div className="mt-6 font-medium text-slate-900">updated At {todo.updatedAt.slice(0, todo.updatedAt.lastIndexOf('.' + 1))}</div>}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(todo._id)
                                }}
                                className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Delete</button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditTodo(todo._id)
                                }}
                                
                                className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Edit Todo</button>
                        </div>
                    }) :
                        <h3 className=" text-center text-red-500">No Todos</h3>
                }



            </div>
            {allTodos.length > 0 && <div className=" mt-4 flex flex-row justify-center w-full gap-3">
                <button

                    className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Delete All Selected Todos</button>
                <button
                    className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Clear All Todos</button>
            </div>
            }
        </>

    )
}
