import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  FileText,
  Moon,
  Sun,
  MapPin,
  ChevronRight,
  BookOpen,
  Award,
  Briefcase,
  Calendar,
  ExternalLink,
  Presentation,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

// =====================
// ⚙️ PERSONALIZED PROFILE DATA (Varun Kumar)
// =====================

const PROFILE = {
  name: "Varun Kumar",
  title: "AI Research Lead",
  location: "Santa Clara, CA",
  tagline:
    "I head applied research in code intelligence and interactive agents at AWS, translating cutting-edge science into products that transform developer workflows through Kiro IDE and Amazon Q Developer.",
  email: "k.varun@outlook.com",
  website: "",
  // If this image fails to load, a fallback with initials will render.
  avatarUrl: "/assets/profile.jpg",
  socials: [
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/varunkumar-dev",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/varunin",
    },
    {
      label: "Google Scholar",
      icon: BookOpen,
      href: "https://scholar.google.com/citations?user=d-La2lQAAAAJ&hl=en",
    },
    {
      label: "Amazon Science",
      icon: Globe,
      href: "https://www.amazon.science/author/varun-kumar",
    },
  ],
  interests: [
    "Code Intelligence",
    "Generative AI for Code",
    "Agentic AI",
    "Reinforcement Learning",
    "Responsible & Fair AI",
  ],
};

const HIGHLIGHTS = [
  { icon: Briefcase, label: "Leadership", value: "Coding Agents Science, AWS" },
  { icon: Presentation, label: "Products", value: "Kiro IDE, Q Developer" },
  { icon: BookOpen, label: "Research", value: "30+ papers" },
  { icon: GraduationCap, label: "Service", value: "ACL & COLM Area Chair" },
];

const NEWS = [
  {
    date: "2025‑08‑25",
    text: "EMNLP 2025: Planning-Aware Code Infilling via Horizon-Length Prediction accepted.",
    href: "https://arxiv.org/abs/2410.03103",
  },
  {
    date: "2025‑07‑14",
    text: "Launched Kiro IDE, 100k+ users in first 7 days",
    href: "https://kiro.dev/",
  },
  {
    date: "2025‑02‑20",
    text: "Read my Amazon Science blog on LeDex—training LLMs to self‑debug & explain code (NeurIPS 2024)",
    href: "https://www.amazon.science/blog/training-code-generation-models-to-debug-their-own-outputs",
  },
];

const PUBLICATIONS = [
  {
    title: "On Mitigating Code LLM Hallucinations with API Documentation",
    authors: [
      "Nihal Jain",
      "Robert Kwiatkowski",
      "Baishakhi Ray",
      "Murali K. Ramanathan",
      "Varun Kumar",
    ],
    venue: "ICSE",
    year: "2025",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2407.09726" }],
    tags: ["Code LLMs", "Hallucination Mitigation"],
  },
  {
    title: "Fewer Truncations Improve Language Modeling",
    authors: [
      "Hantian Ding",
      "Zijian Wang",
      "Giovanni Paolini",
      "Varun Kumar",
      "et al.",
    ],
    venue: "ICML",
    year: "2024",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2404.10830" }],
    tags: ["Pre-training", "LLMs", "Hallucination"],
  },
  {
    title: "LeDex: Training LLMs to Better Self‑Debug and Explain Code",
    authors: [
      "Nan Jiang",
      "Xiaopeng Li",
      "Shiqi Wang",
      "Qiang Zhou",
      "Varun Kumar",
      "et al.",
    ],
    venue: "NeurIPS",
    year: "2024",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2405.18649" }],
    tags: ["Reinforcement Learning", "Code Intelligence"],
  },
  {
    title:
      "BOLD: Dataset and Metrics for Measuring Biases in Open-Ended Language Generation",
    authors: ["Jwala Dhamala", "Tony Sun", "Varun Kumar", "et al."],
    venue: "ACM FAccT",
    year: "2021",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2101.11718" }],
    tags: ["Fairness", "Evaluation", "LLMs"],
  },
];

const PROJECTS = [
  {
    title: "Kiro - Agentic IDE",
    summary:
      "A new agentic IDE that focuses on Specification driven development",
    href: "https://kiro.dev/",
  },
  {
    title: "Amazon Q Developer",
    summary:
      "Enterprise‑scale code intelligence platform with assistants across CLI and IDEs.",
    href: "https://aws.amazon.com/q/developer/",
  },
  {
    title: "Agentic Coding RL Pipeline",
    summary: "Continuous online RL for coding agents in production.",
    details:
      "Full‑stack pipeline enabling iterative improvement from real‑world developer interactions.",
  },
  {
    title: "Training LLMs to debug their own outputs",
    summary:
      "RL to improve self-debugging and code generation capabilites of code LLMs",
    href: "https://www.amazon.science/blog/training-code-generation-models-to-debug-their-own-outputs",
  },
];

const SERVICES = [
  { role: "Area Chair", venue: "ACL 2025, COLM 2025" },
  { role: "Reviewer", venue: "NeurIPS, ICLR, ICML, EMNLP, NAACL, ACL" },
];

const SKILLS = [
  "Generative AI",
  "Large Language Models",
  "Reinforcement Learning",
  "Robustness & Fairness",
  "Distributed Training",
  "AWS Cloud",
];

// =============
// 🔧 UTILITIES & UI
// =============

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
      {title}
    </h2>
    {children}
  </section>
);

const Anchor = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center gap-1 hover:underline underline-offset-4"
  >
    {children}
    <ExternalLink className="w-4 h-4" aria-hidden />
  </a>
);

const Pill = ({ children }) => (
  <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">
    {children}
  </span>
);

function Avatar({ name, src }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");
    return (
      <div className="w-56 h-56 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-500/20 to-fuchsia-500/20 text-4xl font-semibold">
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${name} portrait`}
      onError={() => setError(true)}
      className="w-56 h-56 rounded-2xl object-cover shadow-xl ring-4 ring-white/70 dark:ring-zinc-950/70"
    />
  );
}

// ==================
// 🧩 MAIN COMPONENT
// ==================

export default function App() {
  const [dark, setDark] = useState(true);
  const container = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";
  const gradient =
    "bg-[radial-gradient(40rem_20rem_at_50%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(30rem_15rem_at_110%_10%,rgba(236,72,153,0.25),transparent)]";
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className={`min-h-screen text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950 ${gradient}`}
      >
        {/* Nav */}
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <nav
            className={`${container} flex items-center justify-between py-3`}
            aria-label="Primary"
          >
            <a href="#top" className="font-semibold text-lg">
              {PROFILE.name}
            </a>
            <div className="hidden md:flex gap-6 text-sm">
              {[
                ["About", "about"],
                ["Research", "research"],
                ["Publications", "publications"],
                ["Projects", "projects"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  className="hover:underline underline-offset-4"
                  href={`#${id}`}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
              >
                {dark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <main id="top" className={`${container} py-10 md:py-14`}>
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-bold tracking-tight"
              >
                {PROFILE.title}
              </motion.h1>
              <p className="mt-4 text-zinc-700 dark:text-zinc-300 max-w-2xl">
                {PROFILE.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PROFILE.interests.map((it) => (
                  <Badge key={it} variant="secondary" className="text-xs">
                    {it}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href="#contact">
                    <Mail className="w-4 h-4 mr-2" /> Contact
                  </a>
                </Button>
                {PROFILE.socials.map(({ label, icon: Icon, href }) => (
                  <Button key={label} variant="ghost" size="sm" asChild>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 mr-2" /> {label}
                    </a>
                  </Button>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-3">Latest News</h3>
                <div className="flex flex-col gap-2">
                  {NEWS.map((n) => (
                    <div
                      key={n.text}
                      className="inline-flex items-start gap-2 text-sm"
                    >
                      <Calendar className="w-4 h-4 mt-0.5" aria-hidden />
                      <a
                        href={n.href}
                        className="group hover:underline underline-offset-4"
                      >
                        <span className="text-zinc-500 dark:text-zinc-400 mr-2">
                          {n.date}
                        </span>
                        {n.text}
                        <ChevronRight className="w-4 h-4 inline-block -mb-0.5 opacity-0 group-hover:opacity-100 transition" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-zinc-200/60 dark:border-zinc-800/60">
              <CardContent className="p-0">
                <div className="aspect-square w-full bg-gradient-to-br from-blue-200/50 to-fuchsia-200/50 dark:from-blue-900/30 dark:to-fuchsia-900/30 flex items-center justify-center">
                  <Avatar name={PROFILE.name} src={PROFILE.avatarUrl} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    {PROFILE.location}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 p-3"
                      >
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {label}
                        </div>
                        <div className="mt-1 flex items-center gap-2 font-semibold">
                          <Icon className="w-4 h-4" /> {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About */}
          <div className="mt-14">
            <Section id="about" title="About">
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                As a Senior Applied Science Manager at AWS, I lead the science
                team for Kiro IDE and Amazon Q Developer, building large
                language models and AI agents. These products transform how
                millions of developers write, debug, and understand code through
                advanced language models and agentic workflows. Code
                intelligence fascinates me because it represents a unique form
                of AI where we can rigorously verify outcomes at massive scale,
                creating unprecedented opportunities for reliable human-AI
                collaboration.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
                Previously, I helped launch Alexa's deep learning
                models and advanced fairness methods across large language
                models. I graduated from University of Maryland, College Park,
                where I worked on human-in-the-loop machine learning systems.
              </p>
            </Section>
          </div>

          {/* Research Focus */}
          <div className="mt-10">
            <Section id="research" title="Research Focus">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Code Intelligence",
                    desc: "LLMs for code, evaluation, and safety at production scale.",
                  },
                  {
                    title: "Agentic AI",
                    desc: "Autonomous coding workflows optimized with online RL.",
                  },
                  {
                    title: "Responsible AI",
                    desc: "Robustness, fairness, and debiasing for agents.",
                  },
                ].map((item) => (
                  <Card
                    key={item.title}
                    className="border-zinc-200/60 dark:border-zinc-800/60"
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          {/* Publications */}
          <div className="mt-10">
            <Section id="publications" title="Selected Publications">
              <ol className="space-y-4">
                {PUBLICATIONS.map((p, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-semibold text-lg leading-snug">
                        {p.title}
                      </h3>
                      <Pill>
                        {p.venue} {p.year}
                      </Pill>
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {p.authors.join(", ")}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.links?.map((l) => (
                        <Button
                          key={l.label}
                          size="sm"
                          variant="secondary"
                          asChild
                        >
                          <a href={l.href} target="_blank" rel="noreferrer">
                            {l.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags?.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>

          {/* Projects */}
          <div className="mt-10">
            <Section id="projects" title="Projects">
              <div className="grid md:grid-cols-2 gap-4">
                {PROJECTS.map((proj) => (
                  <Card
                    key={proj.title}
                    className="group border-zinc-200/60 dark:border-zinc-800/60"
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold flex items-center gap-2">
                        {proj.title}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {proj.summary}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                        {proj.details}
                      </p>
                      <div className="mt-3">
                        <Anchor href={proj.href}>Explore project</Anchor>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          {/* Service */}
          <div className="mt-10">
            <Section id="service" title="Service">
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li
                    key={s.role + s.venue}
                    className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 p-3"
                  >
                    <div className="font-medium">{s.role}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {s.venue}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Expertise */}
          <div className="mt-10">
            <Section id="expertise" title="Expertise">
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </Section>
          </div>

          {/* Contact */}
          <div className="mt-12">
            <Section id="contact" title="Contact">
              <Card className="border-zinc-200/60 dark:border-zinc-800/60">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="font-semibold">Let's collaborate</div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-1">
                        I'm open to research collaborations, invited talks, and
                        mentorship. The fastest way to reach me is via email.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild>
                        <a href={`mailto:${PROFILE.email}`}>
                          <Mail className="w-4 h-4 mr-2" /> Email me
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a
                          href="https://x.com/varun_kr"
                          target="https://x.com/varun_kr"
                          rel="noreferrer"
                        >
                          <Globe className="w-4 h-4 mr-2" /> X
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>
          </div>

          {/* Footer */}
          <footer className="mt-16 mb-10 text-sm text-zinc-600 dark:text-zinc-400">
            © {year} {PROFILE.name}. Built with ❤️, React, and Kiro.
          </footer>
        </main>
      </div>
    </div>
  );
}
