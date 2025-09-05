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

export async function sendDocumenstsDetails({ formData, kycData, uploadedDocuments }) {
  const fd = new FormData();

  // 1) append the JSON (no files) as one string field
  const documentsMeta = uploadedDocuments.map((d) => ({
    type: d.type?.value || d.type,         // 'bank_statement'
    filename: d.file?.name || '',          // to help debugging / matching by index
  }));
  const payload = { formData, kycData, documentsMeta };
  fd.append('payload', JSON.stringify(payload));

  // 2) single-file fields (optional)
  if (formData.leadImage) fd.append('leadImage', formData.leadImage);
  if (kycData.aadhaarFront) fd.append('aadhaarFront', kycData.aadhaarFront);
  if (kycData.aadhaarBack)  fd.append('aadhaarBack',  kycData.aadhaarBack);
  if (kycData.pan)          fd.append('pan',          kycData.pan);

  // 3) variable documents – order matters (match documentsMeta by index)
  uploadedDocuments.forEach((d) => {
    if (d.file) fd.append('documents', d.file);
  });

  const res = await axiosInstance.post('/leads', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}