import React from 'react';
import { Clock, Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { useState, useEffect } from 'react';

const Requests = () => {

    const { token } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchReceived = async () => {
          try {
            const res = await api.get("/received-requests");
            setRequests(Array.isArray(res.data) ? res.data : []);
          } catch (error) {
            console.error("Error fetching received requests", error);
            setRequests([]);
          }
        };

        if (token) fetchReceived();
      }, [token]);
      
      const updateRequest = async (id, status) => {
        try {
          await api.patch(`/request/${id}`, { status });
      
          // Refresh list
          setRequests((prev) =>
            prev.map((r) =>
              r._id === id ? { ...r, status } : r
            )
          );
      
        } catch (error) {
          console.error("Error updating request", error);
        }
      };
      

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Requests</h1>
          <p className="text-slate-500 mt-1">Manage incoming requests for your tasks</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-slate-500 font-medium">No received requests yet</p>
                <p className="text-sm text-slate-400 mt-1">When someone requests to help with your tasks, they will appear here.</p>
              </div>
            ) : (
            requests.map((req) => (
              <div key={req._id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                
                {/* Status Strip */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  req.status === 'accepted' ? 'bg-green-500' :
                  req.status === 'rejected' ? 'bg-red-500' :
                  req.status === 'pending' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}></div>

                {/* Avatar */}
                <div className="flex-shrink-0 ml-2">
                  {req.requesterId?.avatarImage ? (
                    <img 
                      src={req.requesterId.avatarImage} 
                      alt={req.requesterId?.name || "User"} 
                      className="w-14 h-14 rounded-full object-cover border border-slate-100 shadow-sm"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-sm ${req.avatarColor || 'bg-slate-100 text-slate-600'}`}>
                      {req.requesterId?.name?.charAt(0) || "?"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{req.requesterId?.name || "Unknown"} {req.requesterId?.email || ""}</h3>
                        {req.status !== 'pending' && (
                          <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1 ${
                            req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {req.status === 'accepted' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {req.status}
                          </span>
                        )}
                        {req.status === 'pending' && (
                           <span className="px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1 bg-orange-100 text-orange-700">
                            <AlertCircle size={12} /> Pending
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm font-medium text-slate-700 mb-3">
                        <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{req.taskId?.rating ?? "—"}</span>
                        {/* <span className="text-slate-400 font-normal ml-1">({req.taskId.reviewsCount} reviews)</span> */}
                      </div>

                      
                      
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4 inline-block">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Requesting for:</span>
                        <span className="text-slate-900 font-medium">{req.taskId?.title || "Unknown Task"}</span>
                      </div>
                    </div>

                    {req.status === 'pending' && (
                      <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                        <button onClick={() => updateRequest(req._id, "accepted")} className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-sm shadow-green-200 flex items-center justify-center gap-2">
                          <CheckCircle size={18} /> Accept
                        </button>
                        <button onClick={() => updateRequest(req._id, "rejected")} className="px-6 py-2.5 bg-white hover:bg-red-50 text-red-500 font-semibold rounded-lg border border-red-200 hover:border-red-300 transition-colors flex items-center justify-center gap-2">
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-slate-50 pt-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{new Date(req.createdAt).toLocaleDateString()}, {new Date(req.createdAt).toLocaleTimeString()}</span>
                    </div>
                    {/* <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{req.taskId.location}</span>
                    </div> */}
                  </div>
                </div>

              </div>
            )))
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default Requests;