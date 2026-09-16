import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../../config';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">Contact Support Desk</h1>
        <p className="text-slate-500 text-sm">Have a question or inquiry? Reach out directly to our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-brandBlue rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">Official Email</p>
              <a href={`mailto:${COMPANY_CONFIG.supportEmail}`} className="text-sm font-semibold text-navy-900 hover:text-brandBlue">
                {COMPANY_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-cyan-50 text-brandCyan rounded-lg">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400">Phone / WhatsApp</p>
              <a href={`tel:${COMPANY_CONFIG.supportPhone}`} className="text-sm font-semibold text-navy-900 hover:text-brandBlue">
                {COMPANY_CONFIG.supportPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <h3 className="text-emerald-800 font-bold">Message Received</h3>
              <p className="text-emerald-600 text-sm">Thank you. Our support team will reply to your inquiry shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Full Name</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Email Address</label>
                  <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Message Subject</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Message Content</label>
                <textarea rows="4" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brandBlue"></textarea>
              </div>
              <button type="submit" className="px-6 py-3 bg-brandBlue hover:bg-blue-600 text-white font-bold rounded-lg text-sm transition">
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}