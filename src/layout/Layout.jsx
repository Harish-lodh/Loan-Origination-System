import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-16 ml-80 min-h-screen bg-gray-50">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
