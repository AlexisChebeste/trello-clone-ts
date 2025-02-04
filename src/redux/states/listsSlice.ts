import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IList} from '../../types';
import axiosInstance from '../../api/axiosInstance';

export interface IListState {
    lists: IList[];
    selectedList: IList | null;
    loading: boolean;
    error: string | null;
}

interface CreateListData{
    title: string
    boardId: string
}

// Estado inicial
const initialState: IListState = {
    lists: [],
    selectedList: null,
    loading: false,
    error: null,
};

// Obtener las listas del board
export const fetchListsByBoards = createAsyncThunk<IList[], string, { rejectValue: string }>(
  '/lists/inBoard/:id',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IList[] >(`/lists/inBoard/${boardId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar las listas');
    }
  }
);


// Crear una nueva lista
export const createList = createAsyncThunk<IList, CreateListData, { rejectValue: string }>(
  '/lists',
  async (listData : CreateListData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IList>('/lists', listData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la lista');
    }
  }
);

// Eliminar una lista
export const deleteList = createAsyncThunk<string, string,{rejectValue:string}>(
  '/lists/deleteList',
  async(listId, {rejectWithValue}) => {
    try{
      await axiosInstance.delete(`/lists/${listId}`)
      return listId;
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar la lista')
    }
  }
)


const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    clearList: (state) => {
      state.selectedList = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Obtener listas del board
      .addCase(fetchListsByBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListsByBoards.fulfilled, (state, action: PayloadAction<IList[]>) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchListsByBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Crear lista
      .addCase(createList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createList.fulfilled, (state, action: PayloadAction<IList>) => {
        state.loading = false;
        if (action.payload) {
          state.lists.push(action.payload); // Agrega la nueva lista
        }
      })
      .addCase(createList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error desconocido';
      })

      // Eliminar lista por ID
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteList.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.selectedList = null;
        state.lists = state.lists.filter(w => w.id !== action.payload)
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar la lista";
      })
      
  }
});

export const { clearList } = listsSlice.actions;
export default listsSlice.reducer;
