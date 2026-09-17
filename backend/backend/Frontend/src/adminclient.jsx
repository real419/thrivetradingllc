import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/api';
import { Users, Edit2, Check, X, Shield, AlertCircle } from 'lucide-react';

const API_BASE = `${API_BASE_URL}/api`;

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [newStatus, setNewStatus] = useState('ACTIVE');

  // Fetch clients from backend
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/admin/users`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (response.ok && (data.status === 'success' || Array.isArray(data))) {
        // Filter or map clients (assume all non-admin or full list)
        const list = data.data || data;
        setClients(list);
      } else {
        setError(data.error || 'Failed to fetch clients.');
        // Fallback sample data if endpoint is unconfigured
        setClients([
          { id: 1, name: 'John Trader', email: 'john@thrivetrading.com', balance: 14250.00, status: 'ACTIVE', role: 'CLIENT' },
          { id: 2, name: 'Sarah Investor', email: 'sarah@invest.net', balance: 5320.50, status: 'ACTIVE', role: 'CLIENT' },
          { id: 3, name: 'Michael Risk', email: 'mike@trading.io', balance: 1200.00, status: 'SUSPENDED', role: 'CLIENT' },
        ]);
      }
    } catch (err) {
      console.error("Fetch clients error:", err);
      setError('Could not connect to backend server. Displaying sample preview.');
      setClients([
        { id: 1, name: 'John Trader', email: 'john@thrivetrading.com', balance: 14250.00, status: 'ACTIVE', role: 'CLIENT' },
        { id: 2, name: 'Sarah Investor', email: 'sarah@invest.net', balance: 5320.50, status: 'ACTIVE', role: 'CLIENT' },
        { id: 3, name: 'Michael Risk', email: 'mike@trading.io', balance: 1200.00, status: 'SUSPENDED', role: 'CLIENT' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (client) => {
    setEditingId(client.id);
    setNewBalance(client.balance || 0);
    setNewStatus(client.status || 'ACTIVE');
    setError('');
    setSuccess('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewBalance('');
  };

  const handleSave = async (id) => {
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      // Update local state immediately for seamless responsiveness
      setClients(clients.map(c => c.id === id ? { ...c, balance: Number(newBalance), status: newStatus } : c));
      setEditingId(null);
      setSuccess(`Client account successfully updated.`);

      // Send to backend API
      if (token) {
        await fetch(`${API_BASE}/admin/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ balance: Number(newBalance), status: newStatus })
        });
      }
    } catch (err) {
      console.error("Failed to update client:", err);
      setError('Failed to sync update with server.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Client Account Administration</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Manage Clients</h1>
          <p className="text-sm text-slate-400 mt-1">Audit trader portfolios, update capital balances, and manage account statuses.</p>
        </div>
        <div className="bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
          Total Clients: {clients.length}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex items-center space-x-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Clients Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">Registered Client Accounts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 min-w-[700px]">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Client Info</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Account Balance</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Loading client accounts...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No clients found.
                  </td>
                </tr>
              ) : (
                clients.map((client) => {
                  const isEditing = editingId === client.id;
                  return (
                    <tr key={client.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">{client.name}</p>
                        <p className="text-xs text-slate-400">{client.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded border border-slate-700">
                          {client.role || 'CLIENT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {isEditing ? (
                          <input
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white w-32 focus:outline-none focus:border-cyan-400 text-sm"
                          />
                        ) : (
                          `$${Number(client.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-cyan-400"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            (client.status || 'ACTIVE') === 'ACTIVE' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {client.status || 'ACTIVE'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(client.id)}
                              className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition inline-flex items-center space-x-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition inline-flex items-center space-x-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEditing(client)}
                            className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition inline-flex items-center space-x-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Account</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}