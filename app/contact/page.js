"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState("gifting"); // "gifting" | "events"
  const [giftQuantity, setGiftQuantity] = useState(50);
  const [eventGuests, setEventGuests] = useState(100);

  // Add-ons
  const [customPackaging, setCustomPackaging] = useState(true);
  const [premiumSourcing, setPremiumSourcing] = useState(false);
  const [internationalDelivery, setInternationalDelivery] = useState(false);
  const [stageProduction, setStageProduction] = useState(true);
  const [avSourcing, setAvSourcing] = useState(false);
  const [cateringCoordination, setCateringCoordination] = useState(false);

  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "loading" | "success"

  // Recalculate quote
  useEffect(() => {
    let minPrice = 0;
    let maxPrice = 0;

    if (selectedService === "gifting") {
      let unitCost = giftQuantity > 200 ? 5 : giftQuantity > 100 ? 15 : 25;
      let baseMin = giftQuantity * unitCost;
      let baseMax = giftQuantity * (unitCost + 15);

      if (customPackaging) {
        baseMin += giftQuantity * 5;
        baseMax += giftQuantity * 10;
      }
      if (premiumSourcing) {
        baseMin += giftQuantity * 10;
        baseMax += giftQuantity * 20;
      }
      if (internationalDelivery) {
        baseMin += giftQuantity * 15;
        baseMax += giftQuantity * 25;
      }
      minPrice = baseMin;
      maxPrice = baseMax;
    } else {
      let guestCost = eventGuests > 500 ? 25 : eventGuests > 250 ? 35 : 45;
      let baseMin = 1500 + eventGuests * guestCost;
      let baseMax = 2000 + eventGuests * (guestCost + 20);

      if (stageProduction) {
        baseMin += 1500;
        baseMax += 2500;
      }
      if (avSourcing) {
        baseMin += 1000;
        baseMax += 5500;
      }
      if (cateringCoordination) {
        baseMin += eventGuests * 15;
        baseMax += eventGuests * 25;
      }
      minPrice = baseMin;
      maxPrice = baseMax;
    }

    setEstimatedCost({ min: Math.round(minPrice), max: Math.round(maxPrice) });
  }, [
    selectedService,
    giftQuantity,
    eventGuests,
    customPackaging,
    premiumSourcing,
    internationalDelivery,
    stageProduction,
    avSourcing,
    cateringCoordination,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b] pt-12 pb-24 animate-page-enter">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-primary w-[40rem] h-[40rem] -top-60 -left-40 opacity-15" />
        <div className="glow-blob glow-blob-secondary w-[35rem] h-[35rem] bottom-10 right-10 opacity-15" />
      </div>

      <div className="absolute inset-0 cyber-grid opacity-30 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
            Initiate Project
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight">
            Start a <span className="text-gradient">Partnership</span>
          </h1>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Fill in our estimator for an instant ballpark assessment or submit an inquiry directly below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Col: Interactive Estimator */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-[#2c7a7b]/20 bg-[#090e18]/80 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-white tracking-wide">1. Ballpark Estimator</h2>
              <p className="text-slate-500 text-[11px] font-light">Select service scope and options below to review estimated range.</p>
            </div>

            {/* Scope Selection */}
            <div className="grid grid-cols-2 gap-2 bg-[#090f1a] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedService("gifting")}
                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedService === "gifting" ? "bg-[#2c7a7b] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Gifting Packages
              </button>
              <button
                onClick={() => setSelectedService("events")}
                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedService === "events" ? "bg-[#2c7a7b] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Event Organizing
              </button>
            </div>

            {/* Sliders */}
            {selectedService === "gifting" ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">Gift Volume</span>
                  <span className="font-extrabold text-[#2c7a7b] text-sm">{giftQuantity} Boxes</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={giftQuantity}
                  onChange={(e) => setGiftQuantity(Number(e.target.value))}
                  className="w-full accent-[#2c7a7b] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">Guest Count</span>
                  <span className="font-extrabold text-[#2c7a7b] text-sm">{eventGuests} Guests</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="20"
                  value={eventGuests}
                  onChange={(e) => setEventGuests(Number(e.target.value))}
                  className="w-full accent-[#2c7a7b] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Addons checkboxes */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Custom Options</span>
              {selectedService === "gifting" ? (
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={customPackaging}
                      onChange={(e) => setCustomPackaging(e.target.checked)}
                      className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-white block">Custom Debossed Boxes</span>
                      <span className="text-[10px] text-slate-500">Premium walnut / bamboo laser debossing</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={premiumSourcing}
                      onChange={(e) => setPremiumSourcing(e.target.checked)}
                      className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-white block">Artisan Sourcing</span>
                      <span className="text-[10px] text-slate-500">Direct makers curation contracts</span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                    <input
                      type="checkbox"
                      checked={stageProduction}
                      onChange={(e) => setStageProduction(e.target.checked)}
                      className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-white block">Stage Production</span>
                      <span className="text-[10px] text-slate-500">Decor backdrop design and AV integration</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Price Preview */}
            <div className="pt-4 border-t border-slate-900/60 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Estimated Range</span>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                </div>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#2c7a7b] border border-[#2c7a7b]/25 bg-[#2c7a7b]/10 px-2.5 py-1 rounded-full">
                Ballpark Estimate
              </span>
            </div>
          </div>

          {/* Right Col: Contact Form */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 bg-[#0a1220]/25 space-y-6">
              <h2 className="text-lg font-bold text-white tracking-wide">2. Submit Inquiry</h2>

              {formStatus === "success" ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <span className="text-xl font-bold text-emerald-500 block">Thank You</span>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">
                    Our design atelier will compile a draft proposal and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="YOUR FULL NAME"
                      className="w-full bg-[#070b14]/80 border border-slate-900 focus:border-[#2c7a7b]/60 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="EMAIL@COMPANY.COM"
                      className="w-full bg-[#070b14]/80 border border-slate-900 focus:border-[#2c7a7b]/60 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Company Name</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ORGANIZATION INC"
                      className="w-full bg-[#070b14]/80 border border-slate-900 focus:border-[#2c7a7b]/60 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Project Notes</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="BRIEF YOUR DESIGN REQUIREMENTS OR LOGISTICS HERE..."
                      className="w-full bg-[#070b14]/80 border border-slate-900 focus:border-[#2c7a7b]/60 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="glow-btn w-full py-4 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] text-white text-xs font-bold tracking-widest uppercase border border-[#2c7a7b]/30 shadow-md cursor-pointer transition-all"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>

            {/* Direct Details */}
            <div className="p-6 rounded-2xl bg-[#0a1220]/20 border border-slate-900 space-y-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Direct Inquiries</span>
              <div className="space-y-2 text-xs">
                <a href="mailto:hello@aavacustoms.com" className="block text-slate-300 hover:text-[#2c7a7b] transition-colors">
                  hello@aavacustoms.com
                </a>
                <span className="block text-slate-500 font-light">Noida · India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
