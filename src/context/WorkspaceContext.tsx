import { createContext, useState,  ReactNode } from 'react';

import { Workspace,Board} from '../types';

interface WorkspaceContextType {
  workspaces: Workspace[]
  createWorkspace: (name: string) => void
  createBoard: (workspaceId: string, name: string) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Espacio de trabajo 1',
      boards: [
        { id: '1', name: 'Tablero 1' , lists: []},
        { id: '2', name: 'Tablero 2' , lists: []},
      ],
    },
    {
      id: '2',
      name: 'Espacio de trabajo 2',
      boards: [
        { id: '3', name: 'Tablero 3' , lists: []},
        { id: '4', name: 'Tablero 4' , lists: []},
        { id: '5', name: 'Tablero 3' , lists: []},
        { id: '6', name: 'Tablero 4' , lists: []},
        { id: '7', name: 'Tablero 3' , lists: []},
        { id: '8', name: 'Tablero 4' , lists: []},
      ],
    },
  ])
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
      createBoard 
    }}>
      {children}
    </WorkspaceContext.Provider>
  )
}