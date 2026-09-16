import React, { useState } from "react";

export default function Portfolio() {
  const [positions, setPositions] = useState([
    { id: 1, symbol: "AAPL", shares: 10, buyPrice: 175.50, currentPrice: 182.20 },
    { id: 2, symbol: "NVDA", shares: 5, buyPrice: 450.00, currentPrice: 485.10 }
  ]);

  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");

  const handleAddTrade = (e) => {
    e.preventDefault();
    if (!symbol || !shares || !price) return;
    const newTrade = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      shares: Number(shares),
      buyPrice: Number(price),
      currentPrice: Number(price)
    };
    setPositions([...positions, newTrade]);
    setSymbol("");
    setShares("");
    setPrice("");
  };

  return (
    <div style={{ padding: "2rem", color: "#f8fafc", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Client Portfolio & Order Management</h2>
      
      {/* Order Entry Form */}
      <form onSubmit={handleAddTrade} style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", display: "flex", gap: "1rem" }}>
        <input placeholder="Asset Symbol (e.g. BTC)" value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} />
        <input type="number" placeholder="Shares/Quantity" value={shares} onChange={(e) => setShares(e.target.value)} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} />
        <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #334155", background: "#0f172a", color: "#fff" }} />
        <button type="submit" style={{ background: "#38bdf8", color: "#0f172a", padding: "0.5rem 1.5rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Execute Trade</button>
      </form>

      {/* Active Positions Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#334155", textAlign: "left" }}>
            <th style={{ padding: "1rem" }}>Symbol</th>
            <th style={{ padding: "1rem" }}>Shares</th>
            <th style={{ padding: "1rem" }}>Buy Price</th>
            <th style={{ padding: "1rem" }}>Current Price</th>
            <th style={{ padding: "1rem" }}>P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => {
            const pnl = ((pos.currentPrice - pos.buyPrice) * pos.shares).toFixed(2);
            return (
              <tr key={pos.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>{pos.symbol}</td>
                <td style={{ padding: "1rem" }}>{pos.shares}</td>
                <td style={{ padding: "1rem" }}>${pos.buyPrice}</td>
                <td style={{ padding: "1rem" }}>${pos.currentPrice}</td>
                <td style={{ padding: "1rem", color: pnl >= 0 ? "#4ade80" : "#f87171" }}>
                  {pnl >= 0 ? `+$${pnl}` : `-$${Math.abs(pnl)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
