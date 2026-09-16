import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';
import { COMPANY_CONFIG } from '../config';

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-8 w-auto"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=TT'; }}
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Thrive<span className="text-brandCyan">tradingllc</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Institutional-grade multi-asset liquidity, structured investments, and automated portfolio management for global traders.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/investments" className="hover:text-white transition">Investment Plans</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ & Help</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2 text-slate-400">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </li>
              <li><span>Segregated Client Accounts</span></li>
              <li><span>Prisma ORM Audit Logging</span></li>
            </ul>
          </div>

          {/* Corporate Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Support Desk</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brandCyan shrink-0" />
                <a href={`mailto:${COMPANY_CONFIG.supportEmail}`} className="hover:text-white transition">
                  {COMPANY_CONFIG.supportEmail}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brandCyan shrink-0" />
                <a href={`tel:${COMPANY_CONFIG.supportPhone}`} className="hover:text-white transition">
                  {COMPANY_CONFIG.supportPhone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
          © {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved. High-risk investment disclosure applies.
        </div>
      </div>
    </footer>
  );
}