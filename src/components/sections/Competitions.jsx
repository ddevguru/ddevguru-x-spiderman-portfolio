import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { codingMetrics, competitions } from "../../data/competitions";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import {
  Trophy,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2,
  Eye,
  GitBranch,
  GitCommit,
  Flame,
  Terminal,
  Code2,
  Maximize2,
} from "lucide-react";

function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Competitions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Show 6 cards initially (2 rows on desktop), expand to all 15
  const INITIAL_COUNT = 6;
  const displayedCompetitions = isExpanded ? competitions : competitions.slice(0, INITIAL_COUNT);

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

  // Keyboard Escape listener & freeze body scroll without jump
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedCert]);

  return (
    <section id="competitions" style={{ position: "relative", overflow: "hidden", padding: "6rem 0 4rem" }}>
      {/* Background Web Matrix */}
      <div className="web-pattern-bg" style={{ opacity: 0.04 }} />

      <div className="section" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="DEV RADAR // GITHUB TELEMETRY & COMPETITIONS"
          title="RADAR &"
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
            Live GitHub telemetry and contribution matrix (@ddevguru) alongside verified national startup victories, collegiate hackathons, blind coding championships, and credentials. Tap any card to unveil its certificate hanging from Spider-Man's webs.
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
            <span>RADAR & HONORS ONLINE // @ddevguru</span>
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
            marginBottom: "3rem",
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

        {/* ========================================================================= */}
        {/* PART 1: GITHUB CODE RADAR & HEATMAP TELEMETRY */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
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
                  GITHUB CODE RADAR // @ddevguru
                </h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                  52-Week Contribution Matrix & Real-Time Engineering Telemetry
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
        </div>

        {/* ========================================================================= */}
        {/* PART 2: COMPETITIONS & HACKATHONS // VERIFIED HONORS */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
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
                  COMPETITIONS & HACKATHONS // VERIFIED HONORS
                </h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)" }}>
                  Zero-to-One 1st Prize, Guinness World Record, Blind Code, Web Creator & Collegiate Hackathons
                </span>
              </div>
            </div>

            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#00f0ff", background: "rgba(0, 240, 255, 0.1)", padding: "0.3rem 0.8rem", borderRadius: "100px", border: "1px solid rgba(0, 240, 255, 0.3)" }}>
              {competitions.length} ARENA ACHIEVEMENTS
            </span>
          </div>

          {/* Unified Grid without category filter buttons */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {displayedCompetitions.map((c, i) => (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: c.badgeColor }}
                className="neon-card"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCert(c);
                }}
                style={{
                  background: "rgba(10, 14, 26, 0.8)",
                  borderRadius: "18px",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
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
                    width: "90px",
                    height: "90px",
                    background: `radial-gradient(circle at top right, ${c.badgeColor}25, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div>
                  {/* Badge & Year */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.7rem", flexWrap: "wrap", gap: "0.5rem" }}>
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

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--color-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Calendar size={12} />
                      <span>{c.year}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      margin: "0 0 0.3rem 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {c.title}
                  </h4>

                  {/* Organization & Location */}
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
                    <Building2 size={13} color="#38bdf8" />
                    <span>{c.organization}</span>
                  </div>

                  {/* Real Certificate Image Thumbnail Preview on the Card! */}
                  {c.certificateImage && (
                    <div
                      style={{
                        width: "100%",
                        height: "140px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        marginBottom: "0.9rem",
                        background: "rgba(0, 0, 0, 0.6)",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={c.certificateImage}
                        alt={c.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.9) contrast(1.05)",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(10,14,26,0.85) 0%, transparent 60%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          background: "rgba(0, 240, 255, 0.2)",
                          border: "1px solid rgba(0, 240, 255, 0.5)",
                          backdropFilter: "blur(6px)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <Eye size={11} color="#00f0ff" />
                        <span>PREVIEW</span>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-muted)",
                      lineHeight: 1.6,
                      marginBottom: "0.8rem",
                    }}
                  >
                    {c.summary}
                  </p>

                  {/* Highlights List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {c.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <CheckCircle2 size={13} color={c.badgeColor} style={{ marginTop: "2px", flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#e2e8f0", lineHeight: 1.4 }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Tap Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "0.8rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#00f0ff",
                      fontWeight: 700,
                    }}
                  >
                    <Award size={15} color="#00f0ff" />
                    <span>TAP TO VIEW CERTIFICATE</span>
                  </div>

                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "rgba(0, 240, 255, 0.1)",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f0ff",
                    }}
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More / Show Less Button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 2rem",
                borderRadius: "100px",
                background: isExpanded ? "rgba(229, 9, 20, 0.15)" : "linear-gradient(135deg, rgba(229, 9, 20, 0.3), rgba(0, 240, 255, 0.2))",
                border: "1px solid rgba(229, 9, 20, 0.5)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(229, 9, 20, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-red)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(229, 9, 20, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isExpanded
                  ? "rgba(229, 9, 20, 0.15)"
                  : "linear-gradient(135deg, rgba(229, 9, 20, 0.3), rgba(0, 240, 255, 0.2))";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(229, 9, 20, 0.3)";
              }}
            >
              {isExpanded ? (
                <>
                  <span>SHOW LESS (SHOW 2 ROWS)</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>VIEW ALL COMPETITIONS (+{competitions.length - INITIAL_COUNT} MORE)</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
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
                OFFICIAL HONORS & AWARDS // LINKEDIN DIRECTORY
              </h4>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#cbd5e1", margin: 0, lineHeight: 1.4 }}>
                Directly cross-reference all verified competition prizes, collegiate hackathon honors, and certifications of Deepak Mishra on LinkedIn (/details/honors).
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
              <span>INSPECT LINKEDIN HONORS</span>
              <ExternalLink size={13} />
            </a>

            <a
              href="#contact"
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
              <Sparkles size={14} />
              <span>CONNECT WITH DEEPAK</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SPIDER-MAN WEB SUSPENDED REALISTIC CERTIFICATE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center", // Perfectly centered in viewport (No scroll jump!)
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(3, 5, 12, 0.92)",
              backdropFilter: "blur(16px)",
              overflow: "hidden", // Never causes outer scroll
            }}
            onClick={() => setSelectedCert(null)}
          >
            {/* PURE WHITE REALISTIC SPIDER-MAN WEB STRANDS (Shooting from ceiling to modal) */}
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 10000,
              }}
            >
              <defs>
                {/* Pure White Spider-Man Silk Texture & Glow */}
                <filter id="pureWebGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="1" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* CEILING WEB IMPACT SPLATTER / NET (Where Spidey shot the web anchor to the ceiling) */}
              <g stroke="#ffffff" strokeWidth="1.5" opacity="0.85" filter="url(#pureWebGlow)">
                {/* Radial Web Strands at Ceiling */}
                <line x1="50%" y1="0" x2="35%" y2="50" strokeWidth="2.5" />
                <line x1="50%" y1="0" x2="42%" y2="65" strokeWidth="2" />
                <line x1="50%" y1="0" x2="50%" y2="75" strokeWidth="3" />
                <line x1="50%" y1="0" x2="58%" y2="65" strokeWidth="2" />
                <line x1="50%" y1="0" x2="65%" y2="50" strokeWidth="2.5" />

                {/* Concentric Web Arcs at Top */}
                <path d="M 40% 30 Q 50% 45, 60% 30" fill="none" strokeWidth="1.6" />
                <path d="M 36% 50 Q 50% 70, 64% 50" fill="none" strokeWidth="1.8" />
                <path d="M 42% 65 Q 50% 82, 58% 65" fill="none" strokeWidth="2" />
              </g>

              {/* MAIN THICK WHITE WEB SHOOTER ROPES (Descending to left and right corners of modal) */}
              {/* Left Main Web Cable (Multiple fibrous interwoven strands) */}
              <path
                d="M 50% 75 C 44% 120, 36% 160, calc(50% - 280px) calc(50% - 210px)"
                stroke="#ffffff"
                strokeWidth="4.5"
                fill="none"
                filter="url(#pureWebGlow)"
              />
              <path
                d="M 50% 75 C 43% 120, 35% 160, calc(50% - 280px) calc(50% - 210px)"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="4 2"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 51% 75 C 45% 120, 37% 160, calc(50% - 280px) calc(50% - 210px)"
                stroke="rgba(0, 240, 255, 0.8)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Right Main Web Cable (Multiple fibrous interwoven strands) */}
              <path
                d="M 50% 75 C 56% 120, 64% 160, calc(50% + 280px) calc(50% - 210px)"
                stroke="#ffffff"
                strokeWidth="4.5"
                fill="none"
                filter="url(#pureWebGlow)"
              />
              <path
                d="M 50% 75 C 57% 120, 65% 160, calc(50% + 280px) calc(50% - 210px)"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="4 2"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 49% 75 C 55% 120, 63% 160, calc(50% + 280px) calc(50% - 210px)"
                stroke="rgba(0, 240, 255, 0.8)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* CROSS-WEB FIBERS (Spider-Man web netting between cables) */}
              <g stroke="#ffffff" strokeWidth="1.4" opacity="0.75" filter="url(#pureWebGlow)">
                <path d="M 46% 105 Q 50% 115, 54% 105" fill="none" />
                <path d="M 42% 135 Q 50% 150, 58% 135" fill="none" />
                <path d="M 38% 165 Q 50% 185, 62% 165" fill="none" />
              </g>

              {/* Center Web Node Knot with Hanging Spider Emblem */}
              <circle cx="50%" cy="75" r="5" fill="#ffffff" filter="url(#pureWebGlow)" />
            </svg>

            {/* Centered Elastic Swinging Modal Card */}
            <motion.div
              initial={{ y: -350, scale: 0.85, opacity: 0 }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 15,
                  mass: 0.9,
                },
              }}
              exit={{
                y: -400,
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.22, ease: "easeIn" },
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "680px",
                width: "92vw",
                background: "linear-gradient(180deg, rgba(10, 14, 28, 0.98) 0%, rgba(4, 7, 16, 0.99) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.7)", // Bright white web outline
                borderRadius: "20px",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 30px 80px rgba(0,0,0,0.98), 0 0 45px rgba(255, 255, 255, 0.25)",
                zIndex: 10001,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Never scrolls
              }}
            >
              {/* CORNER WEB IMPACT SPLATTERS (Where the white web hit the certificate corners!) */}
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "20px",
                  zIndex: 25,
                  pointerEvents: "none",
                }}
              >
                <svg width="42" height="42" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="7" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
                  <path d="M20 5 L20 35 M5 20 L35 20 M9 9 L31 31 M9 31 L31 9" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="20" cy="20" r="14" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.8" />
                </svg>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  right: "20px",
                  zIndex: 25,
                  pointerEvents: "none",
                }}
              >
                <svg width="42" height="42" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="7" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
                  <path d="M20 5 L20 35 M5 20 L35 20 M9 9 L31 31 M9 31 L31 9" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="20" cy="20" r="14" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.8" />
                </svg>
              </div>

              {/* Spider-Man Web HUD Banner at Top */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.8rem",
                  paddingBottom: "0.6rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <ShieldCheck size={18} color="#00f0ff" />
                  <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#00f0ff", letterSpacing: "0.15em" }}>
                      🕷️ SUSPENDED FROM SPIDER-MAN WEB // VERIFIED CREDENTIAL
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "8px",
                    background: "rgba(229, 9, 20, 0.25)",
                    border: "1px solid var(--color-red)",
                    color: "#ffffff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 0 15px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  <X size={14} />
                  <span>CLOSE (ESC)</span>
                </button>
              </div>

              {/* REAL HIGH-RESOLUTION CERTIFICATE IMAGE (Fits cleanly without scrolling) */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "min(350px, 46vh)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.2)",
                  marginBottom: "0.8rem",
                }}
              >
                <img
                  src={selectedCert.certificateImage}
                  alt={selectedCert.title}
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "min(350px, 46vh)",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                />

                {/* Corner watermark badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "rgba(5, 7, 14, 0.85)",
                    border: "1px solid rgba(0, 240, 255, 0.4)",
                    borderRadius: "6px",
                    padding: "0.25rem 0.55rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "#00f0ff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <ShieldCheck size={11} color="#00f0ff" />
                  <span>DEEPAK MISHRA</span>
                </div>
              </div>

              {/* Bottom Verification Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  paddingTop: "0.4rem",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-muted)" }}>
                  ISSUED BY: <strong style={{ color: "#ffffff" }}>{selectedCert.certificateIssuer || selectedCert.organization}</strong>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <a
                    href={selectedCert.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Eye size={12} />
                    <span>FULL IMAGE</span>
                  </a>

                  <a
                    href={selectedCert.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.45rem 0.95rem",
                      borderRadius: "6px",
                      background: "#0A66C2",
                      color: "#ffffff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 0 15px rgba(10, 102, 194, 0.5)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0077b5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0A66C2")}
                  >
                    <LinkedinIcon size={13} />
                    <span>VERIFY ON LINKEDIN</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
