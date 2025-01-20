export const PublicRoutes = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export const PrivateRoutes = {
    PRIVATE: "/w",
    HOME: (idWorkspace: string) => `/w/${idWorkspace}/home`,
    MEMBERS: (idWorkspace: string) => `/w/${idWorkspace}/members`,
    MEMBERS_GUESTS: (idWorkspace: string) => `/w/${idWorkspace}/members/guests`,
    MEMBERS_REQUEST: (idWorkspace: string) => `/w/${idWorkspace}/members/request`,
    ACCOUNT: (idWorkspace: string) => `/w/${idWorkspace}/account`,
    BILLING: (idWorkspace: string) => `/w/${idWorkspace}/billing`,
    BOARD: (idBoard: string, nameBoard: string) => `/b/${idBoard}/${nameBoard}`,
  };