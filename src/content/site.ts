/** Identity, links and the words that appear in more than one place. */

export const site = {
  name: "Leo Chrisben Evans",
  short: "Chrisben",
  initials: "LCE",
  url: "https://leochrisbenevans.vercel.app",
  location: "Nairobi, Kenya",
  timezone: "Africa/Nairobi",
  tzLabel: "EAT",

  /** The hero. A position, not a job title. */
  thesis: "I'm trying to figure out what technology can actually do.",
  subthesis:
    "I build software, experiment with AI, study data and read markets — turning problems I run into on purpose into things I can actually test.",
  standfirst:
    "A portfolio of things I'm building while working out what kind of builder I want to become.",

  exploring: ["AI", "DATA", "FINTECH", "REAL-WORLD SYSTEMS"],

  study: {
    what: "BSc Data Science",
    where: "University of Nairobi",
    status: "in progress",
  },

  email: "chrisbenevansleo@gmail.com",
  phone: "+254 748 333 763",

  links: {
    github: "https://github.com/Chrisleo-16",
    linkedin: "https://www.linkedin.com/in/leo-chrisben-evans-a49570322/",
    email: "mailto:chrisbenevansleo@gmail.com",
    cv: "/files/leo-chrisben-evans-cv.pdf",
  },

  portrait: {
    src: "/media/chrisben-hero.webp",
    /** 26px-wide copy, upscaled with image-rendering:pixelated for the entrance. */
    lofi: "/media/chrisben-hero-lofi.webp",
    width: 510,
    height: 740,
    alt: "Leo Chrisben Evans, arms folded, listening at a tech event in Nairobi.",
    credit: "Snapshot Dreams Photography",
  },

  /** EmailJS — the contact form. */
  emailjs: {
    service: "service_xggajb9",
    template: "template_rmznr52",
    publicKey: "1caYsGKrf6rKQG-1K",
  },
} as const;

export const nav = [
  { label: "Journey", href: "/#journey" },
  { label: "Builds", href: "/#builds" },
  { label: "Lab", href: "/lab" },
  { label: "Writing", href: "/notes" },
  { label: "About", href: "/about" },
] as const;
