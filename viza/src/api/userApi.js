import axios from "axios";
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
    console.log(response,'get the reponse here axios ')
    return response.data;

    }
    catch(error){
        console.log(error)
    }
}

export const activateUserApi = async(id)=>{
   try {
    const response = await api.put(`/api/v1/auth/activateUser/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const deleteUserAPI = async(id)=>{
   try {
    const response = await api.delete(`/api/v1/auth/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getAllFormSubmitUser = async () => {
  try {
    const response = await api.get('/api/v1/application/allusers');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const approveApplication = async (userId, approvedStatus, officerComment) => {
  try {
    const response = await api.patch(`/api/v1/application/status/${userId}`, {
      approvedStatus,
      officerComment,
    });

    return response.data;
  } catch (error) {
    console.error('Approval failed', error);
    throw error;
  }
}
 export const handleDownload = async () => {
   

    try {
      const response = await axios.get('http://localhost:7000/api/v1/application/applicationDetail', {
        responseType: 'blob', // Important for handling binary data (Excel file)
        withCredentials: true, // Send cookies
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Applications.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up
    } catch (err) {
      console.error('Download error:', err);
    } 
  };