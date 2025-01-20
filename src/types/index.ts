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