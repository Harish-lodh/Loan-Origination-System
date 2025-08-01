import { Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import LeadForm from "../pages/CreateLeads";
import Applications from "../pages/Applications";
import Layout from "../layout/Layout";
// import ProtectedRoute from "../utils/ProtectedRoute";
import Lap from "../pages/Products/Lap";
import Educationloan from "../pages/Products/Educationloan";
import LeadTable from "../pages/Leads";
import ContactTable from "../pages/Contacts/contacts";
import Supplychain from "../pages/Products/Supplychain";

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
                path="/"
                // element={
                //     <ProtectedRoute>
                //         <Layout />
                //     </ProtectedRoute>
                // }
                element={
                    <Layout/>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="leads/users" element={<LeadTable />} />
                <Route path="leads/create" element={<LeadForm />} />
                <Route path="applications" element={<Applications />} />
                <Route path="/contacts" element={<ContactTable/>}/>

                <Route path="Product">
                    <Route path="lap" element={<Lap/>}/>
                    <Route path="supply-chain" element={<Supplychain/>}/>
                    <Route path="education-loan" element={<Educationloan/>}/>
                    <Route/>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
