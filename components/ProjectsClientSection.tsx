"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink, FolderOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { translations } from "@/lib/i18n/translations";
import type { SanityProject } from "@/app/projects/page";

export interface ProjectWithImage extends SanityProject {
  thumbnailUrl: string | null;
}

interface ProjectsClientSectionProps {
  projects: ProjectWithImage[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Website: {
    bg: "bg-[#22D3EE]/10",
    text: "text-[#22D3EE]",
    border: "border-[#22D3EE]/30",
  },
  "Hybrid App": {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/30",
  },
  "UI/UX Design": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  Branding: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
};

function getCategoryStyle(category?: string) {
  if (!category) return CATEGORY_COLORS["Website"];
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Website"];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center py-28 text-center"
    >
      <p className="text-lg font-heading font-semibold text-[#64748B]">{message}</p>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  viewLabel,
}: {
  project: ProjectWithImage;
  index: number;
  viewLabel: string;
}) {
  const style = getCategoryStyle(project.category);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.015,
        y: -4,
      }}
      className="group relative rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_36px_-8px_rgba(0,0,0,0.5)] hover:border-cyan-500/35 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_0_rgba(0,210,255,0.15)] transition-all duration-500 ease-out flex flex-col overflow-hidden cursor-default"
      aria-label={`Project: ${project.title}`}
    >
      {/* Specular top highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-10" />

      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950/60">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.thumbnail?.alt ?? project.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={index < 3}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
            <FolderOpen className="w-12 h-12 text-slate-700" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 start-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wide border backdrop-blur-md ${style.bg} ${style.text} ${style.border}`}
          >
            {project.category}
          </span>
        </div>

        {/* Cyan glow border on hover */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-lg font-heading font-bold text-[#F5F5F5] leading-snug group-hover:text-[#22D3EE] transition-colors duration-200 line-clamp-2">
          {project.title}
        </h3>

        {project.shortDescription && (
          <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3 flex-1">
            {project.shortDescription}
          </p>
        )}

        {project.externalLink && (
          <div className="pt-4 mt-auto border-t border-white/10">
            <motion.a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-heading font-semibold text-[#14161C] bg-[#22D3EE] hover:bg-[#2DD4E8] shadow-[0_0_16px_rgba(34,211,238,0.3)] hover:shadow-[0_0_24px_rgba(34,211,238,0.55)] transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span>{viewLabel}</span>
            </motion.a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsClientSection({ projects }: ProjectsClientSectionProps) {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang].projects;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-transparent text-[#F5F5F5] flex flex-col font-sans"
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -inset-[5%] bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: `url('/bg-fluid.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E16]/82 via-[#0A0E16]/76 to-[#0A0E16]/86" />
      </div>

      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Glow accents */}
        <div className="absolute -top-20 left-1/3 w-[400px] h-[400px] bg-[#22D3EE]/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[320px] h-[320px] bg-[#22D3EE]/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 fintech-grid opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="mb-14 text-start"
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="mb-6"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-[#22D3EE] transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5 rotate-[225deg]" />
                <span>{t.backHome}</span>
              </Link>
            </motion.div>

            <span className="font-mono text-xs text-[#22D3EE] uppercase tracking-wider block mb-2">
              {t.sectionLabel}
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-[#F5F5F5] tracking-tight leading-tight mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-base text-[#94A3B8] max-w-xl leading-relaxed">
              {t.subtitle}
            </p>

            {/* Stats strip */}
            {projects.length > 0 && (
              <div className="mt-6 flex items-center gap-6 text-xs font-mono text-[#64748B]">
                <span>
                  <span className="text-[#22D3EE] font-bold text-base">{projects.length}</span>{" "}
                  {t.completedSuffix}
                </span>
                <span className="w-px h-4 bg-[#2E3342]" />
                <span>{t.autoUpdates}</span>
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <EmptyState message={t.empty} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7"
            >
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={idx}
                  viewLabel={t.viewProject}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2E3342]/80 py-6 bg-[#101218]/90 backdrop-blur-md text-xs font-mono text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>INOVIX Studio © {new Date().getFullYear()} — All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
