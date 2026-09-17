import React, { useState, useEffect } from 'react';
import DashboardOverview from '../components/DashboardOverview';

// Define your live Render backend base URL
const API_BASE_URL = "https://thrivetradingllc.onrender.com/api";

export default function Portfolio() {
  const [trades, setTrades] = useState([]);
  const [userTier, setUserTier] = useState('Retail');
  const [formData, setFormData] = useState({
    symbol: 'BTCUSDT',
    side: 'BUY',
    amount: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Fetch trades and user data from the live Render backend
  const fetchData = async () => {
    try {
      const [tradesRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/trades`),
        fetch(`${API_BASE_URL}/users`)
      ]);

      if (tradesRes.ok) {
        const tradeData = await tradesRes.json();
        setTrades(tradeData);
      }

      if (usersRes.ok) {
        const userData = await usersRes.json();
        if (userData.length > 0) {
          setUserTier(userData[0].tier || 'Retail');
        }
      }
    } catch (err) {
      console.error('Error fetching data from backend:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle Order Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: 1 // Uses the user created with seed.js
        })
      });

      if (res.ok) {
        setMessage('Order executed successfully!');
        setFormData({ symbol: 'BTCUSDT', side: 'BUY', amount: '', price: '' });
        fetchData(); // Refresh live table and dashboard calculations
      } else {
        const errorData = await res.json();
        setMessage(`Failed: ${errorData.error}`);
      }
    } catch (err) {
      setMessage('Network error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Portfolio Dashboard Header Widget */}
      <DashboardOverview trades={trades} userTier={userTier} cashBalance={25000} />

      <h1 className="text-2xl font-bold text-white">Trading Portfolio & Execution</h1>

      {/* Order Submission Form */}
      <form onSubmit={handleSubmit} className="bg-slate-800 text-white p-4 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold">Place New Order</h2>
        {message && <div className="p-2 bg-blue-600 rounded text-sm">{message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Asset Symbol</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-slate-700 text-white"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm">Order Side</label>
            <select
              className="w-full p-2 rounded bg-slate-700 text-white"
              value={formData.side}
              onChange={(e) => setFormData({ ...formData, side: e.target.value })}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Amount</label>
            <input
              type="number"
              step="any"
              className="w-full p-2 rounded bg-slate-700 text-white"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm">Price (USD)</label>
            <input
              type="number"
              step="any"
              className="w-full p-2 rounded bg-slate-700 text-white"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 hover:bg-green-500 rounded font-bold transition-colors"
        >
          {loading ? 'Processing Order...' : 'Submit Order'}
        </button>
      </form>

      {/* Trades History Table with horizontal scroll for mobile */}
      <div className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">Executed Trades History</h2>
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-2">ID</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">Side</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Price</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-400">No trades executed yet.</td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={trade.id} className="border-b border-slate-700/50">
                  <td className="p-2">#{trade.id}</td>
                  <td className="p-2 font-mono">{trade.symbol}</td>
                  <td className={`p-2 font-bold ${trade.side === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.side}
                  </td>
                  <td className="p-2">{trade.amount}</td>
                  <td className="p-2">${trade.price}</td>
                  <td className="p-2">{new Date(trade.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}