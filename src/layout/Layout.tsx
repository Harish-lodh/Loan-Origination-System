import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar has fixed width and fixed positioning */}
      <Sidebar />

      {/* Push main content to the right of fixed sidebar */}
      <div className="ml-[20rem] p-6 w-full bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
