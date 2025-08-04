import React, { useState } from "react";
import { extractTextFromImage } from "../utils/OcrUtils"; // ✅ Your OCR logic here
import { Box, TextField, Typography, Button, Grid, Paper } from "@mui/material";

interface KycData {
  selfie: File | null;
  aadhaarFront: File | null;
  panFront: File | null;
  aadhaarNumber: string;
  aadhaarName: string;
  aadhaarGender: string;
  aadhaarAddress: string;
  panNumber: string;
  panName: string;
  panDob: string;
  panGender: string;
}

const initialKycData: KycData = {
  selfie: null,
  aadhaarFront: null,
  panFront: null,
  aadhaarNumber: "",
  aadhaarName: "",
  aadhaarGender: "",
  aadhaarAddress: "",
  panNumber: "",
  panName: "",
  panDob: "",
  panGender: "",
};

const KYCForm: React.FC = () => {
  const [kycData, setKycData] = useState<KycData>(initialKycData);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof KycData) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setKycData((prev) => ({ ...prev, [field]: file }));

    if (field === "aadhaarFront" || field === "panFront") {
      setLoading(true);
      try {
        const extractedData = await extractTextFromImage(file, field);
        if (field === "aadhaarFront") {
          setKycData((prev) => ({
            ...prev,
            aadhaarNumber: extractedData.number || prev.aadhaarNumber,
            aadhaarName: extractedData.name || prev.aadhaarName,
            aadhaarGender: extractedData.gender || prev.aadhaarGender,
            aadhaarAddress: extractedData.address || prev.aadhaarAddress,
          }));
        } else if (field === "panFront") {
          setKycData((prev) => ({
            ...prev,
            panNumber: extractedData.number || prev.panNumber,
            panName: extractedData.name || prev.panName,
            panDob: extractedData.dob || prev.panDob,
            panGender: extractedData.gender || prev.panGender,
          }));
        }
      } catch (err) {
        console.error("OCR Failed", err);
      }
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setKycData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("KYC Data Submitted", kycData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        KYC Form
      </Typography>

      <Grid container spacing={2}>
        {/* Upload Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Upload Selfie</Typography>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "selfie")} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Upload Aadhaar Front</Typography>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "aadhaarFront")} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Upload PAN</Typography>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "panFront")} />
        </Grid>

        {/* Aadhaar Fields */}
        <Grid item xs={12}>
          <Typography variant="h6">Aadhaar Details</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Aadhaar Number" fullWidth name="aadhaarNumber" value={kycData.aadhaarNumber} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" fullWidth name="aadhaarName" value={kycData.aadhaarName} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Gender" fullWidth name="aadhaarGender" value={kycData.aadhaarGender} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" fullWidth multiline name="aadhaarAddress" value={kycData.aadhaarAddress} onChange={handleInputChange} />
        </Grid>

        {/* PAN Fields */}
        <Grid item xs={12}>
          <Typography variant="h6">PAN Details</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="PAN Number" fullWidth name="panNumber" value={kycData.panNumber} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" fullWidth name="panName" value={kycData.panName} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Date of Birth" type="date" fullWidth name="panDob" value={kycData.panDob} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Gender" fullWidth name="panGender" value={kycData.panGender} onChange={handleInputChange} />
        </Grid>

        {/* Submit */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Submit KYC"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default KYCForm;
