import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../app/features/api/apiSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer
    },
    midddleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
});