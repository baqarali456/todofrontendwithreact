import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./authSlice";
import { todo } from "./todoSlice";


export const store = configureStore({
    reducer:{
        auth,
        todo,
    }
})