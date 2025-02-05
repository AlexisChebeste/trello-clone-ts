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
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IList[] >(`/lists/inBoard/${id}`);
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

// Actualizar el título de una lista
export const updateListTitle = createAsyncThunk<
  IList,
  { id: string; title: string; position: number },
  { rejectValue: string }
>(
  "/lists/updateTitle",
  async ({ id, title, position }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<IList>(`/lists/${id}`, { title , position});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al actualizar la lista");
    }
  }
);

//Update position of lists
export const moveList = createAsyncThunk<
  { idList: string; newPosition: number },
  { idBoard: string; idList: string;  newPosition: number },
  { rejectValue: string }
>(
  "/lists/moveList",
  async ({ idBoard, idList, newPosition}, { rejectWithValue }) => {
    try {
      await axiosInstance.put<string>("/lists/moveLists", { idBoard, idList, newPosition });

      return { idList, newPosition };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al reordenar las listas");
    }
  }
);


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
      
      // Actualizar título de la lista
      .addCase(updateListTitle.fulfilled, (state, action: PayloadAction<IList>) => {
        state.lists = state.lists.map((list) =>
          list.id === action.payload.id ? { ...list, title: action.payload.title } : list
        );
      })
      .addCase(updateListTitle.rejected, (state, action) => {
        state.error = action.payload || "Error desconocido";
      })

      // Mover lista
      .addCase(moveList.fulfilled, (state, action) => {
        const { idList, newPosition } = action.payload;
        const listToMove = state.lists.find((list) => list.id === idList);
        if (!listToMove) return;

        state.lists = state.lists.filter((list) => list.id !== idList);
        state.lists.splice(newPosition, 0, listToMove);

        state.lists.forEach((list, index) => {
          list.position = index;
        });
      });
      
  }
});

export const { clearList } = listsSlice.actions;
export default listsSlice.reducer;
