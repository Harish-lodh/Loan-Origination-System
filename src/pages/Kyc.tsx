import React, { useState } from 'react';
import {
  CheckCircleOutline,
  HighlightOff,
  Person,
  CreditCard,
  UploadFile,
  VerifiedUser,
  ErrorOutline
} from '@mui/icons-material';
import Select from 'react-select';

interface KycData {
  image_selfie: string;
  selfie_lat: string;
  selfie_long_address: string;
  selfie_timestamp: string;
  pan_front: string;
  pan_back: string;
  pan_date_of_birth: string;
  pan_gender: string;
  pan_full_address: string;
  pan_mobile_number: string;
  pan_number: string;
  pan_email: string;
  pan_verification: string;
  aadhaar_linked: string;
  registered_name: string;
  aadhaar_front: string;
  aadhaar_back: string;
  aadhaar_number: string;
  aadhaar_status_code: string;
  aadhaar_state: string;
  aadhaar_age_band: string;
  aadhaar_gender: string;
  aadhaar_masked_mobile: string;
  aadhaar_status_message: string;
  aadhaar_verification: string;
}

const initialData: KycData = {
  image_selfie: '/files/WhatsApp Image 2025-08-01 at 1.46.56 PM.jpeg',
  selfie_lat: '15.860664',
  selfie_long_address: '75.107419',
  selfie_timestamp: '01-08-2025 13:47:45\nAsia/Kolkata',
  pan_front: '/private/files/ಪಠ್ಯ app-2.pdf',
  pan_back: '',
  pan_date_of_birth: '12-07-1992',
  pan_gender: 'MALE',
  pan_full_address: 'hno 375, muchchandiyavar oni, manoli, belk',
  pan_mobile_number: '88XXXXXX86',
  pan_number: 'DTGPK0648E',
  pan_email: 'ra********dv@gmail.com',
  pan_verification: 'Done',
  aadhaar_linked: 'Done',
  registered_name: 'ARIF KALLOLI',
  aadhaar_front: '/private/files/ಪಠ್ಯ app-3.pdf',
  aadhaar_back: '/private/files/ಪಠ್ಯ app-4.pdf',
  aadhaar_number: '568400680306',
  aadhaar_status_code: 'NA',
  aadhaar_state: 'KA',
  aadhaar_age_band: 'NA',
  aadhaar_gender: 'MALE',
  aadhaar_masked_mobile: 'YES',
  aadhaar_status_message: '',
  aadhaar_verification: 'Done'
};

const Kyc: React.FC = () => {
  const [kycData] = useState<KycData>(initialData);
  const isAadhaarVerified = kycData.aadhaar_verification === 'Done';
  const isPanVerified = kycData.pan_verification === 'Done';

  const renderTextField = (label: string, value: string) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-blue-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none"
      />
    </div>
  );

  const renderFileField = (label: string, filePath: string) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-blue-700 mb-2">{label}</label>
      <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UploadFile className="text-gray-500" />
          {filePath ? (
            <a
              href={filePath}
              className="text-blue-600 hover:underline text-sm"
              target="_blank"
              rel="noreferrer"
            >
              {filePath.split('/').pop()}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">No file attached</span>
          )}
        </div>
        {filePath && (
          <button className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50">
            Clear
          </button>
        )}
      </div>
    </div>
  );

  const VerificationHeader = ({ title, isVerified, icon: Icon }: { title: string; isVerified: boolean; icon: React.ElementType }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
        isVerified ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isVerified ? <CheckCircleOutline className="w-4 h-4" /> : <HighlightOff className="w-4 h-4" />}
        {isVerified ? 'Successfully Verified' : 'Unable to Verify'}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">KYC Verification Dashboard</h1>
          <p className="text-gray-600 text-lg">Customer Identity Verification Summary</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Person className="text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Customer Information</h3>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderTextField('Registered Name', kycData.registered_name)}
            {renderTextField('Mobile Number', kycData.pan_mobile_number)}
            {renderTextField('Email Address', kycData.pan_email)}
            {renderTextField('Full Address', kycData.pan_full_address)}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <VerifiedUser className="text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800">Selfie Verification</h3>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderFileField('Selfie Image', kycData.image_selfie)}
            {renderTextField('Capture Timestamp', kycData.selfie_timestamp)}
            {renderTextField('Latitude', kycData.selfie_lat)}
            {renderTextField('Longitude', kycData.selfie_long_address)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white border-2 rounded-xl overflow-hidden ${isAadhaarVerified ? 'border-green-200' : 'border-red-200'}`}>
            <div className={`${isAadhaarVerified ? 'bg-green-50' : 'bg-red-50'} px-6 py-4`}>
              <VerificationHeader title="Aadhaar Verification" isVerified={isAadhaarVerified} icon={CreditCard} />
            </div>
            <div className="p-6">
              {renderTextField('Aadhaar Number', kycData.aadhaar_number)}
              {renderFileField('Aadhaar Front', kycData.aadhaar_front)}
              {renderFileField('Aadhaar Back', kycData.aadhaar_back)}
              {renderTextField('Gender', kycData.aadhaar_gender)}
              {renderTextField('State', kycData.aadhaar_state)}
              {renderTextField('Age Band', kycData.aadhaar_age_band || 'NA')}
              {renderTextField('Masked Mobile', kycData.aadhaar_masked_mobile)}
              {renderTextField('Status Code', kycData.aadhaar_status_code || 'NA')}
              {renderTextField('Status Message', kycData.aadhaar_status_message || 'Verification Completed')}
              {renderTextField('Linked Status', kycData.aadhaar_linked)}
            </div>
          </div>

          <div className={`bg-white border-2 rounded-xl overflow-hidden ${isPanVerified ? 'border-green-200' : 'border-red-200'}`}>
            <div className={`${isPanVerified ? 'bg-green-50' : 'bg-red-50'} px-6 py-4`}>
              <VerificationHeader title="PAN Verification" isVerified={isPanVerified} icon={CreditCard} />
            </div>
            <div className="p-6">
              {renderTextField('PAN Number', kycData.pan_number)}
              {renderFileField('PAN Front', kycData.pan_front)}
              {renderFileField('PAN Back', kycData.pan_back || '')}
              {renderTextField('Date of Birth', kycData.pan_date_of_birth)}
              {renderTextField('Gender', kycData.pan_gender)}
              {renderTextField('Verification Status', kycData.pan_verification)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className={`inline-block p-6 rounded-xl border-2 ${
            (isAadhaarVerified && isPanVerified)
              ? 'bg-green-50 border-green-200'
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Overall KYC Status</h3>
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-bold ${
              (isAadhaarVerified && isPanVerified)
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
            }`}>
              {(isAadhaarVerified && isPanVerified) ? (
                <>
                  <CheckCircleOutline className="w-6 h-6" />
                  KYC Fully Verified
                </>
              ) : (
                <>
                  <ErrorOutline className="w-6 h-6" />
                  Partial Verification
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
