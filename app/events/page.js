"use client";

import Image from "next/image";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b] pt-12 pb-24 animate-page-enter">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-primary w-[40rem] h-[40rem] -top-60 -left-40 opacity-15" />
        <div className="glow-blob glow-blob-secondary w-[35rem] h-[35rem] top-1/2 right-0 opacity-20" />
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
            Event <span className="text-gradient">Production & Organizing</span>
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            We translate strategic brand values into highly coordinated physical summits, retreats, and private gala structures globally.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-[#2c7a7b]/20 shadow-2xl mb-20">
          <Image
            src="/images/events_hero.png"
            alt="Corporate Events Staging and Organizing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent opacity-80" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Leadership Summits & Retreats",
              description: "High-end board getaways including private lodge booking, coordinate dinners, C-suite packages, and transport management.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1M2.25 9l3 1m-3-1V4.5A2.25 2.25 0 014.5 2.25h3.75a2.25 2.25 0 012.25 2.25v2.7M6 10.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 4.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 4.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              )
            },
            {
              title: "Stage Construction & AV Sourcing",
              description: "Teal-illuminated backdrops, projection mapping setups, multiple-camera broadcasting, sound staging, and active engineer coordination.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )
            },
            {
              title: "Active Vendor Supervision",
              description: "A single design producer handles everything: caterer selection, menu print checks, guest badges, host coordination, and physical setups.",
              icon: (
                <svg className="w-6 h-6 text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
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
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Let&apos;s Build Your Next Event</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
              Use our estimator to plan out guest budgets and custom AV options instantly.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] text-white text-xs font-bold tracking-widest uppercase border border-[#2c7a7b]/30 shadow-md transition-all duration-300"
              >
                Start Estimating
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
