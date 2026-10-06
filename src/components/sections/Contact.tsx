import { useRef, useState } from "react";
import { site } from "@/content/site";
import { toast } from "@/hooks/use-toast";
import { Label, SectionHead } from "@/components/kit/Editorial";
import { Reveal } from "@/components/kit/motion";
import type { SectionProps } from "./section";

type Status = "idle" | "sending" | "sent";

const fields = [
  { key: "name", name: "user_name", label: "Name", type: "text", autoComplete: "name" },
  { key: "email", name: "user_email", label: "Email", type: "email", autoComplete: "email" },
] as const;

/**
 * The close. Not "let's build something exceptional" — an invitation to
 * continue a specific conversation, with the form kept to three hairlines.
 */
export default function Contact({ num = "03", note }: SectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;
    setStatus("sending");
    try {
      // Loaded on submit — no reason to ship the mailer to someone who only reads.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        site.emailjs.service,
        site.emailjs.template,
        formRef.current,
        site.emailjs.publicKey,
      );
      formRef.current.reset();
      setStatus("sent");
      toast({ title: "Sent.", description: "It reaches my inbox directly. I'll reply." });
    } catch {
      setStatus("idle");
      toast({
        title: "That didn't send.",
        description: `Email me directly at ${site.email}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="gutter pb-20 pt-20 sm:pt-28">
      <SectionHead
        id="contact"
        num={num}
        label="Contact"
        title={
          <>
            Get in
            <br />
            touch
          </>
        }
        note={note ?? "Usually answered within a day."}
      />

      <div className="grid grid-cols-1 gap-x-16 gap-y-10 pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:pt-14">
        <Reveal>
          <dl>
            {[
              { k: "Email", v: site.email, href: site.links.email },
              { k: "LinkedIn", v: "Leo Chrisben Evans", href: site.links.linkedin },
              { k: "GitHub", v: "@Chrisleo-16", href: site.links.github },
              { k: "CV", v: "Download (PDF)", href: site.links.cv },
              { k: "Located", v: `${site.location} · ${site.tzLabel}` },
            ].map((row) => (
              <div key={row.k} className="border-t border-rule py-4">
                <dt>
                  <Label>{row.k}</Label>
                </dt>
                <dd className="pt-1.5 text-[0.9375rem] text-ink">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="pen-link"
                    >
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <form ref={formRef} onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="block pb-2">
                    <Label>{f.label}</Label>
                  </label>
                  <input
                    id={f.key}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required
                    className="w-full border-b border-rule bg-transparent pb-2.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-annotate"
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="message" className="block pb-2">
                <Label>What are you working on?</Label>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none border-b border-rule bg-transparent pb-2.5 text-[0.9375rem] leading-relaxed text-ink outline-none transition-colors focus:border-annotate"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p aria-live="polite" className="meta">
                {status === "sent" ? "Received — I'll reply" : "Usually answered within a day"}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 border border-ink px-6 py-3 ui-label text-ink transition-colors duration-300 hover:bg-ink hover:text-paper disabled:opacity-50"
              >
                {status === "sending" ? "Sending" : "Send"}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
