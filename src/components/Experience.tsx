"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, Award } from "lucide-react";

const experiences = [
  {
    title: "Frontend Engineer Intern",
    company: "Xmobit.com",
    period: "1 Month · 2025",
    type: "Internship",
    description: "Contributed to developing responsive interfaces and integrating RESTful APIs for a real-time analytics dashboard. Focused on design consistency and optimizing React component performance.",
    achievements: [
      "Implemented dynamic UI components reducing code redundancy by 25%",
      "Collaborated with design team to refine brand consistency across web pages",
      "Optimized API data fetching to improve load times by 40%",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Kiwami Tech",
    period: "4 Months · 2025",
    type: "Internship",
    description: "Full-stack development for an internal project management system. Integrated authentication, task tracking, and analytics using React, Node.js, and Supabase.",
    achievements: [
      "Developed reusable React modules adopted across 3 internal tools",
      "Built secure authentication flow with Supabase and role-based access control",
      "Collaborated in agile sprints improving sprint velocity by 18%",
    ],
  },
];

const ExperienceItem = ({ exp, index, isOpen, onToggle }: {
  exp: typeof experiences[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="border-b border-border last:border-b-0"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <div className="flex items-start gap-6">
          <span
            className="text-[11px] font-mono text-muted-foreground mt-1 w-6 flex-shrink-0"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3
              className="text-xl md:text-2xl font-bold text-foreground group-hover:opacity-70 transition-opacity"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {exp.title}
            </h3>
            <div
              className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              <span className="font-semibold">{exp.company}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{exp.period}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs px-2 py-0.5 rounded-full border border-border bg-secondary">{exp.type}</span>
            </div>
          </div>
        </div>
        <motion.div
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-foreground group-hover:border-foreground transition-all"
          animate={{ rotate: isOpen ? 0 : 0 }}
        >
          {isOpen
            ? <Minus className="w-3.5 h-3.5 text-foreground group-hover:text-background transition-colors" />
            : <Plus className="w-3.5 h-3.5 text-foreground group-hover:text-background transition-colors" />
          }
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12">
              <p
                className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {exp.description}
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {exp.achievements.map((a, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center mb-3">
                      <span className="text-[9px] font-mono text-background">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p
                      className="text-xs text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-background border-t border-border" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">04 — Experience</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground sticky top-28"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Professional
              <br />
              <span className="italic text-foreground/50">Journey</span>
            </h2>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {experiences.map((exp, i) => (
              <ExperienceItem
                key={exp.title}
                exp={exp}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}

            {/* Certification */}
            <motion.div
              className="mt-12 p-6 rounded-xl border border-border bg-card flex items-start gap-5"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-background" />
              </div>
              <div className="flex-1">
                <h4
                  className="text-base font-bold text-foreground mb-0.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Certified Full Stack Software Developer
                </h4>
                <p
                  className="text-sm text-muted-foreground mb-3"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Modcom Institute of Technology · 2025
                </p>
                <img
                  src="/logos/IMG_20251007_083248_677.jpg"
                  alt="Certificate"
                  className="w-full max-w-xs rounded-lg border border-border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
