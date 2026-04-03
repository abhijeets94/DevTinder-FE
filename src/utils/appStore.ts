import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { feedReducer } from "./feedSlice";
import connectionReducer from './connectionsSlice';
import requestReducer from './requestSlice';
export const appStore = configureStore({
  reducer: { user: userReducer, feed: feedReducer, connection: connectionReducer, request: requestReducer },
});

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch;