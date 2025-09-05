// src/routes/AppRoutes.tsx
import { Routes, Route, Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LeadForm from "../components/leads/LeadForm";
import Applications from "../pages/Applications";
import Layout from "../layout/Layout";
import ProtectedRoute from "../utils/ProtectedRoute";
import Lap from "../pages/Products/Lap";
import Educationloan from "../pages/Products/Educationloan";
import Users from "../pages/users";
import Login from "../pages/Login";
import ContactTable from "../pages/Contacts/contacts";
import Supplychain from "../pages/Products/Supplychain";
// import CreateLeads from "../pages/CreateLeads";

import CreateUser from '../pages/createUser'
const AppRoutes = () => {


    function AdminPage() {
        return <h2>Admin Only</h2>;
    }
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="ADMIN">
                        <Layout role="ADMIN" />
                    </ProtectedRoute>
                }
            >
                {/* All paths here are RELATIVE to /admin */}
                <Route index element={<Dashboard />} />               {/* /admin */}
                <Route path="dashboard" element={<Dashboard />} />    {/* /admin/dashboard */}
                <Route path="leads" element={<AdminPage />} />  
                 <Route path="products" element={<AdminPage />} />    
            </Route>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }

            >
                <Route index  element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} /> 

                <Route path="create/users" element={<CreateUser />} />
                <Route path="leads/users" element={<Users />} />
                <Route path="leads/create" element={<LeadForm />} />
                {/* <Route path="leads/kyc" element={<KycForm />} /> */}
                <Route path="applications" element={<Applications />} />
                <Route path="/contacts" element={<ContactTable />} />

                <Route path="Product">
                    <Route path="lap" element={<Lap />} />
                    <Route path="supply-chain" element={<Supplychain />} />
                    <Route path="education-loan" element={<Educationloan />} />
                    <Route />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
