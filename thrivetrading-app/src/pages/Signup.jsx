import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Self-contained API base URL to eliminate file-resolution build errors
const API_BASE_URL = "https://thrivetradingllc-backend.onrender.com/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // Safely check if the response is actually JSON before parsing
      const contentType = response.headers.get("content-type");
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned an invalid response. Please try again shortly.");
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed.");
      }

      setSuccess("Account registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "4rem auto", padding: "2rem", background: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
      <h2 style={{ fontSize: "1.75rem", color: "#38bdf8", marginBottom: "0.5rem", textAlign: "center" }}>Create Account</h2>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", textAlign: "center", marginBottom: "1.5rem" }}>Register for a trading account</p>

      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#fca5a5", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", color: "#34d399", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe" 
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }}
            required 
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="trader@thrivetrading.com" 
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }}
            required 
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            style={{ width: "100%", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }}
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "0.75rem", background: loading ? "#64748b" : "#38bdf8", color: "#0f172a", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem" }}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
      <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#94a3b8", textAlign: "center" }}>
        Already have an account? <Link to="/login" style={{ color: "#38bdf8" }}>Log in here</Link>
      </p>
    </div>
  );
}