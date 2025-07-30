import React, { useState, type ChangeEvent, type FormEvent } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
    leadImage: null as File | null
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked }: any = e.target;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data", formData);
  };

  const inputStyle = "flex items-center gap-4 mb-4";
const inputBoxStyle = "w-80 border border-gray-300 rounded px-3 py-2";

  return (
    <form
      onSubmit={handleSubmit}
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
              onChange={handleChange}
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
          ["Pin Code", "pinCode"]
        ].map(([label, name]) => (
          <div className={inputStyle} key={name}>
            <label className="w-40 text-right font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
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
          onChange={handleChange}
          className="border rounded px-3 mx-6 py-2 min-h-[80px]"
          placeholder="Enter lead description..."
        />
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
