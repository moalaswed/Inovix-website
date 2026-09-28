"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AnimatedPlanet from "@/components/AnimatedPlanet";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Laptop,
  Smartphone,
  Palette,
  Sparkles,
  CheckCircle2,
  XCircle,
  Check,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useModal } from "@/lib/i18n/ModalContext";
import { translations } from "@/lib/i18n/translations";

// Map service IDs to their corresponding Lucide icon components
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  web: Laptop,
  mobile: Smartphone,
  uiux: Palette,
  brand: Sparkles,
};

// Framer Motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  const { lang, isRTL } = useLanguage();
  const { openModal } = useModal();
  const t = translations[lang];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-transparent text-[#F5F5F5] flex flex-col font-sans transition-colors duration-300 w-full overflow-x-hidden"
    >
      {/* Ambient Fluid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden w-full">
        <div
          className="absolute -inset-[5%] bg-cover bg-center bg-no-repeat animate-fluid-drift hidden md:block"
          style={{ backgroundImage: `url('/bg-fluid.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E16]/82 via-[#0A0E16]/76 to-[#0A0E16]/86" />
      </div>

      <Navbar />

      <main className="flex-1 relative w-full overflow-x-hidden">
        {/* Subtle grid and ambient cyan glow blurs */}
        <div className="absolute inset-0 pointer-events-none fintech-grid opacity-20" />
        <div className="absolute -top-32 left-1/4 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-[#22D3EE]/[0.06] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-[45%] -right-20 w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] bg-[#22D3EE]/[0.05] rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

        {/* ============================================================ */}
        {/* HERO SECTION                                                  */}
        {/* ============================================================ */}
        <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28 px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

              {/* Left Column: Value Proposition */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 flex flex-col items-start text-start"
              >
                {/* Badge */}
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 backdrop-blur-md mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-mono tracking-wider text-[#22D3EE] font-medium">
                    {t.hero.badge}
                  </span>
                </motion.div>

                {/* Headline with fluid scaling */}
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-[#F5F5F5] tracking-tight leading-[1.15] sm:leading-[1.1] max-w-4xl"
                >
                  {t.hero.headlineLead}{" "}
                  <span className="relative inline-block text-[#22D3EE] drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                    {t.hero.headlineAccent}
                    <span className="absolute bottom-1 inset-x-0 h-[3px] bg-[#22D3EE] rounded-full shadow-[0_0_12px_#22D3EE]" />
                  </span>
                </motion.h1>

                {/* Subheadline with fluid scaling */}
                <motion.p
                  variants={itemVariants}
                  className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-2xl font-normal"
                >
                  {t.hero.subheadline}
                </motion.p>

                {/* Responsive Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
                >
                  <motion.button
                    id="hero-start-project-btn"
                    type="button"
                    onClick={(e) => openModal(e.currentTarget)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto min-h-[48px] relative group inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-base text-[#0A0E16] bg-[#22D3EE] hover:bg-[#2DD4E8] shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] transition-all duration-300"
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        isRTL ? "rotate-90 group-hover:-translate-x-1" : ""
                      }`}
                    />
                  </motion.button>

                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl font-heading font-semibold text-sm sm:text-base text-[#F5F5F5] bg-slate-900/60 hover:bg-slate-800/70 border border-white/10 hover:border-cyan-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300"
                  >
                    <span>{t.hero.secondaryCta}</span>
                  </motion.a>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 sm:mt-10 pt-6 border-t border-white/10 w-full flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-xs text-[#94A3B8]"
                >
                  {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((label) => (
                    <div key={label} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                      <span className="text-[#F5F5F5] font-medium">{label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column: 3D Visual Planet Container */}
              <div className="lg:col-span-5 relative flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
                <AnimatedPlanet isRTL={isRTL} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SERVICES SECTION                                              */}
        {/* ============================================================ */}
        <section id="services" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#14161C]/50 backdrop-blur-[2px] border-t border-white/10 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-start mb-10 sm:mb-16"
            >
              <span className="font-mono text-xs text-[#22D3EE] uppercase tracking-wider block mb-2">
                {t.sections.whatWeBuild}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F5F5F5] tracking-tight">
                {t.services.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                {t.services.subtitle}
              </p>
            </motion.div>

            {/* Responsive Grid: 1 col on mobile, 2 cols on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {t.services.items.map((service, idx) => {
                const IconComponent = SERVICE_ICONS[service.id] ?? Laptop;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="relative rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_36px_-8px_rgba(0,0,0,0.5)] hover:border-cyan-500/35 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_0_rgba(0,210,255,0.15)] transition-all duration-500 ease-out flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Specular top highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                    <div>
                      <div className="w-12 h-12 rounded-xl bg-slate-950/60 border border-white/10 group-hover:border-[#22D3EE] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-[#22D3EE] mb-5 transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-[#F5F5F5] mb-2.5 sm:mb-3 group-hover:text-[#22D3EE] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs font-mono text-[#64748B] mb-2 uppercase">
                        {t.services.whatYouGet}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-[#F5F5F5]">
                            <Check className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* VALUE COMPARISON                                              */}
        {/* ============================================================ */}
        <section id="why-us" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#1C1E26]/35 backdrop-blur-[2px] border-t border-white/10 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-start mb-10 sm:mb-12"
            >
              <span className="font-mono text-xs text-[#22D3EE] uppercase tracking-wider block mb-2">
                {t.sections.advantage}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F5F5F5] tracking-tight">
                {t.comparison.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                {t.comparison.subtitle}
              </p>
            </motion.div>

            {/* Responsive Grid: 1 col on mobile, 2 cols on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              {/* Outdated Approach */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-white/5 opacity-80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#94A3B8]">
                    {t.comparison.old.title}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {t.comparison.old.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                      <XCircle className="w-4 h-4 text-red-400/80 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inovix Approach */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/45 backdrop-blur-2xl border border-cyan-500/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,210,255,0.15)] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.01]">
                {/* Specular top highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-[#22D3EE]/15 border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#F5F5F5]">
                    {t.comparison.new.title}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {t.comparison.new.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#F5F5F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4-STEP PROCESS                                                */}
        {/* ============================================================ */}
        <section id="process" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#14161C]/50 backdrop-blur-[2px] border-t border-white/10 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-start mb-10 sm:mb-16"
            >
              <span className="font-mono text-xs text-[#22D3EE] uppercase tracking-wider block mb-2">
                {t.sections.collaborative}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F5F5F5] tracking-tight">
                {t.process.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                {t.process.subtitle}
              </p>
            </motion.div>

            {/* Responsive Grid: 1 col on mobile, 2 on sm, 4 on lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {t.process.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-cyan-500/35 hover:shadow-[0_8px_32px_0_rgba(0,210,255,0.15)] transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden group"
                >
                  {/* Specular top highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  <div>
                    <span className="text-2xl font-mono font-bold text-[#22D3EE] block mb-3 sm:mb-4 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">
                      {step.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#F5F5F5] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLOSING CTA                                                   */}
        {/* ============================================================ */}
        <section id="contact" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1C1E26]/35 backdrop-blur-[2px] border-t border-white/10 w-full">
          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/45 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 lg:p-14 text-center relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_24px_64px_rgba(0,0,0,0.8)]">
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="absolute top-0 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-[#22D3EE]/[0.08] rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/60 border border-white/10 font-mono text-xs text-[#22D3EE] mb-6">
                <span>{t.sections.startJourney}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F5F5F5] tracking-tight leading-snug">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {t.cta.desc}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  id="cta-get-quote-btn"
                  type="button"
                  onClick={(e) => openModal(e.currentTarget)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-base text-[#0A0E16] bg-[#22D3EE] hover:bg-[#2DD4E8] shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] transition-all duration-300"
                >
                  <span>{t.cta.button}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isRTL ? "rotate-90" : ""}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 bg-[#0A0E16]/95 backdrop-blur-md text-xs font-mono text-[#64748B] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-start">
          <div className="flex items-center gap-2.5 group">
            <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
              <Image
                src="/logo-planet.png"
                alt="Inovix Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]"
              />
            </div>
            <span className="font-heading font-bold text-[#F5F5F5] tracking-wider">INOVIX</span>
            <span>© {new Date().getFullYear()} Inovix Studio. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <a href="#services" className="hover:text-[#22D3EE] transition-colors">{t.footer.services}</a>
            <a href="#why-us" className="hover:text-[#22D3EE] transition-colors">{t.footer.whyUs}</a>
            <a href="#process" className="hover:text-[#22D3EE] transition-colors">{t.footer.process}</a>
            <a href="#contact" className="hover:text-[#22D3EE] transition-colors">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
