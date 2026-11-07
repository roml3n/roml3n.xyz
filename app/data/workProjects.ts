export type WorkProject = {
  title: string;
  company: string;
  date: string;
  className: string;
  coverImage: string;
  /** Looping video fill (`.webm`) — paused on frame 0 until card hover. */
  coverFill?: string;
  href: string;
  featured: boolean;
};

export const workProjects: WorkProject[] = [
  {
    title: "Repositioning Pawa IT for the AI era",
    company: "PawaIT",
    date: "08.2024",
    className: "md:row-start-2",
    coverImage: "/images/work/pawa-website-cover.webp",
    coverFill: "/images/work/fills/devin.webm",
    href: "/work/pawa-website",
    featured: true,
  },
  {
    title: "Designing U.S. banking for people without an SSN",
    company: "Waya",
    date: "03.2024",
    className: "md:row-start-2",
    coverImage: "/images/work/waya-ssn-cover.webp",
    coverFill: "/images/work/fills/midnight.webm",
    href: "/work/waya-ssn",
    featured: true,
  },
  {
    title: "Redesigning e-commerce to boost loyalty, sales, and satisfaction",
    company: "PawaIT",
    date: "04.2023",
    className: "md:row-start-3",
    coverImage: "/images/work/bigstore-cover.webp",
    coverFill: "/images/work/fills/stripe.webm",
    href: "/work/bigstore",
    featured: true,
  },
  {
    title: "Empowering immigrant founders to bank, build, and grow",
    company: "Waya",
    date: "07.2023",
    className: "md:row-start-3",
    coverImage: "/images/work/waya-business-cover.webp",
    coverFill: "/images/work/fills/blue-sky.webm",
    href: "/work/waya-business",
    featured: true,
  },
  {
    title: "Crafting a high-stakes experience for sports betting enthusiasts",
    company: "The CB Group",
    date: "05.2024",
    className: "md:row-start-4",
    coverImage: "/images/work/tucheze-cover.webp",
    coverFill: "/images/work/fills/storm.webm",
    href: "/work/tucheze",
    featured: false,
  },
];

const featuredCount = workProjects.filter((project) => project.featured).length;

if (process.env.NODE_ENV !== "production" && featuredCount > 4) {
  throw new Error(
    `[workProjects] At most 4 projects can have featured: true (found ${featuredCount}).`,
  );
}

export const getFeaturedWorkProjects = (): WorkProject[] =>
  workProjects.filter((project) => project.featured).slice(0, 4);

export const getWorkProjectByHref = (href: string): WorkProject | undefined =>
  workProjects.find((project) => project.href === href);
