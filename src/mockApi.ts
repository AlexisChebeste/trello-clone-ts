// src/mockApi.ts

export const mockLogin = (email: string, password: string) => {
    // Simula una respuesta de login exitosa
    if (email === 'test@example.com' && password === 'password123') {
      return {
        user: { id: '1', email, name: 'John Doe' },
        token: 'mocked-jwt-token',
        isAuthenticated: true,
      };
    }
    throw new Error('Invalid credentials');
  };
  
  export const mockRegister = (email: string, password: string, name: string) => {
    // Simula una respuesta de registro exitosa
    return {
      user: { id: '1', email, name },
      token: 'mocked-jwt-token',
    };
  };
  
  export const mockGetWorkspace = (workspaceId: string) => {
    // Simula obtener un workspace con algunos tableros
    return {
      id: workspaceId,
      name: 'Workspace Example',
      boards: [
        { id: '1', name: 'Board 1' },
        { id: '2', name: 'Board 2' },
      ],
    };
  };
  
  export const mockGetBoards = (workspaceId: string) => {
    // Simula obtener todos los tableros en un workspace
    return [
      { id: '1', name: 'Board 1', workspaceId },
      { id: '2', name: 'Board 2', workspaceId },
    ];
  };
  