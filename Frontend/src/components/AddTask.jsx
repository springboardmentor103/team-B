import React, { useState } from 'react';
import { Upload, Calendar, MapPin, Tag, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// import { response } from 'express';
import axios from 'axios';
import api from '../api/api';

const AddTask = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [ description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState();
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();

  const { token } = useAuth();


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const combineDateTime = (date, time) => {
  if (!date || !time) return null;
  return new Date(`${date}T${time}`);
};

  async function handleSubmit(e) {
    e.preventDefault();
    const newTask = { title, description, location, 
      start_time: combineDateTime(start_date, start_time),
      end_time: combineDateTime(end_date, end_time)
    };

    try {
    
      const response = await api.post("/create-task", newTask);
      console.log(response.data);

      setTitle("");
      setDescription("");
      setLocation("");
      setStartTime(null);
      setEndTime(null);
      setFile(null);

    }
    catch(error) {
      console.log({ "Cannot add task": error });
    }
  }

  return (
    <div className="feed-page add-task-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Add New Task</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Create a task and find someone to help you</p>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="input-group">
          <label className="label">Task Title</label>
          <input 
            type="text" 
            className="input" 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Help moving furniture" 
          />
        </div>

        <div className="input-group">
          <label className="label">Description</label>
          <textarea 
            className="input" 
            onChange={(e) => setDescription(e.target.value)}
            rows="4" 
            placeholder="Describe what help you need, any requirements, and what you'll provide..."
            style={{ resize: 'vertical' }}
          ></textarea>
        </div>

        <div className="input-group">
          <label className="label">Location</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
            <input 
              type="text" 
              className="input" 
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Downtown Seattle, WA or specific address" 
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="input-group">
            <label className="label">Start Date</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
              <input 
                type="date" 
                className="input" 
                onChange={(e) => setStartDate(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div className="input-group">
            <label className="label">Start Time</label>
            <div style={{ position: 'relative' }}>
              <Clock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
              <input 
                type="time" 
                className="input" 
                onChange={(e) => setStartTime(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="input-group">
            <label className="label">End Date (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
              <input 
                type="date" 
                className="input" 
                onChange={(e) => setEndDate(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div className="input-group">
            <label className="label">End Time (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Clock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
              <input 
                type="time" 
                className="input" 
                onChange={(e) => setEndTime(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">Category</label>
          <div style={{ position: 'relative' }}>
            <Tag size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-secondary)' }} />
            <select className="input" style={{ paddingLeft: '2.5rem', appearance: 'none' }}>
              <option value="" disabled selected>Select a category</option>
              <option value="moving">Moving & Lifting</option>
              <option value="cleaning">Cleaning</option>
              <option value="assembly">Assembly</option>
              <option value="gardening">Gardening</option>
              <option value="delivery">Delivery</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="label">Task Image (Optional)</label>
          <div 
            className="upload-area"
            onDragEnter={handleDrag} 
            onDragLeave={handleDrag} 
            onDragOver={handleDrag} 
            onDrop={handleDrop}
            style={{ 
              border: `2px dashed ${dragActive ? 'var(--color-primary)' : 'var(--color-gray-200)'}`, 
              borderRadius: 'var(--radius)', 
              padding: '2rem', 
              textAlign: 'center',
              backgroundColor: dragActive ? 'var(--color-primary-light)' : 'var(--color-gray-50)',
              transition: 'all 0.2s',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              onChange={handleChange}
              accept="image/*"
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'block' }}>
              {file ? (
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)' }}>
                   <Tag size={20} />
                   <span style={{ fontWeight: 500 }}>{file.name}</span>
                 </div>
              ) : (
                <>
                  <Upload size={32} style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--color-primary)' }}>Upload a file</span> or drag and drop
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-outline" style={{ minWidth: '100px' }}>Cancel</button>
          <button className="btn btn-primary px-4 py-2" style={{ minWidth: '150px' }} onClick={handleSubmit}>Post Task</button>
        </div>

      </div>
      </form>
    </div>
  );
};

export default AddTask;