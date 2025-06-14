import { api } from "./axios";

export const signup = async (payload) => {
  try {
    const response = await api.post('/api/v1/auth/signup/', payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const loginApi = async (credentials) => {
  try {
    const response = await api.post('/api/v1/auth/login/', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgetPassword = async (credentials) => {
  try {
    const response = await api.post('/api/v1/auth/forgetPassword', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const resetPassword = async (otp,payload) =>{
   try {
    const response = await api.post('/api/v1/auth/resetPassword'+"/"+otp, payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}