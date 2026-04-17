import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "LEA Executive Residency",
    description:
      "A full-scale digital property management platform built for a Nairobi luxury residential complex. Tenants get a personal dashboard to pay rent via M-Pesa STK Push, submit maintenance requests, log formal complaints, access house policies as PDFs, and communicate directly with management — all in one secure web app. Payments are auto-detected via M-Pesa APIs, confirmed in real-time, and stored with complete history. Management handles every tenant relationship digitally, removing phone calls entirely.",
    tags: ["Next.js", "TypeScript", "Supabase", "M-Pesa API", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16",
    demo: "https://lea-residency.vercel.app/",
    size: "large",
  },
  {
    title: "LLB Companion",
    description:
      "An intelligent study platform designed for law students pursuing the LLB degree. Features AI-assisted case law summarization, topic-by-topic revision modules aligned to Kenya's legal curriculum, past paper access, and a clean reading interface built for deep focus. Helps students at Kenyan universities track syllabus coverage and prepare effectively for bar exams.",
    tags: ["React", "TypeScript", "AI Integration", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16",
    demo: "https://llbcompanion.com/",
    size: "small",
  },
  {
    title: "Aris Stationaries",
    description:
      "A fully functional e-commerce storefront for a Kenyan stationery business. Customers browse product categories, add to cart, and complete secure checkout. The platform includes an admin panel for inventory management, order tracking, and sales reporting. Integrated with local payment methods for seamless transactions across Kenya.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Payments"],
    image:
      "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16",
    demo: "https://www.arisstationaries.co.ke/",
    size: "small",
  },
  {
    title: "Chama Cloud",
    description:
      "A digital management system for Kenyan chamas (community savings groups). Members track contributions, loans, and payouts transparently in one shared dashboard. Treasurers generate meeting reports, manage member records, and issue M-Pesa-linked payment reminders automatically. Eliminates the manual ledger books and WhatsApp confusion that plague most chamas — replacing them with full financial accountability.",
    tags: ["React", "Flask", "MySQL", "M-Pesa API", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16",
    demo: "https://chama-cloud.vercel.app/",
    size: "large",
  },
  {
    title: "PharmX",
    description:
      "A pharmacy management system built for Kenyan drug stores and dispensaries. Handles real-time inventory tracking with low-stock alerts, prescription records, patient purchase history, and daily sales summaries. Pharmacists can process sales quickly through a clean POS interface while the system tracks expiry dates and flags near-expired stock automatically.",
    tags: ["React", "Python", "MySQL", "Flask", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16",
    demo: "https://pharm-x-ten.vercel.app/",
    size: "small",
  },
  {
    title: "Uhakiki AI",
    description:
      "An AI-powered document and content verification tool. Users upload documents or paste text to detect plagiarism, AI-generated content, and factual inconsistencies. Built with a clean analysis dashboard that highlights flagged passages, shows similarity scores, and provides a detailed credibility report. Designed for academic institutions, editors, and legal professionals who need trustworthy content review at speed.",
    tags: ["Next.js", "TypeScript", "Claude API", "Supabase", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    status: "AI-Powered",
    github: "https://github.com/Chrisleo-16/uhakiki-ai",
    demo: "#",
    size: "small",
  },
  {
    title: "Zenith Crypto Shop",
    description:
      "A modern VPN commerce platform with full crypto payment infrastructure. Customers purchase VPN plans using Bitcoin, Ethereum, and major altcoins through an automated checkout flow. The system verifies on-chain payments, triggers instant service activation, and sends delivery confirmations — no manual intervention required. Built with a security-first architecture throughout.",
    tags: ["React", "TypeScript", "Supabase", "Crypto API"],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16/zenith-shop-crypto",
    demo: "https://zenith-shop-crypto.vercel.app/",
    size: "small",
  },
  {
    title: "ComSaP Platform",
    description:
      "A community engagement and social platform built for dynamic group interaction. Features real-time post feeds, rich content management, member profiles, and community announcements. Designed to keep communities organized, informed, and connected through a clean and responsive interface.",
    tags: ["React", "CSS3", "JavaScript", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16/ComSaP",
    demo: "https://comsap.vercel.app/",
    size: "small",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer ${
        isLarge ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: "hsl(var(--foreground) / 0.25)" }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? "h-64 md:h-72" : "h-44"}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-foreground/0 flex items-center justify-center gap-3"
          animate={{
            backgroundColor: hovered
              ? "hsl(var(--foreground) / 0.5)"
              : "hsl(var(--foreground) / 0)",
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {hovered && (
              <>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                {project.demo !== "#" && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="text-base font-bold text-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
            <span
              className="text-[10px] font-mono text-muted-foreground"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {project.status}
            </span>
          </div>
        </div>
        <p
          className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-border text-muted-foreground bg-secondary"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.a
            href={project.demo !== "#" ? project.demo : project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            whileHover={{ x: 2 }}
          >
            View <ArrowUpRight className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-secondary/20 border-t border-border"
      ref={ref}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">
            03 — Projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured
            <br />
            <span className="italic text-foreground/50">Projects</span>
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground max-w-xs"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Real-world solutions built with precision and purpose — from
            fintech and property tech to AI and e-commerce.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;