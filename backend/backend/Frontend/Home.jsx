import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Globe, TrendingUp, BarChart3, Lock, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-x-hidden bg-slate-950 text-slate-100">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-400 border border-cyan-400/30">
              Institutional Trading Infrastructure
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Next-Generation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Fintech & Investment Engine
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Execute high-frequency multi-asset trades, track live equity metrics, and grow portfolio wealth on a secure, audit-ready trading platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Link 
                to="/signup" 
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition text-center"
              >
                Open Trading Account
              </Link>
              <Link 
                to="/investments" 
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition text-center"
              >
                View Structured Plans
              </Link>
            </div>
          </div>

          {/* Metric Dashboard Preview */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300 uppercase">Live Engine Status</span>
              </div>
              <span className="text-xs text-cyan-400 font-mono">256-Bit Encrypted</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/60">
                <p className="text-xs text-slate-400">Global Liquidity</p>
                <p className="text-lg sm:text-xl font-bold text-white mt-1">$42.8M+</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700/60">
                <p className="text-xs text-slate-400">Execution Speed</p>
                <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">&lt; 14ms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Serious Investors</h2>
          <p className="text-slate-400 text-sm mt-2">Enterprise architecture designed around security, speed, and real-time clarity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Audit Trails</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every deposit, withdrawal, and trade adjustment is processed through atomic PostgreSQL database transactions.
            </p>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant Execution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              High-throughput REST API routes powered by Node.js and JWT state verification for zero-friction ordering.
            </p>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Institutional Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Role-based authorization middleware (RBAC) separates administrative permissions from client user spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            Client Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Trusted by Traders Worldwide</h2>
          <p className="text-slate-400 text-sm mt-2">See what professionals and private investors have to say about scaling their portfolios on our platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "Thrivetradingllc completely changed how I manage my allocations. The real-time execution speeds and transparency are unmatched."
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4 mt-4">
              <h4 className="font-bold text-white text-sm">Samuel Johnson</h4>
              <p className="text-xs text-slate-400">Portfolio Manager • Lagos</p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "The interface layout is intuitive, lightning fast, and clean. It makes tracking multi-asset portfolios effortless on both mobile and PC."
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4 mt-4">
              <h4 className="font-bold text-white text-sm">Amina Bello</h4>
              <p className="text-xs text-slate-400">Private Investor • Abuja</p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "Top-tier infrastructure with reliable security and audit trails. I have absolute peace of mind trading here."
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4 mt-4">
              <h4 className="font-bold text-white text-sm">David Adeleke</h4>
              <p className="text-xs text-slate-400">Active Trader • Port Harcourt</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}