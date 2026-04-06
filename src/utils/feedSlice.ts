import { createSlice } from "@reduxjs/toolkit";
import type { FeedUsers } from "./constants";

type FeedState = FeedUsers[] | null;

const feedSlice = createSlice({
    name: 'feed',
    initialState: null as FeedState,
    reducers: {
        addFeed: (_, action) => action.payload,
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