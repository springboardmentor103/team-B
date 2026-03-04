import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {LoadingProvider} from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);