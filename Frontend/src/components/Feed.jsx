import React, { useEffect, useState } from 'react';
import { Search, MapPin, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Feed = ({ tasks = [] }) => {
const { token } = useAuth();
const [items, setItems] = useState([]);

const statusStyles = {
  Pending: "bg-blue-100 text-blue-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

useEffect(() => {
  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:4000/view-tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Cannot get feed", error);
    }
  };
  handleSubmit();
}, [token]);

const toggleRequest = (id) => {
  setItems(items.map(item => 
    item.id === id ? { ...item, requestSent: !item.requestSent } : item
  ));
};
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Feed
          </h2>
          <p className="text-gray-500 mt-1">
            Find tasks that need help
          </p>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[task.status] || statusStyles.Pending
                    }`}
                  >
                    {task.status}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>
                      {new Date(task.start_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {task.description || "No description provided"}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg w-fit mb-6">
                  <MapPin size={15} className="text-blue-500" />
                  <span>{task.location || "No location"}</span>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      <User size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Task Owner
                    </span>
                  </div>

                  {/* Action */}
                  <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                    Connect
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feed;
