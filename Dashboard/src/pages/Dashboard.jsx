import React, { Fragment, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Settings from './Settings';
import AddTask from './AddTask';
import { Bell, Search, User, Settings as SettingsIcon, LogOut, Menu } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout" style={{ background: 'var(--color-bg-gradient)' }}>
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', padding: 0, background: 'transparent' }}>
        
        {/* Header */}
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Mobile Menu Button */}
            <button 
              className="btn-outline"
              style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', sm: { display: 'none' } }}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
                style={{ 
                  border: 'none', marginLeft: '0.75rem', outline: 'none', 
                  fontSize: '0.9rem', background: 'transparent' 
                }} 
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Popover className="relative">
              <Popover.Button style={{ 
                position: 'relative', cursor: 'pointer', border: 'none', background: 'none', padding: 0 
              }}>
                <div style={{
                  padding: '8px', borderRadius: '50%', 
                  backgroundColor: 'var(--color-white)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Bell size={20} color="var(--color-text-secondary)" />
                </div>
                <div style={{ 
                  position: 'absolute', top: 0, right: 0, 
                  width: '10px', height: '10px', 
                  backgroundColor: '#ef4444', borderRadius: '50%',
                  border: '2px solid white'
                }} />
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
                <Popover.Panel style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '0.5rem',
                  width: '320px',
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-gray-100)',
                  overflow: 'hidden',
                  zIndex: 50
                }}>
                   <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-gray-50)' }}>
                     <h3 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Notifications</h3>
                     <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 500 }}>Mark all read</span>
                   </div>
                   <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-50)', display: 'flex', gap: '0.75rem', cursor: 'pointer' }} className="hover-bg-gray">
                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginTop: '6px', flexShrink: 0 }}></div>
                         <div>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>New candidate applied for <b>UX Designer</b></p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>2 mins ago</p>
                         </div>
                      </div>
                       <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-50)', display: 'flex', gap: '0.75rem', cursor: 'pointer' }} className="hover-bg-gray">
                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'transparent', marginTop: '6px', flexShrink: 0 }}></div>
                         <div>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>Interview scheduled with <b>Sarah Smith</b></p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>1 hour ago</p>
                         </div>
                      </div>
                   </div>
                   <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid var(--color-gray-50)' }}>
                      <button style={{ border: 'none', background: 'none', color: 'var(--color-text-secondary)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>View All Notifications</button>
                   </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            
            <Popover className="relative">
              <Popover.Button style={{ 
                display: 'flex', alignItems: 'center', gap: '0.75rem', 
                cursor: 'pointer', border: 'none', background: 'none' 
              }}>
                <div className="user-info-text" style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Prerna S.</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>HR Manager</div>
                </div>
                <div style={{ 
                  width: '42px', height: '42px', 
                  background: 'var(--color-primary-gradient)',
                  color: 'white',
                  borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
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
                <Popover.Panel style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '0.5rem',
                  width: '240px',
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-gray-100)',
                  overflow: 'hidden',
                  zIndex: 50
                }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-50)', backgroundColor: 'var(--color-gray-50)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Prerna S.</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>prerna@hirehelper.com</p>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    <button style={{ 
                      width: '100%', textAlign: 'left', padding: '0.75rem 1rem', 
                      background: 'none', border: 'none', borderRadius: 'var(--radius)',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      color: 'var(--color-text-main)', cursor: 'pointer',
                      fontSize: '0.9rem'
                    }} className="hover-bg-gray">
                      <User size={16} /> Account Info
                    </button>
                    <button style={{ 
                      width: '100%', textAlign: 'left', padding: '0.75rem 1rem', 
                      background: 'none', border: 'none', borderRadius: 'var(--radius)',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      color: 'var(--color-text-main)', cursor: 'pointer',
                      fontSize: '0.9rem'
                    }} className="hover-bg-gray">
                      <SettingsIcon size={16} /> Settings
                    </button>
                    <div style={{ height: '1px', backgroundColor: 'var(--color-gray-100)', margin: '0.5rem 0' }}></div>
                    <button style={{ 
                      width: '100%', textAlign: 'left', padding: '0.75rem 1rem', 
                      background: 'none', border: 'none', borderRadius: 'var(--radius)',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      color: '#ef4444', cursor: 'pointer',
                      fontSize: '0.9rem'
                    }} className="hover-bg-gray">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ padding: '2rem 5%', flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="feed" element={<Feed />} />
            <Route path="tasks" element={<div className='card'><h2>My Tasks</h2><p>Task list placeholder</p></div>} />
            <Route path="requests" element={<div className='card'><h2>Requests</h2><p>Requests list placeholder</p></div>} />
            <Route path="my-requests" element={<div className='card'><h2>My Requests</h2><p>My requests placeholder</p></div>} />
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
