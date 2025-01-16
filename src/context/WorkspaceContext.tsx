import { createContext, useState,  ReactNode } from 'react';
import { gradients } from '../lib/colors';
import { Workspace,Board, List } from '../types';

interface WorkspaceContextType {
  workspaces: Workspace[]
  createWorkspace: (name: string) => void
  createBoard: (workspaceId: string, name: string, color:string) => void
  createCard: (listId: string, title: string) => void
  createList: (boardId: string, title: string) => void
  deleteCard: (listId: string, cardId: string) => void
  deleteList: (boardId: string, listId: string) => void
  deleteBoard: (workspaceId: string, boardId: string) => void
  deleteWorkspace: (workspaceId: string) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Espacio de trabajo 1',
      logo: gradients.gradientceleste,
      members: [
        { id: '1', name: 'Juan', avatar: 'https://randomuser.me/api' , email: '@alexischebeste', password: '' }, 
        { id: '2', name: 'Pedro', avatar: 'https://randomuser.me/api' , email: '@alexischebeste', password: ''},
      ],      
      boards: [
        {
          id: '1', name: 'Tablero 1', color: 'bg-[#0079bf]', lists: [{ id: '1', title: 'Lista 1', cards: [{ id: '1', title: 'Card 1' }] }],
          isArchived: false
        },
        {
          id: '2', name: 'Tablero 2', color: 'bg-[#519839]', lists: [],
          isArchived: true
        },
      ],
    },
    {
      id: '2',
      name: 'Espacio de trabajo 2',
      logo: gradients.gradientvioleta,
      boards: [
        {
          id: '3', name: 'Tablero 1', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
        {
          id: '4', name: 'Tablero 2', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
        {
          id: '5', name: 'Tablero 3', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
        {
          id: '6', name: 'Tablero 4', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
        {
          id: '7', name: 'Tablero 5', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
        {
          id: '8', name: 'Tablero 6', color: 'bg-[#0079bf]', lists: [],
          isArchived: false
        },
      ],
    },
  ])

  
  const createCard = (listId: string, title: string) => {
    setWorkspaces((prev) =>
      prev.map((workspace) => ({
        ...workspace,
        boards: workspace.boards.map((board) => ({
          ...board,
          lists: board.lists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: [...list.cards, { id: crypto.randomUUID(), title }],
              };
            }
            return list;
          }),
        })),
      }))
    );
  };

  const createList = (boardId: string, title: string) => {

    const newList: List = {
      id: crypto.randomUUID(),
      title,
      cards: [],
    }
    setWorkspaces(workspaces.map(workspace => {
      return {
        ...workspace,
        boards: workspace.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              lists: [...board.lists, newList],
            }
          }
          return board
        })
      }
    }))
  }

  const createWorkspace = (name: string) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      logo: Object.values(gradients)[Math.floor(Math.random() * Object.values(gradients).length)],
      boards: [],
    }
    setWorkspaces([...workspaces, newWorkspace])
  }

  const createBoard = (workspaceId: string, name: string, color: string) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name,
      color,
      lists: [],
      isArchived: false
    }
    setWorkspaces(workspaces.map(workspace => {
      if (workspace.id === workspaceId) {
        return {
          ...workspace,
          boards: [...workspace.boards, newBoard],
        }
      }
      return workspace
    }))
  }

  const deleteCard = (listId: string, cardId: string) => {
    setWorkspaces(workspaces.map(workspace => {
      return {
        ...workspace,
        boards: workspace.boards.map(board => {
          return {
            ...board,
            lists: board.lists.map(list => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.filter(card => card.id !== cardId),
                }
              }
              return list
            })
          }
        })
      }
    }))
  }

  const deleteList = (boardId: string, listId: string) => {
    setWorkspaces(workspaces.map(workspace => {
      return {
        ...workspace,
        boards: workspace.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              lists: board.lists.filter(list => list.id !== listId)
            }
          }
          return board
        })
      }
    }))
  }

  const deleteBoard = (workspaceId: string, boardId: string) => {
    setWorkspaces(workspaces.map(workspace => {
      if (workspace.id === workspaceId) {
        return {
          ...workspace,
          boards: workspace.boards.filter(board => board.id !== boardId)
        }
      }
      return workspace
    }))
  }

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces(workspaces.filter(workspace => workspace.id !== workspaceId))
  }

  return (
    <WorkspaceContext.Provider value={{ 
      workspaces, 
      createWorkspace, 
      createBoard,
      createCard,
      createList,
      deleteCard,
      deleteList,
      deleteBoard,
      deleteWorkspace,
    }}>
      {children}
    </WorkspaceContext.Provider>
  )
}