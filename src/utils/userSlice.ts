import { createSlice } from "@reduxjs/toolkit";
import type { FeedUsers } from "./constants";

type UserState = FeedUsers | null;

const userSlice = createSlice({
    name: 'user',
    initialState: null as UserState ,
    reducers: {
        addUser: (_, action) => action.payload,
        removeUser: () => null
    }
    
})

export const { addUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer;

