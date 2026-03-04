import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  ClipboardList,
  PlusCircle,
  Settings,
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const links = [
    { label: "Feed", path: "/dashboard/feed", icon: LayoutDashboard },
    { label: "My Tasks", path: "/dashboard/my-tasks", icon: CheckSquare },
    { label: "Requests", path: "/dashboard/requests", icon: FileText },
    { label: "My Requests", path: "/dashboard/my-requests", icon: ClipboardList },
    { label: "Add Task", path: "/dashboard/add-task", icon: PlusCircle },
    { label: "Settings", path: "/dashboard/settings", icon: Settings }
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 h-screen left-0 z-40 w-[260px] bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 md:sticky md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <h2 className="text-white text-lg font-extrabold tracking-tight">
            Hire-a-Helper
          </h2>
        </div>

        {/* Mobile close */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-slate-400"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={isLoggedIn ? link.path : "/login"}
              onClick={() => { setIsOpen(false), handleNavClick }}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-radius border-l-4 transition-all ${
                  isActive
                    ? "bg-slate-800/80 text-white font-semibold border-primary"
                    : "text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200"
                }`
              }
            >
              <Icon size={20} />
              <span className="flex-1 text-sm">{link.label}</span>

              {link.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Auth Button */}
      <div className="p-6 border-t border-slate-800">
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition"
          >
            Login
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
