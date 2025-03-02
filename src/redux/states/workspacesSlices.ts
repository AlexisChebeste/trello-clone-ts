import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IWorkspace} from '../../types';
import axiosInstance from '../../api/axiosInstance';

export interface IWorkspaceState {
  workspaces: IWorkspace[];
  selectedWorkspace: IWorkspace | null;
  loading: boolean;
  error: string | null;
}


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
      const response = await axiosInstance.get<IWorkspace>(`/workspaces/${workspaceId}`);
      return response.data;
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
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear workspace');
    }
  }
);

// Eliminar un workspace
export const deleteWorkspace = createAsyncThunk<string, string,{rejectValue:string}>(
  '/workspaces/deleteWorkspace',
  async(workspaceId, {rejectWithValue}) => {
    try{
      await axiosInstance.delete(`/workspaces/${workspaceId}`)
      return workspaceId;
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || 'Error al crear workspace')
    }
  }
)

export const updateIsPublicWorkspace = createAsyncThunk<IWorkspace, { id: string, isPublic: boolean }, { rejectValue: string }>(
  '/workspaces/updateIsPublic',
  async ({id, isPublic}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<IWorkspace>(`/workspaces/${id}/is-public`, { isPublic });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar workspace');
    }
  }
)

export const solicitInvitation = createAsyncThunk<IWorkspace, string, { rejectValue: string }>(
  '/workspaces/solicitInvitation',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IWorkspace>(`/api/workspaces/${workspaceId}/join`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al solicitar invitación');
    }
  }
);

export const acceptInvitation = createAsyncThunk<IWorkspace, { id: string, userId: string }, { rejectValue: string }>(
  '/workspaces/acceptInvitation',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response =  await axiosInstance.post<IWorkspace>(`/workspaces/invitations/${id}/accept`, {userId});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al aceptar invitación');
    }
  }
)

export const rejectInvitation = createAsyncThunk<IWorkspace, { id: string, userId: string }, { rejectValue: string }>(
  '/workspaces/rejectInvitation',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IWorkspace>(`/workspaces/invitations/${id}/reject`, {userId});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al aceptar invitación');
    }
  }
)

export const removeMember = createAsyncThunk<IWorkspace, { id: string, userId: string }, { rejectValue: string }>(
  '/workspaces/removeMember',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<IWorkspace>(`/workspaces/${id}/members/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar miembro');
    }
  }
);

export const addMember = createAsyncThunk<IWorkspace, { id: string, userId: string }, { rejectValue: string }>(
  '/workspaces/addMember',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IWorkspace>(`/workspaces/${id}/members`, { userId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al agregar miembro');
    }
  }
);

export const removeInvitedGuest = createAsyncThunk<IWorkspace, { id: string, userId: string }, { rejectValue: string }>(
  '/workspaces/removeInvitedGuest',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<IWorkspace>(`/workspaces/${id}/invited-guests/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar invitado');
    }
  }
);

export const removeBoardInvitedGuest = createAsyncThunk<IWorkspace, { id: string, userId: string, boardId: string }, { rejectValue: string }>(
  '/workspaces/removeBoardInvitedGuest',
  async ({ id, userId, boardId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<IWorkspace>(`/workspaces/${id}/invited-guests/${userId}/boards/${boardId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar invitado');
    }
  }
);

export const deleteBoardMember = createAsyncThunk<IWorkspace, { id: string, userId: string, boardId: string }, { rejectValue: string }>(
  '/workspaces/deleteBoardMember',
  async ({ id, userId, boardId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete<IWorkspace>(`/workspaces/${id}/members/${userId}/boards/${boardId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar miembro');
    }
  }
)

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
      })

      // Eliminar workspace por ID
      .addCase(deleteWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.selectedWorkspace = null;
        state.workspaces = state.workspaces.filter(w => w.id !== action.payload)
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar workspace";
      })
      
      // Actualizar isPublic workspace
      .addCase(updateIsPublicWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIsPublicWorkspace.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.selectedWorkspace = action.payload;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(updateIsPublicWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al cambiar estado del workspace';
      })
      .addCase(solicitInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(solicitInvitation.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(solicitInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al solicitar invitación';
      })
      .addCase(acceptInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al aceptar invitación';
      })
      .addCase(rejectInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectInvitation.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(rejectInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al rechazar invitación';
      })
      .addCase(removeMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMember.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al eliminar miembro';
      })
      .addCase(addMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMember.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al agregar miembro';
      })
      .addCase(removeInvitedGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeInvitedGuest.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(removeInvitedGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al eliminar invitado';
      })
      .addCase(removeBoardInvitedGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBoardInvitedGuest.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        state.loading = false;
        state.workspaces = state.workspaces.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(removeBoardInvitedGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al eliminar invitado';
      })
  }
});

export const { clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
