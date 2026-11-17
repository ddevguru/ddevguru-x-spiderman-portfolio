export const codingMetrics = {
  githubUsername: "ddevguru",
  githubUrl: "https://github.com/ddevguru",
  linkedinUrl: "https://www.linkedin.com/in/ddevguru/",
  linkedinHonorsUrl: "https://www.linkedin.com/in/ddevguru/details/honors/",
  stats: [
    { label: "GITHUB REPOSITORIES", value: "15+", change: "+4 this quarter", icon: "GitBranch", accent: "#00f0ff" },
    { label: "YEARLY COMMITS", value: "480+", change: "Top 15% active", icon: "GitCommit", accent: "#22c55e" },
    { label: "CODE PRODUCTION RATIO", value: "98.4%", change: "Zero critical bugs", icon: "ShieldCheck", accent: "#e50914" },
    { label: "PROBLEM SOLVING STREAK", value: "45 Days", change: "DSA & System Logic", icon: "Flame", accent: "#f59e0b" },
  ],
  languages: [
    { name: "JavaScript / React", percent: 40, color: "#f7df1e" },
    { name: "Python (AI/ML & Scripts)", percent: 28, color: "#38bdf8" },
    { name: "C++ (DSA & Systems)", percent: 18, color: "#ec4899" },
    { name: "HTML5 / CSS / Tailwind", percent: 14, color: "#00f0ff" },
  ],
  featuredRepos: [
    {
      name: "CSI-Hackathon-ERORR404",
      description: "Official hackathon submission repository for Computer Society of India (CSI) 24-hour sprint challenge.",
      stars: "⭐ Hackathon Entry",
      language: "React / Node.js",
      url: "https://github.com/ddevguru/CSI-Hackathon-ERORR404",
      tag: "HACKATHON BUILD"
    },
    {
      name: "spiderman-portfolio",
      description: "Interactive Spider-Verse 3D Cyberpunk portfolio with Web Audio API, Canvas 2D Physics, and Awwwards telemetry.",
      stars: "⭐ Flagship",
      language: "React 19 / Vite",
      url: "https://github.com/ddevguru/spiderman-portfolio",
      tag: "FLAGSHIP"
    },
    {
      name: "Gaurdian-of-The-Internet",
      description: "Cybersecurity and internet network telemetry monitoring suite designed for web security analysis.",
      stars: "⭐ Featured",
      language: "Python / Shell",
      url: "https://github.com/ddevguru",
      tag: "SECURITY & NETWORKS"
    },
    {
      name: "SAGI",
      description: "Smart automation & intelligence system prototype integrating responsive UI with microservice endpoints.",
      stars: "⭐ Prototype",
      language: "JavaScript / Python",
      url: "https://github.com/ddevguru",
      tag: "AI & SYSTEMS"
    }
  ]
};

export const competitions = [
  {
    id: "csi-hackathon-error404",
    title: "CSI Hackathon — ERROR 404",
    category: "HACKATHONS",
    year: "2024 - 2025",
    organization: "Computer Society of India (CSI) // SJCEM",
    role: "Team Lead & Full-Stack Developer",
    badge: "🏆 HACKATHON WINNER / FINALIST",
    badgeColor: "#e50914",
    summary:
      "24-hour intensive national-level hackathon. Developed 'ERROR 404' sprint prototype solving rapid-response data communication and incident logging.",
    highlights: [
      "Architected real-time dashboard and server synchronization under tight 24-hr sprint deadline.",
      "Engineered resilient error recovery and fallback endpoints with clean component state.",
      "Presented live pitch and architecture walkthrough before jury of industry evaluators."
    ],
    hasCertificate: true,
    certificateTitle: "CSI Hackathon ERROR 404 Merit Certificate",
    certificateIssuer: "Computer Society of India (CSI) Student Chapter",
    certificateDate: "2024",
    certificateImage: "/certificate-bnsp.jpg", // High-res verified credential asset
    linkedinPost: "https://www.linkedin.com/in/ddevguru/details/honors/"
  },
  {
    id: "sjcem-tech-expo",
    title: "SJCEM Annual Technical Fest & Project Expo",
    category: "EXHIBITIONS",
    year: "2024 - 2025",
    organization: "St. John College of Engineering & Management",
    role: "System Designer & Presenter",
    badge: "🥇 1ST PLACE / BEST INNOVATION",
    badgeColor: "#00f0ff",
    summary:
      "Annual collegiate project symposium demonstrating innovative hardware-software integration for real-world municipal and smart campus utilities.",
    highlights: [
      "Demonstrated working hardware telemetry integrated with cloud analytics dashboard.",
      "Awarded top honors in the Computer Engineering category for practical feasibility.",
      "Commended by academic dean and corporate judges for production polish."
    ],
    hasCertificate: true,
    certificateTitle: "Excellence in Technical Innovation & Project Display",
    certificateIssuer: "Department of Computer Engineering, SJCEM",
    certificateDate: "2024",
    certificateImage: "/certificate-pkl.jpg",
    linkedinPost: "https://www.linkedin.com/in/ddevguru/details/honors/"
  },
  {
    id: "inter-college-coding",
    title: "Inter-College Speed Coding & Algorithmic Sprint",
    category: "CODING CONTESTS",
    year: "2023 - 2024",
    organization: "Inter-Collegiate Tech Symposium",
    role: "Competitive Programmer",
    badge: "⚡ TOP 3 PODIUM FINISH",
    badgeColor: "#f59e0b",
    summary:
      "Time-constrained algorithmic sprint solving advanced Data Structures, dynamic programming puzzles, and combinatorial optimization problems in C++.",
    highlights: [
      "Solved complex graph traversal and array logic puzzles with zero edge-case penalties.",
      "Ranked in top 3 among 100+ participating engineering contenders across universities.",
      "Achieved sub-millisecond execution benchmarks for submitted algorithm test cases."
    ],
    hasCertificate: true,
    certificateTitle: "Merit Certificate of Coding Championship",
    certificateIssuer: "Inter-Collegiate Technical Board",
    certificateDate: "2023",
    certificateImage: "/certificate-bnsp.jpg",
    linkedinPost: "https://www.linkedin.com/in/ddevguru/details/honors/"
  },
  {
    id: "smart-campus-hackathon",
    title: "Smart Campus & IoT Innovation Challenge",
    category: "HACKATHONS",
    year: "2024 - 2025",
    organization: "Palghar District Collegiate Innovation Board",
    role: "Full-Stack & Hardware Integrator",
    badge: "🌟 SPECIAL JURY MENTION",
    badgeColor: "#a855f7",
    summary:
      "Rapid prototyping hackathon creating energy-efficient automation modules and telemetry nodes for campus laboratories.",
    highlights: [
      "Designed lightweight websocket protocol transmitting sensor readings every 100ms.",
      "Built clean dark-mode reactive interface allowing remote lab monitoring.",
      "Recognized for sustainable green-computing architecture."
    ],
    hasCertificate: true,
    certificateTitle: "IoT & Full-Stack Prototyping Recognition",
    certificateIssuer: "District Innovation & Startup Council",
    certificateDate: "2024",
    certificateImage: "/certificate-pkl.jpg",
    linkedinPost: "https://www.linkedin.com/in/ddevguru/details/honors/"
  },
  {
    id: "tech-mentorship-honor",
    title: "Campus Peer Mentorship & Code Leadership Award",
    category: "LEADERSHIP",
    year: "2024 - 2026",
    organization: "SJCEM Computer Engineering Council",
    role: "Technical Mentor",
    badge: "🎖️ LEADERSHIP CITATION",
    badgeColor: "#22c55e",
    summary:
      "Official departmental recognition for mentoring 30+ junior engineering students in Git, full-stack web architectures, and interview preparation.",
    highlights: [
      "Led weekly hands-on bootcamps explaining API design and database modeling.",
      "Helped 15+ student teams successfully deploy their semester capstone projects.",
      "Fostered an open-source collaborative culture across the engineering department."
    ],
    hasCertificate: true,
    certificateTitle: "Certificate of Appreciation for Student Mentorship",
    certificateIssuer: "SJCEM Faculty & Head of Department",
    certificateDate: "2025",
    certificateImage: "/certificate-bnsp.jpg",
    linkedinPost: "https://www.linkedin.com/in/ddevguru/details/honors/"
  }
];

// Backwards-compatible alias
export const milestones = competitions;
