export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
  }
  
  export interface Workspace {
    id: string;
    name: string;
    description?: string;
    boards: Board[];
  }
  
  export interface Board {
    id: string
    name: string
    color?: string
    description?: string
    lists: List[]
  }
  
  export interface List {
    id: string;
    title: string;
    cards: Card[];
  }
  
  export interface Card {
    id: string;
    title: string;
    description?: string;
    labels?: string[];
    dueDate?: string;
  }