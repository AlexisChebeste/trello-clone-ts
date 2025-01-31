export interface IUser {
    id: string;
    email: string;
    name: string;
    lastname: string;
    avatar: string;
    workspaces: IWorkspace[];
    boards: IBoard[];
  }
  
  export interface IWorkspace {
    id: string;
    name: string;
    logo: string;
    isCustomLogo: boolean;
    description: string;
    isPublic: boolean;
    members: IUser[];
    boards: IBoard[];
    invitations: string[];
    invitedGuests: string[];
    plan: 'free' | 'standard' | 'premium' | 'enterprise';
  }

  export interface IBoard {
    id: string;
    name: string;
    color: string;
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
    activity: [];
  }
  
  
  
  