import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { AuthState } from "./states/authSlice";
import workspaceSliceReducer, { WorkspaceState } from "./states/workspaceSlices";

export interface AppStore {
    auth: AuthState
    workspace: WorkspaceState
}

export default configureStore<AppStore>({
    reducer: {
        auth: authSliceReducer,
        workspace: workspaceSliceReducer,
    }
})
