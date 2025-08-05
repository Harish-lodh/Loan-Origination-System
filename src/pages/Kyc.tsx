import React, { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getKycOcrData } from '../api/api';

interface KycData {
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  pan: File | null;
  name: string;
  gender: string;
  dob: string;
  aadhaarNumber: string;
  address: string;
  panNumber: string;
  panHolderName: string;
  panFatherName: string;
  panDob: string;
}

const KycForm: React.FC = () => {
  const [formData, setFormData] = useState<KycData>({
    aadhaarFront: null,
    aadhaarBack: null,
    pan: null,
    name: '',
    gender: '',
    dob: '',
    aadhaarNumber: '',
    address: '',
    panNumber: '',
    panHolderName: '',
    panFatherName: '',
    panDob: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof KycData) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [key]: file });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const formatDateToInput = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  if (day && month && year) {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateString; // fallback if already formatted
};

const handleSubmit = async () => {
  const body = new FormData();
  if (formData.aadhaarFront) body.append('aadhaarFront', formData.aadhaarFront);
  if (formData.aadhaarBack) body.append('aadhaarBack', formData.aadhaarBack);
  if (formData.pan) body.append('pan', formData.pan);

  try {
    const data = await getKycOcrData(body); // ✅ already parsed
    setFormData((prev) => ({
      ...prev,
      name: data.aadhaarData?.name || '',
      gender: data.aadhaarData?.gender || '',
      dob: formatDateToInput(data.aadhaarData?.dob || data.panData?.dob || ''),
      aadhaarNumber: data.aadhaarData?.aadhaarNumber || '',
      address: data.aadhaarData?.address || '',
      panNumber: data.panData?.panNumber || '',
      panHolderName: data.panData?.name || '',
      panFatherName: data.panData?.fatherName || '',
      panDob: formatDateToInput(data.panData?.dob || ''),
    }));
  } catch (error) {
    console.error('Error extracting KYC data:', error);
  }
};


  const FileUploadBox = ({ label, accept, onChange, file, icon: Icon }:any) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-blue-50">
      <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <label className="cursor-pointer">
        <span className="text-sm font-medium text-gray-700 hover:text-blue-600">
          {file ? file.name : `Upload ${label}`}
        </span>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>
      {file && (
        <div className="mt-2">
          <CheckCircleOutlineIcon className="inline h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600 ml-1">Uploaded</span>
        </div>
      )}
    </div>
  );

  const InputField = ({ label, name, value, onChange, type = "text", required = false, options = null }:any) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option:any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required={required}
        />
      )}
    </div>
  );

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KYC Verification</h1>
          <p className="text-gray-600">Complete your Know Your Customer verification process</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white">
              <PersonOutlineIcon className="w-5 h-5" />
              <span className="font-medium">Aadhaar Card</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500 text-white">
              <CreditCardOutlinedIcon className="w-5 h-5" />
              <span className="font-medium">PAN Card</span>
            </div>
          </div>
        </div>

        {/* Aadhaar Card Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <PersonOutlineIcon className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Aadhaar Card Verification</h2>
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FileUploadBox
              label="Aadhaar Front"
              accept="image/*"
              onChange={(e:any) => handleFileChange(e, 'aadhaarFront')}
              file={formData.aadhaarFront}
              icon={CloudUploadOutlinedIcon}
            />
            <FileUploadBox
              label="Aadhaar Back"
              accept="image/*"
              onChange={(e:any) => handleFileChange(e, 'aadhaarBack')}
              file={formData.aadhaarBack}
              icon={CloudUploadOutlinedIcon}
            />
          </div>

          {/* Extract Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              disabled={!formData.aadhaarFront || !formData.aadhaarBack}
            >
              Extract Aadhaar Details
            </button>
          </div>

          {/* Aadhaar Details Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Aadhaar Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={genderOptions}
                required
              />
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <InputField
                label="Aadhaar Number"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* PAN Card Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <CreditCardOutlinedIcon className="w-8 h-8 text-purple-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">PAN Card Verification</h2>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <FileUploadBox
              label="PAN Card"
              accept="image/*"
              onChange={(e:any) => handleFileChange(e, 'pan')}
              file={formData.pan}
              icon={InsertDriveFileOutlinedIcon}
            />
          </div>

          {/* Extract Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              disabled={!formData.pan}
            >
              Extract PAN Details
            </button>
          </div>

          {/* PAN Details Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">PAN Card Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                required
              />
              <InputField
                label="PAN Holder Name"
                name="panHolderName"
                value={formData.panHolderName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Father's Name"
                name="panFatherName"
                value={formData.panFatherName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Date of Birth (PAN)"
                name="panDob"
                type="date"
                value={formData.panDob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg">
            Submit KYC Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
