import { IBoard, IUser } from ".";

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
  
