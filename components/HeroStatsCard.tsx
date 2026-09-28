"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";
import { TrendingUp, Laptop, Smartphone, Palette, Sparkles } from "lucide-react";

interface HeroStatsCardProps {
  isRTL?: boolean;
  mockupUrl: string;
  mockupBadge: string;
  mockupStatLabel: string;
  mockupStatSub: string;
  mockupFloating1: string;
  mockupFloating2: string;
}

export default function HeroStatsCard({
  isRTL = false,
  mockupUrl,
  mockupBadge,
  mockupStatLabel,
  mockupStatSub,
  mockupFloating1,
  mockupFloating2,
}: HeroStatsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  // 2. Counter animation (+185%) synced with line chart (~1.6s easeOut)
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, 185, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView]);

  // 4. Staggered tag entrance variants
  const tagContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.9,
      },
    },
  };

  const tagItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div ref={cardRef} className="relative w-full">
      {/* 5. Main Card Container with entrance and subtle animated cyan glow pulse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 15px 45px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 211, 238, 0.05)",
                  "0 15px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(34, 211, 238, 0.22)",
                  "0 15px 45px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 211, 238, 0.05)",
                ],
              }
            : { opacity: 0, y: 20 }
        }
        transition={{
          opacity: { duration: 0.6, ease: "easeOut" },
          y: { duration: 0.6, ease: "easeOut" },
          boxShadow: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-cyan-500/35 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_0_rgba(0,210,255,0.15)] transition-all duration-500 ease-out"
      >
        {/* Specular top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Subtle Tech Corner Ambient Light */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#22D3EE]/[0.05] rounded-bl-full pointer-events-none" />

        {/* Browser Header Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
            <span className="ms-2 font-mono text-[11px] text-[#94A3B8]">
              {mockupUrl}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#22D3EE] px-2 py-0.5 rounded bg-[#22D3EE]/10 border border-[#22D3EE]/30">
            {mockupBadge}
          </span>
        </div>

        {/* Internal Preview Window */}
        <div className="rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10 p-4 sm:p-5 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          
          {/* Growth Header with Animated Counter */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block">
                {mockupStatLabel}
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#F5F5F5] flex items-center gap-2 mt-0.5">
                <span>+{count}%</span>
                <TrendingUp className="w-5 h-5 text-[#22D3EE]" />
              </div>
            </div>
            <span className="text-xs text-[#22D3EE] font-mono bg-slate-900/60 px-2.5 py-1 rounded-lg border border-white/10">
              {mockupStatSub}
            </span>
          </div>

          {/* 1. SVG Animated Line Chart & Rising Arrow */}
          <div className="relative w-full h-36 bg-slate-900/40 rounded-xl border border-white/10 p-3 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <svg
              viewBox="0 0 320 100"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area Fade In */}
              <motion.path
                d="M 10 90 C 60 85, 110 65, 160 55 C 210 45, 250 25, 300 12 L 300 95 L 10 95 Z"
                fill="url(#growthAreaGrad)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />

              {/* Drawing Line Path: pathLength 0 to 1 over ~1.5s easeInOut */}
              <motion.path
                d="M 10 90 C 60 85, 110 65, 160 55 C 210 45, 250 25, 300 12"
                stroke="#22D3EE"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Endpoint Marker: Fades/Scales in right after line finishes drawing, then loops pulse */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: 1.5, duration: 0.35, ease: "easeOut" }}
              >
                {/* Looping pulse & glow halo (scale 1 -> 1.18 -> 1, opacity pulse) */}
                <motion.circle
                  cx="300"
                  cy="12"
                  r="9"
                  fill="#22D3EE"
                  animate={
                    isInView
                      ? {
                          scale: [1, 1.25, 1],
                          opacity: [0.35, 0.75, 0.35],
                        }
                      : {}
                  }
                  transition={{
                    delay: 1.85,
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <circle cx="300" cy="12" r="4.5" fill="#22D3EE" />
                <path
                  d="M 304 16 L 314 6 M 314 6 H 307 M 314 6 V 13"
                  stroke="#22D3EE"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </svg>
          </div>

          {/* 4. Bottom Icon Tags with Staggered Slide-In and Hover Scale */}
          <motion.div
            variants={tagContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 pt-3 border-t border-[#2E3342]/70 grid grid-cols-3 gap-2 text-center"
          >
            {/* Tag 1: Fast Web */}
            <motion.div
              variants={tagItemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 rounded-lg bg-[#14161C] border border-[#2E3342] hover:border-[#22D3EE]/70 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all cursor-pointer group/tag"
            >
              <Laptop className="w-3.5 h-3.5 text-[#22D3EE] mx-auto mb-1 group-hover/tag:scale-110 transition-transform" />
              <span className="font-mono text-[10px] text-[#94A3B8] group-hover/tag:text-[#F5F5F5] transition-colors block">
                {isRTL ? "مواقع سريعة" : "FAST WEB"}
              </span>
            </motion.div>

            {/* Tag 2: Hybrid App */}
            <motion.div
              variants={tagItemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 rounded-lg bg-[#14161C] border border-[#2E3342] hover:border-[#22D3EE]/70 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all cursor-pointer group/tag"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#22D3EE] mx-auto mb-1 group-hover/tag:scale-110 transition-transform" />
              <span className="font-mono text-[10px] text-[#94A3B8] group-hover/tag:text-[#F5F5F5] transition-colors block">
                {isRTL ? "تطبيقات جوال" : "HYBRID APP"}
              </span>
            </motion.div>

            {/* Tag 3: Modern UI */}
            <motion.div
              variants={tagItemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-2.5 rounded-lg bg-[#14161C] border border-[#2E3342] hover:border-[#22D3EE]/70 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all cursor-pointer group/tag"
            >
              <Palette className="w-3.5 h-3.5 text-[#22D3EE] mx-auto mb-1 group-hover/tag:scale-110 transition-transform" />
              <span className="font-mono text-[10px] text-[#94A3B8] group-hover/tag:text-[#F5F5F5] transition-colors block">
                {isRTL ? "تصميم عصري" : "MODERN UI"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Floating Badge 1 (Top-Right): Entrance slide-down + gentle yoyo floating loop */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="hidden sm:block absolute -top-5 -right-5 z-20 pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-[#232631]/95 border border-[#2E3342] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-[#22D3EE]/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#14161C] border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
            <Smartphone className="w-4 h-4" />
          </div>
          <span className="text-xs font-heading font-semibold text-[#F5F5F5]">
            {mockupFloating1}
          </span>
        </motion.div>
      </motion.div>

      {/* 3. Floating Badge 2 (Bottom-Left): Entrance slide-up + gentle yoyo floating loop */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        className="hidden sm:block absolute -bottom-5 -left-5 z-20 pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-[#232631]/95 border border-[#2E3342] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-[#22D3EE]/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#14161C] border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-heading font-semibold text-[#F5F5F5]">
            {mockupFloating2}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
