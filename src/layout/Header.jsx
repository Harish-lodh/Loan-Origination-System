import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/Fintree-Logo.jpg";

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const d = jwtDecode(token);
      const name = d.fullName || d.username || d.email || "";
      setDisplayName(name);
    } catch {
      setDisplayName("");
    }
  }, []);

  // close dropdown on outside click / Esc
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-16 bg-white
        border-b border-gray-200
        flex items-center
        px-4 z-50
      "
    >
      {/* LEFT: Brand */}
      <div className="flex items-center gap-3 ml-2">
        <img src={logo} alt="Fintree" className="h-8 w-auto object-contain" />
        <h1 className="text-base sm:text-base font-bold text-gray-800">
          Loan Origination System
        </h1>
      </div>

      {/* RIGHT: Profile dropdown */}
      <div ref={menuRef} className="relative ml-auto">
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setOpen((s) => !s)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <AccountCircleIcon />
          <span className="text-sm font-medium text-gray-800 truncate max-w-[220px]">
           {displayName || "User"}
          </span>
          <KeyboardArrowDownIcon
            className={`text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-md p-1"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-left text-sm text-gray-800"
              role="menuitem"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
