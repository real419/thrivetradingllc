import React from 'react';
import { COMPANY_CONFIG } from '../../config';

export default function About() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">About {COMPANY_CONFIG.name}</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Pioneering institutional trading infrastructures, transparent execution, and modern portfolio tools for individual and corporate accounts worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy-900">Our Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To eliminate legacy friction from trading desks by pairing direct database-level ledger transparency with lightweight, modern web applications.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy-900">Security Standards</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            All account deposits, withdrawals, and ledger balances are maintained under strict transactional constraints to guarantee capital accuracy at all times.
          </p>
        </div>
      </div>
    </div>
  );
}