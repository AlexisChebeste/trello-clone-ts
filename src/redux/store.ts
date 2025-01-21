import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { AuthState } from "./states/authSlice";

export interface AppStore {
    auth: AuthState
}

export default configureStore<AppStore>({
    reducer: {
        auth: authSliceReducer,
    }
})