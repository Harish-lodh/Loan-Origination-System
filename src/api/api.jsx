import axiosInstance from './axiosInstance';

export const getKycOcrData = async () => {
  try {
    const response = await axiosInstance.post('/ocr/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // ✅ already parsed JSON
  } catch (error) {
    console.error('OCR request failed:', error);
    throw error;
  }
};
