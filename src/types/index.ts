export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    avatar?: string;
  }
  
  export interface Workspace {
    id: string;
    name: string;
    logo: string;
    description?: string;
    boards: Board[];
    members?: User[];
  }
  
  export interface Board {
    id: string
    name: string
    color?: string
    description?: string
    lists: List[]
    lastActive?:Date
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
