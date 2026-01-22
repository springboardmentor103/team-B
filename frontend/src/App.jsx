import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Verifyotp from './components/Verify-otp';
import ForgotPassword from './components/Forgot-password';
import ResetPassword from './components/Reset-password';
import { useLoading } from './context/LoadingContext';
import Loader from './components/Loader';
import ResendOtp from './components/Resend-otp';
import Dashboard from './components/Dashboard';
import React from 'react';
export default function App() {
  
  const {loading} = useLoading();
  return (
    <>
    {loading && <Loader />}
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/resend-otp' element={<ResendOtp />} />
        </Routes>
      </div>
    </div>
    </>
  );
}