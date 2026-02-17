import React from 'react';
import { Clock, MapPin, User, Search, Bell, CheckCircle, XCircle, AlertCircle, FileCheck } from 'lucide-react';

const MyRequests = () => {
  const myRequests = [
    {
      id: 1,
      title: 'Help Moving Furniture',
      category: 'moving',
      ownerName: 'Sarah Johnson',
      ownerInitials: 'SJ',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700',
      statusIcon: AlertCircle,
      message: "I'd be happy to help with your move! I have experience with heavy lifting and can bring some moving equipment. Available Saturday afternoon as requested.",
      sentDate: 'Jul 4',
      sentTime: '10:00 AM',
      location: 'Downtown Seattle, WA',
      image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'Garden Cleanup',
      category: 'gardening',
      ownerName: 'Robert Wilson',
      ownerInitials: 'RW',
      status: 'Accepted',
      statusColor: 'bg-green-100 text-green-700',
      statusIcon: CheckCircle,
      message: "I have my own tools and can come by this weekend. I've done similar work for other neighbors.",
      sentDate: 'Jul 3',
      sentTime: '2:30 PM',
      location: 'Bellevue, WA',
      image: null,
    },
    {
      id: 3,
      title: 'Room Painting Project',
      category: 'painting',
      ownerName: 'Emily Chen',
      ownerInitials: 'EC',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-700',
      statusIcon: XCircle,
      message: "I can help with the painting. I have experience with interior painting.",
      sentDate: 'Jul 2',
      sentTime: '9:15 AM',
      location: 'Redmond, WA',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'Office Setup',
      category: 'assembly',
      ownerName: 'David Miller',
      ownerInitials: 'DM',
      status: 'Completed',
      statusColor: 'bg-blue-100 text-blue-700',
      statusIcon: FileCheck,
      message: "I can assemble the desks for you. Available on Monday.",
      sentDate: 'Jun 28',
      sentTime: '4:45 PM',
      location: 'Kirkland, WA',
      image: null,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Requests</h1>
          <p className="text-slate-500 mt-1">Track the help requests you've sent</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="space-y-4">
            {myRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">
                      {req.ownerInitials}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{req.title}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                          {req.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Task owner: <span className="text-slate-700">{req.ownerName}</span></p>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5 ${req.statusColor}`}>
                      <req.statusIcon size={14} />
                      {req.status}
                    </span>
                  </div>
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
                      <span>Sent {req.sentDate}, {req.sentTime}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{req.location}</span>
                   </div>
                </div>

                {req.image && (
                  <div className="mt-4">
                    <img 
                      src={req.image} 
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
