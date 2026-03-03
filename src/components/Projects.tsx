import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Zenith Crypto Shop",
    description: "Modern VPN commerce platform with secure crypto payment integration supporting Bitcoin, Ethereum, and major altcoins. Engineered instant delivery system with real-time activation.",
    tags: ["React", "TypeScript", "Supabase", "Crypto API"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16/zenith-shop-crypto",
    demo: "https://zenith-shop-crypto.vercel.app/",
    size: "large", // spans 2 cols
  },
  {
    title: "ComSaP Platform",
    description: "Innovative community engagement social platform with real-time updates and dynamic content management.",
    tags: ["React", "CSS3", "JavaScript", "Vercel"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    status: "Live",
    github: "https://github.com/Chrisleo-16/ComSaP",
    demo: "https://comsap.vercel.app/",
    size: "small",
  },
  {
    title: "EcoVanguard Ventures",
    description: "Next.js sustainability platform with interactive carbon footprint dashboard and real-time collaboration for community-driven eco projects.",
    tags: ["Next.js", "TypeScript", "Tailwind", "React"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
    status: "Sustainability",
    github: "https://github.com/Chrisleo-16/ECOVENT",
    demo: "#",
    size: "small",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer ${isLarge ? "md:col-span-2" : ""}`}
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
          animate={{ backgroundColor: hovered ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--foreground) / 0)" }}
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
          className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2"
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
    <section id="projects" className="relative py-24 md:py-32 bg-secondary/20 border-t border-border" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">03 — Projects</span>
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
            Real-world solutions built with precision and purpose.
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
