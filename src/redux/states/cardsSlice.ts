import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../types';
import axiosInstance from '../../api/axiosInstance';

export interface ICardState {
    cards: ICard[];
    selectedCard: ICard | null;
    loading: boolean;
    error: string | null;
}

interface CreateCardData {
  title: string;
  listId: string;
}

interface MoveCardPayload {
  cardId: string;
  newPosition: number;
  newListId: string;
}

interface ActivityCardData {
  cardId: string;
  action: string;
  commentary: string;
}

const initialState: ICardState = {
    cards: [],
    selectedCard: null,
    loading: false,
    error: null,
};

export const fetchCardsByLists = createAsyncThunk<ICard[], string, { rejectValue: string }>(
  'cards/fetchByList',
  async (listId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ICard[]>(`/boards/${listId}/cards`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar las cards');
    }
  }
);

export const createCard = createAsyncThunk<ICard, CreateCardData, { rejectValue: string }>(
  'cards/create',
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ICard>('/cards', cardData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la tarjeta');
    }
  }
);

export const deleteCard = createAsyncThunk<string, string, { rejectValue: string }>(
  'cards/delete',
  async (cardId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cards/${cardId}`);
      return cardId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar la tarjeta');
    }
  }
);

export const updateTitleCard = createAsyncThunk<ICard, { cardId: string; title: string }, { rejectValue: string }>(
  'cards/updateTitle',
  async ({ cardId, title }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<ICard>(`/cards/${cardId}/title`, { title });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el título de la tarjeta');
    }
  }
);

export const moveCard = createAsyncThunk<ICard, MoveCardPayload, { rejectValue: string }>(
  'cards/move',
  async ({ cardId, newPosition, newListId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<ICard>('/cards/move', { cardId, newPosition, newListId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al mover la tarjeta');
    }
  }
);

export const updateDescriptionCard = createAsyncThunk<ICard, { cardId: string; description: string }, { rejectValue: string }>(
  'cards/updateDescription',
  async ({ cardId, description }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<ICard>(`/cards/${cardId}/description`, { description });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar la descripción de la tarjeta');
    }
  }
)

export const addActivityCard = createAsyncThunk<ICard, ActivityCardData, { rejectValue: string }>(
  'cards/addComment',
  async ({ cardId, action,commentary }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ICard>(`/cards/${cardId}/activity`, { action, commentary});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al añadir un comentario a la tarjeta');
    }
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    clearCard: (state) => {
      state.selectedCard = null;
    },
    moveCardOptimistic: (state, action: PayloadAction<MoveCardPayload>) => {
      const { cardId, newListId, newPosition } = action.payload;
      const card = state.cards.find((c) => c.id === cardId);
      if (!card) return;

      // Eliminar la tarjeta de su lista original
      state.cards = state.cards.filter((c) => c.id !== cardId);
      
      // Insertar en la nueva posición
      const newCardsList = [...state.cards.filter((c) => c.idList === newListId)];
      newCardsList.splice(newPosition, 0, { ...card, idList: newListId, position: newPosition });
      
      // Actualizar las posiciones
      newCardsList.forEach((c, index) => { c.position = index; });
      
      state.cards = [...state.cards.filter((c) => c.idList !== newListId), ...newCardsList];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsByLists.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const { id, idList, position } = action.payload;
        const card = state.cards.find((c) => c.id === id);
        if (card) {
          card.idList = idList;
          card.position = position;
        }
      })
      .addCase(updateTitleCard.fulfilled, (state, action) => {
        const card = state.cards.find((c) => c.id === action.payload.id);
        if (card) {
          card.title = action.payload.title;
        }
      })
      .addCase(updateDescriptionCard.fulfilled, (state, action) => {
        const card = state.cards.find((c) => c.id === action.payload.id);
        if (card) {
          card.description = action.payload.description;
        }
      })
      .addCase(addActivityCard.fulfilled, (state, action) => {
        const card = state.cards.find((c) => c.id === action.payload.id);
        if (card) {
          card.activity = action.payload.activity;
        }
      })
  },
});

export const { clearCard, moveCardOptimistic } = cardsSlice.actions;
export default cardsSlice.reducer;
