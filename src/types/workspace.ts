export interface IWorkspace {
    id: string;
    name: string;
    logo: string;
    isCustomLogo: boolean;
    description: string;
    isPublic: boolean;
    members: string[];
    boards: string[];
    invitations: string[];
    invitedGuests: string[];
    plan: 'free' | 'standard' | 'premium' | 'enterprise';
  }
  
  export interface IWorkspaceState {
    workspaces: IWorkspace[];
    selectedWorkspace: IWorkspace | null;
    loading: boolean;
    error: string | null;
  }
  