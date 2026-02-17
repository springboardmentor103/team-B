import React, { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';



const Feed = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Help Moving Furniture",
      description: "Need help moving furniture from my apartment to a new house. Heavy lifting required. Will provide pizza!",
      location: "Downtown Seattle, WA",
      date: "Jul 5",
      fullDate: "Jul 5, 2024 • 2:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1581578731117-104f2a8d23e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "moving",
      tagColor: "bg-blue-100 text-blue-800",
      author: { name: "Sarah Johnson", avatar: "SJ" },
      requestSent: true
    },
    {
      id: 2,
      title: "Garden Cleanup",
      description: "Looking for someone to help clean up my backyard garden. Weeding, pruning, and general cleanup needed.",
      location: "Bellevue, WA",
      date: "Jul 3",
      fullDate: "Jul 6, 2024 • 9:00 AM - 1:00 PM",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "gardening",
      tagColor: "bg-green-100 text-green-800",
      author: { name: "Robert Wilson", avatar: "RW" },
      requestSent: true
    },
    {
      id: 3,
      title: "Room Painting Project",
      description: "Need help painting two bedrooms. Paint and supplies provided. Looking for someone with painting experience.",
      location: "Redmond, WA",
      date: "Jul 2",
      fullDate: "Jul 7, 2024 • 8:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "painting",
      tagColor: "bg-purple-100 text-purple-800",
      author: { name: "Emily Chen", avatar: "EC" },
      requestSent: true
    },
    {
      id: 4,
      title: "Office Set up",
      description: "Need assistance assembling 5 IKEA desks and office chairs. Tools will be provided.",
      location: "Kirkland, WA",
      date: "Jul 1",
      fullDate: "Jul 8, 2024 • 10:00 AM - 3:00 PM",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "assembly",
      tagColor: "bg-orange-100 text-orange-800",
      author: { name: "David Miller", avatar: "DM" },
      requestSent: false
    },
    {
      id: 5,
      title: "Dog Walking",
      description: "Need a reliable dog walker for my golden retriever. Twice a week, weekday mornings preferred.",
      location: "Capitol Hill, Seattle, WA",
      date: "Jun 28",
      fullDate: "Recurring • Mornings",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "pet care",
      tagColor: "bg-sky-100 text-sky-800",
      author: { name: "Jessica Lee", avatar: "JL" },
      requestSent: false
    },
    {
      id: 6,
      title: "Math Tutor Needed",
      description: "Looking for a math tutor for my high school son. Algebra and Geometry focus. One hour sessions.",
      location: "Remote / Zoom",
      date: "Jun 25",
      fullDate: "Flexible Schedule",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tag: "tutoring",
      tagColor: "bg-indigo-100 text-indigo-800",
      author: { name: "Mark Thompson", avatar: "MT" },
      requestSent: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRequestClick = (task) => {
    if (task.requestSent) {
      // If already sent, toggle off immediately (or show another modal if needed, but keeping simple for now)
      toggleRequest(task.id);
    } else {
      // If not sent, open confirmation modal
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const confirmRequest = () => {
    if (selectedTask) {
      toggleRequest(selectedTask.id);
      setIsModalOpen(false);
      setSelectedTask(null);
    }
  };

  const toggleRequest = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, requestSent: !item.requestSent } : item
    ));
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-10">
        <h2 className="font-extrabold text-4xl text-slate-900 tracking-tight mb-2">Feed</h2>
        <p className="text-slate-500 text-lg">Explore and join tasks in your community</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[1.5rem] border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 flex flex-col flex-1">
                
                {/* Header: Tag + Date */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-4 py-1.5 rounded-lg text-[0.7rem] font-black uppercase tracking-wider ${item.tagColor.replace('rounded-full', 'rounded-lg')}`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[0.75rem] font-bold uppercase tracking-wide">
                    <Clock size={14} strokeWidth={2.5} />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-[1.35rem] font-bold mb-4 text-slate-900 leading-[1.2] tracking-tight">
                  {item.title}
                </h3>

                {/* Description (Truncated) */}
                <p className="line-clamp-2 text-[0.95rem] text-slate-500 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>
                
                {/* Meta: Location */}
                <div className="flex items-center gap-2 mb-8 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500 h-10 border-t border-gray-50 pt-4">
                  <MapPin size={16} className="text-primary" strokeWidth={2.5} />
                  <span className="uppercase">{item.location}</span>
                </div>
                
                {/* Footer: Author + Button */}
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center text-[0.85rem] font-bold border border-blue-100 shadow-sm">
                      {item.author.avatar}
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Posted By</p>
                      <p className="text-[1rem] font-bold text-slate-900 leading-none">{item.author.name}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleRequestClick(item)}
                    className={`px-4 py-2 text-[0.75rem] font-black uppercase tracking-widest transition-all duration-300 rounded-xl border-none cursor-pointer shadow-md active:scale-95 flex items-center gap-2 ${
                      item.requestSent 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 shadow-none' 
                        : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25'
                    }`}
                  >
                    {item.requestSent ? (
                      <>
                        <CheckCircle2 size={14} strokeWidth={3} />
                        <span>Request Sent</span>
                      </>
                    ) : 'Join Task'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRequest}
        title="Confirm Request"
        message={`Are you sure you want to request to join "${selectedTask?.title}"? The task owner will be notified.`}
      />
    </div>
  );
};

export default Feed;
