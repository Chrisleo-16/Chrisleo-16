import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react";

// ─── Cursor Follower ──────────────────────────────────────────────────────
const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full opacity-[0.06] dark:opacity-[0.04]"
      style={{
        width: 400,
        height: 400,
        background: "radial-gradient(circle, hsl(var(--foreground)), transparent 70%)",
        x: springX,
        y: springY,
      }}
    />
  );
};

// ─── Text Scramble ────────────────────────────────────────────────────────
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const useScramble = (target: string, delay = 0) => {
  const [text, setText] = useState(target);
  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const totalFrames = 18;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setText(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < Math.floor((frame / totalFrames) * target.length)) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        frame++;
        if (frame > totalFrames) {
          clearInterval(interval);
          setText(target);
        }
      }, 40);
    }, delay);
    return () => { clearTimeout(timeout); };
  }, [target, delay]);
  return text;
};

// ─── Marquee strip ────────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const items = ["React", "TypeScript", "Node.js", "Python", "Supabase", "Next.js", "Tailwind", "Flask", "MySQL", "Kotlin"];
  return (
    <div className="relative overflow-hidden border-y border-border py-3 bg-secondary/30">
      <motion.div
        className="flex gap-8 w-max text-xs font-mono text-muted-foreground uppercase tracking-[0.18em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            {item}
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const line1 = useScramble("Building", 400);
  const line2 = useScramble("Software", 700);
  const line3 = useScramble("That Matters.", 1100);

  const socials = [
    { icon: Github, href: "https://github.com/Chrisleo-16", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/leo-chrisben-evans-a49570322/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:chrisbenevansleo@gmail.com", label: "Email" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <CursorFollower />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-[1280px] mx-auto w-full px-6 md:px-12 pt-28 pb-0">

        {/* Top row: badge + socials */}
        <motion.div
          className="flex items-center justify-between mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            <span>Full Stack Engineer · Nairobi, Kenya</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary transition-all"
                whileHover={{ y: -2 }}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Giant headline */}
        <div className="mb-10 md:mb-14">
          <div
            className="overflow-hidden"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <motion.div
              className="text-foreground font-bold leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {line1}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="text-foreground font-bold leading-[0.92] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {line2}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="italic text-foreground/70 font-bold leading-[0.92] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {line3}
            </motion.div>
          </div>
        </div>

        {/* Bottom row: description + CTAs */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {/* Description */}
          <p
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-[480px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Full-stack engineer transforming complex challenges into scalable solutions. Specialized in high-performance applications that deliver exceptional user experiences.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            <motion.button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-foreground text-background"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              whileHover={{ scale: 1.04, opacity: 0.88 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="/logos/LEO CHRISBEN EVANS.pdf"
              download="LEOCHRISBENEVANS.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-border text-foreground hover:bg-secondary transition-all"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.a>

            <motion.a
              href="https://github.com/Chrisleo-16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              whileHover={{ x: 2 }}
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <MarqueeStrip />
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="max-w-[1280px] mx-auto w-full px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {[
          { value: "2+", label: "Years building" },
          { value: "6+", label: "Projects shipped" },
          { value: "20+", label: "Technologies" },
          { value: "99%", label: "Uptime record" },
        ].map(({ value, label }, i) => (
          <motion.div
            key={label}
            className="group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.08 }}
          >
            <div
              className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {value}
            </div>
            <div
              className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
