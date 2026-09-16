import React from 'react';

const testimonials = [
  {
    quote: "Thrivetradingllc completely changed how I manage my investments. The interface is lightning fast and secure.",
    name: "Samuel Johnson",
    role: "Portfolio Manager",
    location: "Lagos"
  },
  {
    quote: "The real-time tracking and clean layout make financial planning effortless. Highly recommended!",
    name: "Amina Bello",
    role: "Private Investor",
    location: "Abuja"
  },
  {
    quote: "Top-tier fintech platform with unmatched speed and reliability. Outstanding user experience.",
    name: "David Adeleke",
    role: "Crypto Trader",
    location: "Port Harcourt"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Trusted by Traders Worldwide
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          See what our clients have to say about their experience scaling their investments with our platform.
        </p>

        {/* Responsive Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between"
            >
              <p className="text-slate-300 italic mb-6 text-sm sm:text-base leading-relaxed">
                "{item.quote}"
              </p>
              <div>
                <h3 className="font-semibold text-white text-base">{item.name}</h3>
                <p className="text-xs sm:text-sm text-emerald-400">{item.role} • {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}