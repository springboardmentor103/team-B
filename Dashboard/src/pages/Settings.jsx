import React, { useState } from 'react';
import { User, Save, Upload, Trash2, Lock, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
const Settings = () => {

  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontWeight: '800', fontSize: '2rem',
          background: 'var(--color-primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>Settings</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Manage your profile and account preferences</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        {/* Profile Picture Section */}
        <section className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '1rem' }}>Profile Picture</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
             <div style={{ 
                width: '100px', height: '100px', 
                backgroundImage: 'url("https://tse3.mm.bing.net/th/id/OIP.eu7kdIVjq5nlCcCyT710vwHaHa?pid=Api&P=0&h=180")',
                backgroundSize: 'cover',
                borderRadius: '50%',
                boxShadow: 'var(--shadow-md)',
                border: '4px solid var(--color-gray-50)'
             }}></div>
             <div>
               <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                 <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Upload size={16} /> Change Photo
                 </button>
                 <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', borderColor: '#fee2e2' }}>
                   <Trash2 size={16} /> Remove
                 </button>
               </div>
               <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>JPG, GIF or PNG. Max size 5MB.</p>
             </div>
          </div>
        </section>

        {/* Personal Information Section */}
        <section className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '1rem' }}>Personal Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label className="label">First Name</label>
              <input type="text" className="input" defaultValue="Prerna" />
            </div>
            <div className="input-group">
              <label className="label">Last Name</label>
              <input type="text" className="input" defaultValue="S." />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Email Address</label>
            <input type="email" className="input" defaultValue="prerna@hirehelper.com" />
          </div>

          <div className="input-group">
            <label className="label">Phone Number</label>
            <input type="tel" className="input" defaultValue="+1 (555) 123-4567" />
          </div>

          <div className="input-group">
            <label className="label">Bio (Optional)</label>
            <textarea 
              className="input" 
              rows="4" 
              defaultValue="Experienced HR Manager dedicated to finding the best talent. Passionate about building great teams and optimizing recruitment processes."
            ></textarea>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', textAlign: 'right' }}>Brief description for your profile.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-primary">
              <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '1rem' }}>Notifications</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-primary-light)', borderRadius: '0.5rem', color: 'var(--color-primary)' }}>
                   <Bell size={20} />
                 </div>
                 <div>
                   <p style={{ fontWeight: 600 }}>Push Notifications</p>
                   <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Receive notifications about new candidates</p>
                 </div>
               </div>
               <label className="switch">
                 <input type="checkbox" defaultChecked />
                 <span className="slider"></span>
               </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-gray-100)', borderRadius: '0.5rem', color: 'var(--color-text-secondary)' }}>
                   <User size={20} />
                 </div>
                 <div>
                   <p style={{ fontWeight: 600 }}>Email Updates</p>
                   <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Receive daily summaries and alerts</p>
                 </div>
               </div>
               <label className="switch">
                 <input type="checkbox" />
                 <span className="slider"></span>
               </label>
            </div>
          </div>
        </section>

        {/* Account Security Section */}
        <section className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '1rem' }}>Account Security</h3>
          
          <div className="input-group">
            <label className="label">Current Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
             <div className="input-group">
               <label className="label">New Password</label>
               <input type="password" className="input" placeholder="••••••••" />
             </div>
             <div className="input-group">
               <label className="label">Confirm New Password</label>
               <input type="password" className="input" placeholder="••••••••" />
             </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
             <button className="btn-outline">
               <Lock size={16} style={{ marginRight: '0.5rem' }} /> Change Password
             </button>
          </div>
        </section>


        {/* Session Zone */}
        <section className="card" style={{ border: '1px solid #fee2e2' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#ef4444' }}>Session</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            Sign out of your account on this device.
          </p>
          <button className="btn-outline" style={{ color: '#ef4444', borderColor: '#fee2e2', width: '100%', justifyContent: 'center' }}>
            <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout
          </button>
        </section>
      </motion.div>
    </div>
  );
};

export default Settings;
