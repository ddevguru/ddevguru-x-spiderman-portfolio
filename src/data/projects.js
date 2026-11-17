export const projectCategories = [
  { id: "all", label: "⚡ ALL PROJECTS" },
  { id: "fullstack", label: "🌐 FULL-STACK & WEB" },
  { id: "aiml", label: "🤖 AI, CV & AUTOMATION" },
  { id: "hackathon", label: "🏆 HACKATHON BUILDS" },
  { id: "security", label: "🛡️ CYBER SECURITY & SQL" },
  { id: "games", label: "🕷️ SPIDEY ARCADE" }
];

export const projects = [
  {
    id: "spidey-arcade",
    title: "Spider-Verse Web Slinger Arcade",
    subtitle: "Canvas 2D Physics, Web Audio Synthesizer & Combo Overdrive",
    category: "games",
    earthBadge: "🕷️ Earth-1610 // Spider-Verse Arcade",
    accentColor: "#e50914",
    modelType: "cube",
    interactiveComponent: "spidey-arcade",
    image: "/assets/banners/spiderman-bold-typography-poster-banner.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-action-cinematic-live-wallpaper.mp4",
    description:
      "A 60fps Spider-Verse 2D arcade web game engineered with procedural Web Audio API synthesis without external dependencies, multi-character controls (Miles Morales venom shock, Peter Parker rapid-fire, Gwen Stacy spread shot), and a reactive combo system.",
    keyFeatures: [
      "Procedural Web Audio API Sound Synthesizer (Thwip, Boom, Venom Blast)",
      "Multi-Character Play with Distinct Attack Mechanics (Miles, Peter, Gwen)",
      "Tiered Combo Multipliers & LocalStorage High Score System",
      "Full Keyboard, Mouse Aim, and Mobile Touch Support"
    ],
    techStack: ["React 19", "HTML5 Canvas", "Web Audio API", "Physics 2D", "Tailwind CSS"],
    demoUrl: "https://github.com/ddevguru",
    githubUrl: "https://github.com/ddevguru",
    is3D: true,
    isFeatured: true,
    stats: { stars: "Arcade Game", status: "Live Playable" }
  },
  {
    id: "sagi-vision",
    title: "SAGI — Smart AI Object Scanner",
    subtitle: "Computer Vision Object Detection & Real-Time Dimensional Measurement",
    category: "aiml",
    earthBadge: "🤖 Earth-928 // Neural Telemetry",
    accentColor: "#00f0ff",
    modelType: "orb",
    image: "/assets/ui/spiderman-ui-desktop-widget-dashboard.jpg",
    videoPreview: "/assets/live-wallpapers/spidey-tingle-multiverse-live-wallpaper.mp4",
    description:
      "An intelligent computer vision and object scanning platform engineered to scan physical objects, detect precise contour boundaries, and calculate real-time dimensional measurements with high algorithmic accuracy.",
    keyFeatures: [
      "Real-Time Object Scanning & Contour Boundary Detection",
      "Automated Dimensional Metric Measurement Engine",
      "Advanced Edge Detection & Noise Reduction Filters",
      "Cross-Platform Visual Processing Pipeline"
    ],
    techStack: ["Java", "Computer Vision", "Object Detection", "Image Processing", "Automation"],
    demoUrl: "https://github.com/ddevguru/SAGI",
    githubUrl: "https://github.com/ddevguru/SAGI",
    is3D: true,
    isFeatured: true,
    stats: { stars: "AI / CV", status: "Public Repo" }
  },
  {
    id: "csi-hackathon",
    title: "CSI Hackathon — ERROR404",
    subtitle: "24-Hour Competitive Sprint Platform // CSI Collegiate Challenge",
    category: "hackathon",
    earthBadge: "⚡ Earth-616 // High-Pressure Sprint",
    accentColor: "#ac4bff",
    modelType: "wave",
    image: "/assets/banners/spiderman-mcu-web-grid-dark-banner.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-8k-pc-live-wallpaper.mp4",
    description:
      "A full-stack collaborative platform built in an intense 24-hour national hackathon organized by Computer Society of India (CSI). Designed under high-pressure competitive constraints to deliver high-throughput data processing and seamless UX.",
    keyFeatures: [
      "24-Hour Hackathon Delivery with Zero Architectural Compromises",
      "Real-Time Data Processing & Dynamic API Pipelines",
      "Optimized Frontend Interface with Responsive Mobile Compatibility",
      "Robust Error Handling & Defensive Programming"
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "Node.js", "REST APIs", "CSI Hackathon"],
    demoUrl: "https://github.com/ddevguru/CSI-Hackathon-ERORR404",
    githubUrl: "https://github.com/ddevguru/CSI-Hackathon-ERORR404",
    is3D: false,
    isFeatured: true,
    stats: { stars: "24h Sprint", status: "Hackathon Build" }
  },
  {
    id: "guardian-internet",
    title: "Guardian of The Internet",
    subtitle: "Cybersecurity & Safe Browsing Telemetry Suite",
    category: "security",
    earthBadge: "🛡️ Earth-1610 // Cyber Defense",
    accentColor: "#e50914",
    modelType: "torus",
    image: "/assets/banners/spiderman-crouched-landing-dark-banner.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-tasm2-live-wallpaper.mp4",
    description:
      "A cybersecurity telemetry and safe browsing engine engineered to analyze URL traffic, detect phishing signatures, and evaluate web security headers to safeguard end-users against malicious network intrusions.",
    keyFeatures: [
      "Heuristic Phishing & Malicious Domain Detection",
      "Active Web Traffic & Security Header Verification",
      "Lightweight Client-Side Inspection Pipeline",
      "Cyber Threat Warning & Real-Time Alert Dispatch"
    ],
    techStack: ["JavaScript", "Cybersecurity", "Network Telemetry", "Browser APIs", "Security Audit"],
    demoUrl: "https://github.com/ddevguru/Gaurdian-of-The-Internet",
    githubUrl: "https://github.com/ddevguru/Gaurdian-of-The-Internet",
    is3D: false,
    isFeatured: true,
    stats: { stars: "Cybersecurity", status: "Public Repo" }
  },
  {
    id: "micronest-startup",
    title: "Micronest — 24hr Startup Winner",
    subtitle: "1st Place Winner // Zero to One 24-Hour Entrepreneurship Platform",
    category: "fullstack",
    earthBadge: "🏆 1st Place // E-Cell SJCEM",
    accentColor: "#10b981",
    modelType: "cube",
    image: "/assets/banners/spiderman-neon-smoke-splash-banner.jpg",
    description:
      "An end-to-end fintech & micro-investment platform conceptualized, engineered, and pitched in 24 hours at the 'Zero to One' Entrepreneurship Competition, winning 1st place for business viability and technical execution.",
    keyFeatures: [
      "1st Place Collegiate Entrepreneurship Award Winner",
      "Micro-Investment Calculation Engine with Tiered Financial Models",
      "Interactive High-Conversion Pitch-Ready Dashboard",
      "Rapid 24-Hour Full-Stack Architecture Execution"
    ],
    techStack: ["Full Stack", "JavaScript", "Fintech Logic", "Node.js", "Business Architecture"],
    demoUrl: "https://github.com/ddevguru",
    githubUrl: "https://github.com/ddevguru",
    is3D: false,
    isFeatured: true,
    stats: { stars: "1st Place 🏆", status: "Award Winning" }
  },
  {
    id: "dummy-icecream",
    title: "ChillCraft — E-Commerce Web Experience",
    subtitle: "Interactive Dessert Store & Responsive Frontend Architecture",
    category: "fullstack",
    earthBadge: "🍦 Earth-65 // Responsive UX",
    accentColor: "#f59e0b",
    modelType: "orb",
    image: "/assets/banners/spiderman-manga-speedlines-banner.jpg",
    description:
      "A responsive e-commerce web platform showcasing modern catalog exploration, interactive product customization, dynamic shopping cart states, and mobile-first fluid UI layouts.",
    keyFeatures: [
      "Interactive Product Selection & Real-Time Cart Calculation",
      "Fluid Responsive Layout Engineered for All Viewport Scales",
      "Modern CSS Grid & Flexbox Micro-Interactions",
      "Accessible Semantic HTML5 Structure"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "E-Commerce UI"],
    demoUrl: "https://github.com/ddevguru/Dummy-Icecream-website",
    githubUrl: "https://github.com/ddevguru/Dummy-Icecream-website",
    is3D: false,
    isFeatured: false,
    stats: { stars: "E-Commerce", status: "Public Repo" }
  },
  {
    id: "ddevguru-portfolio",
    title: "ddevguru Developer Portfolio & Hub",
    subtitle: "Personal Developer Brand & Open-Source Showcase",
    category: "fullstack",
    earthBadge: "🕸️ Earth-616 // Core HQ",
    accentColor: "#38bdf8",
    modelType: "laptop",
    image: "/assets/ui/spiderman-daily-bugle-newspaper-collage.jpg",
    description:
      "The official personal developer web showcase engineered to index open-source contributions, technical certifications, collegiate contest victories, and interactive software demos.",
    keyFeatures: [
      "Automated GitHub Pages Deployment Workflow",
      "Clean Component Hierarchy & Fast Load Speeds",
      "Curated Technical Credentials & Project Index",
      "Modern Responsive Aesthetics with Cyberpunk Highlights"
    ],
    techStack: ["React", "Tailwind CSS", "GitHub Pages", "CI/CD", "Responsive UX"],
    demoUrl: "https://github.com/ddevguru/ddevguru-portfolio",
    githubUrl: "https://github.com/ddevguru/ddevguru-portfolio",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Developer Hub", status: "Live Production" }
  },
  {
    id: "megahack-team7",
    title: "MegaHack 3.0 — Team 7 Platform",
    subtitle: "National 24-Hour Hackathon Collaborative Architecture",
    category: "hackathon",
    earthBadge: "🚀 National Hackathon // Palghar",
    accentColor: "#ec4899",
    modelType: "wave",
    image: "/assets/banners/spiderman-dark-minimalist-shadow-banner.jpg",
    description:
      "A full-scale collaborative project built over a continuous 24-hour sprint at MegaHack 3.0 National Level Hackathon. Featured resilient distributed team architecture, REST services, and high-frequency data inputs.",
    keyFeatures: [
      "Continuous 24-Hour National-Level Engineering Marathon",
      "Team 7 Multi-Developer Git Branching & Merge Pipelines",
      "Modular Service APIs with Robust Request Handling",
      "Real-Time Problem Statement Solution Delivery"
    ],
    techStack: ["Full Stack", "JavaScript", "Node.js", "REST APIs", "Team 7 Hackathon Sprint"],
    demoUrl: "https://github.com/ddevguru",
    githubUrl: "https://github.com/ddevguru",
    is3D: false,
    isFeatured: false,
    stats: { stars: "National", status: "Hackathon Build" }
  },
  {
    id: "mumbai-hacks",
    title: "MumbaiHacks — WeWork Labs Civic Tech",
    subtitle: "Mumbai's Largest Hackathon // Scalable Community Infrastructure",
    category: "hackathon",
    earthBadge: "🌆 Mumbai Hacks // WeWork",
    accentColor: "#3b82f6",
    modelType: "torus",
    image: "/assets/banners/spiderman-marvel-studios-poster-banner.jpg",
    description:
      "Collaborative platform engineered at WeWork Labs during MumbaiHacks, focusing on high-throughput data processing, civic community connectivity, and intuitive real-time dashboards.",
    keyFeatures: [
      "Developed at Mumbai's Largest Hackathon (WeWork Labs)",
      "Civic Tech Real-Time Data Pipeline & Visualization",
      "Low-Latency API Synchronization Architecture",
      "Collaborative Integration with Mumbai Tech Ecosystem"
    ],
    techStack: ["JavaScript", "Node.js", "Express", "REST APIs", "Civic Data"],
    demoUrl: "https://github.com/ddevguru",
    githubUrl: "https://github.com/ddevguru",
    is3D: false,
    isFeatured: false,
    stats: { stars: "WeWork Labs", status: "Hackathon Build" }
  },
  {
    id: "sql-telemetry",
    title: "SQL Advanced Telemetry & Schema Engine",
    subtitle: "HackerRank Gold Standard Query Optimization Suite",
    category: "security",
    earthBadge: "⚡ HackerRank // Advanced SQL",
    accentColor: "#3ecf8e",
    modelType: "towers",
    image: "/assets/ui/spiderman-comic-scrapbook-stickers-collage.jpg",
    description:
      "Advanced relational database engineering repository demonstrating complex multi-table joins, recursive common table expressions (CTEs), window functions, indexing strategies, and high-throughput query execution.",
    keyFeatures: [
      "Certified HackerRank Advanced SQL Standard",
      "High-Performance Query Execution & Index Optimizations",
      "Complex Aggregations, Window Partitions & Recursive CTEs",
      "Relational Integrity & Schema Normalization Patterns"
    ],
    techStack: ["SQL", "MySQL", "PostgreSQL", "Query Optimization", "Relational Schema"],
    demoUrl: "https://github.com/ddevguru",
    githubUrl: "https://github.com/ddevguru",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Advanced SQL", status: "Certified Repo" }
  }
];
