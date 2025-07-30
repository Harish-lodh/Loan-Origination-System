import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import LeadForm from "../pages/CreateLeads";
import Applications from "../pages/Applications";
import Layout from "../layout/Layout";
import ProtectedRoute from "../utils/ProtectedRoute";
import LeadTable from "../pages/Leads";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="leads" element={<LeadTable />} />
                <Route path="leads/create" element={<LeadForm />} />
                <Route path="applications" element={<Applications />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
