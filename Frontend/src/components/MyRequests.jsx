import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import api from '../api/api';
import { useState, useEffect } from 'react';
const MyRequests = () => {
  
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/my-request",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        setRequests(res.data.requests || []);
      } catch (error) {
        console.error("Error fetching my requests", error);
      }
    };
  
    fetchRequests();
  }, [token]);
  

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Requests</h1>
          <p className="text-slate-500 mt-1">Track the help requests you've sent</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">
                      {req.taskOwnerId?.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{req.taskId?.title || "Unknown Task"}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          {req.taskId?.title || ""}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Task owner: <span className="text-slate-700">{req.taskOwnerId?.name || "Unknown"}</span></p>
                    </div>
                  </div>
                  {/* <div className="self-start sm:self-auto">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5 ${req.statusColor}`}>
                      <req.statusIcon size={14} />
                      {statusIcon[req.taskId.status]}
                    </span>
                  </div> */}
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mb-4 relative">
                  <div className="absolute top-4 left-0 w-1 h-8 bg-slate-300 rounded-r-lg"></div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1 ml-2">Your message:</p>
                  <p className="text-slate-700 ml-2 leading-relaxed">
                    {req.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-slate-500 mb-4">
                   <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>Sent {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "—"}, {req.createdAt ? new Date(req.createdAt).toLocaleTimeString() : ""}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{req.taskId?.location || "—"}</span>
                   </div>
                </div>

                {(req.taskId?.picture || req.taskId?.image) && (
                  <div className="mt-4">
                    <img 
                      src={req.taskId?.picture || req.taskId?.image} 
                      alt="Task Context" 
                      className="rounded-lg h-48 w-full sm:w-auto object-cover border border-slate-100 shadow-sm"
                    />
                  </div>
                )}

              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyRequests;