import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowLeftRight, Users, ShieldCheck, LogOut } from 'lucide-react';
import { COMPANY_CONFIG } from '../config';

export default function Sidebar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const clientNav = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Portfolio', path: '/portfolio', icon: Wallet },
    { label: 'Deposits & Withdrawals', path: '/deposits', icon: ArrowLeftRight },
  ];

  const adminNav = [
    { label: 'Admin Overview', path: '/admin', icon: ShieldCheck },
    { label: 'Client Accounts', path: '/admin/clients', icon: Users },
  ];

  const links = role === 'ADMIN' ? adminNav : clientNav;

  return (
    <aside className="w-64 bg-navy-900 border-r border-slate-800 text-white flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-3" onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=TT'; }} />
        <span className="text-lg font-bold tracking-tight">
          Thrive<span className="text-brandCyan">trading</span>
        </span>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4 border-b border-slate-800/60 bg-navy-800/40">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Workspace</span>
        <p className="text-sm font-medium text-brandCyan capitalize">{role.toLowerCase()} Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-brandBlue text-white shadow-md' 
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/30 rounded-lg transition"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}