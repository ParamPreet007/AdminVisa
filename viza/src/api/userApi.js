import { api } from "./axios";

export const createUserAPI = async (payload) => {
  try {
    const response = await api.post('/api/v1/auth/createAccount',payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsersAPI = async () => {
  try {
    const response = await api.get('/api/v1/auth/allusers');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deactivateUserAPI = async (userId) => {
  try {
    const response = await api.put(`/api/v1/auth/deactivate/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};