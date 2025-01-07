import { createContext, useState,  ReactNode } from 'react';

import { Workspace,Board, List, Card} from '../types';

interface WorkspaceContextType {
  workspaces: Workspace[]
  createWorkspace: (name: string) => void
  createBoard: (workspaceId: string, name: string) => void
  createCard: (listId: string, title: string) => void
  createList: (boardId: string, title: string) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Espacio de trabajo 1',
      boards: [
        { id: '1', name: 'Tablero 1' , lists: [{ id: '1', title: 'Lista 1', cards: [{ id: '1', title: 'Card 1' }] }] },
        { id: '2', name: 'Tablero 2' , lists: []},
      ],
    },
    {
      id: '2',
      name: 'Espacio de trabajo 2',
      boards: [
        { id: '3', name: 'Tablero 1' , lists: []},
        { id: '4', name: 'Tablero 2' , lists: []},
        { id: '5', name: 'Tablero 3' , lists: []},
        { id: '6', name: 'Tablero 4' , lists: []},
        { id: '7', name: 'Tablero 5' , lists: []},
        { id: '8', name: 'Tablero 6' , lists: []},
      ],
    },
  ])

  
  const createCard = (listId: string, title: string) => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      title,
    }
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
                  cards: [...list.cards, newCard],
                }
              }
              return list
            })
          }
        })
      }
    }))
  }

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
      boards: [],
    }
    setWorkspaces([...workspaces, newWorkspace])
  }

  const createBoard = (workspaceId: string, name: string) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name,
      lists: [],
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


  return (
    <WorkspaceContext.Provider value={{ 
      workspaces, 
      createWorkspace, 
      createBoard,
      createCard,
      createList,
    }}>
      {children}
    </WorkspaceContext.Provider>
  )
}