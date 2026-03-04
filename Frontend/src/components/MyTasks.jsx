import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, ListTodo, Clock, CheckCircle2, 
  MoreVertical, ArrowUpRight, MapPin, Calendar, 
  LayoutList, LayoutGrid, Trash2, Edit3, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import api from '../api/api';

const MyTasks = () => {

  const { token, user, isVerified } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('ALL');
  const [viewMode, setViewMode] = useState('list');
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: ""
  });

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get("/user-tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Cannot get tasks", error);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  // Handle Edit Trigger
  const handleEditInit = (task) => {
    setEditingTaskId(task._id);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      location: task.location || "",
      start_time: task.start_time ? task.start_time.substring(0, 16) : "",
      end_time: task.end_time ? task.end_time.substring(0, 16) : ""
    });
    setShowEditModal(true);
  };

  // Submit Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/update-task/${editingTaskId}`, formData);
      fetchTasks();
      setShowEditModal(false);
      setEditingTaskId(null);
    } catch (error) {
      console.log("Update error", error);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/delete-task/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  // UI Helpers
  const summaryStats = [
    { label: 'TOTAL', value: tasks.length, icon: LayoutList, color: 'bg-blue-500' },
    { label: 'LOCATION AREAS', value: [...new Set(tasks.map(t => t.location))].length, icon: MapPin, color: 'bg-orange-500' },
    { label: 'LATEST', value: tasks.length > 0 ? 'Active' : 0, icon: CheckCircle2, color: 'bg-green-500' }
  ];

  const filteredTasks = tasks.filter(task => 
    task.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div className="max-w-[1200px] mx-auto mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
        <div>
          <h2 className="font-bold text-4xl text-slate-900 tracking-tight mb-2">My Tasks</h2>
          <p className="text-slate-500 text-md">Manage your posted help requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center ${stat.color} text-white shadow-md`}>
              <stat.icon size={30} />
            </div>
            <div>
              <p className="text-slate-400 font-bold text-[0.75rem] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main UI Card */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 min-h-[500px]">
        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-10">
          <div className="relative w-full xl:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your requests..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="flex p-1 bg-gray-100 rounded-xl shrink-0">
            <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>
              <LayoutList size={20} />
            </button>
            <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        {/* Task List/Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={viewMode === 'list' ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}
          >
            {filteredTasks.map((task) => (
              <div key={task._id} className={`group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col md:flex-row items-center gap-6' : 'flex flex-col'}`}>
                
                {/* Icon/Image Placeholder */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ListTodo size={24} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <h3 className="text-lg font-bold text-slate-900 truncate mb-1">{task.title}</h3>
                  <div className="flex flex-wrap gap-4 text-slate-400 text-[0.75rem] font-bold uppercase tracking-wide">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {task.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(task.start_time).toLocaleDateString()}</span>
                  </div>
                  {viewMode === 'grid' && <p className="mt-3 text-slate-500 text-sm line-clamp-2">{task.description}</p>}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => handleEditInit(task)}
                    className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Edit Task"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Modal (The Form from code 2 styled for code 1) */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-lg rounded-[2rem] p-8 shadow-2xl relative"
            >
              <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
              
              <h3 className="text-2xl font-black text-slate-900 mb-6">Edit Task Request</h3>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
                    <input 
                      type="datetime-local" 
                      value={formData.start_time} 
                      onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                      className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm"
                    />
                   </div>
                   <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">End Time</label>
                    <input 
                      type="datetime-local" 
                      value={formData.end_time} 
                      onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                      className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm"
                    />
                   </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all mt-4">
                  Update Task Details
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  </div>
  )
};

export default MyTasks;

// git commit -m "Handles states, proctored routes, api operations, frontend compatibility"