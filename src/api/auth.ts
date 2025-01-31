import axiosInstance from "./axiosInstance";

export interface RegisterUserData{
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    workspaces: string[]
    token?: string; // Solo para el login
    expiresIn?: number; // Solo para el login
}

export const registerUser = async (userData : RegisterUserData): Promise<void> => {
    await axiosInstance.post<User>("/auth/signup", userData);
    
}

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
    const response = await axiosInstance.post<User>("/auth/login", credentials);
    return response.data;
}

export const getUserProfile = async (): Promise<User> => {
    const response = await axiosInstance.get("/me");
    return response.data;
}