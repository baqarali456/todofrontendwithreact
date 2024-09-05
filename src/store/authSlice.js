import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        status:false,
        userData:null,
    },
    reducers:{
      login:(state,action)=>{
         state.status = true;
         state.userData = action.payload;
      },
      logout:(state,action)=>{
         state.status = false;
         state.userData = null;
      },
    }
})

export const {login,logout} = authSlice.actions

const auth = authSlice.reducer;

export {auth}