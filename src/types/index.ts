export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    avatar?: string;
    boards?: Board[];
    role?: "admin" | "user";
  }

  
  
  export interface Workspace {
    id: string;
    name: string;
    logo: string;
    description?: string;
    boards: Board[];
    members?: User[];
    archivedBoards?: Board[];
  }
  
  export interface Board {
    id: string
    name: string
    color?: string
    description?: string
    lists: List[]
    lastActive?:Date
    isArchived: boolean
    idWorkspace: string
    visibility?: "private" | "public" | "shared";
  }
  
  export interface List {
    id: string;
    title: string;
    cards: Card[];
    position?: number
  }
  
  export interface Card {
    id: string;
    title: string;
    description?: string;
    labels?: Label[];
    dueDate?: Date;
    position?: number
    assignedUsers?: User[]; // Usuarios asignados a la tarjeta
    status?: "todo" | "in-progress" | "done"; // Estado de la tarjeta
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface Label {
    id: string;
    text: string;
    color: string; // Hexadecimal o clase de Tailwind
  }













  export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    workspaces: string[];
    boards: string[];
  }
  
  export interface IWorkspace {
    id: string;
    name: string;
    logo: string;
    description?: string;
    isPublic: boolean;
    members: IUser[];
    boards: IBoard[];
    archivedBoards: IBoard[];
    admin: IUser;
  }
  
  export interface IBoard {
    id: string;
    name: string;
    color?: string;
    description?: string;
    isArchived: boolean;
    lastActive: Date;
    idWorkspace: string;
    lists: IList[];
    members: IUser[];
  }
  
  export interface IList {
    id: string;
    title: string;
    position: number;
    cards: ICard[];
  }
  
  export interface ICard {
    id: string;
    title: string;
    description?: string;
    labels: string[];
    dueDate?: string;
    position: number;
    idList: string;
    activity: { userId: string; comment: string; date: string }[];
  }
  
  
  
  