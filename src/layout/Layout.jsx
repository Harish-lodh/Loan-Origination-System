import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminSidebar from './AdminSidebar'
const Layout = ({ role }) => {
  return (
    <>
      <Header />
       {role === "ADMIN" ? <AdminSidebar /> : <Sidebar />}
      <main className="pt-16 ml-80 min-h-screen bg-gray-50">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
