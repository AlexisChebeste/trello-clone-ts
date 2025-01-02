import { User } from '../types';

// Mock authentication - Replace with real authentication later
let currentUser: User | null = null;

export const auth = {
  login: async (email: string, password: string) => {
    // Mock login
    currentUser = {
      id: '1',
      email,
      password,
      name: email.split('@')[0],
    };
    return currentUser;
  },
  
  register: async (email: string, password: string) => {
    // Mock register
    currentUser = {
      id: '1',
      email,
      password,
      name: email.split('@')[0],
    };
    return currentUser;
  },

  invited: async (email: string, password: string) => {
    // Mock invited
    currentUser = {
      id: '1',
      email,
      password,
      name: email.split('@')[0],
    };
    return currentUser;
  },
  
  logout: async () => {
    currentUser = null;
  },
  
  getCurrentUser: () => currentUser,
};