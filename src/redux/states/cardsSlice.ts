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
      const response = await axiosInstance.get<ICard[] >(`/cards/inLists/${id}`);
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
      const response = await axiosInstance.put<ICard>(`/cards/${id}`, { title , position});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al actualizar la tarjeta");
    }
  }
);

export const moveCard = createAsyncThunk(
  "cards/moveCard",
  async ({ idCard, idSourceList, idTargetList, newPosition }: any) => {
    await axiosInstance.put(`/api/cards/move`, { idCard, idSourceList, idTargetList, newPosition });
    return { idCard, idSourceList, idTargetList, newPosition };
  }
);


const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearCard: (state) => {
      state.selectedCard = null;
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
        state.cards = action.payload;
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
      });

      
    
  }
});

export const { clearCard } = cardsSlice.actions;
export default cardsSlice.reducer;


/* // Mover card
      .addCase(moveCard.fulfilled, (state, action) => {
        const { idCard, idSourceList, idTargetList, newPosition } = action.payload;
  
        const sourceList = state.cards.find((list) => list.id === idSourceList);
        const targetList = state.cards.find((list) => list.id === idTargetList);
        if (!sourceList || !targetList) return;
  
        const cardToMove = sourceList.cards.find((card) => card.id === idCard);
        if (!cardToMove) return;
  
        sourceList.cards = sourceList.cards.filter((card) => card.id !== idCard);
        targetList.cards.splice(newPosition, 0, cardToMove);
  
        state.cards.forEach((list) => {
          list.cards.forEach((card, index) => {
            card.position = index;
          });
        });
      }) */