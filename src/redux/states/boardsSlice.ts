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
export const fetchBoardById = createAsyncThunk<IBoard, string, { rejectValue: string }>(
  '/boards/:id',
  async (idBoard, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IBoard>(`/boards/${idBoard}`);
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
export const deleteBoard = createAsyncThunk<string, string,{rejectValue:string}>(
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

export const updateArchivedBoard = createAsyncThunk<IBoard, {id: string}, { rejectValue: string }>(
  '/boards/archive',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<IBoard>(`/boards/${id}/archive`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar workspace');
    }
  }
)

export const addMemberToBoard = createAsyncThunk<IBoard, {idBoard: string}, { rejectValue: string }>(
  '/boards/addMember',
  async ({idBoard}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IBoard>(`/boards/${idBoard}/members`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al agregar miembro al board');
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
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        state.selectedBoard = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
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
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.selectedBoard = null;
        state.boards = state.boards.filter(w => w.id !== action.payload)
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar board";
      })
      
      // Actualizar archived state board
      .addCase(updateArchivedBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArchivedBoard.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        state.selectedBoard = action.payload;
        state.boards = state.boards.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(updateArchivedBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al cambiar estado del board';
      })
      .addCase(addMemberToBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMemberToBoard.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.loading = false;
        state.selectedBoard = action.payload;
        state.boards = state.boards.map(w => w.id === action.payload.id ? action.payload : w);
      })
      .addCase(addMemberToBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido al agregar miembro al board';
      });

  }
});

export const { clearBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
