import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper to highlight active page link
  const isActive = (path) => location.pathname === path;

  // Read auth status from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg group-hover:bg-cyan-500/20 transition-all">
            <img 
              src="/logo.png" 
              alt="Thrivetradingllc Logo" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                // If logo.png is missing in public folder, switch to styled text badge
                e.target.style.display = 'none';
                e.target.parentElement.innerText = 'TT';
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Thrive<span className="text-cyan-400">tradingllc</span>
          </span>
        </Link>

        {/* Desktop Public Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition ${isActive('/') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`transition ${isActive('/about') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            About
          </Link>
          <Link 
            to="/investments" 
            className={`transition ${isActive('/investments') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Investments
          </Link>
          <Link 
            to="/contact" 
            className={`transition ${isActive('/contact') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <Link 
              to={userRole === 'ADMIN' ? '/admin' : '/dashboard'} 
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-md"
            >
              Go to Portal
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-semibold px-4 py-2 rounded-lg text-slate-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-md"
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            About
          </Link>
          <Link 
            to="/investments" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/investments') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            Investments
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
            {token ? (
              <Link 
                to={userRole === 'ADMIN' ? '/admin' : '/dashboard'} 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md"
              >
                Go to Portal
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}