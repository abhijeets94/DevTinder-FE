import { createSlice } from "@reduxjs/toolkit";
import type { FeedUsers } from "./constants";

type RequestState = FeedUsers[] | null;
 
const requestSlice = createSlice({
    name: 'request',
    initialState: null as RequestState,
    reducers: {
        addRequest: (_, action) => action.payload,
        removeRequest: (state, action) => {
            if(Array.isArray(state)) {
                const newRequest = state.filter((r) => r._id !== action.payload);
                return newRequest;
            }
        }

    }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;