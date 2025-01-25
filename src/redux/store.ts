import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/authSlice";
import workspaceSliceReducer from "./states/workspaceSlices";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        workspace: workspaceSliceReducer,
    }
})

// Tipos para dispatch y estado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;