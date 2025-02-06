import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICard} from '../../types';
import axiosInstance from '../../api/axiosInstance';

export interface ICardState {
    cards: ICard[];
    selectedCard: ICard | null;
    loading: boolean;
    error: string | null;
}

interface CreateCardData{
  title: string
  listId: string
}

interface MoveCardPayload {
  cardId: string;
  newPosition: number;
  newListId: string;
}

// Estado inicial
const initialState: ICardState = {
    cards: [],
    selectedCard: null,
    loading: false,
    error: null,
};

// Obtener las cards de la lista
export const fetchCardsByLists = createAsyncThunk<ICard[], string, { rejectValue: string }>(
  '/boards/:id/cards',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get<ICard[]>(`/boards/${id}/cards`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar las cards');
    }
  }
);


// Crear una nueva tarjeta
export const createCard = createAsyncThunk<ICard, CreateCardData, { rejectValue: string }>(
  '/cards',
  async (cardData : CreateCardData, { rejectWithValue }) => {
    try {
      console.log(cardData)
      const response = await axiosInstance.post<ICard>('/cards', cardData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la lista');
    }
  }
);

// Eliminar una tarjeta
export const deleteCard = createAsyncThunk<string, string,{rejectValue:string}>(
  '/cards/deleteCard',
  async(cardId, {rejectWithValue}) => {
    try{
      await axiosInstance.delete(`/cards/${cardId}`)
      return cardId;
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar la lista')
    }
  }
)

// Actualizar el título de una tarjeta
export const updateCardTitle = createAsyncThunk<
ICard,
  { id: string; title: string; position: number },
  { rejectValue: string }
>(
  "/cards/updateTitle",
  async ({ id, title, position }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cards/${id}`, { title , position});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al actualizar la tarjeta");
    }
  }
);

export const moveCard = createAsyncThunk<
  ICard,
  MoveCardPayload,
  { rejectValue: string }
>(
  "cards/moveCard",
  async ({ cardId, newPosition, newListId }: MoveCardPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<ICard>(`/cards/move`, { cardId, newPosition, newListId });
      return response.data; // Retorna la tarjeta actualizada
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al mover la tarjeta');
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearCard: (state) => {
      state.selectedCard = null;
    },
    moveCardOptimistic: (state, action: PayloadAction<MoveCardPayload>) => {
      const { cardId, newListId, newPosition } = action.payload;
    
      // Buscar la tarjeta que se mueve
      const card = state.cards.find((c) => c.id === cardId);
      if (!card) return;
    
      // Filtrar las tarjetas de la lista actual y la nueva lista
      const oldListCards = state.cards.filter((c) => c.idList === card.idList);
      const newListCards = state.cards.filter((c) => c.idList === newListId);
    
      // Eliminar la tarjeta de su lista actual
      const updatedOldList = oldListCards.filter((c) => c.id !== cardId);
    
      // Insertar la tarjeta en la nueva lista
      const updatedNewList = [...newListCards];
      updatedNewList.splice(newPosition, 0, { ...card, idList: newListId });
    
      // Reordenar posiciones en ambas listas
      updatedOldList.forEach((c, index) => (c.position = index));
      updatedNewList.forEach((c, index) => (c.position = index));
    
      // Actualizar el estado global de las tarjetas
      state.cards = [...updatedOldList, ...updatedNewList];
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener tarjetas por lista
      .addCase(fetchCardsByLists.pending, (state) => {
        state.loading = true;
        state.error = null;
            })
      .addCase(fetchCardsByLists.fulfilled, (state, action: PayloadAction<ICard[]>) => {
        state.loading = false;
        state.cards = action.payload; // Reemplaza todas las tarjetas de la lista
      })
      .addCase(fetchCardsByLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })

      // Crear tarjeta
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.loading = false;
        if (action.payload) {
          state.cards.push(action.payload); // Agregar una nueva tarjeta
        }
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error desconocido';
      })

      // Eliminar tarjeta por ID
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.selectedCard = null;
        state.cards = state.cards.filter(w => w.id !== action.payload)
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar la tarjeta";
      })
      
      // Actualizar título de la tarjeta
      .addCase(updateCardTitle.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.cards = state.cards.map((list) =>
          list.id === action.payload.id ? { ...list, title: action.payload.title } : list
        );
      })
      .addCase(updateCardTitle.rejected, (state, action) => {
        state.error = action.payload || "Error desconocido";
      })
      .addCase(moveCard.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.loading = false;
        const updatedCard = action.payload;
      
        // Remover la tarjeta de su posición anterior y actualizarla en la nueva lista
        state.cards = state.cards
          .filter((card) => card.id !== updatedCard.id)
          .concat(updatedCard)
          .sort((a, b) => a.position - b.position);
      });
    
  }
});

export const { clearCard, moveCardOptimistic } = cardsSlice.actions;
export default cardsSlice.reducer;
