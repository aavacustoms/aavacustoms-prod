"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b] pt-12 pb-24 animate-page-enter">
      {/* Decorative Brand Ambient Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-primary w-[40rem] h-[40rem] -top-60 -left-40 opacity-20" />
        <div className="glow-blob glow-blob-secondary w-[35rem] h-[35rem] bottom-10 right-10 opacity-15" />
      </div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Category */}
        <div className="flex justify-center mb-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
            Our Atelier
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight">
            About <span className="text-gradient">AAVA Customs</span>
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            We operate at the convergence of pristine design logic and high-end tactile execution. Every creation is engineered for client distinction.
          </p>
        </div>

        {/* Hero Image Frame */}
        <div className="relative w-full h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden border border-[#2c7a7b]/20 shadow-2xl mb-20">
          <Image
            src="/images/about_hero.png"
            alt="AAVA Customs Craftsmanship"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg space-y-2">
            <span className="text-[9px] font-extrabold tracking-widest text-[#2c7a7b] uppercase px-2.5 py-1 rounded-full bg-[#1a365d]/40 backdrop-blur-sm border border-[#2c7a7b]/30 inline-block">
              Est. 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Uncompromised Standard</h2>
            <p className="text-slate-300 text-xs font-light leading-relaxed">
              Every sample compiled, every venue layout drawn, and every delivery executed is tracked under a singular, high-standard production blueprint.
            </p>
          </div>
        </div>

        {/* Two Column details: Vision & Standard */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2c7a7b] uppercase block">
              The Vision
            </span>
            <h3 className="text-2xl font-display font-bold text-white tracking-wide">
              Bespoke Identity Over Templates
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              In a market filled with generic options, AAVA Customs builds custom statements. We partner with companies who view corporate gifting and events as extensions of their corporate brand value. 
            </p>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              Whether debossing custom bamboo technology containers or styling projection structures for leadership summits, our focus remains on providing a seamless experience.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2c7a7b] uppercase block">
              Our Standard
            </span>
            <h3 className="text-2xl font-display font-bold text-white tracking-wide">
              Meticulous Craft & Coordination
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              We employ dedicated design producers who supervise the entire pipeline. We do not pass our operations down to third-party shipping aggregates. We compile, wrap, and clear customs directly, guaranteeing peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0a1220]/40 border border-slate-900">
                <span className="text-xl font-bold text-[#2c7a7b] block">100%</span>
                <span className="text-[10px] uppercase text-slate-500 tracking-wider">Custom Built</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a1220]/40 border border-slate-900">
                <span className="text-xl font-bold text-[#2c7a7b] block">Global</span>
                <span className="text-[10px] uppercase text-slate-500 tracking-wider">Duty Paid Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#2c7a7b]/20 bg-[#090e18]/80 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c7a7b]/5 to-[#1a365d]/5 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Let&apos;s Draw Up Your Blueprint</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              Discuss packaging samples or reserve coordinate slots for your upcoming annual retreats.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] text-white text-xs font-bold tracking-widest uppercase border border-[#2c7a7b]/30 shadow-md transition-all duration-300"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
