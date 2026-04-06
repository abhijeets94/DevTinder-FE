import { createSlice } from "@reduxjs/toolkit";
import type { FeedUsers } from "./constants";

type ConnectionState = FeedUsers[] | null;

const connectionSlice = createSlice({
    name: 'connections',
    initialState: null as ConnectionState,
    reducers: {
        addConnections: (_, action) => action.payload,
        clearConnection: () => null
    }
});

export const { addConnections, clearConnection } = connectionSlice.actions;
export default connectionSlice.reducer;