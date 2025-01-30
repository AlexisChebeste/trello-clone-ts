import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IWorkspace, IWorkspaceState } from '../../types/workspace';
import axiosInstance from '../../api/axiosInstance';

interface CreateWorkspaceData{
  name: string
}

// Estado inicial
const initialState: IWorkspaceState = {
  workspaces: [],
  selectedWorkspace: null,
  loading: false,
  error: null,
};

// Obtener los workspaces del usuario autenticado
export const fetchUserWorkspaces = createAsyncThunk<IWorkspace[], void, { rejectValue: string }>(
  '/workspaces/my-workspaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IWorkspace[] >('/workspaces/my-workspaces');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar workspaces');
    }
  }
);

// Obtener un workspace específico por ID
export const fetchWorkspaceById = createAsyncThunk<IWorkspace, string, { rejectValue: string }>(
  '/workspaces/:id',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ workspace: IWorkspace }>(`/workspaces/${workspaceId}`);
      return response.data.workspace;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'No tienes acceso a este workspace');
    }
  }
);

// Crear un nuevo workspace
export const createWorkspace = createAsyncThunk<IWorkspace, { name: string }, { rejectValue: string }>(
  '/workspaces',
  async (workspaceData : CreateWorkspaceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IWorkspace>('/workspaces', workspaceData);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear workspace');
    }
  }
);

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    clearWorkspace: (state) => {
      state.selectedWorkspace = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Obtener workspaces del usuario
      .addCase(fetchUserWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserWorkspaces.fulfilled, (state, action: PayloadAction<IWorkspace[]>) => {
        state.loading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchUserWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Obtener workspace por ID
      .addCase(fetchWorkspaceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceById.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.selectedWorkspace = action.payload;
      })
      .addCase(fetchWorkspaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Crear workspace
      .addCase(createWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkspace.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        if (action.payload) {
          state.workspaces.push(action.payload); // Agrega el nuevo workspace
      }
      })
      .addCase(createWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error desconocido';
      });
  }
});

export const { clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
