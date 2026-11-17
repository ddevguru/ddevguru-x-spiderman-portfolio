import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { codingMetrics, competitions } from "../../data/milestones";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import {
  GitBranch,
  GitCommit,
  ShieldCheck,
  Flame,
  Sparkles,
  ExternalLink,
  Trophy,
  CheckCircle2,
  Code2,
  Terminal,
  Layers,
  Star,
  BookOpen,
  ArrowUpRight,
  Cpu,
  Award,
  Eye,
  X,
  FileText,
} from "lucide-react";

function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ActivityMilestones() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "github" | "competitions"
  const [selectedCompetitionFilter, setSelectedCompetitionFilter] = useState("ALL");
  const [selectedCertModal, setSelectedCertModal] = useState(null);

  // Close modal with Escape key & lock scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCertModal(null);
    };
    if (selectedCertModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCertModal]);

  // Simulated 52-week heatmap data with dynamic intensities
  const heatmapWeeks = Array.from({ length: 44 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const val = (w * 7 + d * 13 + (w % 3) * 5) % 17;
      return val > 12 ? 3 : val > 7 ? 2 : val > 3 ? 1 : 0;
    })
  );

  const getHeatmapColor = (level) => {
    switch (level) {
      case 3:
        return "#00f0ff"; // Peak intensity cyan
      case 2:
        return "#22c55e"; // Active green
      case 1:
        return "rgba(34, 197, 94, 0.4)"; // Moderate
      default:
        return "rgba(255, 255, 255, 0.05)"; // Dormant
    }
  };

  const competitionCategories = ["ALL", "HACKATHONS", "EXHIBITIONS", "CODING CONTESTS", "LEADERSHIP"];

  const filteredCompetitions =
    selectedCompetitionFilter === "ALL"
      ? competitions
      : competitions.filter((c) => c.category === selectedCompetitionFilter);

  return (
    <section id="radar" style={{ position: "relative", overflow: "hidden", padding: "6rem 0 4rem" }}>
      {/* Background Web Matrix */}
      <div className="web-pattern-bg" style={{ opacity: 0.035 }} />

      <div className="section" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="DEV RADAR // CODE TELEMETRY & COMPETITIONS"
          title="ACTIVITY &"
          titleAccent="COMPETITIONS."
        />

        {/* HUD Subtitle & Live Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "-1rem",
            marginBottom: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              maxWidth: "680px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Live GitHub telemetry, hackathon entries (CSI ERROR 404, SJCEM Tech Expo), competitive coding sprints, honors, and verified certificates.
          </p>

          {/* Glowing Systems Status Chip */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.45rem 1rem",
              borderRadius: "100px",
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "#22c55e",
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.15)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                animation: "pulse 2s infinite",
              }}
            />
            <span>RADAR ACTIVE // @ddevguru</span>
          </div>
        </div>

        {/* Top 4 Quick Telemetry Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.2rem",
            marginBottom: "2.5rem",
          }}
        >
          {codingMetrics.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: stat.accent }}
              className="neon-card"
              style={{
                background: "rgba(10, 14, 26, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60px",
                  height: "60px",
                  background: `radial-gradient(circle at top right, ${stat.accent}20, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)", letterSpacing: "0.08em" }}>
                  {stat.label}
                </span>
                {idx === 0 ? (
                  <GitBranch size={16} color={stat.accent} />
                ) : idx === 1 ? (
                  <GitCommit size={16} color={stat.accent} />
                ) : idx === 2 ? (
                  <ShieldCheck size={16} color={stat.accent} />
                ) : (
                  <Flame size={16} color={stat.accent} />
                )}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: stat.accent,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span>●</span>
                <span>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Switcher HUD Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            background: "rgba(5, 7, 14, 0.8)",
            padding: "0.4rem",
            borderRadius: "100px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem auto",
            backdropFilter: "blur(10px)",
          }}
        >
          <button
            onClick={() => setActiveTab("all")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "100px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem",
              transition: "all 0.25s ease",
              background: activeTab === "all" ? "rgba(229, 9, 20, 0.9)" : "transparent",
              color: activeTab === "all" ? "#ffffff" : "var(--color-muted)",
              boxShadow: activeTab === "all" ? "0 0 20px rgba(229, 9, 20, 0.4)" : "none",
            }}
          >
            <Layers size={14} />
            <span>ALL FEEDS</span>
          </button>

          <button
            onClick={() => setActiveTab("github")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "100px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem",
              transition: "all 0.25s ease",
              background: activeTab === "github" ? "rgba(0, 240, 255, 0.9)" : "transparent",
              color: activeTab === "github" ? "#05070e" : "var(--color-muted)",
              boxShadow: activeTab === "github" ? "0 0 20px rgba(0, 240, 255, 0.4)" : "none",
            }}
          >
            <GithubIcon size={14} />
            <span>GITHUB RADAR</span>
          </button>

          <button
            onClick={() => setActiveTab("competitions")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "100px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem",
              transition: "all 0.25s ease",
              background: activeTab === "competitions" ? "rgba(172, 75, 255, 0.9)" : "transparent",
              color: activeTab === "competitions" ? "#ffffff" : "var(--color-muted)",
              boxShadow: activeTab === "competitions" ? "0 0 20px rgba(172, 75, 255, 0.4)" : "none",
            }}
          >
            <Trophy size={14} />
            <span>COMPETITIONS</span>
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {/* ================= SECTION 1: GITHUB ACTIVITY TELEMETRY ================= */}
          {(activeTab === "all" || activeTab === "github") && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Category Sub-header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(0, 240, 255, 0.1)",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f0ff",
                    }}
                  >
                    <GithubIcon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                      GITHUB CODE TELEMETRY // @ddevguru
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                      Open-Source Repositories & Real-Time Contribution Heatmap
                    </span>
                  </div>
                </div>

                {/* External GitHub Link Button */}
                <a
                  href={codingMetrics.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.55rem 1.1rem",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.color = "#05070e";
                    e.currentTarget.style.borderColor = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                  }}
                >
                  <GithubIcon size={15} />
                  <span>VISIT GITHUB PROFILE</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Heatmap & Language Breakdown Bento Box */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {/* 52-Week Contribution Matrix */}
                <div
                  className="neon-card"
                  style={{
                    background: "rgba(10, 14, 26, 0.85)",
                    borderRadius: "18px",
                    border: "1px solid rgba(0, 240, 255, 0.25)",
                    padding: "1.6rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1.2rem",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Terminal size={15} color="#00f0ff" />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                        CONTRIBUTION HEATMAP // 52-WEEK MATRIX
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#22c55e" }}>
                      ● Active Coding Frequency
                    </span>
                  </div>

                  {/* Heatmap Grid */}
                  <div style={{ overflowX: "auto", paddingBottom: "0.5rem" }}>
                    <div
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridTemplateRows: "repeat(7, 11px)",
                        gap: "4px",
                        width: "max-content",
                      }}
                    >
                      {heatmapWeeks.map((week, wIdx) =>
                        week.map((level, dIdx) => (
                          <div
                            key={`${wIdx}-${dIdx}`}
                            title={`Activity Level ${level}`}
                            style={{
                              width: "11px",
                              height: "11px",
                              borderRadius: "2px",
                              background: getHeatmapColor(level),
                              transition: "transform 0.15s ease",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.4)";
                              e.currentTarget.style.zIndex = "10";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.zIndex = "1";
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Legend */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-muted)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "0.8rem",
                    }}
                  >
                    <span>Less</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(255, 255, 255, 0.05)" }} />
                      <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "rgba(34, 197, 94, 0.4)" }} />
                      <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#22c55e" }} />
                      <span style={{ width: "9px", height: "9px", borderRadius: "2px", background: "#00f0ff" }} />
                    </div>
                    <span>More // Peak Overdrive</span>
                  </div>
                </div>

                {/* Most-Used Languages Breakdown */}
                <div
                  className="neon-card"
                  style={{
                    background: "rgba(10, 14, 26, 0.85)",
                    borderRadius: "18px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "1.6rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1.2rem",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Code2 size={15} color="#e50914" />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                        ENGINEERING LANGUAGES SHARE
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                      Full-Stack / Core
                    </span>
                  </div>

                  {/* Multi-segment Progress Bar */}
                  <div
                    style={{
                      height: "10px",
                      borderRadius: "100px",
                      display: "flex",
                      overflow: "hidden",
                      background: "rgba(255, 255, 255, 0.05)",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {codingMetrics.languages.map((lang, i) => (
                      <div
                        key={i}
                        style={{
                          width: `${lang.percent}%`,
                          background: lang.color,
                          transition: "width 0.8s ease",
                        }}
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>

                  {/* Language Legend List */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                    {codingMetrics.languages.map((lang, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: lang.color,
                            boxShadow: `0 0 8px ${lang.color}80`,
                          }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#ffffff", fontWeight: 600 }}>
                            {lang.name}
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)" }}>
                            {lang.percent}% codebase
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Profile Signature */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "0.8rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                    }}
                  >
                    <span style={{ color: "var(--color-muted)" }}>HANDLE:</span>
                    <span style={{ color: "#00f0ff", fontWeight: 700 }}>github.com/ddevguru</span>
                  </div>
                </div>
              </div>

              {/* Featured Repositories Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.2rem",
                  marginTop: "0.5rem",
                }}
              >
                {codingMetrics.featuredRepos.map((repo, idx) => (
                  <motion.a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    whileHover={{ y: -4, borderColor: "#00f0ff" }}
                    className="neon-card"
                    style={{
                      background: "rgba(10, 14, 26, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      padding: "1.3rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.9rem",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "4px",
                            background: "rgba(0, 240, 255, 0.1)",
                            color: "#00f0ff",
                            border: "1px solid rgba(0, 240, 255, 0.3)",
                            fontWeight: 700,
                          }}
                        >
                          {repo.tag}
                        </span>
                        <ArrowUpRight size={15} color="var(--color-muted)" />
                      </div>

                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          margin: "0 0 0.4rem 0",
                        }}
                      >
                        {repo.name}
                      </h4>

                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--color-muted)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {repo.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--color-muted)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        paddingTop: "0.7rem",
                      }}
                    >
                      <span style={{ color: "#38bdf8" }}>{repo.language}</span>
                      <span style={{ color: "#f59e0b" }}>{repo.stars}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= SECTION 2: COMPETITIONS & HACKATHONS ================= */}
          {(activeTab === "all" || activeTab === "competitions") && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Category Sub-header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(229, 9, 20, 0.1)",
                      border: "1px solid rgba(229, 9, 20, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#e50914",
                    }}
                  >
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                      COMPETITIONS & HACKATHONS // HONORS & CERTIFICATES
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                      CSI Hackathons, SJCEM Tech Expositions, Coding Contests & Official Certifications
                    </span>
                  </div>
                </div>

                {/* Filter Pills */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {competitionCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCompetitionFilter(cat)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        border: selectedCompetitionFilter === cat ? "1px solid var(--color-red)" : "1px solid rgba(255,255,255,0.08)",
                        background: selectedCompetitionFilter === cat ? "rgba(229, 9, 20, 0.2)" : "rgba(255,255,255,0.03)",
                        color: selectedCompetitionFilter === cat ? "#fff" : "var(--color-muted)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Competitions Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {filteredCompetitions.map((c) => (
                  <motion.div
                    key={c.id}
                    variants={fadeUp}
                    whileHover={{ y: -5, borderColor: c.badgeColor }}
                    className="neon-card"
                    style={{
                      background: "rgba(10, 14, 26, 0.8)",
                      borderRadius: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.09)",
                      padding: "1.6rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "1.2rem",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Corner Accent Glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "80px",
                        height: "80px",
                        background: `radial-gradient(circle at top right, ${c.badgeColor}25, transparent 70%)`,
                        pointerEvents: "none",
                      }}
                    />

                    <div>
                      {/* Badge & Year */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            padding: "0.25rem 0.65rem",
                            borderRadius: "6px",
                            background: `${c.badgeColor}18`,
                            color: c.badgeColor,
                            border: `1px solid ${c.badgeColor}50`,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {c.badge}
                        </span>

                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                          {c.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          margin: "0 0 0.3rem 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {c.title}
                      </h4>

                      {/* Organization & Role */}
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "#38bdf8",
                          marginBottom: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <span>🏛️ {c.organization}</span>
                      </div>

                      {/* Summary */}
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "var(--color-muted)",
                          lineHeight: 1.6,
                          marginBottom: "1rem",
                        }}
                      >
                        {c.summary}
                      </p>

                      {/* Highlights */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem" }}>
                        {c.highlights.map((h, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                            <CheckCircle2 size={13} color={c.badgeColor} style={{ marginTop: "2px", flexShrink: 0 }} />
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#e2e8f0", lineHeight: 1.4 }}>
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Certificate Callout Button if available */}
                      {c.hasCertificate && (
                        <div style={{ marginTop: "0.5rem" }}>
                          <button
                            onClick={() => setSelectedCertModal(c)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.45rem 0.9rem",
                              borderRadius: "8px",
                              background: "rgba(0, 240, 255, 0.12)",
                              border: "1px solid rgba(0, 240, 255, 0.4)",
                              color: "#00f0ff",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: "0 0 12px rgba(0, 240, 255, 0.15)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#00f0ff";
                              e.currentTarget.style.color = "#05070e";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(0, 240, 255, 0.12)";
                              e.currentTarget.style.color = "#00f0ff";
                            }}
                          >
                            <Award size={14} />
                            <span>VIEW CERTIFICATE</span>
                            <Eye size={13} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "0.9rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                        ROLE: <strong style={{ color: "#fff" }}>{c.role}</strong>
                      </span>

                      <a
                        href={c.linkedinPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "#0A66C2",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#0A66C2")}
                      >
                        <LinkedinIcon size={13} />
                        <span>HONORS // DETAILS</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* LinkedIn Honors Direct Verified Banner */}
              <div
                className="neon-card"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 102, 194, 0.18) 0%, rgba(10, 14, 26, 0.95) 70%)",
                  borderRadius: "18px",
                  border: "1px solid rgba(10, 102, 194, 0.4)",
                  padding: "1.8rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(10, 102, 194, 0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: "#0A66C2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(10, 102, 194, 0.6)",
                      flexShrink: 0,
                    }}
                  >
                    <Award size={26} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "#fff", margin: "0 0 0.2rem 0" }}>
                      VERIFY ALL OFFICIAL HONORS & AWARDS ON LINKEDIN
                    </h4>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#cbd5e1", margin: 0, lineHeight: 1.4 }}>
                      Directly inspect verified competition awards, hackathon certificates, and departmental honors of Deepak Mishra on LinkedIn (/details/honors).
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
                  <a
                    href="https://www.linkedin.com/in/ddevguru/details/honors/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.75rem 1.4rem",
                      borderRadius: "8px",
                      background: "#0A66C2",
                      color: "#ffffff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 0 20px rgba(10, 102, 194, 0.5)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#0077b5";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0A66C2";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <LinkedinIcon size={16} />
                    <span>VIEW LINKEDIN HONORS</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href="#certificates"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.2rem",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-red)";
                      e.currentTarget.style.color = "var(--color-red)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                  >
                    <FileText size={14} />
                    <span>ALL CERTIFICATES</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCertModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setSelectedCertModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "720px",
                width: "100%",
                background: "rgba(10, 14, 26, 0.95)",
                border: "1px solid rgba(0, 240, 255, 0.4)",
                borderRadius: "20px",
                padding: "2rem",
                boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(0, 240, 255, 0.2)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Modal Top Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <ShieldCheck size={20} color="#00f0ff" />
                  <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#00f0ff", letterSpacing: "0.1em" }}>
                      VERIFIED COMPETITION CREDENTIAL
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                      {selectedCertModal.certificateTitle || selectedCertModal.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCertModal(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    background: "rgba(229, 9, 20, 0.2)",
                    border: "1px solid var(--color-red)",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <X size={15} />
                  <span>CLOSE (ESC)</span>
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "420px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: "1.4rem",
                  background: "#05070e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectedCertModal.certificateImage}
                  alt={selectedCertModal.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "420px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Certificate Details */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "1rem",
                }}
              >
                <div>
                  <span>ISSUER: </span>
                  <strong style={{ color: "#fff" }}>{selectedCertModal.certificateIssuer || selectedCertModal.organization}</strong>
                  <span style={{ marginLeft: "1rem" }}>YEAR: </span>
                  <strong style={{ color: "#38bdf8" }}>{selectedCertModal.year}</strong>
                </div>

                <a
                  href={selectedCertModal.linkedinPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#0A66C2",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  <LinkedinIcon size={14} />
                  <span>VERIFY ON LINKEDIN DETAILS</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
