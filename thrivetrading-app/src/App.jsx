import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function Home() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickers = [
    { pair: "BTC/USD", price: "$64,230.50", change: "+2.4%" },
    { pair: "ETH/USD", price: "$3,450.12", change: "+1.8%" },
    { pair: "EUR/USD", price: "1.0842", change: "-0.15%" },
    { pair: "XAU/USD", price: "$2,340.80", change: "+0.7%" },
    { pair: "NVDA", price: "$124.50", change: "+4.1%" }
  ];

  const steps = [
    {
      number: "01",
      title: "Account Registration & Setup",
      description:
        "Create your personal account in under two minutes to gain immediate access to your live portfolio dashboard and asset desk."
    },
    {
      number: "02",
      title: "Capital Allocation & Approval",
      description:
        "Fund your balance. Our administrative review desk updates your client ledger with complete real-time accuracy."
    },
    {
      number: "03",
      title: "Live Execution & Yield Growth",
      description:
        "Execute buy/sell market orders across top asset tickers while monitoring unrealized PnL and total portfolio equity."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [tickers.length]);

  return (
    <div style={{ background: "#0b132b", color: "#f8fafc", minHeight: "100vh" }}>
      {/* Dynamic Live Market Ticker */}
      <div style={{ 
        background: "#070d1f", 
        borderBottom: "1px solid #1e293b", 
        padding: "0.58rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        fontSize: "0.85rem" 
      }}>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <span style={{ color: "#38bdf8", fontWeight: "bold", letterSpacing: "0.5px" }}>● LIVE MARKETS</span>
          <span style={{ color: "#e2e8f0" }}>
            {tickers[tickerIndex].pair}: <strong>{tickers[tickerIndex].price}</strong>
          </span>
          <span style={{ 
            color: tickers[tickerIndex].change.startsWith("+") ? "#4ade80" : "#f87171",
            fontWeight: "600" 
          }}>
            {tickers[tickerIndex].change}
          </span>
        </div>
        <span style={{ color: "#64748b" }}>Execution Engine: Active (&lt; 15ms)</span>
      </div>

      {/* Hero Section */}
      <section style={{ padding: "5.5rem 2rem 4.5rem", textAlign: "center", maxWidth: "950px", margin: "0 auto" }}>
        <span style={{ 
          background: "linear-gradient(90deg, rgba(56,189,248,0.15), rgba(59,130,246,0.15))", 
          color: "#38bdf8", 
          padding: "0.45rem 1.2rem", 
          borderRadius: "30px", 
          fontSize: "0.85rem", 
          fontWeight: "600",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          letterSpacing: "0.5px"
        }}>
          ⚡ NEXT-GENERATION INSTITUTIONAL DESK
        </span>

        <h1 style={{ fontSize: "3.5rem", color: "#fff", marginTop: "1.8rem", marginBottom: "1.2rem", lineHeight: "1.15", fontWeight: "800" }}>
          Algorithmic Precision & Dynamic Portfolio Intelligence
        </h1>
        
        <p style={{ fontSize: "1.25rem", color: "#94a3b8", marginBottom: "2.5rem", lineHeight: "1.6", maxWidth: "780px", margin: "0 auto 2.5rem" }}>
          Manage your assets, execute live multi-asset strategies, and monitor real-time execution performance inside a unified high-performance SaaS engine.
        </p>

        <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/signup" style={{ 
            padding: "1rem 2.2rem", 
            background: "linear-gradient(135deg, #38bdf8, #0284c7)", 
            color: "#0f172a", 
            borderRadius: "8px", 
            textDecoration: "none", 
            fontWeight: "800", 
            fontSize: "1rem",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.35)"
          }}>
            Open Live Account
          </Link>
          <Link to="/portfolio" style={{ 
            padding: "1rem 2.2rem", 
            background: "#1e293b", 
            color: "#f8fafc", 
            border: "1px solid #334155", 
            borderRadius: "8px", 
            textDecoration: "none", 
            fontWeight: "600", 
            fontSize: "1rem" 
          }}>
            Explore Client Portal
          </Link>
        </div>
      </section>

      {/* Institutional Metrics Grid */}
      <section style={{ background: "#0e172a", padding: "3rem 2rem", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", textAlign: "center" }}>
          <div style={{ padding: "1.5rem", background: "#1e293b", borderRadius: "10px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "2.2rem", color: "#38bdf8", margin: 0, fontWeight: "800" }}>$2.8B+</h3>
            <p style={{ color: "#94a3b8", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>Executed Volume</p>
          </div>
          <div style={{ padding: "1.5rem", background: "#1e293b", borderRadius: "10px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "2.2rem", color: "#38bdf8", margin: 0, fontWeight: "800" }}>99.99%</h3>
            <p style={{ color: "#94a3b8", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>System Uptime SLA</p>
          </div>
          <div style={{ padding: "1.5rem", background: "#1e293b", borderRadius: "10px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "2.2rem", color: "#38bdf8", margin: 0, fontWeight: "800" }}>&lt; 15ms</h3>
            <p style={{ color: "#94a3b8", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>Execution Latency</p>
          </div>
          <div style={{ padding: "1.5rem", background: "#1e293b", borderRadius: "10px", border: "1px solid #334155" }}>
            <h3 style={{ fontSize: "2.2rem", color: "#38bdf8", margin: 0, fontWeight: "800" }}>24/7</h3>
            <p style={{ color: "#94a3b8", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>WhatsApp Desk Support</p>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section style={{ padding: "4.5rem 2rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", color: "#f8fafc", marginBottom: "2.8rem", fontWeight: "700" }}>
          Engineered for Modern Portfolio Management
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "12px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>📊</div>
            <h3 style={{ color: "#38bdf8", marginTop: 0, fontSize: "1.25rem" }}>Real-Time Portfolio Sync</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.5", fontSize: "0.95rem" }}>
              Monitor live trade execution, margin utilization, and overall profit-and-loss metrics synchronized instantly with your backend database.
            </p>
          </div>
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "12px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🛡️</div>
            <h3 style={{ color: "#38bdf8", marginTop: 0, fontSize: "1.25rem" }}>24/7 Customer Care Service</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.5", fontSize: "0.95rem" }}>
              Our support team is available round-the-clock to assist with account funding, client authentication, and platform setup.
            </p>
          </div>
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "12px", border: "1px solid #334155" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>⚡</div>
            <h3 style={{ color: "#38bdf8", marginTop: 0, fontSize: "1.25rem" }}>High-Speed Execution</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.5", fontSize: "0.95rem" }}>
              Optimized front-end routes ensure smooth order submissions and instant ledger updates across crypto, forex, and equities.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "4.5rem 2rem", background: "#0e172a", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              fontSize: "0.85rem",
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontWeight: "bold"
            }}
          >
            Simplified Trading Workflow
          </span>
          <h2 style={{ fontSize: "2.25rem", color: "#f8fafc", marginTop: "0.5rem", marginBottom: "1rem", fontWeight: "700" }}>
            How ThriveTrading Operating System Works
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 3rem", fontSize: "1rem" }}>
            A modern, transparent asset management portal built to streamline trade executions and real-time capital tracking.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  background: "#1e293b",
                  padding: "2.25rem 2rem",
                  borderRadius: "12px",
                  border: "1px solid #334155",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "2.25rem",
                      fontWeight: "800",
                      color: "#38bdf8",
                      display: "block",
                      marginBottom: "0.75rem"
                    }}
                  >
                    {step.number}
                  </span>
                  <h3 style={{ fontSize: "1.25rem", color: "#f8fafc", marginBottom: "0.75rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.925rem", lineHeight: "1.6", margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              marginTop: "3.5rem",
              padding: "2.5rem 2rem",
              background: "linear-gradient(135deg, #1e293b 0%, #0b132b 100%)",
              borderRadius: "12px",
              border: "1px solid #38bdf8"
            }}
          >
            <h3 style={{ fontSize: "1.6rem", color: "#f8fafc", marginBottom: "0.5rem" }}>
              Take Control of Your Asset Growth
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              Experience fast order execution and transparent account management today.
            </p>
            <Link
              to="/signup"
              style={{
                padding: "0.8rem 2rem",
                background: "#38bdf8",
                color: "#0f172a",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ 
        padding: "2rem 1rem", 
        textAlign: "center", 
        fontSize: "1.1rem", 
        color: "#cbd5e1"
      }}>
        Copyright 2026. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#0b132b", color: "#f8fafc", fontFamily: "sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}