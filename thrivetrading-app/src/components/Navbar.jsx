import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png"; // Place your logo image in src/assets/logo.png

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if a token/user session exists in local storage
  const token = localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#38bdf8" : "#cbd5e1",
    textDecoration: "none",
    fontWeight: isActive(path) ? "600" : "400",
    fontSize: "0.95rem"
  });

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav style={{ 
        background: "#1e293b", 
        padding: "0.85rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        borderBottom: "1px solid #334155",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        {/* Logo Section */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <img 
            src={logoImg} 
            alt="Thrivetradingllc Logo" 
            style={{ 
              height: "36px", 
              width: "auto", 
              objectFit: "contain" 
            }} 
            onError={(e) => {
              // Fallback to text icon if the image fails to load
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div style={{
            display: "none",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #0284c7, #38bdf8)",
            alignItems: "center",
            justifyContent: "center",
            color: "#0f172a",
            fontWeight: "900",
            fontSize: "1.2rem"
          }}>
            T
          </div>
          <span style={{ color: "#f8fafc", fontWeight: "700", fontSize: "1.25rem", letterSpacing: "0.5px" }}>
            Thrivetrading<span style={{ color: "#38bdf8" }}>LLC</span>
          </span>
        </Link>
        
        {/* Links */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link to="/" style={navLinkStyle("/")}>Home</Link>
          <Link to="/portfolio" style={navLinkStyle("/portfolio")}>Client Portal</Link>
          <Link to="/admin" style={navLinkStyle("/admin")}>Admin Desk</Link>
          
          {token ? (
            <button 
              onClick={handleSignOut}
              style={{
                padding: "0.45rem 1rem",
                background: "#ef4444",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer"
              }}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle("/login")}>Sign In</Link>
              <Link 
                to="/signup" 
                style={{ 
                  padding: "0.45rem 1rem", 
                  background: "#38bdf8", 
                  color: "#0f172a", 
                  borderRadius: "6px", 
                  textDecoration: "none", 
                  fontWeight: "700",
                  fontSize: "0.9rem"
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/17653404351?text=Hello%20Thrivetradingllc%20Support" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50px",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "0.9rem",
          zIndex: 9999
        }}
      >
        <span>💬 Chat Support</span>
      </a>
    </>
  );
}