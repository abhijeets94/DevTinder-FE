import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeedUser: (state, action) => {
            if(Array.isArray(state)) {
                const newFeed = state.filter((c) => c._id !== action.payload)
                return newFeed;
            }
        },
        removeFeed: () => null
    }
})

export const { addFeed, removeFeed, removeFeedUser } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;