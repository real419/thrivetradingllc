import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../config/api";

const API_BASE = `${API_BASE_URL}/api`;

export default function Portfolio() {
  const [positions, setPositions] = useState([
    { id: 1, symbol: "AAPL", shares: 10, buyPrice: 175.50, currentPrice: 182.20 },
    { id: 2, symbol: "NVDA", shares: 5, buyPrice: 450.00, currentPrice: 485.10 }
  ]);

  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");

  // Optional: Sync with backend if available, fallback to local state
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await fetch(`${API_BASE}/trades`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && (data.trades || Array.isArray(data))) {
            setPositions(data.trades || data);
          }
        }
      } catch (err) {
        console.log("Using local portfolio state (Backend offline or endpoint unconfigured)");
      }
    };
    fetchTrades();
  }, []);

  const handleAddTrade = async (e) => {
    e.preventDefault();
    if (!symbol || !shares || !price) return;

    const newTrade = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      shares: Number(shares),
      buyPrice: Number(price),
      currentPrice: Number(price)
    };

    // Update local state instantly for seamless UX
    setPositions([...positions, newTrade]);
    setSymbol("");
    setShares("");
    setPrice("");

    // Optional: Send to backend
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_BASE}/trades`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(newTrade)
        });
      }
    } catch (err) {
      console.error("Failed to sync trade with backend:", err);
    }
  };

  return (
    <div style={{ padding: "1.5rem", color: "#f8fafc", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.75rem", color: "#38bdf8", marginBottom: "0.25rem" }}>Client Portfolio & Order Management</h2>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Execute and track your live asset positions.</p>
      
      {/* Order Entry Form (Fully responsive with flexWrap) */}
      <form onSubmit={handleAddTrade} style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "8px", border: "1px solid #334155", marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input 
          placeholder="Asset Symbol (e.g. BTC)" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value)} 
          style={{ flex: "1 1 180px", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} 
          required
        />
        <input 
          type="number" 
          placeholder="Shares/Quantity" 
          value={shares} 
          onChange={(e) => setShares(e.target.value)} 
          style={{ flex: "1 1 140px", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} 
          required
        />
        <input 
          type="number" 
          placeholder="Price ($)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          style={{ flex: "1 1 140px", padding: "0.6rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} 
          required
        />
        <button 
          type="submit" 
          style={{ background: "#38bdf8", color: "#0f172a", padding: "0.6rem 1.5rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", flex: "1 1 160px" }}
        >
          Execute Trade
        </button>
      </form>

      {/* Active Positions Table Container (Wrapped in overflowX for mobile scrolling) */}
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", overflowX: "auto", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#0f172a", borderBottom: "1px solid #334155", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>
              <th style={{ padding: "1rem" }}>Symbol</th>
              <th style={{ padding: "1rem" }}>Shares</th>
              <th style={{ padding: "1rem" }}>Buy Price</th>
              <th style={{ padding: "1rem" }}>Current Price</th>
              <th style={{ padding: "1rem" }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                  No positions found. Execute a trade above.
                </td>
              </tr>
            ) : (
              positions.map((pos) => {
                const pnl = ((pos.currentPrice - pos.buyPrice) * pos.shares).toFixed(2);
                const isProfit = Number(pnl) >= 0;
                return (
                  <tr key={pos.id} style={{ borderBottom: "1px solid #334155", color: "#f8fafc" }}>
                    <td style={{ padding: "1rem", fontWeight: "bold" }}>{pos.symbol}</td>
                    <td style={{ padding: "1rem" }}>{pos.shares}</td>
                    <td style={{ padding: "1rem" }}>${Number(pos.buyPrice).toFixed(2)}</td>
                    <td style={{ padding: "1rem" }}>${Number(pos.currentPrice).toFixed(2)}</td>
                    <td style={{ padding: "1rem", fontWeight: "600", color: isProfit ? "#4ade80" : "#f87171" }}>
                      {isProfit ? `+$${pnl}` : `-$${Math.abs(pnl)}`}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}