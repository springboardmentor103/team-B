import React, { useState } from 'react';
import { Upload, Calendar, MapPin, Tag, Clock } from 'lucide-react';

const AddTask = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

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

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Add New Task</h1>
        <p className="text-slate-500">Create a task and find someone to help you</p>
      </div>

      <div className="card space-y-6">
        <div className="input-group">
          <label className="label">Task Title</label>
          <input 
            type="text" 
            className="input" 
            placeholder="e.g. Help moving furniture" 
          />
        </div>

        <div className="input-group">
          <label className="label">Description</label>
          <textarea 
            className="input resize-y" 
            rows="4" 
            placeholder="Describe what help you need, any requirements, and what you'll provide..."
          ></textarea>
        </div>

        <div className="input-group">
          <label className="label">Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              className="input pl-10" 
              placeholder="e.g., Downtown Seattle, WA or specific address" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="label">Start Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="date" 
                className="input pl-10" 
              />
            </div>
          </div>
          <div className="input-group">
            <label className="label">Start Time</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="time" 
                className="input pl-10" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="label">End Date (Optional)</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="date" 
                className="input pl-10" 
              />
            </div>
          </div>
          <div className="input-group">
            <label className="label">End Time (Optional)</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="time" 
                className="input pl-10" 
              />
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">Category</label>
          <div className="relative">
            <Tag size={18} className="absolute left-3 top-3 text-slate-400" />
            <select className="input pl-10 appearance-none bg-white">
              <option value="" disabled selected>Select a category</option>
              <option value="moving">Moving & Lifting</option>
              <option value="cleaning">Cleaning</option>
              <option value="assembly">Assembly</option>
              <option value="gardening">Gardening</option>
              <option value="delivery">Delivery</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="label">Task Image (Optional)</label>
          <div 
            onDragEnter={handleDrag} 
            onDragLeave={handleDrag} 
            onDragOver={handleDrag} 
            onDrop={handleDrop}
            className={`p-8 border-2 border-dashed rounded-radius text-center transition-all duration-200 cursor-pointer relative ${
              dragActive ? 'border-primary bg-primary-light' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleChange}
              accept="image/*"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              {file ? (
                 <div className="flex items-center justify-center gap-2 text-primary-dark font-medium">
                   <Tag size={20} />
                   <span>{file.name}</span>
                 </div>
              ) : (
                <>
                  <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                  <p className="font-medium text-slate-900 mb-1">
                    <span className="text-primary hover:underline">Upload a file</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button className="btn-outline min-w-[100px]">Cancel</button>
          <button className="btn-primary min-w-[150px] shadow-md hover:shadow-lg transition-shadow">Post Task</button>
        </div>

      </div>
    </div>
  );
};

export default AddTask;
