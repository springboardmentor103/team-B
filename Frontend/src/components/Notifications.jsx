import React, { useState } from 'react';
import { Bell, CheckCircle, Clock } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'SJ',
      avatarColor: 'bg-blue-100 text-blue-600',
      message: 'requested your task',
      highlight: 'Help Moving Furniture',
      time: '2 hours ago',
      status: 'Unread',
      type: 'Requests'
    },
    {
      id: 2,
      user: 'Robert Wilson',
      avatar: 'RW',
      avatarColor: 'bg-green-100 text-green-600',
      message: 'accepted your request for',
      highlight: 'Garden Cleanup',
      time: '5 hours ago',
      status: 'Unread',
      type: 'Updates'
    },
    {
      id: 3,
      user: 'Michael Brown',
      avatar: 'MB',
      avatarColor: 'bg-purple-100 text-purple-600',
      message: 'sent a message regarding',
      highlight: 'Office Setup',
      time: '1 day ago',
      status: 'Read',
      type: 'Updates'
    },
    {
      id: 4,
      user: 'David Miller',
      avatar: 'DM',
      avatarColor: 'bg-orange-100 text-orange-600',
      message: 'completed the task',
      highlight: 'Room Painting',
      time: '2 days ago',
      status: 'Read',
      type: 'Updates'
    },
    {
      id: 5,
      user: 'Emily Chen',
      avatar: 'EC',
      avatarColor: 'bg-pink-100 text-pink-600',
      message: 'requested your task',
      highlight: 'Dog Walking',
      time: '3 days ago',
      status: 'Read',
      type: 'Requests'
    }
  ]);

  const tabs = ['All', 'Unread', 'Requests', 'Updates'];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return notification.status === 'Unread';
    return notification.type === activeTab;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'Read' })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your task activity</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm flex items-center gap-2"
        >
          <CheckCircle size={16} /> Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-gray-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`
                group relative bg-white rounded-xl p-5 border transition-all duration-200
                ${notification.status === 'Unread' 
                  ? 'border-blue-100 shadow-md shadow-blue-50/50' 
                  : 'border-slate-100 shadow-sm hover:shadow-md'}
              `}
            >
              <div className={`absolute top-0 left-0 bottom-0 w-1 ${notification.status === 'Unread' ? 'bg-blue-500 rounded-l-xl' : 'bg-transparent'}`}></div>
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-lg ${notification.avatarColor}`}>
                  {notification.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-slate-900 text-[0.95rem] leading-relaxed">
                      <span className="font-bold">{notification.user}</span> {notification.message} <span className="font-bold text-slate-900">{notification.highlight}</span>
                    </p>
                    {notification.status === 'Unread' && (
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={14} className="text-slate-400" />
                    <span className="text-xs text-slate-500 font-medium">{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <Bell size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No notifications found</h3>
            <p className="text-slate-500 text-sm mt-1">We'll notify you when something happens.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Notifications;