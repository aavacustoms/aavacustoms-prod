"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Gifting", href: "/gifting" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#060a12]/80 border-b border-[#2c7a7b]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9">
            <Image
              src="/logo-white.svg"
              alt="AAVA Customs Logo"
              fill
              className="object-contain drop-shadow-[0_0_12px_rgba(44,122,123,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="font-display font-bold text-base sm:text-lg tracking-[0.22em] text-white">
            AAVA CUSTOMS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link hover:text-[#2c7a7b] transition-colors duration-200 ${isActive(link.href) ? "active-link text-[#2c7a7b]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a365d]/40 to-[#2c7a7b]/50 hover:to-[#2c7a7b]/80 border border-[#2c7a7b]/30 hover:border-[#2c7a7b]/70 text-xs font-bold tracking-wider uppercase text-white shadow-sm transition-all duration-300 hover:shadow-[0_0_14px_rgba(44,122,123,0.3)]"
        >
          <span>Get Estimate</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2c7a7b]/10 bg-[#060a12]/98 px-6 py-6 space-y-1 animate-float">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b border-slate-900/60 ${
                isActive(link.href)
                  ? "text-[#2c7a7b]"
                  : "text-slate-300 hover:text-[#2c7a7b]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
            >
              Get Custom Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
