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

export const getUserStatusActiveAPI =async(userId)=>{
   try {
    const response = await api.get(`/api/v1/application/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }  
}
export const submitUserFormAPi = async(applicationData)=>{
        const formData = new FormData();
    
    // Add text fields
    formData.append('father', applicationData.father);
    formData.append('address', applicationData.address);
    formData.append('city', applicationData.city);
    formData.append('state', applicationData.state);
    formData.append('visaType', applicationData.visaType);
    
    // Add files if they exist
    if (applicationData.photo) {
      formData.append('photo', applicationData.photo);
    }
    if (applicationData.aadhar) {
      formData.append('aadhar', applicationData.aadhar);
    }
    if (applicationData.passport) {
      formData.append('passport', applicationData.passport);
    }
    try{
         const response = await api.post('/api/v1/application/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;

    }
    catch(error){
        console.log(error)
    }
}

