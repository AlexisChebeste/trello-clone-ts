// src/redux/states/workspaceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  {IBoard, IList, IWorkspace}  from '../../types';

export interface WorkspaceState {
  workspaces: IWorkspace[];
  loading: boolean;
  error: string | null;
  selectedWorkspaceId: string | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
  selectedWorkspaceId: null,
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
      // Encuentra el workspace y la lista a la que agregar la tarjeta
      const workspace = state.workspaces.find(ws => 
        ws.boards.some(board => board.lists.some(list => list.id === listId))
      );
      
      if (workspace) {
        const board = workspace.boards.find(board => 
          board.lists.some(list => list.id === listId)
        );
        
        if (board) {
          const list = board.lists.find(list => list.id === listId);
          if (list) {
            list.cards.push({
              id: (list.cards.length + 1).toString(),
              title: title,
              position: list.cards.length + 1,
              labels: [],
              idList: listId,
              activity: [],
            });
          }
        }
      }
    }
    ,
    updateCardList: (state, action: PayloadAction<{cardId: string, newListId: string}>) => {
      const {cardId, newListId} = action.payload;
      const list = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .flatMap((board) => board.lists)
        .find((list) => list.id === newListId);

      const card = list?.cards.find((card) => card.id === cardId);
      if (card) {
        card.idList = newListId;
      }
    },
    setWorkspaces(state, action: PayloadAction<IWorkspace[]>) {
      state.workspaces = action.payload;
    },
    selectWorkspace(state, action: PayloadAction<string>) {
      state.selectedWorkspaceId = action.payload;
    },
    moveBoard(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
      const workspace = state.workspaces.find(ws => ws.id === state.selectedWorkspaceId);
      if (workspace) {
        const [movedBoard] = workspace.boards.splice(action.payload.fromIndex, 1);
        workspace.boards.splice(action.payload.toIndex, 0, movedBoard);
      }
    },
    reorderCardsInList: (
      state,
      action: PayloadAction<{
        listId: string;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const { listId, sourceIndex, destinationIndex } = action.payload;

      // Encuentra la lista correspondiente
      const list = state.workspaces
        .flatMap((workspace) => workspace.boards)
        .flatMap((board) => board.lists)
        .find((list) => list.id === listId);

      if (!list) return;

      // Verifica si los índices son válidos
      if (
        sourceIndex < 0 ||
        sourceIndex >= list.cards.length ||
        destinationIndex < 0 ||
        destinationIndex >= list.cards.length
      ) {
        return;
      }

      // Reordena las tarjetas dentro de la lista
      const [movedCard] = list.cards.splice(sourceIndex, 1); // Elimina la tarjeta del índice de origen
      list.cards.splice(destinationIndex, 0, movedCard); // Inserta en el índice destino

      // Actualiza las posiciones de las tarjetas
      list.cards = list.cards.map((card, index) => ({
        ...card,
        position: index,
      }));
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
  updateCardList,
  setWorkspaces,
  selectWorkspace,
  reorderCardsInList,
  moveBoard,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
