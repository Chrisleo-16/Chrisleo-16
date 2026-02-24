import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Animated Counter ──────────────────────────────────────────────────────
const Counter = ({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  if (isInView) {
    setTimeout(() => count.set(value), delay * 1000);
  }

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 2, suffix: "+", label: "Years of experience" },
    { value: 6, suffix: "+", label: "Projects shipped" },
    { value: 20, suffix: "+", label: "Technologies mastered" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-background" ref={ref}>
      {/* Section number */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">01 — About</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: large heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-foreground mb-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Crafting
              <br />
              <span className="italic text-foreground/50">digital</span>
              <br />
              experiences
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map(({ value, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold text-foreground mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <Counter value={value} suffix={suffix} delay={0.5 + i * 0.15} />
                  </div>
                  <div
                    className="text-[11px] text-muted-foreground font-mono uppercase tracking-[0.12em] leading-tight"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio text + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div
              className="space-y-5 text-base leading-[1.9] text-foreground/75 mb-12"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              <p>I'm a full-stack software engineer passionate about building scalable, reliable, and human-centered digital experiences. From fast-moving startups to enterprise-grade systems, I architect products that balance performance, maintainability, and usability.</p>
              <p>My expertise spans modern web technologies, cloud infrastructure, and intelligent system design — including secure authentication flows, MPESA payment integrations, and end-to-end chatbot systems.</p>
              <p>I thrive where innovation meets accountability. Beyond development, I'm engaged in open source, technical writing, and mentoring — believing the best technology isn't just functional, it's meaningful.</p>
            </div>

            {/* Highlight list */}
            <div className="space-y-4">
              {[
                { title: "Technical Excellence", desc: "React, TypeScript, Node.js, Python, cloud architecture — 99.9% uptime systems." },
                { title: "Strategic Problem Solver", desc: "Data-driven decisions balancing business impact with technical debt." },
                { title: "User-Centric Design", desc: "Bridging engineering and design to create intuitive, high-impact interfaces." },
              ].map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  className="flex gap-4 group cursor-default"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center mt-0.5 group-hover:bg-foreground group-hover:border-foreground transition-all">
                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-background transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold text-foreground mb-0.5"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {title}
                    </div>
                    <div
                      className="text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
