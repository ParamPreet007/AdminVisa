import { api } from "./axios";

export const getAllUserStatusApi = async () => {
  try {
    const response = await api.get('/api/v1/auth/statusUser');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const totalApplicationSubmitRejectAPI  = async () => {
  try {
    const response = await api.get('/api/v1/application/totalApplicationStatus');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const totalOfficerApi  = async () => {
  try {
    const response = await api.get('/api/v1/auth/getOfficer');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const currentMonthDataAPI  = async () => {
  try {
    const response = await api.get('/api/v1/application/monthWiseAPI');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};