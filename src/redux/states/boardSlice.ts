// src/redux/states/boardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

export interface BoardState {
  boards: IBoard[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBoardsSuccess: (state, action: PayloadAction<IBoard[]>) => {
      state.loading = false;
      state.boards = action.payload;
    },
    getBoardsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<IBoard>) => {
      const index = state.boards.findIndex(board => board.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(board => board.id !== action.payload);
    },
  },
});

export const {
  getBoardsStart,
  getBoardsSuccess,
  getBoardsFailure,
  addBoard,
  updateBoard,
  deleteBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
