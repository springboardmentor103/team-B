import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, CheckCircle, Clock, FileText, AlertCircle, TrendingUp } from 'lucide-react';

const AccountInfo = () => {
  // Mock data for stats
  const stats = [
    { label: 'Tasks Posted', value: 12, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Tasks Pending', value: 3, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Completed', value: 8, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Reviews', value: '4.9', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentTasks = [
    { id: 101, title: 'Help Moving Furniture', status: 'Pending', date: 'Jul 4', type: 'Posted' },
    { id: 102, title: 'Garden Cleanup', status: 'Completed', date: 'Jun 28', type: 'Posted' },
    { id: 103, title: 'Fix Leaky Faucet', status: 'In Progress', date: 'Jun 15', type: 'Posted' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative"></div>
        <div className="px-4 sm:px-8 pb-6">
          <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 mb-4 gap-4 sm:gap-0">
            <div className="relative self-start">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-full bg-primary-gradient flex items-center justify-center text-white text-3xl font-bold">
                  PS
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 hover:text-primary transition-colors cursor-pointer">
                <Camera size={16} />
              </button>
            </div>
            <button className="self-start sm:self-auto px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors cursor-pointer mt-2 sm:mt-0">
              Edit Profile
            </button>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Prerna S.</h1>
            <p className="text-slate-500 font-medium">HR Manager • Bangalore, India</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-slate-400" /> Personal Info
            </h3>
            <div className="space-y-4">
              <div className="group">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Mail size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="font-medium">prerna@hirehelper.com</span>
                </div>
              </div>
              <div className="group">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Phone</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Phone size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="font-medium">+91 98765 43210</span>
                </div>
              </div>
              <div className="group">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Member Since</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Calendar size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="font-medium">January 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Recent Task Activity</h3>
              <button className="text-primary text-sm font-medium hover:underline cursor-pointer">View All</button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      task.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      task.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {task.status === 'Pending' ? <Clock size={18} /> :
                       task.status === 'Completed' ? <CheckCircle size={18} /> :
                       <FileText size={18} />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.type} on {task.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                    task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-slate-50/50">
               <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>You have <b>3 pending tasks</b> awaiting your review. Check "My Tasks" for details.</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountInfo;