"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useModal } from "@/lib/i18n/ModalContext";
import { translations } from "@/lib/i18n/translations";

export default function Navbar() {
  const { lang, setLang, isRTL } = useLanguage();
  const { openModal } = useModal();
  const t = translations[lang].nav;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: t.services, href: "/#services" },
    { label: t.projects, href: "/projects" },
    { label: t.howWeWork, href: "/#process" },
    { label: t.whyUs, href: "/#why-us" },
    { label: t.contact, href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-slate-900/75 backdrop-blur-2xl border-b border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Inovix Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#22D3EE]/0 group-hover:bg-[#22D3EE]/20 blur-md transition-all duration-300 scale-75 group-hover:scale-110 pointer-events-none" />
              <Image
                src="/logo-planet.png"
                alt="Inovix Planet Logo"
                width={44}
                height={44}
                priority
                className="relative z-10 w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)] group-hover:drop-shadow-[0_0_16px_rgba(34,211,238,0.55)]"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#F5F5F5] font-heading font-sans">
                  INOVIX
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F5F5F5] rounded-xl transition-all hover:bg-white/[0.05] relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-1 inset-x-4 h-[2px] bg-[#22D3EE] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full shadow-[0_0_8px_#22D3EE]" />
              </Link>
            ))}
          </nav>

          {/* Right Action Cluster (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={handleToggleLang}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-800/60 hover:border-cyan-500/40 text-xs font-mono text-[#94A3B8] hover:text-[#F5F5F5] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              title={isRTL ? "Switch to English" : "التبديل إلى العربية"}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="font-semibold">{t.switchLang}</span>
            </button>

            {/* CTA Button */}
            <motion.button
              onClick={(e) => openModal(e.currentTarget)}
              id="navbar-start-project-btn"
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm text-[#0A0E16] bg-[#22D3EE] hover:bg-[#2DD4E8] shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.65)] transition-all duration-300"
            >
              <span>{t.startProject}</span>
              <ArrowUpRight
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isRTL ? "rotate-90 group-hover:-translate-x-0.5" : ""
                }`}
              />
            </motion.button>
          </div>

          {/* Mobile Controls (< 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleToggleLang}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 rounded-xl border border-white/10 bg-slate-900/50 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
              aria-label="Toggle Language"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-slate-900/50 text-[#F5F5F5] hover:border-cyan-500/40 hover:text-[#22D3EE] transition-all"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-20 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 md:hidden border-b border-white/10 bg-slate-900/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#F5F5F5] hover:text-[#22D3EE] hover:bg-white/[0.05] transition-all min-h-[44px]"
                >
                  <span>{link.label}</span>
                  <span className="text-[#22D3EE] opacity-60 text-xs font-mono">→</span>
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    openModal(e.currentTarget);
                  }}
                  id="navbar-mobile-start-project-btn"
                  type="button"
                  className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-[#0A0E16] bg-[#22D3EE] hover:bg-[#2DD4E8] shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                >
                  <span>{t.startProject}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isRTL ? "rotate-90" : ""}`} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
