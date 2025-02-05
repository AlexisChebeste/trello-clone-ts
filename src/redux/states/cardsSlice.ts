import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const moveCard = createAsyncThunk(
    "cards/moveCard",
    async ({ idCard, idSourceList, idTargetList, newPosition }: any) => {
      await axios.put(`/api/cards/move`, { idCard, idSourceList, idTargetList, newPosition });
      return { idCard, idSourceList, idTargetList, newPosition };
    }
  );
  
  const cardsSlice = createSlice({
    name: "cards",
    initialState: { cards: [] },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(moveCard.fulfilled, (state, action) => {
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
      });
    },
  });
  
  export default cardsSlice.reducer;
  