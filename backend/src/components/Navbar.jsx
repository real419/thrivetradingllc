import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>??</span>
        <h2 style={{ color: "#38bdf8", margin: 0, fontWeight: "bold" }}>Thrivetradingllc</h2>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "#f8fafc", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/portfolio" style={{ color: "#f8fafc", textDecoration: "none" }}>Portfolio</Link>
        <Link to="/admin" style={{ color: "#f8fafc", textDecoration: "none" }}>Admin Panel</Link>
      </div>
    </nav>
  );
}
