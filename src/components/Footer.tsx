import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

const socials = [
  { icon: Github,   href: "https://github.com/Chrisleo-16",                               label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/leo-chrisben-evans-a49570322/",     label: "LinkedIn" },
  { icon: Mail,     href: "mailto:chrisbenevansleo@gmail.com",                             label: "Email" },
];

const Footer = () => {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-secondary/20 overflow-hidden">
      {/* Large background text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[clamp(5rem,18vw,16rem)] font-bold text-foreground/[0.03] leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          LeoChrisben
        </span>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 pt-16 pb-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-16 border-b border-border">
          {/* Brand */}
          <div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="block mb-4"
              whileHover={{ opacity: 0.7 }}
            >
              <span
                className="text-4xl md:text-5xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Leo Chrisben
              </span>
            </motion.button>
            <p
              className="text-sm text-muted-foreground max-w-xs leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Full-stack software engineer crafting scalable, intelligent digital experiences. Based in Nairobi, building for the world.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                whileHover={{ y: -1 }}
              >
                {link.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 text-xs text-muted-foreground"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            <span>© {new Date().getFullYear()}</span>
            <a
              href="https://github.com/Chrisleo-16/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:opacity-70 transition-opacity"
            >
              Leo Chrisben Evans
            </a>
            <span>· Crafted with precision · Nairobi, Kenya</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                whileHover={{ y: -1 }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
