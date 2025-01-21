import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { AuthState } from "./states/authSlice";
import workspaceSliceReducer, { WorkspaceState } from "./states/workspaceSlices";
import boardSliceReducer, { BoardState } from "./states/boardSlice";

export interface AppStore {
    auth: AuthState
    workspace: WorkspaceState
    board: BoardState
}

export default configureStore<AppStore>({
    reducer: {
        auth: authSliceReducer,
        workspace: workspaceSliceReducer,
        board: boardSliceReducer,
    }
})