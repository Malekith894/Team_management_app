import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface userinfo{
    email?:string;
    name:string;
    phone_number:string;
    role:string;
    place_of_birth:string;
    age:string;
}

export const userslice=createSlice({
    name:"user",
    initialState: JSON.parse(localStorage.getItem("Userinfo") || "null"),
    reducers:{
        setuserinfo(state,action:PayloadAction<userinfo>){
            localStorage.setItem("Userinfo",JSON.stringify(action.payload))
            return action.payload;
        }
    }
})


export const useractions=userslice.actions;