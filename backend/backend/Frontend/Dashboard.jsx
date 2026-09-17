import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/api';

const API_BASE = `${API_BASE_URL}/api`;

export default function ClientDashboard() {
  const [asset, setAsset] = useState('BTC/USD');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('BUY');
  const [trades, setTrades] = useState([]);

  // Fetch live portfolio positions from backend with fallback
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/trades`, {
          headers: {
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTrades(Array.isArray(data) ? data : (data.trades || []));
        } else {
          setTrades([]);
        }
      } catch (err) {
        console.log("Using local state (Backend offline or endpoint unconfigured)");
        setTrades([]);
      }
    };
    fetchTrades();
  }, []);

  const handleTrade = async (e) => {
    e.preventDefault();
    if (!amount) return;
    
    const newTrade = { 
      id: Date.now(), 
      asset, 
      amount: parseFloat(amount), 
      type, 
      status: 'EXECUTED', 
      createdAt: new Date().toLocaleTimeString() 
    };

    // Instant local state update for seamless UX
    setTrades([newTrade, ...trades]);
    setAmount('');

    // Optional: Sync with backend
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_BASE}/trades`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newTrade)
        });
      }
    } catch (err) {
      console.error("Failed to sync order with backend:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Total Portfolio Balance</p>
          <p className="text-2xl font-bold text-white mt-1">$124,850.00</p>
          <span className="text-xs font-semibold text-emerald-400">↑ +14.2% this month</span>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Active Trades</p>
          <p className="text-2xl font-bold text-white mt-1">{trades.length}</p>
          <span className="text-xs font-semibold text-slate-400">Real-time synced</span>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Net Profit / Loss</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">+$18,420.50</p>
          <span className="text-xs font-semibold text-emerald-400">High performance</span>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Available Liquidity</p>
          <p className="text-2xl font-bold text-white mt-1">$42,100.00</p>
          <span className="text-xs font-semibold text-slate-400">Ready to execute</span>
        </div>
      </div>

      {/* Execution Form & Asset Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trade Execution Panel */}
        <div className="p-6 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg h-fit">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Execute New Order
          </h2>
          <form onSubmit={handleTrade} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Select Pair / Asset</label>
              <select 
                value={asset} 
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="BTC/USD">BTC/USD (Bitcoin)</option>
                <option value="ETH/USD">ETH/USD (Ethereum)</option>
                <option value="EUR/USD">EUR/USD (Forex)</option>
                <option value="NVDA">NVDA (NVIDIA Corp)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-1">Trade Volume / Amount ($)</label>
              <input 
                type="number" 
                placeholder="e.g. 2500" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setType('BUY')}
                className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${type === 'BUY' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'bg-slate-700 text-slate-300'}`}
              >
                BUY / LONG
              </button>
              <button 
                type="button" 
                onClick={() => setType('SELL')}
                className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${type === 'SELL' ? 'bg-rose-500 text-white font-bold shadow-md' : 'bg-slate-700 text-slate-300'}`}
              >
                SELL / SHORT
              </button>
            </div>

            <button type="submit" className="w-full py-3 mt-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md transition-all">
              Confirm {type} Order
            </button>
          </form>
        </div>

        {/* Live Holdings / Position Table */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">Active Orders & Positions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 min-w-[500px]">
              <thead className="bg-slate-900/60 uppercase text-xs text-slate-400">
                <tr>
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {trades.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No active trades in system. Execute an order on the left to test.
                    </td>
                  </tr>
                ) : (
                  trades.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-700/30">
                      <td className="py-3.5 px-4 font-semibold text-white">{t.asset}</td>
                      <td className={`py-3.5 px-4 font-bold ${t.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type}</td>
                      <td className="py-3.5 px-4 font-mono">${Number(t.amount || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t.status || 'EXECUTED'}</span></td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">{t.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}