import React, { useState } from 'react';
import { User, Save, Upload, Trash2, Lock, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
const Settings = () => {

  
  return (
    <div className="max-w-[800px] mx-auto pb-12">
      <div className="mb-8">
        <h2 className="font-extrabold text-3xl text-slate-900 mb-2">Settings</h2>
        <p className="text-slate-500">Manage your profile and account preferences</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-8"
      >
        {/* Profile Picture Section */}
        <section className="card">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4 text-slate-900">Profile Picture</h3>
          <div className="flex items-center gap-8">
             <div className="w-[100px] h-[100px] bg-[url('https://tse3.mm.bing.net/th/id/OIP.eu7kdIVjq5nlCcCyT710vwHaHa?pid=Api&P=0&h=180')] bg-cover rounded-full shadow-md border-4 border-gray-50"></div>
             <div>
               <div className="flex gap-4 mb-3">
                 <button className="btn btn-primary flex items-center gap-2">
                   <Upload size={16} /> Change Photo
                 </button>
                 <button className="btn-outline flex items-center gap-2 text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200">
                   <Trash2 size={16} /> Remove
                 </button>
               </div>
               <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size 5MB.</p>
             </div>
          </div>
        </section>

        {/* Personal Information Section */}
        <section className="card">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4 text-slate-900">Personal Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
              className="input resize-y" 
              rows="4" 
              defaultValue="Experienced HR Manager dedicated to finding the best talent. Passionate about building great teams and optimizing recruitment processes."
            ></textarea>
            <p className="text-[0.75rem] text-slate-500 mt-2 text-right">Brief description for your profile.</p>
          </div>

          <div className="flex justify-end mt-4">
            <button className="btn btn-primary">
              <Save size={18} className="mr-2" /> Save Changes
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="card">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4 text-slate-900">Notifications</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-primary-light rounded-lg text-primary">
                   <Bell size={20} />
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900">Push Notifications</p>
                   <p className="text-[0.85rem] text-slate-500">Receive notifications about new candidates</p>
                 </div>
               </div>
               <label className="relative inline-block w-11 h-6 cursor-pointer">
                 <input type="checkbox" className="sr-only peer" defaultChecked />
                 <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
               </label>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-gray-100 rounded-lg text-slate-500">
                   <User size={20} />
                 </div>
                 <div>
                   <p className="font-semibold text-slate-900">Email Updates</p>
                   <p className="text-[0.85rem] text-slate-500">Receive daily summaries and alerts</p>
                 </div>
               </div>
               <label className="relative inline-block w-11 h-6 cursor-pointer">
                 <input type="checkbox" className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
               </label>
            </div>
          </div>
        </section>

        {/* Account Security Section */}
        <section className="card">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4 text-slate-900">Account Security</h3>
          
          <div className="input-group">
            <label className="label">Current Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="input-group">
               <label className="label">New Password</label>
               <input type="password" className="input" placeholder="••••••••" />
             </div>
             <div className="input-group">
               <label className="label">Confirm New Password</label>
               <input type="password" className="input" placeholder="••••••••" />
             </div>
          </div>

          <div className="flex justify-end mt-4">
             <button className="btn-outline px-4 py-2 flex items-center gap-2">
               <Lock size={16} /> Change Password
             </button>
          </div>
        </section>

        {/* Session Zone */}
        <section className="card border border-red-100">
          <h3 className="text-xl font-bold mb-4 text-red-500">Session</h3>
          <p className="text-[0.9rem] text-slate-500 mb-6">
            Sign out of your account on this device.
          </p>
          <button className="btn-outline text-red-500 border-red-100 w-full justify-center py-3 hover:bg-red-50 hover:border-red-200 transition-colors flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </section>
      </motion.div>
    </div>
  );
};

export default Settings;
