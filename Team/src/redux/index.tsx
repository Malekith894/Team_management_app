import { configureStore } from "@reduxjs/toolkit";
import { userslice } from "./slices/userslices";

export const store=configureStore({
    reducer:{
        user:userslice.reducer,
    }
})