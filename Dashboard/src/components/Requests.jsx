import React from 'react';
import { Clock, MapPin, Star, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Requests = () => {
  const requests = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 4.8,
      reviews: 18,
      bio: "Hi! I'd love to help with your computer setup. I have 5+ years of IT experience and can handle networking, software installation, and troubleshooting. Available tomorrow afternoon as requested.",
      service: 'Computer Setup Help',
      date: 'Jul 4',
      time: '4:00 PM',
      distance: 'Within 5 miles',
      initials: 'SJ',
      avatarColor: 'bg-orange-100 text-orange-600',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Emily Chen',
      rating: 5,
      reviews: 41,
      bio: "I'd be happy to help with your computer setup! I'm a software engineer with experience in home networking and system configuration. I can bring my own tools if needed.",
      service: 'Computer Setup Help',
      date: 'Jul 4',
      time: '2:00 PM',
      distance: 'Within 5 miles',
      initials: null,
      avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Michael Brown',
      rating: 4.5,
      reviews: 12,
      bio: "Experienced mover. Can help with heavy lifting.",
      service: 'Help Moving Furniture',
      date: 'Jul 3',
      time: '10:00 AM',
      distance: 'Within 10 miles',
      initials: 'MB',
      avatarColor: 'bg-blue-100 text-blue-600',
      status: 'Accepted',
    },
    {
      id: 4,
      name: 'David Wilson',
      rating: 4.2,
      reviews: 8,
      bio: "I do painting and small repairs.",
      service: 'Room Painting Project',
      date: 'Jul 2',
      time: '11:00 AM',
      distance: 'Within 3 miles',
      initials: 'DW',
      avatarColor: 'bg-purple-100 text-purple-600',
      status: 'Rejected',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Requests</h1>
          <p className="text-slate-500 mt-1">Manage incoming requests for your tasks</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                
                {/* Status Strip */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  req.status === 'Accepted' ? 'bg-green-500' :
                  req.status === 'Rejected' ? 'bg-red-500' :
                  'bg-orange-500'
                }`}></div>

                {/* Avatar */}
                <div className="flex-shrink-0 ml-2">
                  {req.avatarImage ? (
                    <img 
                      src={req.avatarImage} 
                      alt={req.name} 
                      className="w-14 h-14 rounded-full object-cover border border-slate-100 shadow-sm"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-sm ${req.avatarColor || 'bg-slate-100 text-slate-600'}`}>
                      {req.initials}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900 text-lg">{req.name}</h3>
                        {req.status !== 'Pending' && (
                          <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1 ${
                            req.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {req.status === 'Accepted' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {req.status}
                          </span>
                        )}
                        {req.status === 'Pending' && (
                           <span className="px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1 bg-orange-100 text-orange-700">
                            <AlertCircle size={12} /> Pending
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm font-medium text-slate-700 mb-3">
                        <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{req.rating}</span>
                        <span className="text-slate-400 font-normal ml-1">({req.reviews} reviews)</span>
                      </div>

                      <p className="text-slate-600 text-[0.95rem] leading-relaxed mb-4">
                        {req.bio}
                      </p>
                      
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4 inline-block">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Requesting for:</span>
                        <span className="text-slate-900 font-medium">{req.service}</span>
                      </div>
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                        <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-sm shadow-green-200 flex items-center justify-center gap-2">
                          <CheckCircle size={18} /> Accept
                        </button>
                        <button className="px-6 py-2.5 bg-white hover:bg-red-50 text-red-500 font-semibold rounded-lg border border-red-200 hover:border-red-300 transition-colors flex items-center justify-center gap-2">
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-slate-50 pt-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{req.date}, {req.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span>{req.distance}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Requests;
