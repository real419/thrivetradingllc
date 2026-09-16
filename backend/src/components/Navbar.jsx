import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span className="text-xl">⚡</span>
          <h2 className="text-sky-400 m-0 font-bold text-lg sm:text-xl">Thrivetradingllc</h2>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-100 hover:text-sky-400 transition text-sm font-medium">Dashboard</Link>
          <Link to="/portfolio" className="text-slate-100 hover:text-sky-400 transition text-sm font-medium">Portfolio</Link>
          <Link to="/admin" className="text-slate-100 hover:text-sky-400 transition text-sm font-medium">Admin Panel</Link>
          <Link to="/signup" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition">Get Started</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu} 
            className="text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-3 pb-2">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-sky-400 text-sm font-medium py-2 px-2 rounded hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link 
            to="/portfolio" 
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-sky-400 text-sm font-medium py-2 px-2 rounded hover:bg-slate-800"
          >
            Portfolio
          </Link>
          <Link 
            to="/admin" 
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-sky-400 text-sm font-medium py-2 px-2 rounded hover:bg-slate-800"
          >
            Admin Panel
          </Link>
          <Link 
            to="/signup" 
            onClick={() => setIsOpen(false)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-center py-2.5 rounded-lg text-sm font-bold transition mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}