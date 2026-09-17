import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api"; // Corrected to named import matching standard config setup

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Wipe old session tokens to prevent stale data leaks
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // 2. Authenticate user against backend (API_BASE_URL already contains /api)
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Login failed.");
        return;
      }

      // 3. Save auth token and user record directly returned by API
      localStorage.setItem("token", data.token || "active-auth-token-session");
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // 4. Redirect cleanly to portfolio
      navigate("/portfolio");
    } catch (err) {
      console.error("Login Server Error:", err);
      setError("Unable to communicate with the server. Ensure backend is online.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "4rem auto", padding: "2rem", background: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
      <h2 style={{ fontSize: "1.75rem", color: "#38bdf8", marginBottom: "0.5rem", textAlign: "center" }}>Account Login</h2>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", textAlign: "center", marginBottom: "1.5rem" }}>Access your trading portfolio</p>

      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#fca5a5", padding: "0.75rem", borderRadius: "4px", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          {loading ? "Authenticating..." : "Sign In"}
        </button>
      </form>
      <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#94a3b8", textAlign: "center" }}>
        Don't have an account? <Link to="/signup" style={{ color: "#38bdf8" }}>Register here</Link>
      </p>
    </div>
  );
}