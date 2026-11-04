import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface memberinfo{
    id:number;
    name:string;
    role:string;
    duty:string;
}



export const memberslice=createSlice({
    name:"member_management",
    initialState:JSON.parse(localStorage.getItem("member") || "[]") as memberinfo[],
    reducers:{
        addmember(state:object[],action:PayloadAction<memberinfo>){
            state.push(action.payload)
        },
        removemember(state:memberinfo[],action:PayloadAction<number>){
            state.filter(function(item){
                return item.id!=action.payload;
            })
        }
    },
})

export const memberactions=memberslice.actions;