import { configureStore } from "@reduxjs/toolkit";
import { userslice } from "./slices/userslices";
import { memberslice } from "./slices/memberslice";

export const store=configureStore({
    reducer:{
        user:userslice.reducer,
        member:memberslice.reducer,
    }
})