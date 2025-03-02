export interface IUser {
    id: string;
    email: string;
    name: string;
    lastname: string;
    avatar: string;
    workspaces: IWorkspace[];
    boards: string[];
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
    invitations: Invitations[];
    invitedGuests: InvitedGuests[];
    plan: 'Gratuito' | 'Standard' | 'Premium' | 'Enterprise';
  }

  export interface Invitations {
    user: string;
    status: 'pending' | 'accepted' | 'rejected';
    dateSolicited: Date;
  }

  export interface InvitedGuests{
    user: string;
    boards: string[];
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
    members: IMember[];
  }
  
  export interface IMember{
    id: string;
    user: string;
    role: 'admin' | "member";
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
    activity: IActivity[];
  }
  
export interface IActivity {
  user: string;
  action: string;
  commentary: string;
  timestamp: Date;
}
  
  
export interface UserProfile{
  id: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
}