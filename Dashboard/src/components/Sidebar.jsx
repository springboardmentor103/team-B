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
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{ padding: '2rem 1.75rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '800',
          letterSpacing: '-0.025em',
          margin: 0
        }}>
          <span style={{ color: '#3b82f6' }}>Hire</span>
          <span style={{ color: '#ffffff' }}>Helper</span>
        </h2>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="btn-outline mobile-close-btn"
          style={{ 
            border: 'none', 
            color: '#94a3b8', 
            padding: '4px',
            background: 'transparent'
          }}
        >
          <X size={24} />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius)',
              color: isActive ? '#ffffff' : '#94a3b8',
              backgroundColor: isActive ? '#1e293b' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease',
              borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent',
              boxShadow: isActive ? 'none' : 'none'
            })}
          >
            {({ isActive }) => (
              <>
                <link.icon size={22} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? '#3b82f6' : 'currentColor' }} />
                <span style={{ fontSize: '0.95rem' }}>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>


    </div>
  );
};

export default Sidebar;
