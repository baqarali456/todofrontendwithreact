import { useDispatch } from "react-redux"
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "./Input"
import { useState } from "react";

import { useSelector } from "react-redux";
import { addSubTodosinTodo, deleteSubTodosinTodo, editSubTodo, updateSubTodo } from "../store/todoSlice"
import { useParams } from "react-router-dom";


export default function SubTodos() {

    const dispatch = useDispatch();
    const { todoId } = useParams()
    console.log("insubtodo", todoId)

    const allTodos = useSelector(state => state.todo.todos)
    console.log("insubto", allTodos)

    const index = allTodos.findIndex(todo => todo._id === todoId)
    console.log("insubtodo", index)
    const allSubTodos = allTodos[index].subTodo;
    console.log("insubtodo", allSubTodos)

    const editsubTodo = useSelector(state => state.todo.editSubTodo)

    const [subTodoId, setSubTodoId] = useState("")


    const { register, handleSubmit,setValue } = useForm();





    // Add Todos

    const handleSubTodos = async (data) => {
        console.log(data)

        if (editsubTodo) {
            try {
                await axios.patch(`http://localhost:8000/api/v1/sub-todos/update-subTodo/${subTodoId}`, data, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                    }
                })
                dispatch(updateSubTodo({ todoId, subTodoId, input: data.content }))
            } catch (error) {
                console.log(error)

            }
        }
        else {
            try {
                let response = await axios.post('http://localhost:8000/api/v1/sub-todos/add-subTodo', data, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                    }
                });

                const subtodo = response.data.data;
                
                await axios.post(`http://localhost:8000/api/v1/todos/addSubTodo-in-todo/${todoId}/${response.data.data._id}`, '', {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                    }
                });



                dispatch(addSubTodosinTodo({ todoId, subtodo: { ...subtodo } }))
                setValue('content', '')

            } catch (error) {
                console.log(error)

            }
        }
    }



    //delete Todos

    const handleDelete = async (subTodoId) => {
        try {
            let response = await axios.delete(`http://localhost:8000/api/v1/sub-todos/delete-subTodo/${subTodoId}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                }
            })
            dispatch(deleteSubTodosinTodo({ todoId, subTodoId: subTodoId }))
            await axios.patch(`http://localhost:8000/api/v1/todos/deleteSubTodo-in-todo/${todoId}/${subTodoId}`, '',{
                headers:{
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))} `
                }
            } )

    
        } catch (error) {
            console.log(error)

        }
    }


    const handleEdit = (Id) => {
        let index = allSubTodos.findIndex(subtodo => subtodo._id === Id);
        if (index !== -1) {
            setSubTodoId(Id)
            dispatch(editSubTodo({ index, Edit: true }))
        }
    }



    return (
        <>
            <div className=" mt-2 gap-3 flex flex-col w-full items-center">
                <form className=" flex flex-col gap-3 mt-4" onSubmit={handleSubmit(handleSubTodos)}>
                    <Input
                        type="text"
                        id="content"
                        name="content"
                        placeholder="Enter your Content"
                        {...register('content', {
                            required: true
                        })}
                        className=" w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                        type="submit"
                        className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >{editsubTodo ? "Edit SubTodo" : "Add SubTodo"}</button>
                </form>
            </div>
            <div className=" w-full ml-5 mr-5  mt-5 flex flex-row flex-wrap gap-3 ">
                {
                    allSubTodos?.length ? allSubTodos.map(todo => {
                        return <div
                            key={todo._id}
                            className={` bg-white pointer-events-auto w-[21rem] rounded-lg  p-4 text-[0.8125rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-2 ring-indigo-600`}>
                            <div
                                className="flex justify-between">
                                <div
                                    className="font-medium text-slate-900">{todo.content}</div>
                                <Input
                                    type="checkbox"
                                    {...register("complete")}
                                />

                            </div>

                            <button
                                onClick={() => handleDelete(todo._id)}
                                className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Delete</button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(todo._id)
                                }}
                                className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Edit</button>
                        </div>
                    }) :
                        <h3 className=" text-center text-red-500">No Todos</h3>
                }



            </div>
            {allSubTodos.length > 0 && <div className=" mt-4 flex flex-row justify-center w-full gap-3">
                <button

                    className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Delete All Selected Todos</button>
                <button
                    className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Clear All SubTodos</button>
            </div>}
        </>

    )
}
