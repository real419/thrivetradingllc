import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Public Pages
import Home from './pages/Public/Home';
import About from './pages/Public/About';
import Investments from './pages/Public/Investments';
import Contact from './pages/Public/Contact';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Client Pages
import ClientDashboard from './pages/Client/Dashboard';
import ClientPortfolio from './pages/Client/Portfolio';
import ClientDeposits from './pages/Client/Deposits';

// Admin Pages
import AdminOverview from './pages/Admin/Overview';
import AdminClients from './pages/Admin/Clients';

// Toggle to false when you are ready to enforce actual login authentication
const DEV_BYPASS_AUTH = true;

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  if (DEV_BYPASS_AUTH) return children;

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={userRole === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
};

// Fallback Placeholder if a sub-component file isn't created yet
const SafeComponent = ({ Component, fallbackName }) => {
  if (Component) return <Component />;
  return (
    <div className="p-6 bg-slate-800 text-white rounded-lg border border-slate-700 my-4">
      <h2 className="text-xl font-bold">{fallbackName} Page</h2>
      <p className="text-slate-400 text-sm mt-1">Component route active. Add file content to render UI.</p>
    </div>
  );
};

// Layout Wrappers
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-slate-900 text-white">
    {Navbar && <Navbar />}
    <main className="flex-grow">{children}</main>
    {Footer && <Footer />}
  </div>
);

const AppLayout = ({ children, role }) => (
  <div className="flex min-h-screen bg-slate-900 text-white">
    {Sidebar && <Sidebar role={role} />}
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <main className="p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><SafeComponent Component={Home} fallbackName="Home" /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><SafeComponent Component={About} fallbackName="About" /></PublicLayout>} />
        <Route path="/investments" element={<PublicLayout><SafeComponent Component={Investments} fallbackName="Investments" /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><SafeComponent Component={Contact} fallbackName="Contact" /></PublicLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<SafeComponent Component={Login} fallbackName="Login" />} />
        <Route path="/signup" element={<SafeComponent Component={Signup} fallbackName="Signup" />} />

        {/* Client Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRole="CLIENT">
            <AppLayout role="CLIENT"><SafeComponent Component={ClientDashboard} fallbackName="Client Dashboard" /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute allowedRole="CLIENT">
            <AppLayout role="CLIENT"><SafeComponent Component={ClientPortfolio} fallbackName="Client Portfolio" /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/deposits" element={
          <ProtectedRoute allowedRole="CLIENT">
            <AppLayout role="CLIENT"><SafeComponent Component={ClientDeposits} fallbackName="Client Deposits" /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AppLayout role="ADMIN"><SafeComponent Component={AdminOverview} fallbackName="Admin Overview" /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/clients" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AppLayout role="ADMIN"><SafeComponent Component={AdminClients} fallbackName="Admin Clients" /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/portfolio" replace />} />
      </Routes>
    </Router>
  );
}