/**
 * /projects — مشاريعنا (Our Projects)
 *
 * ISR page: revalidates every 60 seconds so Studio edits appear live
 * within ~1 minute without manual redeploys.
 */
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProjectsClientSection from "@/components/ProjectsClientSection";

export const metadata: Metadata = {
  title: "مشاريعنا | Inovix — Our Projects Portfolio",
  description:
    "Explore Inovix's portfolio of websites, hybrid mobile apps, UI/UX designs, and brand identities built for clients across the region.",
};

// ISR: revalidate at most every 60 seconds
export const revalidate = 60;

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: {
    asset: { _ref: string };
    hotspot?: { x: number; y: number };
    alt?: string;
  };
  shortDescription?: string;
  category?: string;
  externalLink?: string;
  displayOrder?: number;
}

const PROJECTS_QUERY = `*[_type == "project"] | order(displayOrder asc, _createdAt desc) {
  _id,
  title,
  slug,
  thumbnail,
  shortDescription,
  category,
  externalLink,
  displayOrder
}`;

async function getProjects(): Promise<SanityProject[]> {
  return client.fetch<SanityProject[]>(PROJECTS_QUERY);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Build image URLs server-side so the client component is fully presentational
  const projectsWithImages = projects.map((p) => ({
    ...p,
    thumbnailUrl: p.thumbnail
      ? urlFor(p.thumbnail).width(800).height(520).fit("crop").auto("format").url()
      : null,
  }));

  return <ProjectsClientSection projects={projectsWithImages} />;
}
