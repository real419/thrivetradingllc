import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../config/api';

const API_BASE = `${API_BASE_URL}/api`;

export default function AdminOverview() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
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
          setUsers(data.data || data);
        } else {
          setError(data.error || 'Failed to fetch registered users.');
          // Fallback mock data if backend route is still being configured
          setUsers([
            { id: 1, name: 'John Trader', email: 'john@thrivetrading.com', role: 'CLIENT', balance: 14250.00, createdAt: new Date().toISOString() },
            { id: 2, name: 'Admin Officer', email: 'admin@thrivetrading.com', role: 'ADMIN', balance: 50000.00, createdAt: new Date().toISOString() }
          ]);
        }
      } catch (err) {
        console.error("Admin fetch error:", err);
        setError('Could not connect to backend server. Displaying sample preview.');
        setUsers([
          { id: 1, name: 'John Trader', email: 'john@thrivetrading.com', role: 'CLIENT', balance: 14250.00, createdAt: new Date().toISOString() },
          { id: 2, name: 'Admin Officer', email: 'admin@thrivetrading.com', role: 'ADMIN', balance: 50000.00, createdAt: new Date().toISOString() }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-100">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-white">System Administration Desk</h1>
        <p className="text-sm text-slate-400 mt-1">Review accounts, clear transactions, and monitor platform performance.</p>
      </div>

      {/* Error Banner if any */}
      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-xs">
          {error}
        </div>
      )}

      {/* Users Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Registered Platform Users ({users.length})</h2>
          <span className="text-xs text-cyan-400 font-semibold">Live Database Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 min-w-[600px]">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Account Balance</th>
                <th className="px-6 py-3.5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    Loading users from secure database...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No registered users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id || u.email} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-medium text-white">
                      {u.name} <br/>
                      <span className="text-xs text-slate-400 font-normal">{u.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        u.role === 'ADMIN' 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}>
                        {u.role || 'CLIENT'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold font-mono text-white">
                      ${Number(u.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}