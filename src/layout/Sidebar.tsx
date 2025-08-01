import { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FeedbackIcon from "@mui/icons-material/Feedback";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { id: "trainings", label: "Trainings", icon: EmojiObjectsIcon, path: "/trainings" },
    { id: "employees", label: "Employees", icon: PeopleAltIcon, path: "/employees" },
    { id: "feedbacks", label: "Feedbacks", icon: FeedbackIcon, path: "/feedbacks" },
  ];

  const moduleItems = [
    { id: "Users", label: "Users", path: "/leads/users" },
    { id: "kyc", label: "Kyc", path: "/leads/kyc" },
   // { id: "account", label: "Account", path: "/account" },
  ];

  const otherItems = [
    { id: "inbox", label: "Inbox", path: "/inbox", icon: InboxIcon, badge: 14 },
    { id: "profile", label: "Profile", path: "/profile", icon: PersonIcon },
    { id: "settings", label: "Settings", path: "/settings", icon: SettingsIcon },
    { id: "logout", label: "Log Out", path: "/logout", icon: LogoutIcon },
  ];

  return (
    <div className="flex fixed w-full max-w-[20rem] flex-col rounded-xl bg-white p-4 text-gray-700 shadow-xl">
      <div className="flex items-center gap-4 p-4 mb-2">
        <img src="/logo.png" alt="brand" className="w-8 h-8" />
        <h5 className="text-xl font-semibold text-blue-gray-900 semi">LOS</h5>
      </div>

      <nav className="flex flex-col gap-1 text-base font-normal">
        {/* Main Items */}
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center w-full p-3 rounded-lg transition-all hover:bg-gray-200 ${
                isActive ? "text-blue-800 font-semibold" : "text-gray-700"
              }`
            }
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon className="mr-4" />
            {item.label}
          </NavLink>
        ))}

        {/* Leads Section */}
        <div className="relative block w-full mt-4">
          <button
            type="button"
            className="flex items-center justify-between w-full p-3 font-semibold text-left text-gray-700 hover:bg-gray-200"
          >
            <div className="flex items-center gap-3">
              <WidgetsIcon />
              <span>Leads</span>
            </div>
            <ArrowDropDownIcon />
          </button>

          <div className="mt-1">
            {moduleItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 pl-10 rounded-lg transition-all hover:bg-gray-200 ${
                    isActive ? "text-blue-800 font-semibold" : "text-gray-700"
                  }`
                }
                onClick={() => setActiveItem(item.id)}
              >
                <ChevronRightIcon className="mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Other Items */}
        {otherItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center w-full p-3 rounded-lg transition-all hover:bg-gray-200 ${
                isActive ? "text-blue-800 font-semibold" : "text-gray-700"
              }`
            }
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon className="mr-4" />
            {item.label}
            {item.badge && (
              <div className="ml-auto bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full font-bold">
                {item.badge}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
