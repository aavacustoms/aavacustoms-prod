"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("gifting"); // "gifting" | "events"

  // Calculator States
  const [giftQuantity, setGiftQuantity] = useState(50);
  const [eventGuests, setEventGuests] = useState(100);

  // Gifting Add-ons
  const [customPackaging, setCustomPackaging] = useState(true);
  const [premiumSourcing, setPremiumSourcing] = useState(false);
  const [internationalDelivery, setInternationalDelivery] = useState(false);

  // Events Add-ons
  const [stageProduction, setStageProduction] = useState(true);
  const [avSourcing, setAvSourcing] = useState(false);
  const [cateringCoordination, setCateringCoordination] = useState(false);

  // Quote Estimate Calculation
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  // Contact Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "gifting",
    volume: "50",
    addOnsSelected: "Custom Packaging",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "loading" | "success"

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState("all"); // "all" | "gifting" | "events"

  // Ref to contact form for auto-scrolling
  const contactFormRef = useRef(null);

  // recalculate quote when options change
  useEffect(() => {
    let minPrice = 0;
    let maxPrice = 0;

    if (selectedService === "gifting") {
      // Base cost per gift box: $45 to $75 depending on scale
      let unitCost = giftQuantity > 200 ? 5 : giftQuantity > 100 ? 15 : 25;

      let baseMin = giftQuantity * unitCost;
      let baseMax = giftQuantity * (unitCost + 15);

      // Add-on charges per unit
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
      // Event Coordination Base: $3500 base setup + $35 to $60 per guest
      let guestCost = eventGuests > 500 ? 25 : eventGuests > 250 ? 35 : 45;

      let baseMin = 1500 + (eventGuests * guestCost);
      let baseMax = 2000 + (eventGuests * (guestCost + 20));

      // Add-on charges flat/per-guest
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
    cateringCoordination
  ]);

  // Handle Calculator submission to contact form
  const applyEstimateToForm = () => {
    let addOns = [];
    if (selectedService === "gifting") {
      if (customPackaging) addOns.push("Custom Branding/Packaging");
      if (premiumSourcing) addOns.push("Premium Curated Items");
      if (internationalDelivery) addOns.push("International Fulfillment");
    } else {
      if (stageProduction) addOns.push("Custom Stage/Decor");
      if (avSourcing) addOns.push("Professional Sound & Video");
      if (cateringCoordination) addOns.push("Catering/Beverage Sourcing");
    }

    setFormData((prev) => ({
      ...prev,
      serviceType: selectedService,
      volume: selectedService === "gifting" ? String(giftQuantity) : String(eventGuests),
      addOnsSelected: addOns.join(", ") || "None",
      message: `Hi AAVA team, I generated a custom estimate using your online calculator. 
Estimated Scope: ${selectedService === "gifting" ? `${giftQuantity} custom gifts` : `${eventGuests} guests event`}.
Selected Add-ons: ${addOns.join(", ") || "None"}.
Expected Budget Range: $${estimatedCost.min.toLocaleString()} - $${estimatedCost.max.toLocaleString()}. 
Please get back to me with a detailed blueprint proposal.`
    }));

    // Scroll to contact form
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");

    // Simulate API write
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        serviceType: "gifting",
        volume: "50",
        addOnsSelected: "Custom Packaging",
        message: "",
      });
    }, 1500);
  };

  const galleryItems = [
    {
      title: "Executive Onboarding Boxes",
      category: "gifting",
      description: "Custom bamboo tech organizer, branded journal, copper tumbler, and signature box.",
      metrics: "500 Sets Delivered",
    },
    {
      title: "Tech Summit Gala Night",
      category: "events",
      description: "Immersive teal-illuminated staging, dynamic projection mapping, and dinner coordination.",
      metrics: "450 Executive Guests",
    },
    {
      title: "Venture Partners Launch Gift",
      category: "gifting",
      description: "Curated leather carryall, custom debossed wireless charger, and single-origin coffee kits.",
      metrics: "120 VIP Recipients",
    },
    {
      title: "Luxury Retreat in Aspen",
      category: "events",
      description: "A-list corporate getaway covering high-end lodging, custom gift handovers, and private galas.",
      metrics: "80 C-Suite Clients",
    },
    {
      title: "Eco-Conscious Corporate Swag",
      category: "gifting",
      description: "Recycled canvas backpacks, custom organic shirts, seed paper notebooks in craft tubes.",
      metrics: "1,200 Packs Distributed",
    },
    {
      title: "Annual Leadership Symposium",
      category: "events",
      description: "Complete stage construction, multi-cam live broadcast feed, and networking lounge layouts.",
      metrics: "900 Attendees",
    },
  ];

  const filteredGallery = galleryFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === galleryFilter);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#060a12] text-slate-100 font-sans selection:bg-[#2c7a7b]/30 selection:text-[#2c7a7b]">

      {/* Decorative Brand Ambient Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="glow-blob glow-blob-primary w-[40rem] h-[40rem] -top-60 -left-40 animate-pulse-slow" style={{ animationDuration: "9s" }} />
        <div className="glow-blob glow-blob-secondary w-[45rem] h-[45rem] top-[40%] right-[-200px] animate-pulse-slow" style={{ animationDuration: "12s", animationDelay: "1s" }} />
        <div className="glow-blob glow-blob-primary w-[35rem] h-[35rem] bottom-[-100px] left-[10%] animate-pulse-slow" style={{ animationDuration: "10s", animationDelay: "3s" }} />
      </div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-40 z-0 pointer-events-none" />

      {/* Hero Section */}
      <section id="home" className="relative z-10 w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-24">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/hero_bg.png"
            alt="Aavacustoms Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient vignette to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-[#060a12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a12] via-transparent to-[#060a12]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a365d]/20 border border-[#2c7a7b]/35 shadow-[0_0_15px_rgba(44,122,123,0.15)] animate-float">
            <span className="h-2 w-2 rounded-full bg-[#2c7a7b] animate-ping" />
            <span className="text-[10px] font-extrabold tracking-widest text-[#2c7a7b] uppercase">
              Bespoke Corporate Services
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white max-w-5xl leading-tight">
            We Design Bespoke Experiences <br />
            <span className="text-gradient">for Visionary Brands</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Elevating professional environments. We specialize in custom-crafted **Corporate Gifting** and flawlessly executed **Corporate Events** styled with absolute precision and detail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <a
              href="#estimator"
              className="glow-btn px-8 py-4 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] hover:from-[#369597] hover:to-[#214373] text-white text-xs font-bold tracking-widest uppercase border border-[#2c7a7b]/30 shadow-[0_4px_18px_rgba(44,122,123,0.3)] transition-all duration-300 text-center"
            >
              Build Custom Estimate
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl bg-[#0b1424]/60 hover:bg-[#101c33]/80 border border-slate-800 hover:border-[#2c7a7b]/40 text-slate-300 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Floating Arrow down */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block opacity-65 animate-bounce">
          <a href="#services" className="text-slate-500 hover:text-[#2c7a7b] transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Two Core Services. Custom Curated.
          </h2>
          <p className="text-slate-400 text-sm font-light">
            We operate at the intersection of branding logic and tactile luxury. Whether you want to hand out unforgettable merchandise or orchestrate a large-scale corporate retreat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          {/* Service Card 1: Corporate Gifting */}
          <div className="service-card glass-panel rounded-3xl overflow-hidden border border-[#2c7a7b]/15 bg-[#0a1424]/40 hover:border-[#2c7a7b]/30 shadow-lg flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              {/* stock/AI image */}
              <Image
                src="/images/corporate_gifting.png"
                alt="Aavacustoms Corporate Gifting"
                fill
                className="object-cover service-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a12]/95 via-[#060a12]/30 to-transparent" />
              <div className="absolute bottom-5 left-6 flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#1a365d]/40 backdrop-blur-sm border border-[#2c7a7b]/30">
                <span className="text-[9px] font-extrabold tracking-widest text-white uppercase">
                  Service 01
                </span>
              </div>
            </div>

            <div className="p-8 relative space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl flex items-center gap-3 sm:text-2xl font-display font-bold text-white tracking-wide">
                  Corporate Gifting Packages<a
                    href="/aava.pdf"
                    download
                    className="w-max px-4 inline py-3.5 rounded-xl bg-[#0b1424] hover:bg-[#2c7a7b] hover:text-white border border-[#2c7a7b]/30 hover:border-transparent text-slate-300 text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-inner"
                  >
                    Download catalog
                  </a>
                </h3>

                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  Avoid generic promotional items. We design, source, and compile bespoke gifting collections matching your exact corporate identity. From luxury executive accessories to premium tech crates, every box is packaged custom-fit and can be fulfilled internationally.
                </p>
              </div>

              {/* Service Sub-bullets */}
              <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-800/40 text-xs">
                {[
                  "Bespoke Box Branding",
                  "Premium Curated Sourcing",
                  "Eco-Conscious Collections",
                  "Global Shipping & Logistics",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <svg className="w-3.5 h-3.5 text-[#2c7a7b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#estimator"
                onClick={() => setSelectedService("gifting")}
                className="w-full py-3.5 rounded-xl bg-[#0b1424] hover:bg-[#2c7a7b] hover:text-white border border-[#2c7a7b]/30 hover:border-transparent text-slate-300 text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-inner"
              >
                Configure Gifting Estimate
              </a>

            </div>
          </div>

          {/* Service Card 2: Event Organizing */}
          <div className="service-card glass-panel rounded-3xl overflow-hidden border border-[#2c7a7b]/15 bg-[#0a1424]/40 hover:border-[#2c7a7b]/30 shadow-lg flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              {/* stock/AI image */}
              <Image
                src="/images/event_organizing.png"
                alt="Aavacustoms Event Organizing"
                fill
                className="object-cover service-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a12]/95 via-[#060a12]/30 to-transparent" />
              <div className="absolute bottom-5 left-6 flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#1a365d]/40 backdrop-blur-sm border border-[#2c7a7b]/30">
                <span className="text-[9px] font-extrabold tracking-widest text-white uppercase">
                  Service 02
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
                  Event Production & Management
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  We translate vision into flawless, physical events. Whether organizing private C-suite board retreats in Aspen, multi-cam live streamed product reveals, or lavish gala dinners, our designers manage everything: site scouting, stage designs, lighting, audio systems, catering, and transport schedules.
                </p>
              </div>

              {/* Service Sub-bullets */}
              <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-800/40 text-xs">
                {[
                  "Retreats & Board Summits",
                  "Stage Production & AV",
                  "VIP Guest Concierge",
                  "Full Vendor Management",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <svg className="w-3.5 h-3.5 text-[#2c7a7b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#estimator"
                onClick={() => setSelectedService("events")}
                className="w-full py-3.5 rounded-xl bg-[#0b1424] hover:bg-[#2c7a7b] hover:text-white border border-[#2c7a7b]/30 hover:border-transparent text-slate-300 text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center shadow-inner"
              >
                Configure Event Estimate
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="relative z-10 w-full bg-[#0a0e17]/60 py-20 border-y border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Col: Headings */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
                Why Aavacustoms
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                Meticulous Blueprints. <br />
                Sovereign Quality.
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                At Aavacustoms, we don&apos;t believe in cut corners. Every client brief undergoes a rigorous styling consultation to build structured blueprints matching your corporate prestige.
              </p>

              {/* Highlight cards */}
              <div className="space-y-4 pt-4">
                {[
                  { title: "True Bespoke Tailoring", text: "We do not deal in template catalog solutions. Everything is sourced from scratch." },
                  { title: "Single Point of Coordination", text: "A dedicated design producer coordinates box assembly and vendor setups." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#0e1624] border border-[#2c7a7b]/10">
                    <div className="w-10 h-10 rounded-xl bg-[#2c7a7b]/10 border border-[#2c7a7b]/25 flex items-center justify-center text-[#2c7a7b] font-bold shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white tracking-wide">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Timeline Process */}
            <div className="lg:col-span-7 space-y-8 lg:pl-8">
              <div className="border-l-2 border-[#2c7a7b]/20 pl-6 space-y-8">

                {[
                  {
                    step: "Phase 01",
                    title: "Brand Alignment & Ideation",
                    desc: "We analyze your audience and brand guidelines. We then construct custom mood boards and packaging CAD blueprints to define product choices or venue themes."
                  },
                  {
                    step: "Phase 02",
                    title: "Sourcing & Sample Compilation",
                    desc: "Our brokers source premium physical wares directly from artisan makers, and coordinate venue site inspections to map stage logistics and staging structures."
                  },
                  {
                    step: "Phase 03",
                    title: "Assembly & Live Execution",
                    desc: "Boxes are compiled and shipped under strict quality sweeps. Events are managed on-site with zero margin for error, delivering immersive, stress-free executions."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    {/* Circle timeline nodes */}
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#060a12] border-2 border-[#2c7a7b] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2c7a7b] animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-bold tracking-widest text-[#2c7a7b] uppercase">
                        {item.step}
                      </span>
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Showcase Grid */}
      <section id="portfolio" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Selected Showcase
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-1.5 bg-[#0b1220]/80 p-1.5 rounded-xl border border-slate-800 self-start">
            {[
              { label: "All Work", val: "all" },
              { label: "Gifting", val: "gifting" },
              { label: "Events", val: "events" },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setGalleryFilter(f.val)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${galleryFilter === f.val
                  ? "bg-[#2c7a7b] text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-slate-800/60 bg-[#0a1220]/25 transition-all duration-300 hover:border-[#2c7a7b]/30 hover:shadow-[0_0_15px_rgba(44,122,123,0.1)] flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-extrabold tracking-widest text-[#2c7a7b] uppercase bg-[#2c7a7b]/10 px-2 py-0.5 rounded-full border border-[#2c7a7b]/20">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-500">{item.metrics}</span>
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-bold text-[#2c7a7b] tracking-wider uppercase group cursor-pointer hover:text-teal-400 transition-colors">
                <span>View Specs</span>
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Estimate Calculator */}
      <section id="estimator" className="relative z-10 w-full bg-[#0a0e17]/60 py-20 border-y border-slate-900/60">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
              Budget Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Interactive Quote Builder
            </h2>
            <p className="text-slate-400 text-xs font-light">
              Select a service below, adjust the volume sliders and configure custom additions to generate an instant ballpark budget proposal.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#2c7a7b]/20 bg-[#090e18]/80 shadow-2xl grid md:grid-cols-12 gap-8 items-center">

            {/* Left Box: Controls */}
            <div className="md:col-span-7 space-y-6">

              {/* Service Toggle */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Select Scope
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#090f1a] p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedService("gifting")}
                    className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${selectedService === "gifting"
                      ? "bg-[#2c7a7b] text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Corporate Gifting
                  </button>
                  <button
                    onClick={() => setSelectedService("events")}
                    className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${selectedService === "events"
                      ? "bg-[#2c7a7b] text-white"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Event Organizing
                  </button>
                </div>
              </div>

              {/* Sliders depending on selection */}
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
                    className="w-full accent-[#2c7a7b] h-1.5 bg-slate-800 rounded-lg cursor-pointer focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                    <span>10 Min</span>
                    <span>100 Standard</span>
                    <span>500+ Volume</span>
                  </div>
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
                    className="w-full accent-[#2c7a7b] h-1.5 bg-slate-800 rounded-lg cursor-pointer focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                    <span>20 Min</span>
                    <span>250 Summit</span>
                    <span>1000+ Convention</span>
                  </div>
                </div>
              )}

              {/* Checkboxes depending on Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Custom Additions
                </label>

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
                        <span className="font-semibold text-white">Custom Wooden/Foil Boxes</span>
                        <span className="text-[10px] text-slate-500 block">Individually debossed and structured packaging</span>
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
                        <span className="font-semibold text-white">Bespoke Artisan Sourcing</span>
                        <span className="text-[10px] text-slate-500 block">Sourcing items directly from high-end regional makers</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                      <input
                        type="checkbox"
                        checked={internationalDelivery}
                        onChange={(e) => setInternationalDelivery(e.target.checked)}
                        className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold text-white">International Duty & Delivery Fulfillments</span>
                        <span className="text-[10px] text-slate-500 block">Customs clearance handling & global direct delivery</span>
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
                        <span className="font-semibold text-white">Custom Staging & Dynamic Decors</span>
                        <span className="text-[10px] text-slate-500 block">Complete venue theme transformation and custom carpentry</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                      <input
                        type="checkbox"
                        checked={avSourcing}
                        onChange={(e) => setAvSourcing(e.target.checked)}
                        className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold text-white">High-End Stage Lighting & Audio Systems</span>
                        <span className="text-[10px] text-slate-500 block">Pro sound arrays, concert lighting, and multi-cam integration</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#090f1a]/80 border border-slate-800 cursor-pointer hover:border-[#2c7a7b]/30 transition-all text-xs">
                      <input
                        type="checkbox"
                        checked={cateringCoordination}
                        onChange={(e) => setCateringCoordination(e.target.checked)}
                        className="rounded accent-[#2c7a7b] border-slate-700 bg-slate-900 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold text-white">Luxury Catering & Wine Pairings</span>
                        <span className="text-[10px] text-slate-500 block">Curated menus, master mixologist setups, and banquet support</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>

            </div>

            {/* Right Box: Estimate Display */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-[#0b1220]/90 border border-[#2c7a7b]/20 relative overflow-hidden flex flex-col justify-between gap-6">
              {/* Internal glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#2c7a7b]/10 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#2c7a7b] uppercase">
                  Ballpark estimate
                </span>
                <h3 className="font-display font-bold text-white text-base">
                  Estimated Range
                </h3>
              </div>

              {/* Huge Price Numbers */}
              <div className="space-y-1.5 py-4 border-y border-slate-800/60">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400 leading-normal font-light">
                  * ballpark figures based on standard procurement rates. Actual contract price calculated post-blueprint mapping.
                </p>
              </div>

              <button
                onClick={applyEstimateToForm}
                className="glow-btn w-full py-4 rounded-xl bg-[#2c7a7b] hover:bg-teal-600 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-transparent shadow-[0_0_12px_rgba(44,122,123,0.3)] cursor-pointer"
              >
                Apply To Inquiry Form
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={contactFormRef} id="contact" className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#2c7a7b] uppercase block">
            Partner with us
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Initiate Consultation
          </h2>
          <p className="text-slate-400 text-xs font-light">
            Ready to design something unforgettable? Tell us about your company, specify your scope requirements, and we will get back to you with custom proposals.
          </p>
        </div>

        {formStatus === "success" ? (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/20 bg-emerald-950/5 text-center flex flex-col items-center gap-6 animate-float shadow-[0_0_25px_rgba(16,185,129,0.08)]">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-white text-xl">Consultation Request Logged</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. An Aavacustoms design producer will review your parameters and email you customized blue prints within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setFormStatus("idle")}
              className="mt-2 px-6 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all duration-300"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 bg-[#090f1a]/60 space-y-6">

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name input */}
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Name</label>
                <input
                  type="text"
                  id="name-input"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-100 text-xs"
                />
              </div>

              {/* Email input */}
              <div className="space-y-1.5">
                <label htmlFor="email-field" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corporate Email</label>
                <input
                  type="email"
                  id="email-field"
                  required
                  placeholder="e.g. doe@google.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-100 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Company input */}
              <div className="space-y-1.5">
                <label htmlFor="company-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company Name</label>
                <input
                  type="text"
                  id="company-input"
                  required
                  placeholder="e.g. TechCorp Inc."
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-100 text-xs"
                />
              </div>

              {/* Service Select box */}
              <div className="space-y-1.5">
                <label htmlFor="service-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Primary Service</label>
                <select
                  id="service-select"
                  value={formData.serviceType}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-300 text-xs cursor-pointer"
                >
                  <option value="gifting">Corporate Gifting</option>
                  <option value="events">Event Organizing</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Scope Volume input */}
              <div className="space-y-1.5">
                <label htmlFor="volume-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Scope (Volume/Guests)</label>
                <input
                  type="text"
                  id="volume-input"
                  required
                  placeholder="e.g. 150 items / 200 attendees"
                  value={formData.volume}
                  onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-100 text-xs"
                />
              </div>

              {/* Addons selected input */}
              <div className="space-y-1.5">
                <label htmlFor="addons-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Add-ons</label>
                <input
                  type="text"
                  id="addons-input"
                  placeholder="Filled by Quote Builder..."
                  value={formData.addOnsSelected}
                  onChange={(e) => setFormData(prev => ({ ...prev, addOnsSelected: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b13]/60 border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-1.5">
              <label htmlFor="message-area" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Brief Requirements Description</label>
              <textarea
                id="message-area"
                rows="4"
                required
                placeholder="Give us details about custom design requests, deadlines, themes..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-[#070b13] border border-slate-800 focus:border-[#2c7a7b] focus:ring-1 focus:ring-[#2c7a7b] focus:outline-none transition-all duration-300 text-slate-100 text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="glow-btn w-full py-4 rounded-xl bg-gradient-to-r from-[#2c7a7b] to-[#1a365d] hover:from-[#369597] hover:to-[#214373] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-[#2c7a7b]/30 shadow-md cursor-pointer"
            >
              {formStatus === "loading" ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Consultation Request
                </>
              ) : (
                <>
                  Submit Inquiry
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
