import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLoading } from "./context/LoadingContext";
import Loader from "./components/Loader";

// Auth pages
import Login from "./components/Login";
import Register from "./components/Register";
import Verifyotp from "./components/Verify-otp";
import ForgotPassword from "./components/Forgot-password";
import ResetPassword from "./components/Reset-password";
import ResendOtp from "./components/Resend-otp";

// Dashboard layout + pages
import DashboardLayout from "./components/Dashboard";
import FeedPage from "./components/FeedPage";
import CreateTask from "./components/Createtask";
import MyRequests from "./components/MyRequests";
import Settings from "./components/Settings";
import MyTasks from "./components/MyTasks";
import Requests from "./components/Requests";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const { loading } = useLoading();

  return (
    <div>
      {loading && <Loader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<Verifyotp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-otp" element={<ResendOtp />} />

        {/* Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="feed" replace />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="add-task" element={<CreateTask />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="my-requests" element={<MyRequests />} />
          <Route path="requests" element={<Requests />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />

        </Route>

        {/* Fallback */}
      </Routes>
    </div>
  );
}
