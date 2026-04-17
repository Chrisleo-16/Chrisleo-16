import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skills = [
  { name: "React",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "TypeScript",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language" },
  { name: "Next.js",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "Node.js",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Python",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language" },
  { name: "Flask",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend" },
  { name: "Supabase",    logo: "/logos/supabase-logo-icon.png", category: "Database" },
  { name: "MySQL",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
  { name: "Milvus",      logo: "/logos/idD_GfR1jh_1776443198737.png", category: "Database" },
  { name: "Tailwind",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "JavaScript",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language" },
  { name: "HTML5",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "Kotlin",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", category: "Mobile" },
  { name: "Bootstrap",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", category: "Frontend" },
  { name: "Vercel",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", category: "DevOps" },
  { name: "Netlify",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", category: "DevOps" },
  { name: "Postman",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", category: "Tools" },
  { name: "ML / AI",     logo: "https://cdn-icons-png.flaticon.com/512/4149/4149677.png", category: "AI" },
  { name: "MPESA API",   logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg", category: "Payments" },
  { name: "Africa's Talking", logo: "/logos/idcoK1KBDx_logos.png", category: "Communication API's" },
  { name: "PayHero",     logo: "/logos/idiGxjfgay_logos.png", category: "Payments" },
  { name: "Insomnia",    logo: "https://raw.githubusercontent.com/get-icon/geticon/master/icons/insomnia.svg", category: "Tools" },
];

const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

const SkillCard = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-border bg-card cursor-default aspect-square"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        borderColor: "hsl(var(--foreground) / 0.3)",
        backgroundColor: "hsl(var(--secondary))",
        y: -4,
      }}
    >
      <img
        src={skill.logo}
        alt={skill.name}
        className="w-8 h-8 object-contain"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <span
        className="text-xs font-medium text-foreground/80 text-center leading-tight"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {skill.name}
      </span>
      {/* Category badge on hover */}
      <motion.span
        className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground bg-secondary border border-border px-1.5 py-0.5 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {skill.category}
      </motion.span>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-secondary/20 border-t border-border" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">02 — Skills</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Full Stack
            <br />
            <span className="italic text-foreground/50">Expertise</span>
          </motion.h2>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  background: activeCategory === cat ? "hsl(var(--foreground))" : "transparent",
                  color: activeCategory === cat ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  borderColor: activeCategory === cat ? "hsl(var(--foreground))" : "hsl(var(--border))",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
          layout
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          className="mt-8 text-xs text-muted-foreground font-mono"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Showing {filtered.length} of {skills.length} technologies
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
