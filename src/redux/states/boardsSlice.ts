import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBoard} from '../../types';
import axiosInstance from '../../api/axiosInstance';

export interface IBoardState {
    boards: IBoard[];
    selectedBoard: IBoard | null;
    loading: boolean;
    error: string | null;
}


interface CreateBoardData{
    name: string
    idWorkspace: string
    isPublic: boolean
    color: string
}

// Estado inicial
const initialState: IBoardState = {
    boards: [],
    selectedBoard: null,
    loading: false,
    error: null,
};

// Obtener los workspaces del usuario autenticado
export const fetchBoardsByWorkspace = createAsyncThunk<IBoard[], string, { rejectValue: string }>(
  '/boards/inWorkspace/:id',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IBoard[] >(`/boards/inWorkspace/${workspaceId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar boards');
    }
  }
);

// Obtener un workspace específico por ID
export const fetchWorkspaceById = createAsyncThunk<IBoard, string, { rejectValue: string }>(
  '/workspaces/:id',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IBoard>(`/workspaces/${workspaceId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'No tienes acceso a este workspace');
    }
  }
);

// Crear un nuevo workspace
export const createBoard = createAsyncThunk<IBoard, CreateBoardData, { rejectValue: string }>(
  '/boards',
  async (boardData : CreateBoardData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IBoard>('/boards', boardData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear workspace');
    }
  }
);

// Eliminar un workspace
export const deleteWorkspace = createAsyncThunk<string, string,{rejectValue:string}>(
  '/boards/deleteBoard',
  async(boardId, {rejectWithValue}) => {
    try{
      await axiosInstance.delete(`/boards/${boardId}`)
      return boardId;
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || 'Error al crear workspace')
    }
  }
)

export const updateIsPublicWorkspace = createAsyncThunk<IBoard, { id: string, isPublic: boolean }, { rejectValue: string }>(
  '/boards/updateIsPublic',
  async ({id, isPublic}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<IBoard>(`/boards/${id}/is-public`, { isPublic });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar workspace');
    }
  }
)

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.selectedBoard = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Obtener boards del workspace
      .addCase(fetchBoardsByWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardsByWorkspace.fulfilled, (state, action: PayloadAction<IBoard[]>) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoardsByWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Obtener board por ID
      .addCase(fetchWorkspaceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceById.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        state.selectedBoard = action.payload;
      })
      .addCase(fetchWorkspaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Crear board
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        if (action.payload) {
          state.boards.push(action.payload); // Agrega el nuevo board
        }
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error desconocido';
      })

      // Eliminar board por ID
      .addCase(deleteWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.selectedBoard = null;
        state.boards = state.boards.filter(w => w.id !== action.payload)
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar board";
      })
      
      // Actualizar isPublic board
      .addCase(updateIsPublicWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIsPublicWorkspace.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        state.selectedBoard = action.payload;
        state.boards = state.boards.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(updateIsPublicWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al cambiar estado del board';
      })
  }
});

export const { clearBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
