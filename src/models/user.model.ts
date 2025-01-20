import { Roles } from "./roles";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    rol?: Roles;
}