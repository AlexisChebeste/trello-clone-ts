// src/mockApi.ts

export const mockLogin = (email: string, password: string) => {
    // Simula una respuesta de login exitosa
    if (email === 'test@example.com' && password === 'password123') {
      return {
        user: { id: '1', email, name: 'John Doe', boards: [], workspaces: [] },
        token: 'mocked-jwt-token',
        isAuthenticated: true,
      };
    }
    throw new Error('Invalid credentials');
  };
  
  export const mockRegister = (email: string, password: string, name: string) => {
    // Simula una respuesta de registro exitosa
    return {
      user: { id: '1', email, name ,boards: [], workspaces: []},
      token: 'mocked-jwt-token',
    };
  };
  
  export const mockGetWorkspace = (nameWorkspace: string) => {
    // Simula obtener un workspace con algunos tableros
    const newId = Math.random().toString(36).substr(2, 9)
    return {
      id: newId,
      name: nameWorkspace,
      boards: [
        {
          id: '1', idWorkspace: newId ,name: 'Tablero 1', color: 'bg-[#0079bf]', lists: [],
          isArchived: false, lastActive: new Date(), members: []
        },
        {
          id: '2',  idWorkspace: newId, name: 'Tablero 2', color: 'bg-[#519839]', lists: [],
          isArchived: true, lastActive: new Date(), members: []
        },
      ],
      isPublic: true,
      members: [],
      archivedBoards: [],
      admin: { id: '1', name: 'John Doe' , email: 'test@example.com', workspaces:[] ,boards: []},
      logo: 'bg-gradient-to-br from-[#0C66E4] to-[#37B4C3]',
    };
  };
  
  export const mockGetBoards = (workspaceId: string) => {
    // Simula obtener todos los tableros en un workspace
    return [
      { id: '1', name: 'Board 1', workspaceId },
      { id: '2', name: 'Board 2', workspaceId },
    ];
  };
  