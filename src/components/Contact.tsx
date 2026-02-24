import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formRef.current) return;
    emailjs.sendForm("service_xggajb9", "template_rmznr52", formRef.current, "1caYsGKrf6rKQG-1K")
      .then(() => { toast({ title: "Message sent!", description: "I'll get back to you soon." }); setFormData({ name: "", email: "", message: "" }); })
      .catch(() => toast({ title: "Failed to send 😕", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "chrisbenevansleo@gmail.com", link: "mailto:chrisbenevansleo@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", value: "Leo Chrisben Evans", link: "https://www.linkedin.com/in/leo-chrisben-evans-a49570322/" },
    { icon: Phone, label: "Phone", value: "+254 748 333 763", link: undefined },
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya", link: undefined },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background border-t border-border" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-muted-foreground tracking-[0.25em] uppercase">05 — Contact</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Large CTA heading */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let's build
            <br />
            <span className="italic text-foreground/40">something</span>
            <br />
            exceptional.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-base text-muted-foreground leading-relaxed mb-10 max-w-sm"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Open to full-time opportunities, consulting projects, and technical advisory roles. Let's create something meaningful together.
            </p>

            <div className="space-y-1">
              {contactLinks.map(({ icon: Icon, label, value, link }, i) => {
                const Wrapper: any = link ? "a" : "div";
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  >
                    <Wrapper
                      href={link}
                      target={link ? "_blank" : undefined}
                      rel={link ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between py-4 border-b border-border hover:border-foreground/30 transition-all no-underline text-inherit"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <div>
                          <div
                            className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.12em] mb-0.5"
                            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                          >
                            {label}
                          </div>
                          <div
                            className="text-sm font-medium text-foreground"
                            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                          >
                            {value}
                          </div>
                        </div>
                      </div>
                      {link && (
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      )}
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Name", name: "user_name", type: "text", placeholder: "John Doe", key: "name" as const },
                  { label: "Email", name: "user_email", type: "email", placeholder: "john@example.com", key: "email" as const },
                ].map((f) => (
                  <div key={f.key} className="relative">
                    <motion.label
                      className="block text-[10px] font-mono font-semibold uppercase tracking-[0.15em] mb-2 transition-colors"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        color: focused === f.key ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {f.label}
                    </motion.label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.key]}
                      placeholder={f.placeholder}
                      required
                      onFocus={() => setFocused(f.key)}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full px-0 py-3 border-b border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground transition-all"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="relative">
                <motion.label
                  className="block text-[10px] font-mono font-semibold uppercase tracking-[0.15em] mb-2 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    color: focused === "message" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  Message
                </motion.label>
                <textarea
                  name="message"
                  value={formData.message}
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-0 py-3 border-b border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground transition-all resize-none"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2">
                <p
                  className="text-xs text-muted-foreground font-mono"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Usually responds within 24 hours
                </p>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-foreground text-background disabled:opacity-60"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  whileHover={{ opacity: 0.85, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
