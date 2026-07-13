import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "../css/style.css";
import "../css/hero.css";
import "../css/about.css";
import "../css/skills.css";
import "../css/projects.css";
import "../css/case-study.css";
import "../css/education.css";
import "../css/contact.css";
import "../css/responsive.css";
import "./react-polish.css";

const resumePdf = new URL("../assets/resume/resume.pdf", import.meta.url).href;
const careerHistoryImage = new URL("../assets/images/Career History.png", import.meta.url).href;
const playerStatisticsImage = new URL("../assets/images/Player Statics.png", import.meta.url).href;
const strategyPlannerImage = new URL("../assets/images/Strategy Planner.png", import.meta.url).href;
const leaderboardImage = new URL("../assets/images/Leaderboard.png", import.meta.url).href;

const navItems = [
  ["hero", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"],
];

const skillGroups = [
  {
    icon: "fa-solid fa-laptop-code",
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    icon: "fa-solid fa-server",
    title: "Backend",
    items: ["Node.js", "Express.js", "PHP", "REST APIs", "WebSockets"],
  },
  {
    icon: "fa-solid fa-database",
    title: "Database",
    items: ["SQL Queries", "MySQL", "MariaDB", "PostgreSQL"],
  },
  {
    icon: "fa-solid fa-wrench",
    title: "Tools & DevOps",
    items: ["Git & GitHub", "VS Code", "Docker", "Postman", "Figma"],
  },
];

const projects = [
  {
    title: "Valorant Esports Platform",
    badge: "Capstone Project",
    icon: "fa-solid fa-gamepad",
    grad: "grad-1",
    desc:
      "A comprehensive full-stack esports management platform for Valorant teams featuring scrim management, player statistics, strategic planning tools, and a team roster system.",
    tags: ["MySQL", "PHP", "WebSocket", "REST API", "JavaScript", "Riot API"],
    github: "https://github.com/zhepS-z/valorant-esports-training-platform",
    caseStudy: true,
  },
  {
    title: "Real-time Chat App",
    badge: "Mini Project",
    icon: "fa-solid fa-comments",
    grad: "grad-2",
    desc:
      "A real-time chat application with a modern UI and seamless messaging capabilities. It was also used as part of the Valorant Esports Platform.",
    tags: ["React", "Node.js", "Socket.io"],
    github: "https://github.com/zhepS-z/Real-Time-Chat",
  },
  {
    title: "Asset Management App",
    badge: "Internship Project",
    icon: "fa-solid fa-boxes-stacked",
    grad: "grad-3",
    desc:
      "An equipment inventory system that supports borrowing, returns, and organized asset tracking inside an organization.",
    tags: ["React", "Node.js", "MySQL", "Express"],
    github: "https://github.com/zhepS-z/asset_inventory",
  },
];

const screenshots = [
  [careerHistoryImage, "Career History"],
  [playerStatisticsImage, "Player Statistics Dashboard"],
  [strategyPlannerImage, "Strategy Planner"],
  [leaderboardImage, "Leaderboard"],
];

function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useScrollState() {
  const [state, setState] = useState({ active: "hero", scrolled: false, progress: 0 });

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean);
      let section = sections[0];

      for (const sectionEl of sections) {
        if (sectionEl.getBoundingClientRect().top <= 180) {
          section = sectionEl;
        }
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      setState({
        active: section?.id || "hero",
        scrolled: window.scrollY > 30,
        progress: Math.min(Math.max(progress, 0), 1),
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

function useTypewriter(words) {
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = words[wordIndex];
      setText(current.slice(0, charIndex));

      if (!deleting && charIndex === current.length) {
        timer = window.setTimeout(() => {
          deleting = true;
          tick();
        }, 1600);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = window.setTimeout(tick, 260);
        return;
      }

      charIndex += deleting ? -1 : 1;
      timer = window.setTimeout(tick, deleting ? 36 : 62);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [words]);

  return text;
}

function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navHeight = document.getElementById("navbar")?.offsetHeight || 72;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: "smooth" });
}

function Navbar({ active, scrolled, progress }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("preferred-theme", theme);
  }, [theme]);

  const handleNav = (event, id) => {
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav id="navbar" className={scrolled ? "scrolled" : ""} aria-label="Main navigation">
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={(event) => handleNav(event, "hero")} aria-label="Home">
            <span className="logo-bracket">&lt;</span>sett_jn<span className="logo-bracket">/&gt;</span>
          </a>
          <ul className={`nav-links ${open ? "open" : ""}`} id="navLinks" role="list">
            {navItems.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link ${active === id ? "active" : ""}`}
                  onClick={(event) => handleNav(event, id)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="theme-toggle-item">
              <button
                className="theme-toggle"
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
              >
                <i className={`fa-solid ${theme === "light" ? "fa-sun" : "fa-moon"}`} aria-hidden="true" />
              </button>
            </li>
          </ul>
          <button
            className={`hamburger ${open ? "open" : ""}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>
    </>
  );
}

function Hero() {
  const words = useMemo(
    () => [
      "You can call me Tang.",
      "Full-Stack Web Developer",
      "Computer Engineering Student",
      "React-focused Portfolio",
    ],
    [],
  );
  const role = useTypewriter(words);

  return (
    <section id="hero" aria-label="Introduction">
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="container">
        <div className="hero-inner">
          <p className="hero-eyebrow reveal">Hello, World! I'm</p>
          <h1 className="hero-name reveal delay-1">
            Settapong
            <br />
            <span className="accent">Janajina.</span>
          </h1>
          <p className="hero-role reveal delay-2">
            <span>{role}</span>
            <span className="cursor" aria-hidden="true" />
          </p>
          <p className="hero-bio reveal delay-3">
            Computer Engineering student interested in web development, database systems, and software engineering. I enjoy
            building practical applications that solve real-world problems and improve user experiences.
          </p>
          <div className="hero-actions reveal delay-4">
            <a href={resumePdf} className="btn btn-primary" download>
              <i className="fa-solid fa-download" aria-hidden="true" />
              Resume
            </a>
            <a href="https://github.com/zhepS-z" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fa-brands fa-github" aria-hidden="true" />
              GitHub
            </a>
            <a href="#contact" className="btn btn-outline" onClick={(event) => { event.preventDefault(); scrollToId("contact"); }}>
              Get in touch <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials reveal delay-5">
            <a href="mailto:settapong.janajina@email.com" className="social-link">
              <i className="fa-regular fa-envelope" aria-hidden="true" />
              settapong.janajina@email.com
            </a>
            <span className="social-divider">/</span>
            <a
              href="https://www.linkedin.com/in/settapong-janajina-609a04417/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

function SectionHeading({ label, title, accent, subtitle, id }) {
  return (
    <>
      <p className="section-label reveal">{label}</p>
      <h2 className="section-title reveal delay-1" id={id}>
        {title} <span className="accent">{accent}</span>
      </h2>
      <div className="section-divider reveal delay-1" />
      {subtitle && <p className="section-subtitle reveal delay-2">{subtitle}</p>}
    </>
  );
}

function About() {
  const highlights = [
    ["fa-solid fa-bullseye", "Career Interest", "Building practical web applications with modern full-stack technologies."],
    ["fa-solid fa-rocket", "Current Goal", "Growing as a full-stack developer through real-world projects and professional experience."],
    ["fa-solid fa-book", "Learning Now", "React, Docker, modern web technologies, and AI-powered development workflows."],
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container about-grid">
        <div className="about-text">
          <p className="section-label reveal">About Me</p>
          <h2 className="section-title reveal delay-1" id="about-heading">
            Passionate about code
            <br />
            <span className="accent">& craft.</span>
          </h2>
          <div className="section-divider reveal delay-1" />
          <p className="reveal delay-2">
            I'm a Computer Engineering student passionate about building web applications and software solutions that
            address real-world challenges. My experience includes IoT monitoring systems, reservation platforms,
            inventory management systems, and esports-focused web applications.
          </p>
          <p className="reveal delay-2">
            I enjoy working across front-end and back-end development, designing databases, building APIs, and creating
            responsive user interfaces with PHP, MySQL, JavaScript, React, Node.js, HTML, CSS, and Bootstrap.
          </p>
          <p className="reveal delay-2">
            Beyond software development, I am interested in competitive gaming and esports, which inspired my Valorant
            esports training and strategy analysis platform.
          </p>
          <div className="about-highlights reveal delay-3">
            {highlights.map(([icon, title, text]) => (
              <div className="highlight-item lift-card" key={title}>
                <div className="highlight-icon"><i className={icon} aria-hidden="true" /></div>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-right">
          <div className="about-stats reveal delay-2">
            <div className="stat-card"><div className="stat-number">3+</div><div className="stat-label">Years Coding</div></div>
            <div className="stat-card"><div className="stat-number">4</div><div className="stat-label">Projects Built</div></div>
            <div className="stat-card"><div className="stat-number">24/7</div><div className="stat-label">Learning Mode</div></div>
          </div>
          <div className="highlight-item reveal delay-3 about-callout">
            <div className="highlight-icon"><i className="fa-solid fa-lightbulb" aria-hidden="true" /></div>
            <div>
              <h4>Development Philosophy</h4>
              <p>I won't let AI take my job. I'll use AI to do my job better.</p>
            </div>
          </div>
          <div className="highlight-item reveal delay-4 about-callout open-to">
            <div className="highlight-icon"><i className="fa-solid fa-circle-check" aria-hidden="true" /></div>
            <div>
              <h4>Open To</h4>
              <p>Full-time opportunities / Freelance projects / Open-source collaboration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          label="What I Work With"
          title="Skills &"
          accent="Technologies"
          id="skills-heading"
          subtitle="A curated set of tools and technologies I use to build full-stack web applications from concept to deployment."
        />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className={`skill-category reveal delay-${index + 1}`} key={group.title}>
              <div className="skill-cat-icon"><i className={group.icon} aria-hidden="true" /></div>
              <div className="skill-cat-title">{group.title}</div>
              <div className="skill-items">
                {group.items.map((item) => (
                  <span className="skill-badge magnetic-chip" key={item}><span className="badge-dot" />{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          label="Things I've Built"
          title="Featured"
          accent="Projects"
          id="projects-heading"
          subtitle="A selection of full-stack and front-end projects built for learning, competition, and fun."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-card reveal delay-${index + 1}`} key={project.title}>
              <div className="project-img-wrap">
                <div className={`project-img-placeholder ${project.grad}`}>
                  <i className={project.icon} aria-hidden="true" />
                </div>
                <span className="project-featured-badge">{project.badge}</span>
                <div className="project-overlay">
                  {project.caseStudy && <a href="#case-study" className="overlay-btn" onClick={(event) => { event.preventDefault(); scrollToId("case-study"); }}>Case Study</a>}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="overlay-btn outline">GitHub</a>
                </div>
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                    <i className="fa-brands fa-github" aria-hidden="true" /> GitHub
                  </a>
                  {project.caseStudy && (
                    <a href="#case-study" className="proj-link" onClick={(event) => { event.preventDefault(); scrollToId("case-study"); }}>
                      <i className="fa-solid fa-clipboard" aria-hidden="true" /> Case Study
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const [activeImage, setActiveImage] = useState(null);
  const objectives = [
    "Design and implement a relational database schema that models teams, players, matches, and per-map statistics.",
    "Build a RESTful API layer with proper authentication, input validation, and error handling.",
    "Create a front end that presents live and historical match data in a readable, professional format.",
    "Implement WebSocket-based live chat functionality for real-time communication.",
    "Achieve full CRUD operations on all major entities through an admin dashboard.",
  ];
  const features = [
    "Player profiles with stats and achievements",
    "Team management, invitations, and member roles",
    "LFP and LFT career matching",
    "Leaderboard and Valorant Premier statistics",
    "Scrim management and training schedules",
    "Strategy planning per map",
    "Team analytics and performance metrics",
    "Real-time communication with Socket.IO",
    "Admin dashboard, ban system, and email support",
  ];

  return (
    <section id="case-study" className="section" aria-labelledby="case-study-heading">
      <div className="container">
        <div className="case-hero-banner reveal">
          <div className="case-meta">
            <span className="tag violet">Case Study</span>
            <span className="tag">Full-Stack</span>
            <span className="tag">2025 - 2026</span>
          </div>
          <h2 className="case-title" id="case-study-heading">Valorant Esports <span className="accent">Platform</span></h2>
          <p className="case-tagline">
            A full-stack web application for managing Valorant esports scrim, team rosters, player statistics, and live
            match results. Built from scratch as a personal capstone project.
          </p>
        </div>

        <div className="case-layout">
          <div className="case-main">
            <CaseBlock title="Problem Statement">
              <p>
                Esports teams often struggle to find balanced scrim opponents, manage training schedules, track player
                performance, and organize team strategies efficiently.
              </p>
              <p>
                This project brings scrim matchmaking, performance tracking, strategy management, and team communication
                into a single integrated experience.
              </p>
            </CaseBlock>
            <CaseBlock title="Objectives"><ul>{objectives.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
            <CaseBlock title="System Architecture">
              <p>
                The platform uses PHP and MySQL for core application logic and data management. Node.js and Socket.IO
                support real-time chat, while the Riot Games API provides player statistics.
              </p>
              <div className="arch-diagram">
                {["React UI", "CSS / Bootstrap", "JavaScript"].map((item) => <div className="arch-node highlight" key={item}>{item}</div>)}
                <div className="arch-connector">HTTP requests / AJAX / JSON</div>
                {["PHP Backend", "Auth Middleware", "Scrim Matchmaking"].map((item) => <div className="arch-node" key={item}>{item}</div>)}
                <div className="arch-connector">REST API calls / real-time events</div>
                {["Node.js", "Socket.IO", "Riot Games API"].map((item) => <div className="arch-node" key={item}>{item}</div>)}
                <div className="arch-connector">SQL queries / data storage</div>
                {["MySQL Database", "Player Statistics", "Strategy Repository"].map((item) => <div className="arch-node" key={item}>{item}</div>)}
              </div>
            </CaseBlock>
            <CaseBlock title="Key Features"><ul>{features.map((item) => <li key={item}>{item}</li>)}</ul></CaseBlock>
            <CaseBlock title="Challenges Encountered">
              <ul>
                <li className="challenge-item"><div className="challenge-title">Real-time communication architecture</div><div className="challenge-text">A dedicated Node.js server with Socket.IO enabled instant message delivery and a smoother user experience.</div></li>
                <li className="challenge-item"><div className="challenge-title">Interactive strategy planning interface</div><div className="challenge-text">The planning feature required HTML Canvas interaction patterns for placing, moving, and organizing tactical elements.</div></li>
                <li className="challenge-item"><div className="challenge-title">Database evolution</div><div className="challenge-text">Several new requirements emerged during development, which reinforced the value of scalable schema planning.</div></li>
              </ul>
            </CaseBlock>
          </div>
          <aside className="case-sidebar" aria-label="Project details">
            <SidebarCard title="Tech Stack" rows={[["Frontend", "React"], ["Styling", "CSS3"], ["Backend", "PHP"], ["Real-time", "Socket.io"], ["Database", "MySQL"], ["External APIs", "Riot Games API"]]} />
            <SidebarCard title="Project Stats" rows={[["Duration", "~12 months"], ["API Endpoints", "50+"], ["DB Tables", "23"], ["Lines of Code", "~250,000"]]} />
            <div className="sidebar-card reveal delay-2">
              <h4>Links</h4>
              <a href="https://github.com/zhepS-z/valorant-esports-training-platform" target="_blank" rel="noopener noreferrer" className="proj-link wide-link">GitHub Repository <i className="fa-solid fa-arrow-right" /></a>
            </div>
          </aside>
        </div>

        <div className="case-screenshots reveal">
          <p className="section-label">Screenshots</p>
          <h3 className="section-title case-screenshot-title">UI <span className="accent">Highlights</span></h3>
          <div className="section-divider" />
          <div className="screenshots-grid">
            {screenshots.map(([src, caption], index) => (
              <button className="screenshot-card screenshot-button" type="button" key={src} onClick={() => setActiveImage(index)}>
                <img src={src} alt={`Valorant esports platform ${caption}`} className="screenshot-placeholder" />
                <div className="screenshot-cap">{caption}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeImage !== null && (
        <div className="lightbox-overlay active" role="dialog" aria-label="Screenshot preview" onClick={() => setActiveImage(null)}>
          <button className="lightbox-nav lightbox-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + screenshots.length) % screenshots.length); }}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img className="lightbox-image" src={screenshots[activeImage][0]} alt={screenshots[activeImage][1]} />
            <p className="lightbox-caption">{screenshots[activeImage][1]}</p>
          </div>
          <button className="lightbox-nav lightbox-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % screenshots.length); }}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      )}
    </section>
  );
}

function CaseBlock({ title, children }) {
  return <div className="case-block reveal"><h3 className="case-block-title">{title}</h3>{children}</div>;
}

function SidebarCard({ title, rows }) {
  return (
    <div className="sidebar-card reveal">
      <h4>{title}</h4>
      <div className="sidebar-stack">
        {rows.map(([label, value]) => <div className="stack-row" key={label}><span className="label">{label}</span><span className="value">{value}</span></div>)}
      </div>
    </div>
  );
}

function Education() {
  const items = [
    ["2019 - 2022", "Vocational Certificate in Computer Technical", "Pattani Technical College / Pattani, Thailand", "Combining knowledge of computer systems, electronics, and modern software development. GPA: 3.74 / 4.00", ["Computer Hardware", "Electronics", "Computer Networks", "System Troubleshooting", "Basic Programming", "Technical Support", "Embedded Systems"]],
    ["2022 - 2026", "Bachelor of Engineering (Computer Engineering)", "Rajamangala University of Technology Srivijaya, Songkhla Campus / Songkhla, Thailand", "Specialising in software engineering and web technologies. GPA: 3.06 / 4.00", ["Data Structures", "Algorithms", "Database Systems", "Web Development", "Software Engineering", "Computer Networks", "Operating Systems", "Internet of Things"]],
    ["2021 - Present", "Self-Directed Learning", "Online Platforms & Open Source", "Learning beyond the classroom through online resources, personal projects, and continuous practice.", ["W3Schools", "freeCodeCamp", "Frontend Masters"]],
  ];

  return (
    <section id="education" className="section" aria-labelledby="education-heading">
      <div className="container">
        <SectionHeading label="Background" title="Education &" accent="Learning" id="education-heading" subtitle="Formal education combined with self-directed learning and project-building." />
        <div className="edu-timeline">
          {items.map(([date, degree, school, detail, tags], index) => (
            <div className={`edu-item reveal delay-${index + 1}`} key={degree}>
              <div className="edu-card">
                <p className="edu-date">{date}</p>
                <h3 className="edu-degree">{degree}</h3>
                <p className="edu-school">{school}</p>
                <p className="edu-detail">{detail}</p>
                <div className="coursework-tags">{tags.map((tag) => <span className={`tag ${index === 1 ? "violet" : ""}`} key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeading label="Get In Touch" title="Let's" accent="Connect" id="contact-heading" subtitle="Whether you have an opportunity, a project idea, or just want to say hello, my inbox is always open." />
        <div className="contact-layout refined-contact">
          <div className="contact-info">
            <ContactItem icon="fa-regular fa-envelope" label="Email" value="settapong.janajina@email.com" href="mailto:settapong.janajina@email.com" />
            <ContactItem icon="fa-brands fa-github" label="GitHub" value="github.com/zhepS-z" href="https://github.com/zhepS-z" />
            <ContactItem icon="fa-brands fa-linkedin" label="LinkedIn" value="linkedin.com/in/settapong-janajina" href="https://www.linkedin.com/in/settapong-janajina-609a04417/" />
          </div>
          <div className="contact-orbit reveal delay-3" aria-hidden="true">
            <div className="orbit-ring" />
            <div className="orbit-card"><i className="fa-solid fa-code" /><span>React</span></div>
            <div className="orbit-card"><i className="fa-solid fa-database" /><span>MySQL</span></div>
            <div className="orbit-card"><i className="fa-solid fa-server" /><span>Node</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-item reveal">
      <div className="contact-icon" aria-hidden="true"><i className={icon} /></div>
      <div>
        <div className="contact-item-label">{label}</div>
        <div className="contact-item-value">{value}</div>
      </div>
    </a>
  );
}

function ScrollTop({ visible }) {
  return (
    <button className={`scroll-top ${visible ? "visible" : ""}`} type="button" aria-label="Scroll to top" onClick={() => scrollToId("hero")}>
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  );
}

function App() {
  useScrollReveal();
  const { active, scrolled, progress } = useScrollState();

  return (
    <>
      <Navbar active={active} scrolled={scrolled} progress={progress} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudy />
        <Education />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>Designed & built by <span className="accent">Settapong Janajina</span> - 2026</p>
        <p className="footer-sub">Computer Engineering Student / Full-Stack Web Developer</p>
      </footer>
      <ScrollTop visible={progress > 0.16} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
