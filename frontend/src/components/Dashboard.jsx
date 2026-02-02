import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Search,
  User,
  Settings as SettingsIcon,
  LogOut,
  Menu,
} from "lucide-react";
import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();
  // const navigate = navigate();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="fixed top-0 left-[260px] right-0 z-30 h-[70px] flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Search */}
            <div className="hidden sm:flex items-center bg-gray-100 px-4 py-2.5 rounded-full w-96">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent ml-3 outline-none text-sm w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {/* Notifications */}
            <Popover className="relative">
              <Popover.Button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow border z-50">
                  <div className="p-4 border-b font-semibold">
                    Notifications
                  </div>
                  <div className="p-4 text-sm text-slate-500">
                    No new alerts
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            {/* Profile */}
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="font-bold text-sm">{user?.name}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <User size={18} />
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow border z-50">
                  <NavLink to="/dashboard/settings">
                    <button className="w-full p-3 text-left hover:bg-gray-50 flex gap-2 items-center">
                      <SettingsIcon size={16} /> Settings
                    </button>
                  </NavLink>

                  <div className="p-6 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          navigate("/login", { replace: true });
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-[5%] py-6 pt-[90px]">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
