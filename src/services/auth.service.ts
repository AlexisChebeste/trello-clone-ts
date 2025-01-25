import axios from 'axios';
import { IUser } from '../types';

const API_URL = 'https://api.example.com/auth';

export const loginService = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerService = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};
