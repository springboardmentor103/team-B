import React, { Fragment, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Settings from './Settings';
import AddTask from './AddTask';
import MyTasks from './MyTasks';
import { Bell, Search, User, Settings as SettingsIcon, LogOut, Menu } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-35 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col bg-transparent overflow-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-30 h-[70px] flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-white/60 transition-all duration-200">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="btn-outline p-2 flex items-center justify-center md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center text-slate-500 bg-gray-100 px-4 py-2.5 rounded-full w-96 border-none transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 group">
              <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="bg-transparent border-none ml-3 outline-none text-[0.9rem] w-full placeholder:text-slate-400" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Popover className="relative">
              <Popover.Button className="relative flex items-center justify-center p-2 rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light">
                <Bell size={20} className="text-slate-500" />
                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">3</div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white rounded-radius shadow-lg border border-gray-100 overflow-hidden z-50">
                   <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-semibold text-[0.95rem]">Notifications</h3>
                     <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                   </div>
                   <div className="max-h-[300px] overflow-y-auto">
                      <div className="p-4 border-b border-gray-50 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                         <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                         <div>
                            <p className="text-[0.9rem] mb-1 leading-snug">New candidate applied for <b>UX Designer</b></p>
                            <p className="text-xs text-slate-500">2 mins ago</p>
                         </div>
                      </div>
                       <div className="p-4 border-b border-gray-50 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                         <div className="w-2 h-2 rounded-full bg-transparent mt-1.5 flex-shrink-0"></div>
                         <div>
                            <p className="text-[0.9rem] mb-1 leading-snug">Interview scheduled with <b>Sarah Smith</b></p>
                            <p className="text-xs text-slate-500">1 hour ago</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-3 text-center border-t border-gray-100">
                      <button className="bg-transparent border-none text-slate-500 text-[0.85rem] font-medium cursor-pointer hover:text-primary transition-colors">View All Notifications</button>
                   </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-3 border-none bg-transparent cursor-pointer group focus:outline-none">
                <div className="hidden sm:block text-right">
                  <div className="text-[0.9rem] font-bold text-slate-900 group-hover:text-primary transition-colors">Prerna S.</div>
                  <div className="text-[0.75rem] text-slate-500 uppercase tracking-wider font-semibold">HR Manager</div>
                </div>
                <div className="w-[42px] h-[42px] bg-primary-gradient text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <User size={20} />
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-60 bg-white rounded-radius shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <p className="font-semibold text-slate-900">Prerna S.</p>
                    <p className="text-[0.8rem] text-slate-500">prerna@hirehelper.com</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left p-3 rounded-radius flex items-center gap-3 text-slate-900 text-[0.9rem] bg-transparent border-none hover:bg-gray-50 transition-colors cursor-pointer">
                      <User size={16} /> Account Info
                    </button>
                    <button className="w-full text-left p-3 rounded-radius flex items-center gap-3 text-slate-900 text-[0.9rem] bg-transparent border-none hover:bg-gray-50 transition-colors cursor-pointer">
                      <SettingsIcon size={16} /> Settings
                    </button>
                    <div className="h-px bg-gray-100 mx-2 my-1" />
                    <button className="w-full text-left p-3 rounded-radius flex items-center gap-3 text-red-500 text-[0.9rem] bg-transparent border-none hover:bg-red-50 transition-colors cursor-pointer">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-[5%] py-8">
          <Routes>
            <Route path="feed" element={<Feed />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="requests" element={<div className='card'><h2 className="text-xl font-bold mb-2">Requests</h2><p className="text-slate-500">Requests list placeholder</p></div>} />
            <Route path="my-requests" element={<div className='card'><h2 className="text-xl font-bold mb-2">My Requests</h2><p className="text-slate-500">My requests placeholder</p></div>} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="feed" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
