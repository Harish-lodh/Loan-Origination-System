import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getKycOcrData } from '../../api/api';
import Select from 'react-select';

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

interface FormData {
  leadOwner: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  mobile: string;
  leadSource: string;
  industry: string;
  annualRevenue: string;
  emailOptOut: boolean;
  company: string;
  email: string;
  fax: string;
  website: string;
  leadStatus: string;
  noOfEmployees: string;
  rating: string;
  skypeId: string;
  secondaryEmail: string;
  twitter: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  description: string;
  leadImage: File | null;
}

interface DocumentOption {
  value: string;
  label: string;
}

interface FileUploadBoxProps {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  icon: React.ComponentType<any>;
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[] | null;
}

const LeadForm: React.FC = () => {
  const [kycData, setKycData] = useState<KycData>({
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

  const [formData, setFormData] = useState<FormData>({
    leadOwner: "harish lodh",
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    mobile: "",
    leadSource: "",
    industry: "",
    annualRevenue: "",
    emailOptOut: false,
    company: "",
    email: "",
    fax: "",
    website: "",
    leadStatus: "",
    noOfEmployees: "",
    rating: "",
    skypeId: "",
    secondaryEmail: "",
    twitter: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    description: "",
    leadImage: null
  });

  const documentOptions: DocumentOption[] = [
    { value: 'aadhar_card', label: 'Aadhaar Card' },
    { value: 'pan_card', label: 'PAN Card' },
    { value: 'voter_id', label: 'Voter ID' },
    { value: 'passport', label: 'Passport' },
    { value: 'bank_statement', label: 'Bank Statement' },
    { value: 'home_paper', label: 'Home Papers' },
    { value: 'light_bill', label: 'Light Bill' },
    { value: 'salary_slip', label: 'Salary Slip' },
    { value: 'bank_passbook', label: 'Bank Passbook' },
    { value: 'income_certificate', label: 'Income Certificate' },
    { value: 'property_documents', label: 'Property Documents' },
    { value: 'gst_certificate', label: 'GST Certificate' },
  ];

  interface UploadedDocument {
    id: string;
    type: DocumentOption;
    file: File;
    uploadedAt: Date;
  }

  const [selectedDocument, setSelectedDocument] = useState<DocumentOption | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDocumentUpload = () => {
    if (!selectedDocument || !file) {
      alert('Please select document type and upload a file.');
      return;
    }

    const newDocument: UploadedDocument = {
      id: Date.now().toString(),
      type: selectedDocument,
      file: file,
      uploadedAt: new Date()
    };

    setUploadedDocuments([...uploadedDocuments, newDocument]);
    setSelectedDocument(null);
    setFile(null);
    setUploadStatus('Document uploaded successfully!');
    
    setTimeout(() => setUploadStatus(''), 3000);
  };

  const handleRemoveDocument = (id: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
  };

  const handleFormDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        leadImage: e.target.files![0]
      }));
    }
  };

  const inputStyle = "flex items-center gap-4 mb-4";
  const inputBoxStyle = "w-80 border border-gray-300 rounded px-3 py-2";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof KycData) => {
    const file = e.target.files?.[0] || null;
    setKycData({ ...kycData, [key]: file });
  };

  const handleKycChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setKycData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateToInput = (dateString: string): string => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString; // fallback if already formatted
  };

  const handleKycSubmit = async () => {
    const body = new FormData();
    if (kycData.aadhaarFront) body.append('aadhaarFront', kycData.aadhaarFront);
    if (kycData.aadhaarBack) body.append('aadhaarBack', kycData.aadhaarBack);
    if (kycData.pan) body.append('pan', kycData.pan);

    try {
      const data = await getKycOcrData(body);
      setKycData((prev) => ({
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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Submitted Lead Data", formData);
    console.log("Submitted KYC Data", kycData);
    console.log("Uploaded Documents", uploadedDocuments);
    
    // Here you would typically send the data to your API
    // You can include the uploadedDocuments in your API call
    
    alert(`Form submitted successfully! 
    Lead created with ${uploadedDocuments.length} additional documents.`);
  };

  const FileUploadBox: React.FC<FileUploadBoxProps> = ({ 
    label, 
    accept, 
    onChange, 
    file, 
    icon: Icon 
  }) => (
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

  const InputField: React.FC<InputFieldProps> = ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text", 
    required = false, 
    options = null 
  }) => (
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
          {options.map((option) => (
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
    <form
      onSubmit={handleFormSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Create New Lead
      </h1>

      {/* Lead Image */}
      <div className="mb-6">
        <label className="flex items-center font-semibold mb-2 text-gray-700">
          <AccountCircleIcon className="mr-2 text-blue-700" />
          Lead Image
        </label>

        <input
          type="file"
          name="leadImage"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-800 hover:file:bg-blue-100"
        />

        {formData.leadImage && (
          <img
            src={URL.createObjectURL(formData.leadImage)}
            alt="Lead Preview"
            className="mt-3 h-24 w-24 object-cover rounded border border-gray-300"
          />
        )}
      </div>

      {/* Lead Information */}
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        Lead Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {[
          ["Lead Owner", "leadOwner"],
          ["Company", "company"],
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Mobile", "mobile"],
          ["Lead Source", "leadSource"],
          ["Industry", "industry"],
          ["Annual Revenue (Rs.)", "annualRevenue"],
          ["Email", "email"],
          ["Lead Status", "leadStatus"],
          ["No. of Employees", "noOfEmployees"],
        ].map(([label, name]) => (
          <div className={inputStyle} key={name}>
            <label className="w-50 text-right font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={(formData as any)[name]}
              onChange={handleFormDataChange}
              className={inputBoxStyle}
            />
          </div>
        ))}
      </div>

      {/* Address Information */}
      <h2 className="text-xl font-semibold mt-10 mb-4 text-blue-800">
        Address Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {[
          ["Street", "street"],
          ["City", "city"],
          ["State", "state"],
          ["Country", "country"],
          ["Pin Code", "zipCode"]
        ].map(([label, name]) => (
          <div className={inputStyle} key={name}>
            <label className="w-40 text-right font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={(formData as any)[name]}
              onChange={handleFormDataChange}
              className={inputBoxStyle}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <h2 className="text-xl font-semibold mt-10 mb-2 text-blue-800">
        Description
      </h2>
      <div className="flex flex-col">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormDataChange}
          className="border rounded px-3 mx-6 py-2 min-h-[80px]"
          placeholder="Enter lead description..."
        />
      </div>

      {/* KYC Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 mt-8">
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
                onChange={(e) => handleFileChange(e, 'aadhaarFront')}
                file={kycData.aadhaarFront}
                icon={CloudUploadOutlinedIcon}
              />
              <FileUploadBox
                label="Aadhaar Back"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'aadhaarBack')}
                file={kycData.aadhaarBack}
                icon={CloudUploadOutlinedIcon}
              />
            </div>

            {/* Extract Button */}
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={handleKycSubmit}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                disabled={!kycData.aadhaarFront || !kycData.aadhaarBack}
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
                  value={kycData.name}
                  onChange={handleKycChange}
                  required
                />
                <InputField
                  label="Gender"
                  name="gender"
                  value={kycData.gender}
                  onChange={handleKycChange}
                  options={genderOptions}
                  required
                />
                <InputField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={kycData.dob}
                  onChange={handleKycChange}
                  required
                />
                <InputField
                  label="Aadhaar Number"
                  name="aadhaarNumber"
                  value={kycData.aadhaarNumber}
                  onChange={handleKycChange}
                  required
                />
              </div>

              <InputField
                label="Address"
                name="address"
                value={kycData.address}
                onChange={handleKycChange}
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
                onChange={(e) => handleFileChange(e, 'pan')}
                file={kycData.pan}
                icon={InsertDriveFileOutlinedIcon}
              />
            </div>

            {/* Extract Button */}
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={handleKycSubmit}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                disabled={!kycData.pan}
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
                  value={kycData.panNumber}
                  onChange={handleKycChange}
                  required
                />
                <InputField
                  label="PAN Holder Name"
                  name="panHolderName"
                  value={kycData.panHolderName}
                  onChange={handleKycChange}
                  required
                />
                <InputField
                  label="Father's Name"
                  name="panFatherName"
                  value={kycData.panFatherName}
                  onChange={handleKycChange}
                  required
                />
                <InputField
                  label="Date of Birth (PAN)"
                  name="panDob"
                  type="date"
                  value={kycData.panDob}
                  onChange={handleKycChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="button"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
            >
              Submit KYC Verification
            </button>
          </div>
        </div>
      </div>

      {/* Additional Document Upload Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <InsertDriveFileOutlinedIcon className="w-8 h-8 text-green-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Additional Document Upload</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Upload additional financing documents such as home papers, light bills, salary slips, etc.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Document Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Document Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedDocument}
              onChange={setSelectedDocument}
              options={documentOptions}
              placeholder="Choose document type..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Document <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleUploadFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-4
                     file:rounded-lg file:border-0 file:text-sm file:font-semibold
                     file:bg-green-50 file:text-green-800 hover:file:bg-green-100
                     border border-gray-300 rounded-lg"
              />
            </div>
            {file && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleDocumentUpload}
            disabled={!selectedDocument || !file}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Add Document
          </button>
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div className="text-center mb-6">
            <p className="text-green-600 font-medium">{uploadStatus}</p>
          </div>
        )}

        {/* Uploaded Documents List */}
        {uploadedDocuments.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Uploaded Documents ({uploadedDocuments.length})
            </h3>
            
            <div className="grid gap-4">
              {uploadedDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <InsertDriveFileOutlinedIcon className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.type.label}</h4>
                      <p className="text-sm text-gray-600">{doc.file.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded: {doc.uploadedAt.toLocaleString()} • 
                        Size: {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 rounded border border-red-300 hover:border-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-3 rounded transition"
        >
          Submit Lead
        </button>
      </div>
    </form>
  );
};

export default LeadForm;