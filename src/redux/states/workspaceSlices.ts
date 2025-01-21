// src/redux/states/workspaceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  {IBoard, ICard, IList, IWorkspace}  from '../../types';

export interface WorkspaceState {
  workspaces: IWorkspace[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    getWorkspacesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getWorkspacesSuccess: (state, action: PayloadAction<IWorkspace[]>) => {
      state.loading = false;
      state.workspaces = action.payload;
    },
    getWorkspacesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action: PayloadAction<IWorkspace>) => {
      const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id);
      if (index !== -1) {
        state.workspaces[index] = action.payload;
      }
    },
    updatePublicWorkspace: (state, action: PayloadAction<{ id: string, isPublic: boolean }>) => {
      const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id);
      if (index !== -1) {
        state.workspaces[index].isPublic = action.payload.isPublic;
      }
    },

    deleteWorkspace: (state, action: PayloadAction<string>) => {
      state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload);
    },
    archivedBoard: (state, action: PayloadAction<{boardId: string}>) =>{
      const {boardId} = action.payload;
      const board = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .find((board) => board.id === boardId);

      if (board) {
        board.isArchived = board.isArchived === true ? false : true
      }
    },
    addBoardToWorkspace: (
      state,
      action: PayloadAction<{ workspaceId: string; board: IBoard }>
    ) => {
      const { workspaceId, board } = action.payload;
      const workspace = state.workspaces.find((ws) => ws.id === workspaceId);
      if (workspace) {
        workspace.boards.push(board);
      }
    },
    addListToBoard: (state, action: PayloadAction<{boardId: string, title:string}>) => {
      const {boardId, title} = action.payload;
      const board = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .find((board) => board.id === boardId);

      if (board) {
        board.lists.push({ 
          id: (board.lists.length + 1).toString(),
          title: title ,
          position: (board.lists.length + 1),
          cards: [],
        });
      }

    },
    reorderListsInBoard: (state, action: PayloadAction<{boardId: string, newOrder: string[]}>) => {
      const {boardId, newOrder} = action.payload;
      const board = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .find((board) => board.id === boardId);

      if (board) {
        const reorderLists = newOrder.map(
          (listId) => board.lists.find((list) => list.id === listId)
        );

        board.lists = reorderLists.filter((list): list is IList => list !== undefined);
      }
    },
    addCardToList: (state, action: PayloadAction<{listId: string, title:string}>) => {
      const {listId, title} = action.payload;
      const list = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .flatMap((board) => board.lists)
        .find((list) => list.id === listId);

      if (list) {
        list.cards.push({ 
          id: (list.cards.length + 1).toString(),
          title: title ,
          position: (list.cards.length + 1),
          labels: [],
          idList: listId,
          activity: [],
        });
      }

    },
    reorderCardInBoard: (state, action: PayloadAction<{listId: string, newOrder: string[]}>) => {
      const {listId, newOrder} = action.payload;
      const list = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .flatMap((board) => board.lists)
        .find((list) => list.id === listId);

      if (list) {
        const reorderCards = newOrder.map(
          (cardId) => list.cards.find((card) => card.id === cardId)
        );

        list.cards = reorderCards.filter((card): card is ICard => card !== undefined);
      }
    },
  },
});

export const {
  getWorkspacesStart,
  getWorkspacesSuccess,
  getWorkspacesFailure,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addBoardToWorkspace,
  updatePublicWorkspace,
  addListToBoard,
  reorderListsInBoard,
  archivedBoard,
  addCardToList,
  reorderCardInBoard,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
