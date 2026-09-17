import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar'; // Adjust path if Navbar is located in a different folder

// Public Pages
import Home from './pages/Home'; // Or your landing page component
import About from './pages/About';
import Investments from './pages/Investments';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Client Portal Pages
import ClientDashboard from './pages/Client/Dashboard';
import ClientPortfolio from './pages/Client/Portfolio';
import Deposits from './pages/Client/Deposits';

// Admin Portal Pages
import AdminOverview from './pages/Admin/Overview';
import AdminClients from './pages/Admin/Clients';

// Simple Protected Route Wrapper
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Redirect clients trying to access admin pages (or vice versa)
    return <Navigate to={userRole === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Global Navbar */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Client Portal Routes (Protected) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRole="CLIENT">
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <ProtectedRoute allowedRole="CLIENT">
                  <ClientPortfolio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/deposits" 
              element={
                <ProtectedRoute allowedRole="CLIENT">
                  <Deposits />
                </ProtectedRoute>
              } 
            />

            {/* Admin Portal Routes (Protected) */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminOverview />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/clients" 
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminClients />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}