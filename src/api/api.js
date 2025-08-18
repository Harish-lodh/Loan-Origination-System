import axios from 'axios';
import axiosInstance from './axiosInstance';
import { Email, Password } from '@mui/icons-material';

// ✅ Function to get OCR data
export const getKycOcrData = async (formData) => {
  try {
    const response = await axiosInstance.post('/ocr/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('OCR request failed:', error);
    throw error;
  }
};

// ✅ Function to verify PAN
export const panVerify = async (body) => {
  console.log("this is body",body)
    const response = await axiosInstance.post('/kyc/pan-verify', body);
    return response.data;
};

export const getToken=async (body)=>{
 const response = await axiosInstance.post("/auth/login", body);
    return response; 
}
export const createUser = async (body)=>{
  const res= await axiosInstance.post("/users/create",body)
  return res;
}

export const sendDocumenstsDetails=async(body)=>{
  const res= await axiosInstance.post("/leads/upload",body)
  return res;
}