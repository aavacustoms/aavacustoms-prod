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
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "#",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@aavacustoms.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-slate-900/80 bg-[#040810]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-12 gap-12 pb-10 border-b border-slate-900/70">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-7 h-7">
                <Image
                  src="/logo-white.svg"
                  alt="AAVA Customs Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(44,122,123,0.35)]"
                />
              </div>
              <span className="font-display font-bold text-base tracking-[0.22em] text-white">
                AAVA CUSTOMS
              </span>
            </Link>
            <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed tracking-wide">
              Bespoke corporate gifting &amp; event production. Designed and managed with uncompromised focus on detail.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full border border-slate-900 flex items-center justify-center text-slate-500 hover:text-white hover:border-[#2c7a7b]/60 hover:shadow-[0_0_10px_rgba(44,122,123,0.3)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            {NAV_COLS.map((col) => (
              <div key={col.heading} className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white block">
                  {col.heading}
                </span>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[11px] font-medium text-slate-500 hover:text-[#2c7a7b] transition-colors duration-200 uppercase tracking-wider"
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
                San Francisco, CA · Dubai
              </div>
            </div>
            <Link
              href="/contact"
              className="glow-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2c7a7b]/15 hover:bg-[#2c7a7b]/25 border border-[#2c7a7b]/30 hover:border-[#2c7a7b]/60 text-[10px] font-bold uppercase tracking-wider text-[#2c7a7b] hover:text-white transition-all duration-300 mt-1"
            >
              Start a Project
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-600 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} AAVA Customs. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
