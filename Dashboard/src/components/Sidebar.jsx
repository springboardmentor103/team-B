import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FileText, ClipboardList, PlusCircle, Settings, LogOut, X } from 'lucide-react';
const Sidebar = ({ isOpen, setIsOpen }) => {

  
  const links = [
    { label: 'Feed', path: '/dashboard/feed', icon: LayoutDashboard },
    { label: 'My Tasks', path: '/dashboard/tasks', icon: CheckSquare },
    { label: 'Requests', path: '/dashboard/requests', icon: FileText },
    { label: 'My Requests', path: '/dashboard/my-requests', icon: ClipboardList },
    { label: 'Add Task', path: '/dashboard/add-task', icon: PlusCircle },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex items-center justify-between border-b border-slate-800">
        <h2 className="text-[1.5rem] font-extrabold tracking-tight m-0 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <span className="text-white">Hire-a-Helper</span>
        </h2>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 text-slate-400 bg-transparent border-none md:hidden"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-6 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const hasBadge = link.label === 'Requests';
            
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-[0.875rem] p-[0.875rem_1rem] rounded-radius transition-all duration-200 border-l-4 relative group ${
                    isActive 
                      ? 'bg-slate-800/80 text-white font-semibold border-primary' 
                      : 'text-slate-400 font-medium border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className="text-[0.95rem] flex-1">{link.label}</span>
                {hasBadge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">5</span>
                )}
              </NavLink>
            );
          })}
      </nav>


    </div>
  );
};

export default Sidebar;
