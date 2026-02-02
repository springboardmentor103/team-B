
import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { MapPin, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { search = "" } = useOutletContext();
  /* ---------------- Fetch Tasks ---------------- */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/view-tasks");
        setTasks(response.data.tasks || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const term = search.toLowerCase();
    return (
      task.title?.toLowerCase().includes(term) ||
      task.location?.toLowerCase().includes(term) ||
      task.description?.toLowerCase().includes(term)
    );
  });
  /* ---------------- States ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No tasks found
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-full mx-auto">
      <div className="mb-10">
        <h2 className="font-bold text-4xl text-slate-900 tracking-tight mb-2">
          Feed
        </h2>
        <p className="text-md text-blue-700">
          Explore and join tasks in your community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-[1.5rem] border border-gray-100 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 flex flex-col flex-1">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="px-4 py-1.5 rounded-lg text-[0.7rem] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                    task
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[0.75rem] font-semibold uppercase tracking-wide">
                    <Clock size={14} strokeWidth={2.5} />
                    <span>
                      {new Date(task.start_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[1.2rem] font-semibold mb-4 text-slate-900 leading-tight">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="line-clamp-2 text-[0.85rem] text-slate-500 mb-6 flex-1">
                  {task.description || "No description provided"}
                </p>

                {/* Location */}
                <div className="flex items-center justify-between mb-4 text-[0.75rem] font-bold tracking-wider text-slate-500 border-t border-gray-50 pt-0">
                  <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary uppercase" strokeWidth={2.5} />
                  <span className="uppercase">{task.location || "No location"}</span>
                  </div>
                  <p className="text-[0.75rem]">
                    {task.hours} {task.hours === 1 ? 'hr' : 'hrs'}
                  </p>
                </div>
                

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <p className="text-[0.85rem] text-slate-700 mb-4">
                      {new Date(task.start_time).toLocaleDateString()} →{" "}
                      {new Date(task.end_time).toLocaleDateString()}
                    </p>
                  </div>

                  
                </div>
                <button
                    className="mx-auto px-4 py-2 text-[0.75rem] font-black uppercase tracking-widest rounded-xl bg-primary text-white hover:bg-primary-dark transition shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} strokeWidth={3} />
                    Join Task
                  </button>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No tasks match "{search}"
        </div>
      )}
    </div>
  );
};

export default Feed;
