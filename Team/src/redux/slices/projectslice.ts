import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface projectinfo{
        title:string;
        description:string;
        date:string;
    }


export const projectslice=createSlice({
    name:"project_management",
    initialState:JSON.parse(localStorage.getItem("project") || "null"),
    reducers:{
        addproject(state:object[],action:PayloadAction<projectinfo[]>){
            state.push(action.payload);
            return state;
        }
    }
})

export const projectactions=projectslice.actions;