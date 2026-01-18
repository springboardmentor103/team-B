import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



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
      tagColor: "tag-blue",
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
      tagColor: "tag-green",
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
      tagColor: "tag-purple",
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
      tagColor: "tag-orange",
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
      tagColor: "tag-blue",
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
      tagColor: "tag-purple",
      author: { name: "Mark Thompson", avatar: "MT" },
      requestSent: false
    }
  ]);

  const toggleRequest = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, requestSent: !item.requestSent } : item
    ));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ 
            fontWeight: '800', fontSize: '2rem', 
            color: 'var(--color-text-main)',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem'
          }}>Feed</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Find tasks that need help</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>


        </div>
      </div>
      
      <div className="feed-grid">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="job-card"
              style={{
                border: '1px solid var(--color-gray-200)',
                background: 'var(--color-white)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="job-card-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Header: Tag + Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className={`tag ${item.tagColor}`} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>{item.tag}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <Clock size={14} />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 700, 
                  marginBottom: '0.75rem', 
                  color: 'var(--color-text-main)',
                  lineHeight: 1.3
                }}>
                  {item.title}
                </h3>

                {/* Description (Truncated) */}
                <p className="line-clamp-2" style={{ 
                  fontSize: '0.925rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.6', 
                  marginBottom: '1.25rem',
                  flex: 1
                }}>
                  {item.description}
                </p>
                
                {/* Meta: Location */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1.5rem', 
                  color: 'var(--color-text-secondary)', 
                  fontSize: '0.85rem',
                  background: 'var(--color-gray-50)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  width: 'fit-content'
                }}>
                  <MapPin size={15} color="var(--color-primary)" />
                  <span style={{ fontWeight: 500 }}>{item.location}</span>
                </div>
                
                {/* Footer: Author + Button */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: 'auto', 
                  padding: '1.25rem 1.5rem',
                  margin: '0 -1.5rem -1.5rem -1.5rem',
                  background: 'linear-gradient(to bottom, #f8fafc, #eff6ff)',
                  borderTop: '1px solid #e2e8f0' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', 
                      background: 'var(--color-primary-light)', 
                      color: 'var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700,
                      border: '1px solid #e0e7ff'
                    }}>
                      {item.author.avatar}
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.author.name}</span>
                  </div>
                  
                  <button 
                    className="btn"
                    onClick={() => toggleRequest(item.id)}
                    style={{ 
                      backgroundColor: item.requestSent ? 'var(--color-gray-100)' : 'var(--color-primary)', 
                      color: item.requestSent ? 'var(--color-text-secondary)' : '#ffffff', 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      boxShadow: item.requestSent ? 'none' : '0 2px 4px rgba(59, 130, 246, 0.25)'
                    }}
                  >
                    {item.requestSent ? 'Sent' : 'Connect'}
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
