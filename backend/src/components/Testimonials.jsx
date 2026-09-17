import React from "react";

const testimonialsData = [
  {
    quote: "Thrivetradingllc completely changed how I manage my portfolio. The interface is lightning fast and incredibly reliable.",
    name: "Adebayo S.",
    role: "Full-Time Trader",
    avatar: "AS",
  },
  {
    quote: "The security and seamless transaction tracking give me total peace of mind. Outstanding platform performance!",
    name: "Chidinma O.",
    role: "Financial Analyst",
    avatar: "CO",
  },
  {
    quote: "Setting up my account and monitoring trades on mobile has never been easier. Highly recommended for any serious trader.",
    name: "Michael K.",
    role: "Cryptocurrency Investor",
    avatar: "MK",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "4rem 1.5rem", background: "#0f172a", color: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.25rem", color: "#38bdf8", fontWeight: "bold", marginBottom: "0.75rem" }}>
            Trusted by Traders Worldwide
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            Here is what our community has to say about their experience on the Thrivetradingllc platform.
          </p>
        </div>

        {/* Testimonials Grid (Responsive: stacks on mobile, 3 columns on desktop) */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "2rem" 
        }}>
          {testimonialsData.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                background: "#1e293b", 
                border: "1px solid #334155", 
                borderRadius: "8px", 
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            >
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{item.quote}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Avatar Badge */}
                <div style={{ 
                  width: "45px", 
                  height: "45px", 
                  borderRadius: "50%", 
                  background: "#38bdf8", 
                  color: "#0f172a", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontWeight: "bold",
                  fontSize: "0.95rem"
                }}>
                  {item.avatar}
                </div>

                <div>
                  <h4 style={{ color: "#f8fafc", fontSize: "1rem", fontWeight: "600", margin: "0" }}>
                    {item.name}
                  </h4>
                  <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}