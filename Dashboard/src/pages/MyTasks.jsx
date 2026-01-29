import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ListTodo, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  ArrowUpRight,
  MapPin,
  Calendar,
  LayoutList,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyTasks = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const summaryStats = [
    { 
      label: 'TOTAL TASKS', 
      value: 4, 
      icon: LayoutList, 
      color: 'bg-blue-500', 
      lightColor: 'bg-blue-50 text-blue-600' 
    },
    { 
      label: 'ACTIVE', 
      value: 2, 
      icon: Clock, 
      color: 'bg-orange-500', 
      lightColor: 'bg-orange-50 text-orange-600' 
    },
    { 
      label: 'COMPLETED', 
      value: 1, 
      icon: CheckCircle2, 
      color: 'bg-green-500', 
      lightColor: 'bg-green-50 text-green-600' 
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Clean Garden and Backyard",
      status: "ACTIVE",
      location: "BELLTOWN, SEATTLE",
      date: "OCT 25, 2023",
      price: "1,200",
      applicants: 3,
      iconColor: "bg-blue-50 text-blue-600",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=2000",
      description: "Need help cleaning up the backyard and pruning the bushes. All tools provided."
    },
    {
      id: 2,
      title: "IKEA Sofa Assembly",
      status: "COMPLETED",
      location: "DOWNTOWN, SEATTLE",
      date: "OCT 20, 2023",
      price: "800",
      applicants: 5,
      iconColor: "bg-green-50 text-green-600",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2000",
      description: "Assembly required for a 3-seater IKEA sofa. Instructions included."
    },
    {
      id: 3,
      title: "Move 1 Bedroom Apartment",
      status: "PENDING",
      location: "CAPITOL HILL, SEATTLE",
      date: "OCT 28, 2023",
      price: "4,500",
      applicants: 0,
      iconColor: "bg-yellow-50 text-yellow-600",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000",
      description: "Moving help needed for a small 1BHK. Heavy lifting involved."
    },
    {
      id: 4,
      title: "Car Wash & Detailing",
      status: "ACTIVE",
      location: "FREMONT, SEATTLE",
      date: "NOV 01, 2023",
      price: "1,500",
      applicants: 2,
      iconColor: "bg-orange-50 text-orange-600",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000",
      description: "Full exterior wash and interior detailing required for a sedan."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-100 text-blue-600';
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'PENDING': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-slate-500';
    }
  };

  const filteredTasks = activeTab === 'ALL' ? tasks : tasks.filter(t => t.status === activeTab);

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="font-extrabold text-4xl text-slate-900 tracking-tight mb-2">My Tasks</h2>
          <p className="text-slate-500 text-lg">Manage and track your posted tasks</p>
        </div>
        <button className="btn bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all duration-200 flex items-center gap-2 px-6 py-3 rounded-xl font-bold">
          <Plus size={20} strokeWidth={3} /> Post New Task
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-shadow duration-300">
            <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center ${stat.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
              <stat.icon size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-slate-400 font-bold text-[0.75rem] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[500px]">
        
        {/* Toolbar: Tabs & Search & Toggle */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-10">
          {/* Tabs */}
          <div className="flex p-1.5 bg-gray-50 rounded-xl gap-1 w-full xl:w-auto overflow-x-auto no-scrollbar">
            {['ALL', 'ACTIVE', 'PENDING', 'COMPLETED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-[0.75rem] font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full xl:w-auto">
            {/* Search */}
            <div className="relative flex-1 xl:w-80 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all text-sm font-medium"
              />
            </div>

            {/* View Toggle */}
            <div className="flex p-1 bg-gray-50 rounded-xl shrink-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutList size={20} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Task Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            /* LIST VIEW */
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-2xl ${task.iconColor} flex items-center justify-center shrink-0`}>
                    <ListTodo size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0 text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                       <h3 className="text-lg font-bold text-slate-900 truncate">{task.title}</h3>
                       <span className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-bold uppercase tracking-wider w-fit mx-auto md:mx-0 ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex flex-wrapjustify-center md:justify-start gap-4 text-slate-400 text-[0.75rem] font-bold uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{task.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto gap-8 px-4">
                    <div className="text-center md:text-right">
                       <span className="text-xl font-black text-primary">₹{task.price}</span>
                    </div>
                    <div className="text-center md:text-right border-l border-gray-200 pl-6">
                      <div className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Applicants</div>
                      <div className="text-xl font-black text-slate-900">{task.applicants}</div>
                    </div>
                  </div>
                   <div className="flex gap-2 w-full md:w-auto justify-center">
                    <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors bg-white">
                      <ArrowUpRight size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors bg-white">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* GRID VIEW */
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={task.image} 
                      alt={task.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-black uppercase tracking-wider shadow-sm ${getStatusColor(task.status)} `}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                       <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{task.title}</h3>
                       <span className="text-lg font-black text-primary">₹{task.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[0.7rem] font-bold text-slate-400 uppercase tracking-wide mb-4">
                      <MapPin size={14} /> {task.location}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                      {task.description}
                    </p>
                    <div className="flex justify-between items-center pt-5 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-2">
                           <div className="flex -space-x-2">
                             {[...Array(Math.min(3, task.applicants))].map((_, i) => (
                               <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[0.6rem] font-bold text-slate-500">
                                  User
                               </div>
                             ))}
                           </div>
                           <span className="text-xs font-bold text-slate-500 ml-1">{task.applicants} Applicants</span>
                        </div>
                        <button className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-colors">
                           <ArrowUpRight size={18} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default MyTasks;
