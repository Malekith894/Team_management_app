import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface projectinfo {
    id: string;
    title: string;
    description: string;
    date: string;
}

export const projectslice = createSlice({
    name: "project_management",
    initialState: JSON.parse(localStorage.getItem("project") || "[]") as projectinfo[],
    reducers: {
        addproject(state, action: PayloadAction<projectinfo[]>) {
            return action.payload;
        }
    }
})

export const projectactions = projectslice.actions;