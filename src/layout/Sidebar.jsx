import { NavLink } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const moduleItems = [
    { id: "Pipelines", label: "PipeLines", path: "/leads/users" },
    { id: "kyc", label: "Kyc", path: "/leads/kyc" },
  ];

  const productItems = [
    { id: "LAP", label: "Loan Against Property", path: "/Product/lap" },
    { id: "Supplychain", label: "Supply Chain", path: "/Product/supply-chain" },
    { id: "EducationLoan", label: "Education Loan", path: "/Product/education-loan" },
  ];

  const otherItems = [
    { id: "inbox", label: "Inbox", path: "/inbox", icon: InboxIcon, badge: 14 },
    { id: "profile", label: "Profile", path: "/profile", icon: PersonIcon },
    { id: "settings", label: "Settings", path: "/settings", icon: SettingsIcon },
    { id: "logout", label: "Log Out", path: "/logout", icon: LogoutIcon },
  ];

  return (
    <div className="flex fixed w-full max-w-[20rem] flex-col rounded-xl bg-white p-4 text-gray-700 shadow-xl">
      <div className="flex items-center gap-4 p-2 mb-4">
        <img src="/logo.png" alt="brand" className="w-8 h-8" />
        <h5 className="text-lg font-bold text-blue-gray-900">Loan Origination System</h5>
      </div>

      <nav className="flex flex-col text-base font-normal">

        {/* Dashboard Link */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 w-full p-3 rounded-lg transition-all hover:bg-gray-200 ${
              isActive ? "text-blue-800 font-semibold bg-gray-100" : "text-gray-700"
            }`
          }
        >
          <WidgetsIcon />
          <span>Dashboard</span>
        </NavLink>

        {/* Leads Section */}
        <div className="relative block w-full ">
          <div className="flex items-center justify-between w-full p-3 font-semibold text-gray-700">
            <div className="flex items-center gap-3">
              <WidgetsIcon />
              <span>Leads</span>
            </div>
            <ArrowDropDownIcon />
          </div>
          <div className="mt-1">
            {moduleItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 mb-1 pl-10 rounded-lg transition-all hover:bg-gray-200 ${
                    isActive ? "text-blue-800 font-semibold bg-gray-100" : "text-gray-700"
                  }`
                }
              >
                <ChevronRightIcon className="mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Contacts Link */}
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex items-center gap-3 w-full p-3 mt-4 rounded-lg transition-all hover:bg-gray-200 ${
              isActive ? "text-blue-800 font-semibold bg-gray-100" : "text-gray-700"
            }`
          }
        >
          <WidgetsIcon />
          <span>Contacts</span>
        </NavLink>

        {/* Company Link */}
        <div className="relative block w-full mt-4">
          <div className="flex items-center gap-3 p-3 font-semibold text-gray-700">
            <WidgetsIcon />
            <span>Company</span>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative block w-full mt-4">
          <div className="flex items-center justify-between w-full p-3 font-semibold text-gray-700">
            <div className="flex items-center gap-3">
              <WidgetsIcon />
              <span>Products</span>
            </div>
            <ArrowDropDownIcon />
          </div>
          <div className="mt-1">
            {productItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 pl-10 rounded-lg transition-all hover:bg-gray-200 ${
                    isActive ? "text-blue-800 font-semibold bg-gray-100" : "text-gray-700"
                  }`
                }
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
                isActive ? "text-blue-800 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
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
