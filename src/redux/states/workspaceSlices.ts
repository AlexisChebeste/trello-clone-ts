// src/redux/states/workspaceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  {IBoard, IWorkspace}  from '../../types';

export interface WorkspaceState {
  workspaces: IWorkspace[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    getWorkspacesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getWorkspacesSuccess: (state, action: PayloadAction<IWorkspace[]>) => {
      state.loading = false;
      state.workspaces = action.payload;
    },
    getWorkspacesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id);
      if (index !== -1) {
        state.workspaces[index] = action.payload;
      }
    },
    updatePublicWorkspace: (state, action: PayloadAction<{ id: string, isPublic: boolean }>) => {
      const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id);
      if (index !== -1) {
        state.workspaces[index].isPublic = action.payload.isPublic;
      }
    },

    deleteWorkspace: (state, action: PayloadAction<string>) => {
      state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload);
    },
    addBoardToWorkspace: (
      state,
      action: PayloadAction<{ workspaceId: string; board: IBoard }>
    ) => {
      const { workspaceId, board } = action.payload;
      const workspace = state.workspaces.find((ws) => ws.id === workspaceId);
      if (workspace) {
        workspace.boards.push(board);
      }
    },
  },
});

export const {
  getWorkspacesStart,
  getWorkspacesSuccess,
  getWorkspacesFailure,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addBoardToWorkspace,
  updatePublicWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
