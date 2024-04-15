import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${baseURL}/auth/login`, {
    email,
    password,
  });
  
  return response.data;
};