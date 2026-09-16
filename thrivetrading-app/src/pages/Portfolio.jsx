import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_URL || "https://thrivetradingllc.onrender.com") + "/api";

export default function Portfolio() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [positions, setPositions] = useState([]);
  const [userData, setUserData] = useState({
    balance: 0.0,
    equity: 0.0,
    unrealizedPnL: 0.0,
    profit: 0.0,
    grandTotal: 0.0
  });
  const [symbol, setSymbol] = useState("AAPL");
  const [side, setSide] = useState("BUY");
  const [amount, setAmount] = useState(10);
  const [price, setPrice] = useState(185.5);
  const [error, setError] = useState("");

  const fetchPortfolioData = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const activeUserId = storedUser.id || storedUser.email;

      if (!activeUserId) return;

      const [tradesRes, userRes] = await Promise.all([
        fetch(`${API_BASE}/trades?userId=${activeUserId}`),
        fetch(`${API_BASE.replace('/api', '')}/api/user/${activeUserId}`)
      ]);

      if (!tradesRes.ok || !userRes.ok) throw new Error("Backend synchronization error");

      const tradesData = await tradesRes.json();
      const user = await userRes.json();

      setPositions(Array.isArray(tradesData) ? tradesData : []);
      
      const liveBalance = Number(user.balance ?? storedUser.balance ?? 0.0);
      const liveProfit = Number(user.profit ?? user.unrealizedPnL ?? storedUser.profit ?? 0.0);
      const liveGrandTotal = Number(user.grandTotal ?? user.equity ?? (liveBalance + liveProfit));

      setUserData({
        balance: liveBalance,
        equity: liveGrandTotal,
        unrealizedPnL: liveProfit,
        profit: liveProfit,
        grandTotal: liveGrandTotal
      });

      // Keep localStorage synchronized with the exact object returned by Prisma
      localStorage.setItem("user", JSON.stringify({
        ...storedUser,
        ...user,
        balance: liveBalance,
        profit: liveProfit,
        grandTotal: liveGrandTotal
      }));
      setError("");
    } catch (err) {
      console.warn("Backend sync offline, reading persistent cache:", err);
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (localUser.balance !== undefined) {
        setUserData({
          balance: Number(localUser.balance || 0.0),
          equity: Number(localUser.grandTotal || localUser.equity || 0.0),
          unrealizedPnL: Number(localUser.profit || 0.0),
          profit: Number(localUser.profit || 0.0),
          grandTotal: Number(localUser.grandTotal || 0.0)
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
    const interval = setInterval(fetchPortfolioData, 3000);
    return () => clearInterval(interval);
  }, [fetchPortfolioData]);

  const handleOrder = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const activeUserId = storedUser.id || 1;

    const newOrder = {
      symbol: symbol.toUpperCase(),
      side,
      amount: Number(amount),
      price: Number(price),
      userId: activeUserId
    };

    try {
      const res = await fetch(`${API_BASE}/trades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });

      if (res.ok) {
        fetchPortfolioData();
      } else {
        throw new Error("Failed to place order");
      }
    } catch (err) {
      const localTrade = {
        id: positions.length + 1,
        ...newOrder,
        pnl: 0.0
      };
      setPositions([localTrade, ...positions]);
    }
  };

  // Displays live total value accurately without duplicating active position margins
  const totalValue = userData.grandTotal > 0 
    ? userData.grandTotal 
    : Number(userData.balance || 0) + Number(userData.profit || 0);

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "2rem", color: "#38bdf8", marginBottom: "0.5rem" }}>Client Trading Portal</h1>
      <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Live Execution Desk & Asset Portfolio Overview</p>

      {error && (
        <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      {/* Account Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Total Portfolio Value</span>
          <h2 style={{ fontSize: "1.8rem", color: "#10b981", margin: "0.25rem 0 0" }}>
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Available Cash Balance</span>
          <h2 style={{ fontSize: "1.8rem", color: "#38bdf8", margin: "0.25rem 0 0" }}>
            ${userData.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Profit / Loss (PnL)</span>
          <h2 style={{ fontSize: "1.8rem", color: userData.profit >= 0 ? "#34d399" : "#f87171", margin: "0.25rem 0 0" }}>
            {userData.profit >= 0 ? "+" : ""}${userData.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Active Open Orders</span>
          <h2 style={{ fontSize: "1.8rem", color: "#f8fafc", margin: "0.25rem 0 0" }}>{positions.length}</h2>
        </div>
      </div>

      {/* Order Execution Form */}
      <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "8px", border: "1px solid #334155", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", color: "#38bdf8", marginBottom: "1rem" }}>Execute New Trade</h3>
        <form onSubmit={handleOrder} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Asset Ticker</label>
            <input value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ width: "100%", padding: "0.5rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Order Side</label>
            <select value={side} onChange={(e) => setSide(e.target.value)} style={{ width: "100%", padding: "0.5rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }}>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Quantity</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", padding: "0.5rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>Execution Price ($)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "0.5rem", background: "#0f172a", border: "1px solid #334155", color: "#fff", borderRadius: "4px" }} required />
          </div>
          <button type="submit" style={{ padding: "0.6rem 1rem", background: side === "BUY" ? "#10b981" : "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Submit {side} Order
          </button>
        </form>
      </div>

      {/* Positions Table */}
      <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "8px", border: "1px solid #334155" }}>
        <h3 style={{ fontSize: "1.2rem", color: "#f8fafc", marginBottom: "1rem" }}>Active Positions Ledger</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8", fontSize: "0.85rem" }}>
              <th style={{ padding: "0.75rem" }}>ID</th>
              <th style={{ padding: "0.75rem" }}>Asset</th>
              <th style={{ padding: "0.75rem" }}>Side</th>
              <th style={{ padding: "0.75rem" }}>Shares</th>
              <th style={{ padding: "0.75rem" }}>Price</th>
              <th style={{ padding: "0.75rem" }}>Total Value</th>
              <th style={{ padding: "0.75rem" }}>Unrealized PnL</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => {
              const pnl = pos.pnl || 0;
              return (
                <tr key={pos.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "0.75rem" }}>#{pos.id}</td>
                  <td style={{ padding: "0.75rem", fontWeight: "bold", color: "#38bdf8" }}>{pos.symbol}</td>
                  <td style={{ padding: "0.75rem", color: pos.side === "BUY" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>{pos.side}</td>
                  <td style={{ padding: "0.75rem" }}>{pos.amount}</td>
                  <td style={{ padding: "0.75rem" }}>${pos.price}</td>
                  <td style={{ padding: "0.75rem", fontWeight: "bold" }}>${(pos.amount * pos.price).toFixed(2)}</td>
                  <td style={{ padding: "0.75rem", fontWeight: "bold", color: pnl >= 0 ? "#34d399" : "#f87171" }}>
                    {pnl >= 0 ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}