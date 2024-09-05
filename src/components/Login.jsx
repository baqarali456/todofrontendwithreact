import { useState } from "react"
import { useForm } from "react-hook-form"
import { login } from "../store/authSlice"
import axios from "axios"
import { useDispatch } from "react-redux"
import Input from "./Input"
import { useNavigate } from "react-router-dom"




export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, SetError] = useState("")
    

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    const signin = async (data) => {
        SetError("")
        try {
            let response = await axios.post('http://localhost:8000/api/v1/users/login-user',data)
            console.log(response.data.data)
            
            dispatch(login(response.data.data.user))
            localStorage.setItem("accessToken",JSON.stringify(response.data.data.accessToken
            ))
            localStorage.setItem("refreshToken",JSON.stringify(response.data.data.refreshToken
            ))
            navigate("/")

        } catch (error) {
            let firstIndex = error.response.data.indexOf(":")
            let lastIndex = error.response.data.indexOf("&")
            let finalerror = error.response.data.slice(firstIndex + 2, lastIndex - 5)
            SetError(finalerror)
        }
    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(signin)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <Input
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address"
                                        }
                                    })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input
                                   {...register("password",{
                                    required:true,
                                   })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                           
                        </div>

                        <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                            </div>
                        
                        <div className="mt-2">
                                <Input
                                   {...register("username",{
                                    required:true,
                                   })}
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {
                        error && <p className=" text-red-500  text-center mt-10 ">{error}</p>
                    }

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
