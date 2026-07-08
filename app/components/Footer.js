"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Corporate Gifting", href: "/gifting" },
      { label: "Event Organizing", href: "/events" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About AAVA", href: "/about" },
      { label: "Our Process", href: "/about#process" },
      { label: "Quote Builder", href: "/contact#estimator" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aavacustoms/",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "https://x.com/Aavacustoms",
    icon: (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@aavacustoms.com",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#03070d] border-t border-slate-900/60 pt-16 pb-8">
      {/* Dynamic Background elements */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-[#2c7a7b]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#1a365d]/5 blur-[150px] pointer-events-none" />

      {/* Futuristic top-edge gradient divider line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2c7a7b]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900/60">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-8 h-8 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Image
                  src="/logo-white.svg"
                  alt="AAVA Customs Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(44,122,123,0.4)]"
                />
              </div>
              <span className="font-display font-bold text-base tracking-[0.25em] text-white transition-all duration-300 group-hover:text-[#4fd1c5] group-hover:drop-shadow-[0_0_8px_rgba(79,209,197,0.35)]">
                AAVA CUSTOMS
              </span>
            </Link>
            <p className="text-[12px] text-slate-400 font-light max-w-xs leading-relaxed tracking-wide">
              Crafting premium corporate gifting collections and managing luxury C-suite event production worldwide with uncompromised focus on detail.
            </p>
            {/* Social Link Badges */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-[#0a1220]/50 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#2c7a7b]/50 hover:bg-[#2c7a7b]/10 hover:shadow-[0_0_15px_rgba(44,122,123,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {NAV_COLS.map((col) => (
              <div key={col.heading} className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-200 block relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-4 after:h-[1px] after:bg-[#2c7a7b]">
                  {col.heading}
                </span>
                <ul className="space-y-3 pt-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[11px] font-medium text-slate-400 hover:text-[#4fd1c5] transition-all duration-300 uppercase tracking-wider block hover:translate-x-1"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Quick */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white block">
              Get in Touch
            </span>
            <div className="space-y-3">
              <a
                href="mailto:hello@aavacustoms.com"
                className="flex items-center gap-2 text-[11px] text-slate-500 hover:text-[#2c7a7b] transition-colors group"
              >
                <svg className="w-3.5 h-3.5 shrink-0 text-[#2c7a7b]/60 group-hover:text-[#2c7a7b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@aavacustoms.com
              </a>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <svg className="w-3.5 h-3.5 shrink-0 text-[#2c7a7b]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Noida · India
              </div>
            </div>

            {/* Newsletter Sign Up */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-200 block">
                Stay Updated
              </span>
              <p className="text-[10px] text-slate-500 font-light leading-normal">
                Join our atelier list for seasonal product catalog updates and private events releases.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070b14]/90 border border-slate-800 focus:border-[#2c7a7b]/60 rounded-xl px-4 py-2.5 text-[10px] tracking-wider text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2.5 p-1 text-[#2c7a7b] hover:text-[#4fd1c5] transition-colors"
                >
                  {subscribed ? (
                    <svg className="w-4 h-4 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
              {subscribed && (
                <p className="text-[9px] text-emerald-500 font-medium tracking-wide animate-pulse">
                  THANK YOU. YOU HAVE BEEN ADDED TO OUR LIST.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 tracking-wider">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span>&copy; {new Date().getFullYear()} AAVA Customs. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors uppercase tracking-widest text-[9px]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors uppercase tracking-widest text-[9px]">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
