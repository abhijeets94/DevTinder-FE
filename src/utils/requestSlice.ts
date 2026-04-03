import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState: null,
    reducers: {
        addRequest: (_, action) => action.payload,
        removeRequest: (state, action) => {
            if(Array.isArray(state)) {
                const newRequest = state.filter((r) => r.id !== action.payload);
                return newRequest;
            }
        }

    }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;