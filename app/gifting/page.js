"use client";

import Image from "next/image";
import Link from "next/link";

export default function GiftingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b] pt-12 pb-24 animate-page-enter">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-secondary w-[40rem] h-[40rem] -top-60 -left-40 opacity-15" />
        <div className="glow-blob glow-blob-primary w-[35rem] h-[35rem] top-1/2 right-0 opacity-20" />
      </div>

      <div className="absolute inset-0 cyber-grid opacity-30 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
            Capabilities
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight">
            Corporate <span className="text-gradient">Gifting Packages</span>
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Avoid template, low-standard corporate items. We source custom-fit tactile products compiled to match your exact corporate guidelines.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-[#2c7a7b]/20 shadow-2xl mb-20">
          <Image
            src="/images/gifting_hero.png"
            alt="Corporate Gifting Packages Curation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent opacity-80" />
        </div>

        {/* Curation Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Atelier Wooden Packaging",
              description: "Individually styled and hot-stamped containers using walnut, bamboo, and pine structures compiled locally.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )
            },
            {
              title: "Artisan Maker Sourcing",
              description: "We work directly with regional organic designers and technology makers to supply high-end leather, copper, and tech goods.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75-6.75M4.5 12l6.75 6.75" />
                </svg>
              )
            },
            {
              title: "Direct Global Fulfillment",
              description: "Full customs brokerage, duty-paid handling, and direct tracked coordinate shipping to individual desks or international hubs.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.78-8.006-2.141m16.012 0a9 9 0 00-16.012 0" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border border-slate-900/60 bg-[#0a1220]/25 space-y-4 hover:border-[#2c7a7b]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#2c7a7b]/10 border border-[#2c7a7b]/25 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white tracking-wide">{item.title}</h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#2c7a7b]/20 bg-[#090e18]/80 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c7a7b]/5 to-[#1a365d]/5 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Configure Gifting Estimate</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
              Use our interactive quote builder to generate a ballpark price for your box quantities and premium add-ons.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] text-white text-xs font-bold tracking-widest uppercase border border-[#2c7a7b]/30 shadow-md transition-all duration-300"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
