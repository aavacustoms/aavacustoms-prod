"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  // Target Date: July 15, 2026
  const targetDate = new Date("2026-06-10T00:00:00Z");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let left = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      left = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return left;
  };
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b]">

      {/* Decorative Brand Ambient Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-primary w-[35rem] h-[35rem] -top-52 -left-32 animate-pulse-slow" style={{ "--pulse-speed": "8s" } && { animationDuration: "8s" }} />
        <div className="glow-blob glow-blob-secondary w-[40rem] h-[40rem] bottom-[-200px] right-[-200px] animate-pulse-slow" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      </div>
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50 z-0 pointer-events-none" />
      {/* Spacer Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b]/70 uppercase">
          AAVA CUSTOMS
        </span>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a365d]/10 border border-[#2c7a7b]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2c7a7b] animate-ping" />
          <span className="text-[9px] font-bold tracking-wider text-slate-300 uppercase">
            In Development
          </span>
        </div>
      </header>
      {/* Main Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="glass-panel w-full rounded-3xl p-8 sm:p-12 border border-[#2c7a7b]/20 relative overflow-hidden transition-all duration-500 hover:border-[#2c7a7b]/30 flex flex-col items-center text-center gap-8 shadow-[0_20px_50px_0_rgba(6,10,18,0.75)]">

          {/* Glowing Ambient Glow inside the card */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#2c7a7b]/10 rounded-full blur-2xl pointer-events-none" />
          {/* Logo Frame - Using the pre-existing public/logo.svg */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 animate-float">
            <Image
              src="/logo-white.svg"
              alt="AAVA Customs Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(44,122,123,0.35)]"
              priority
            />
          </div>
          {/* Title & Tagline */}
          <div className="space-y-3 max-w-xl">
            <h1 id="main-title" className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              Website Will Be <br />
              <span className="shimmer-text">Live Soon</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto">
              Bespoke Creations. Uncompromised Detail. <br />
              We are finalizing our digital studio. Sign up to get exclusive early access when we launch.
            </p>
          </div>
          {/* Countdown Module */}
          <div className="w-full max-w-md mt-2">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0b1220]/75 border border-[#2c7a7b]/15 rounded-2xl flex flex-col items-center justify-center p-3 sm:p-4 shadow-inner"
                >
                  <span className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#2c7a7b] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Subscription Waitlist */}
          <div className="w-full max-w-md">
            {status === "success" ? (
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 text-left flex items-start gap-3.5 animate-float shadow-[0_0_15px_rgba(16,185,129,0.08)]">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">Access Request Logged</h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    We will notify you immediately at your email when the portal opens.
                  </p>
                </div>
              </div>
            ) : (
              <form id="waitlist-form" onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    id="email-input"
                    required
                    placeholder="Enter email for private preview..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090f1a]/90 border border-[#2c7a7b]/20 focus:border-[#2c7a7b] focus:ring-2 focus:ring-[#2c7a7b]/15 focus:outline-none transition-all duration-300 text-slate-100 placeholder-slate-500 text-xs"
                  />
                  <button
                    type="submit"
                    id="subscribe-button"
                    disabled={status === "loading"}
                    className="glow-btn px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] hover:from-[#369597] hover:to-[#214373] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 border border-[#2c7a7b]/30 shadow-md cursor-pointer shrink-0"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing
                      </>
                    ) : (
                      <>
                        Notify Me
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-[10px] font-semibold text-rose-500 text-left pl-1">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} AAVA Customs. All rights reserved.
        </p>
        <div className="flex gap-4">
          {[
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
              name: "Twitter",
              href: "#",
              icon: (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              name: "Email",
              href: "mailto:info@aavacustoms.com",
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="w-7.5 h-7.5 rounded-full border border-slate-900 flex items-center justify-center text-slate-500 hover:text-white hover:border-[#2c7a7b] hover:shadow-[0_0_8px_rgba(44,122,123,0.3)] transition-all duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
}
