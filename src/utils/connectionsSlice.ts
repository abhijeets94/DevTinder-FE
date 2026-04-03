import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addConnections: (_, action) => action.payload,
        clearConnection: () => null
    }
});

export const { addConnections, clearConnection } = connectionSlice.actions;
export default connectionSlice.reducer;