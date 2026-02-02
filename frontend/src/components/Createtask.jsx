
import { useState } from "react";
import axios from "axios";
import { MapPin, Calendar, Clock, Tag, Upload } from "lucide-react";

export default function CreateTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ---------------- Helpers ---------------- */
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const isPastDate = (date) => {
    const now = new Date();
    now.setSeconds(0, 0);
    return new Date(date) < now;
  };

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.start_time) {
      newErrors.start_time = "Start date & time is required";
    } else if (isPastDate(formData.start_time)) {
      newErrors.start_time = "Start time must be in the future";
    }

    if (!formData.end_time) {
      newErrors.end_time = "End date & time is required";
    } else if (isPastDate(formData.end_time)) {
      newErrors.end_time = "End time must be in the future";
    }

    if (
      formData.start_time &&
      formData.end_time &&
      new Date(formData.end_time) <= new Date(formData.start_time)
    ) {
      newErrors.end_time = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/create-task",
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          start_time: formData.start_time,
          end_time: formData.end_time,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);

      setFormData({
        title: "",
        description: "",
        location: "",
        start_time: "",
        end_time: "",
        status: "Pending",
      });

      setErrors({});
      setSubmitted(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Add New Task
        </h1>
        <p className="text-slate-500">
          Create a task and find someone to help you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Title */}
        <div className="input-group">
          <label className="label">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            placeholder="e.g. Help moving furniture"
          />
          {submitted && errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="input-group">
          <label className="label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input resize-y"
            rows="4"
            placeholder="Describe what help you need..."
          />
        </div>

        {/* Location */}
        <div className="input-group">
          <label className="label">Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input pl-10"
              placeholder="Downtown Seattle, WA"
            />
          </div>
        </div>

        {/* Start Time */}
        <div className="input-group">
          <label className="label">Start Date & Time</label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="datetime-local"
              name="start_time"
              min={getMinDateTime()}
              value={formData.start_time}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>
          {submitted && errors.start_time && (
            <p className="text-red-500 text-sm">{errors.start_time}</p>
          )}
        </div>

        {/* End Time */}
        <div className="input-group">
          <label className="label">End Date & Time</label>
          <div className="relative">
            <Clock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="datetime-local"
              name="end_time"
              min={getMinDateTime()}
              value={formData.end_time}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>
          {submitted && errors.end_time && (
            <p className="text-red-500 text-sm">{errors.end_time}</p>
          )}
        </div>

        {/* Status */}
        <div className="input-group">
          <label className="label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary min-w-[150px] justify-center mx-auto px-4 py-2 text-[0.75rem] font-black uppercase tracking-widest rounded-xl bg-primary text-white hover:bg-primary-dark transition shadow-md active:scale-95 flex items-center gap-2"
          >
            {loading ? "Posting..." : "Post Task"}
          </button>
        </div>

        {message && (
          <p className="text-center text-sm text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
