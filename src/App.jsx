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
  Newspaper,
} from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

// =====================
// ⚙️ PERSONALIZED PROFILE DATA (Shweta Garg)
// =====================

const PROFILE = {
  name: "Shweta Garg",
  title: "Senior Applied Scientist, AWS",
  location: "Santa Clara, CA",
  tagline:
	"I lead applied science for Kiro's AI coding agents at AWS — setting science strategy and research priorities, building the team, and partnering with engineering and product leaders to bring new capabilities into production. Across 13+ years, I've built and scaled ML systems for coding agents, search & ranking, and question answering, including Amazon Search ranking improvements that delivered hundreds of millions of dollars in annualized incremental sales.",  
email: "shwetagarg2006@gmail.com",
  website: "",
  // If this image fails to load, a fallback with initials will render.
  avatarUrl: "/assets/profile.jpg",
  socials: [
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shwetagargiitb/",
    },
    {
      label: "Google Scholar",
      icon: BookOpen,
      href: "https://scholar.google.com/citations?user=Q92AH78AAAAJ&hl=en",
    },
  ],
  interests: [
    "Code Intelligence",
    "Generative AI for Code", 
    "Agentic AI",
  ],
};

const HIGHLIGHTS = [
  { icon: Briefcase, label: "Products", value: (<>Kiro IDE & CLI,<br />Q Developer</>) },
  { icon: BookOpen, label: "Research", value: (<>5+ patents filed,<br />11+ papers,<br />4+ blogs</>) },
  { icon: Award, label: "Organizer", value: "3+ workshops" },
  { icon: Presentation, label: "Invited", value: (<>10+ tutorials, <br />talks & panels</>) },
];

const EXPERIENCE = [
  {
    role: "Senior Applied Scientist · Kiro Science",
    org: "Amazon Web Services (AWS)",
    date: "Apr 2024 – Present",
    bullets: [
      "Lead the applied science team building Kiro's AI coding agents — owning science strategy, research roadmap, hiring, and talent development.",
      "Partner with engineering and product leaders to launch coding-agent capabilities across CLI and IDE workflows, balancing near-term delivery with longer-term research investments.",
      "Drive intelligent routing across model families to balance task quality, latency, and cost.",
      "Lead agent evaluation and continuous improvement through benchmarks grounded in real user workflows, trajectory diagnostics, online quality signals, A/B experiments, and self-improving harnesses.",
    ],
  },
  {
    role: "Senior Applied Scientist",
    org: "A9.com · Amazon Search",
    date: "Jun 2019 – Apr 2024",
    bullets: [
      "Led applied science across autocomplete ranking, search discovery, and knowledge systems for Amazon's international marketplaces.",
      "Delivered hundreds of millions of dollars in annualized incremental sales through ML ranking improvements for Search Autocomplete.",
      "Expanded query coverage through multilingual transfer and transformer-based query generation.",
      "Mentored scientists and served as a Search Weblab Bar Raiser, reviewing experiment design and analysis across the broader Search organization.",
    ],
  },
  {
    role: "Applied Scientist",
    org: "Amazon",
    date: "Apr 2016 – Jun 2019",
    bullets: [
      "Founding member of the team that built and launched question answering on Amazon product pages.",
      "Developed neural models for semantic matching, answer selection, and query understanding, scaling the system across product categories and marketplaces.",
      "Accelerated expansion to new categories by reducing model training cycles from months to days.",
    ],
  },
];

const NEWS = [
  {
    date: "2026‑10‑20",
    text: (
      <>
        Launched KiroTrace, Kiro's self-improvement system that mines agent traces and gates every fix with deterministic checks. Technical deep dive{" "}
        <a href="https://kiro.dev/blog/how-kiro-fixes-itself/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
          How Kiro fixes itself, and how we keep the fixes honest
        </a>
        ; covered by The Deep View in a{" "}
        <a href="https://thedeepview.com/articles/amazon-tests-a-safer-path-to-self-improving-ai" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
          press release
        </a>
        {" "}and{" "}
        <a href="https://archive.thedeepview.com/p/why-persistent-memory-could-transform-ai-agents" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
          newsletter feature
        </a>
        .
      </>
    ),
    href: null,
  },
  {
    date: "2026‑10‑12",
    text: (
      <>
        Our workshop "Next-Gen Code Development with Collaborative AI Agents (2nd Edition)" is accepted at The Web Conference 2027, Dublin, Ireland. Paper submissions due Jan 4, 2027.
      </>
    ),
    href: null,
  },
  {
    date: "2026‑04‑06",
    text: (
      <>
        Two papers accepted at ACL 2026: 1){" "}
        <a
          href="https://arxiv.org/abs/2604.05407"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
        >
          CODESTRUCT: Code Agents over Structured Action Spaces
        </a>
        , and 2){" "}
        <a
          href="https://arxiv.org/abs/2603.05744"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
        >
          CodeScout: Contextual Problem Statement Enhancement for Software Agents
        </a>
        .
      </>
    ),
    href: null,
  },
];

const BLOG_POSTS = [
  {
    title: "How Kiro fixes itself, and how we keep the fixes honest",
    date: "Oct 2026",
    excerpt: "KiroTrace: mining Kiro's own run traces to find failures, proposing one targeted prompt or tool change, and keeping it only if it clears a three-stage deterministic gate plus human review.",
    href: "https://kiro.dev/blog/how-kiro-fixes-itself/",
  },
  {
    title: "From Copilots to Coworkers at AAAI: The Gap Between Agentic Research and Production",
    date: "Mar 2026",
    excerpt: "Reflections from the AAAI 2026 workshop on the gap between agentic AI research and production-grade coding systems.",
    href: "https://kiro.dev/blog/from-copilots-to-coworkers/",
  },
  {
    title: "Surgical Precision with AST",
    date: "Feb 2026",
    excerpt: "How Abstract Syntax Trees enable precise, semantic-aware code transformations in AI coding tools.",
    href: "https://kiro.dev/blog/surgical-precision-with-ast/",
  },
  {
    title: "Hidden Inefficiencies in AI Coding Tools",
    date: "Feb 2026",
    excerpt: "Exploring the hidden costs and inefficiencies in current AI coding assistants and how next-generation tools can address them.",
    href: "https://kiro.dev/blog/hidden-inefficiencies-ai-coding/",
  },
];

const PRESS = [
  {
    outlet: "The Deep View",
    title: "Amazon tests a safer path to self-improving AI",
    type: "Press release",
    date: "Oct 2026",
    summary: "Coverage of KiroTrace, Kiro's self-improvement system that mines agent traces and gates every fix with deterministic checks.",
    href: "https://thedeepview.com/articles/amazon-tests-a-safer-path-to-self-improving-ai",
  },
  {
    outlet: "The Deep View",
    title: "Amazon tests a safer path to self-improving AI",
    type: "Newsletter feature",
    date: "Oct 2026",
    summary: "Featured section in The Deep View newsletter issue \"Why persistent memory could transform AI agents,\" covering KiroTrace.",
    href: "https://archive.thedeepview.com/p/why-persistent-memory-could-transform-ai-agents",
  },
];

const INVITED_TALKS = [
  {
    title: "Kiro: Programming in the Age of Agents - CLI, Autonomy, and Transformation",
    venue: "BITS Pilani (CSIS WILP Faculty Development Program)",
    date: "Apr 2026",
  },
  {
    title: "Coding agents at AWS",
    venue: "National University of Singapore",
    date: "Jan 2026",
  },
  {
    title: "Roundtable on AI for Code",
    venue: "National University of Singapore",
    date: "Jan 2026",
    type: "Invited Roundtable",
  },
  {
    title: "Agents Among Us: The Rise of Collaborative AI in Code and Conversation",
    venue: "Grenoble Informatics Laboratory (LIG)",
    date: "Sept 2025",
    href: "https://www.liglab.fr/en/laboratory-overview/scientific-animation/keynote-speeches/keynote-lig-behrooz-omidvar-tehrani-shweta-garg",
  },
  {
    title: "Collaborative Coding Agents for Interactive Development and Codebase Modernization",
    venue: "GitHub Copilot",
    date: "Sept 2025",
  },
  {
    title: "From Code to Customer Journeys: AI Teammates for the Experience Platform Era",
    venue: "Adobe HQ",
    date: "Aug 2025",
  },
  {
    title: "From Code to Impact: AI Teammates for Developer Productivity and Reliability",
    venue: "Uber",
    date: "Aug 2025",
  },
  {
    title: "AI Teammates for the Modern Developer",
    venue: "AI Reasoning Day @ KDD 2025",
    date: "Aug 2025",
    href: "https://ai-reasoning.github.io/",
  },
  {
    title: "Panel Discussion: Women in Tech Day",
    venue: "COTA Healthcare",
    date: "Apr 2025",
  },
];

const TUTORIALS_WORKSHOPS = [
  {
    title: "Next-Gen Code Development with Collaborative AI Agents (2nd Edition)",
    venue: "The Web Conference 2027, Dublin",
    type: "Workshop",
    status: "accepted",
  },
  {
    title: "Next-Gen Coding Agents",
    venue: "Amazon Research Day 2026",
    type: "Workshop",
    status: "organized",
    href: "https://www.amazon.science/conferences-and-events/amazon-research-day-2026",
  },
  {
    title: "CodeMates: Next-Gen Code Development with Collaborative AI Agents",
    venue: "AAAI 2026",
    type: "Workshop",
    status: "organized",
    href: "https://sites.google.com/view/next-gen-code-agents-aaai26",
  },
  {
    title: "Next-Gen Code Development with Collaborative AI Agents",
    venue: "The Web Conference 2026",
    type: "Tutorial",
    status: "accepted",
    href: "https://www2026.thewebconf.org/accepted/tutorials.html#:~:text=Next%2DGen%20Code%20Development%20with%20Collaborative%20AI%20Agents",
  },
];

const WORKSHOP_ORGANIZATION = [];

const PUBLICATIONS = [
  {
    title: "Teaching Agents to Code Reliably",
    authors: ["M. A. Mohsin", "M. Kim", "K. Ruan", "S. Garg", "V. Kumar", "M. K. Ramanathan"],
    venue: "arXiv",
    year: "2026",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2610.03984" }
    ],
    tags: ["Code Agents", "Reliability"],
  },
  {
    title: "AECP: Artifact-Exclusive Communication Protocol for Multi-Agent Code Generation",
    authors: ["J. Xue", "Y. Wang", "X. Li", "L. Mo", "A. Sengupta", "S. Garg", "M. K. Ramanathan", "M. Kim"],
    venue: "arXiv",
    year: "2026",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2610.06481" }
    ],
    tags: ["Multi-Agent", "Code Generation"],
  },
  {
    title: "CODESTRUCT: Code Agents over Structured Action Spaces",
    authors: ["M. Kim", "J. Hsu", "D. Wang", "S. Garg", "V. Kumar", "M. K. Ramanathan"],
    venue: "ACL",
    year: "2026",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2604.05407" }
    ],
    tags: ["Code Agents", "Action Spaces"],
  },
  {
    title: "Collaborative LLM Agents for End-to-End Software Development",
    authors: ["S. Garg", "B. Omidvar-Tehrani", "S. Fu", "G. Guinet", "B. Ray"],
    venue: "WWW",
    year: "2026",
    links: [
      { label: "PDF", href: "https://doi.org/10.1145/3774905.3793914" }
    ],
    tags: ["Code Agents", "Software Development"],
  },
  {
    title: "Coherence Collapse: Diagnosing Why Code Agents Fail After Reaching the Right Code",
    authors: ["M. Kim", "D. Wang", "S. Cui", "F. Farmahinifarahani", "T. Y. Zhuo", "S. Garg", "B. Ray", "R. Mukherjee", "V. Kumar"],
    venue: "arXiv",
    year: "2026",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2603.24631" }
    ],
    tags: ["Code Agents", "Evaluation"],
  },
  {
    title: "CodeScout: Contextual Problem Statement Enhancement for Software Agents",
    authors: ["M. Suri", "X. Li", "M. Shojaie", "S. Han", "C. Hsu", "S. Garg", "A. A. Deshmukh", "V. Kumar"],
    venue: "ACL",
    year: "2026",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2603.05744" }
    ],
    tags: ["Software Agents", "Code Intelligence"],
  },
  {
    title: "Textual Gradients are a Flawed Metaphor for Automatic Prompt Optimization",
    authors: ["D. Melcer", "Q. Chen", "W. H. Chiang", "S. Garg", "P. Garg", "C. Bock"],
    venue: "arXiv",
    year: "2025",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2512.13598" }
    ],
    tags: ["Prompt Optimization", "LLMs"],
  },
  {
    title: "CodeAssistBench (CAB): Dataset & Benchmarking for Multi-turn Chat-Based Code Assistance",
    authors: [
      "M. Kim",
      "S. Garg",
      "B. Ray",
      "V. Kumar",
      "A. Deoras"
    ],
    venue: "NeurIPS",
    year: "2025",
    links: [
      { label: "PDF", href: "https://arxiv.org/pdf/2507.10646" }
    ],
    tags: ["Code Assistance", "Benchmarking"],
  },
  {
    title: "Improving Answer Selection and Answer Triggering using Hard Negatives",
    authors: [
      "S. Kumar",
      "S. Garg", 
      "K. Mehta",
      "N. Rasiwasia"
    ],
    venue: "EMNLP",
    year: "2019",
    links: [
      { label: "PDF", href: "https://aclanthology.org/D19-1604.pdf" }
    ],
    tags: ["Answer Selection", "NLP"],
  },
  {
    title: "ProductQnA: Answering User Questions on E-Commerce Product Pages",
    authors: [
      "A. Kulkarni*",
      "K. Mehta*", 
      "S. Garg*",
      "V. Bansal*",
      "N. Rasiwasia",
      "S. H. Sengamedu"
    ],
    venue: "ECNLP (WWW)",
    year: "2019",
    links: [
      { label: "PDF", href: "https://assets.amazon.science/92/27/6409b2524ab194ba62e4d2c53d02/productqna-answering-user-questions-on-e-commerce-product-pages.pdf" }
    ],
    tags: ["Question Answering", "E-commerce"],
  },
];

const PROJECTS = [
  {
    title: "Kiro - Agentic IDE & CLI",
    summary:
      "A new agentic IDE and CLI that focuses on Specification driven development",
    href: "https://kiro.dev/",
  },
  {
    title: "Amazon Q Developer",
    summary:
      "Enterprise‑scale code intelligence platform with assistants across CLI and IDEs.",
    href: "https://aws.amazon.com/q/developer/",
  },
];

const SERVICES = [
  { role: "Reviewer Service", venue: "AAAI 2026 Workshop (Code Agent), ACL ARR 2025, ICLR 2025 Workshop (DL4C), TheWebConf 2024, and AMLC" },
  { role: "Scientific Review Bar Raiser", venue: "Led the evaluation of 20+ A/B experiment designs across Amazon Search, Relevance, and UI features, ensuring high-quality scientific rigor and adherence to best practices" },
  { role: "Mentorship & Leadership", venue: "Mentored 100+ scientists and engineers through 1:1 guidance, cross-organizational initiatives, and leadership forums; featured in panel discussions at Women in Tech Day and COTA" },
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
                ["Publications", "publications"],
                ["Talks", "talks"],
                ["Tutorials", "tutorials"],
                ["Blog", "blog"],
                ["Press", "press"],
                ["Experience", "experience"],
                ["Products", "projects"],
                ["Community", "community"],
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
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
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
              <div className="mt-4 flex flex-wrap gap-3">
                {PROFILE.interests.map((it) => (
                  <Badge key={it} variant="secondary" className="text-sm">
                    {it}
                  </Badge>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 w-full">
                <Button asChild className="flex-1 min-w-[120px]">
                  <a href="mailto:shwetagarg2006@gmail.com">
                    <Mail className="w-4 h-4 mr-2" /> Contact
                  </a>
                </Button>
                {PROFILE.socials.map(({ label, icon: Icon, href }) => (
                  <Button key={label} variant="ghost" size="sm" asChild className="flex-1 min-w-[120px]">
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
                <h3 className="text-xl font-semibold tracking-tight mb-4">Latest News</h3>
                <div className="flex flex-col gap-2">
                  {NEWS.map((n, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-start gap-2 text-sm"
                    >
                      <Calendar className="w-4 h-4 mt-0.5" aria-hidden />
                      <div className="group">
                        <span className="text-zinc-500 dark:text-zinc-400 mr-2">
                          {n.date}
                        </span>
                        {n.href ? (
                          <a
                            href={n.href}
                            className="hover:underline underline-offset-4"
                          >
                            {n.text}
                            <ChevronRight className="w-4 h-4 inline-block -mb-0.5 opacity-0 group-hover:opacity-100 transition" />
                          </a>
                        ) : (
                          <span>{n.text}</span>
                        )}
                      </div>
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
                <div className="p-2.5">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    {PROFILE.location}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 p-1.5"
                      >
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {label}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 font-semibold text-sm">
                          <Icon className="w-3.5 h-3.5" /> {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Publications */}
          <div className="mt-8">
            <Section id="publications" title="Selected Publications">
              <ol className="space-y-2">
                {PUBLICATIONS.map((p, idx) => (
                  <li
                    key={idx}
                    className="py-2 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm leading-tight">
                            {p.title}
                          </h3>
                          {p.links?.map((l) => (
                            <Button
                              key={l.label}
                              size="sm"
                              variant="secondary"
                              asChild
                              className="h-auto px-1.5 py-1 text-xs min-h-0"
                            >
                              <a href={l.href} target="_blank" rel="noreferrer">
                                {l.label}
                              </a>
                            </Button>
                          ))}
                        </div>
                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {p.authors.join(", ")}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {p.venue} {p.year}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>

          {/* Invited Talks */}
          <div className="mt-10">
            <Section id="talks" title="Invited Talks">
              <div className="space-y-2">
                {INVITED_TALKS.map((talk, idx) => (
                  <div key={idx} className="py-2 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm leading-tight">
                            {talk.title}
                          </div>
                          {talk.href && (
                            <Button
                              size="sm"
                              variant="secondary"
                              asChild
                              className="h-auto px-1.5 py-1 text-xs min-h-0"
                            >
                              <a href={talk.href} target="_blank" rel="noreferrer">
                                Link
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {talk.venue} • {talk.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Tutorials & Workshops */}
          <div className="mt-10">
            <Section id="tutorials" title="Tutorials & Workshops">
              <div className="space-y-2">
                {TUTORIALS_WORKSHOPS.map((item, idx) => (
                  <div key={idx} className="py-2 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm leading-tight">
                            {item.title}
                          </div>
                          {item.href && (
                            <Button
                              size="sm"
                              variant="secondary"
                              asChild
                              className="h-auto px-1.5 py-1 text-xs min-h-0"
                            >
                              <a href={item.href} target="_blank" rel="noreferrer">
                                Link
                              </a>
                            </Button>
                          )}
                          {item.status === "accepted" && (
                            <Badge variant="secondary" className="text-xs">
                              Accepted
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {item.type} • {item.venue} {item.date}{item.location && `, ${item.location}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Blog Posts */}
          <div className="mt-10">
            <Section id="blog" title="Blog Posts">
              <div className="space-y-2">
                {BLOG_POSTS.map((post, idx) => (
                  <div key={idx} className="py-2 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm leading-tight">
                            {post.title}
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="h-auto px-1.5 py-1 text-xs min-h-0"
                          >
                            <a href={post.href} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Press & Media */}
          <div className="mt-10">
            <Section id="press" title="Press & Media">
              <div className="space-y-2">
                {PRESS.map((item, idx) => (
                  <div key={idx} className="py-2 border-b border-zinc-200/40 dark:border-zinc-800/40 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Newspaper className="w-4 h-4 flex-shrink-0" aria-hidden />
                          <div className="font-medium text-sm leading-tight">
                            {item.title}
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="h-auto px-1.5 py-1 text-xs min-h-0"
                          >
                            <a href={item.href} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                          {item.summary}
                        </p>
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {item.outlet} • {item.type} • {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Experience */}
          <div className="mt-10">
            <Section id="experience" title="Experience">
              <div className="space-y-4">
                {EXPERIENCE.map((job, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <div className="font-semibold flex items-center gap-2">
                        <Briefcase className="w-4 h-4" aria-hidden /> {job.role}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-right sm:flex-shrink-0">
                        {job.date}
                      </div>
                    </div>
                    <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {job.org}
                    </div>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {job.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Projects */}
          <div className="mt-10">
            <Section id="projects" title="Products">
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

          {/* Community */}
          <div className="mt-10">
            <Section id="community" title="Community">
              <div className="space-y-3">
                {SERVICES.map((s) => (
                  <div
                    key={s.role + s.venue}
                    className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 p-3"
                  >
                    <div className="font-medium">{s.role}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {s.venue}
                    </div>
                  </div>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>
          </div>

          {/* Footer */}
          <footer className="mt-16 mb-10 text-sm text-zinc-600 dark:text-zinc-400">
            © {year} {PROFILE.name}. Built with ❤️, React, and QCLI.
          </footer>
        </main>
      </div>
    </div>
  );
}
