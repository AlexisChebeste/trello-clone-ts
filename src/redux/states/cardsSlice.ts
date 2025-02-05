import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICard} from '../../types';
import axiosInstance from '../../api/axiosInstance';
import { arrayMove } from '@dnd-kit/sortable';



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
  '/cards/inLists/:id',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get<ICard[]>(`/cards/inLists/${id}`);
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
  async ({ cardId, newPosition, newListId }: MoveCardPayload, {rejectWithValue}) => {
    try{
      const response = await axiosInstance.put<ICard>(`/cards/move`, { cardId, newPosition, newListId });
      return response.data; // Retorna las tarjetas actualizadas
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || 'Error al mover la tarjeta')
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
      const cardIndex = state.cards.findIndex((c) => c.id === cardId);
      
      if (cardIndex === -1) return;
    
    
      state.cards[cardIndex].idList = newListId;
      state.cards = arrayMove(state.cards, cardIndex, newPosition);
    
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
        const newCards = action.payload.filter(
          (newCard) => !state.cards.some((existingCard) => existingCard.id === newCard.id)
        );
        state.cards = [...state.cards, ...newCards]; // Agregar las tarjetas a la lista
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
      // Mover tarjeta
      .addCase(moveCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveCard.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.loading = false;
        state.cards = state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        );
      })
    
  }
});

export const { clearCard, moveCardOptimistic } = cardsSlice.actions;
export default cardsSlice.reducer;
