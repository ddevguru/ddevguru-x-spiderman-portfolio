import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { experiencesList, organizations } from "../../data/experience";
import { fadeUp, staggerContainer } from "../../animations/variants";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Laptop,
  Trophy,
  Sparkles,
  MapPin,
  Rocket,
} from "lucide-react";

const orgIconMap = {
  "Computer Society of India (CSI)": Laptop,
  "ITSA — SJCEM": Sparkles,
  "E-Cell SJCEM (Entrepreneurship Cell)": Trophy,
  "Creative Coding Club (CCC — SJCEM)": Rocket,
};

export default function Experience() {
  const timelineRef = useRef(null);
  const fillLineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      if (fillLineRef.current) fillLineRef.current.style.height = "100%";
      return;
    }
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (!timelineRef.current || !fillLineRef.current) {
          rafId = null;
          return;
        }
        const rect = timelineRef.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.top > viewH) {
          fillLineRef.current.style.height = "0%";
          rafId = null;
          return;
        }
        if (rect.bottom < 0) {
          fillLineRef.current.style.height = "100%";
          rafId = null;
          return;
        }
        const progress = Math.min(
          Math.max((viewH - rect.top) / (rect.height + viewH * 0.5), 0),
          1
        );
        fillLineRef.current.style.height = `${progress * 100}%`;
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  return (
    <section id="experience" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="05"
          label="FIELD OPERATIONS"
          title="WORK"
          titleAccent="EXPERIENCE."
        />

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            maxWidth: "680px",
            marginTop: "-1rem",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          Professional software development, full-stack web and mobile engineering, educational platform architecture, and active participation in collegiate tech societies.
        </p>

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            paddingLeft: "clamp(2.5rem, 5vw, 4.5rem)",
            marginTop: "2rem",
          }}
        >
          <div className="timeline-line">
            <div
              ref={fillLineRef}
              className="timeline-line-fill"
              style={{ height: shouldReduceMotion ? "100%" : "0%" }}
            />
          </div>
          <div className="timeline-node" style={{ top: 0 }} />

          {experiencesList.map((exp, expIdx) => {
            const isCurrent = expIdx === 0;
            return (
              <div key={exp.company} style={{ marginBottom: "3.5rem", position: "relative" }}>
                {/* Year & Period Badge */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "60px" }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.4rem 1rem",
                    background: isCurrent ? "rgba(0, 240, 255, 0.12)" : "rgba(229, 9, 20, 0.1)",
                    border: isCurrent ? "1px solid #00f0ff" : "1px solid var(--color-red)",
                    borderRadius: "20px",
                    marginBottom: "1.25rem",
                    boxShadow: isCurrent ? "0 0 15px rgba(0, 240, 255, 0.25)" : "none",
                  }}
                >
                  <Calendar size={14} color={isCurrent ? "#00f0ff" : "var(--color-red)"} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {exp.period.toUpperCase()} // {exp.type.toUpperCase()}
                  </span>
                </motion.div>

                {/* Experience card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "60px" }}
                  className="neon-card"
                  style={{
                    padding: "clamp(1.5rem, 4vw, 2.5rem)",
                    border: isCurrent ? "1px solid rgba(0, 240, 255, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isCurrent ? "0 15px 35px rgba(0,0,0,0.7), 0 0 25px rgba(0, 240, 255, 0.1)" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <Building2 size={18} color={isCurrent ? "#00f0ff" : "var(--color-red)"} />
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                            fontWeight: 700,
                            color: "var(--color-white)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {exp.company}
                        </h3>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: isCurrent ? "#00f0ff" : "var(--color-purple)",
                          }}
                        >
                          {exp.role}
                        </span>
                        <span style={{ color: "var(--color-muted)" }}>•</span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: "var(--color-text)",
                          }}
                        >
                          {exp.division}
                        </span>
                        <span style={{ color: "var(--color-muted)" }}>•</span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: "var(--color-muted)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.15em",
                        padding: "0.4rem 1.2rem",
                        border: isCurrent ? "1px solid rgba(0, 240, 255, 0.4)" : "1px solid rgba(229, 9, 20, 0.4)",
                        color: isCurrent ? "#00f0ff" : "var(--color-red)",
                        textTransform: "uppercase",
                        background: isCurrent ? "rgba(0, 240, 255, 0.08)" : "rgba(229, 9, 20, 0.08)",
                        borderRadius: "100px",
                        boxShadow: isCurrent ? "0 0 15px rgba(0, 240, 255, 0.2)" : "0 0 15px rgba(229, 9, 20, 0.2)",
                        fontWeight: 700,
                      }}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--color-text)",
                      marginBottom: "1.75rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Tasks & Responsibilities Grid */}
                  <h4
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    RESPONSIBILITIES & KEY ACHIEVEMENTS:
                  </h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "0.85rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {exp.tasks.map((task, i) => (
                      <motion.div
                        key={task}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.78rem",
                          color: "var(--color-white)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                          lineHeight: 1.5,
                          background: "rgba(255, 255, 255, 0.03)",
                          padding: "0.6rem 0.8rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color={isCurrent ? "#00f0ff" : "var(--color-purple)"}
                          style={{ flexShrink: 0, marginTop: "0.15rem" }}
                        />
                        <span>{task}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skills Associated Chips */}
                  {exp.skills && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)", textTransform: "uppercase" }}>
                        CORE SKILLS:
                      </span>
                      {exp.skills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.68rem",
                            color: isCurrent ? "#00f0ff" : "var(--color-white)",
                            background: isCurrent ? "rgba(0, 240, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
                            border: isCurrent ? "1px solid rgba(0, 240, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.1)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                          }}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}

          <div
            className="timeline-node"
            style={{
              top: "auto",
              bottom: "0",
              borderColor: "var(--color-blue)",
              boxShadow:
                "0 0 15px rgba(48,128,255,0.4), 0 0 30px rgba(48,128,255,0.15)",
            }}
          />
        </div>

        {/* ORGANIZATIONS & COMPETITIONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "60px" }}
          style={{ marginTop: "4rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={18} color="var(--color-purple)" />
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-purple)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ORGANIZATIONS & EXTRACURRICULARS
            </h3>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {organizations.map((org) => {
              const Icon = orgIconMap[org.name] || Trophy;
              return (
                <motion.div
                  key={org.name}
                  variants={fadeUp}
                  className="neon-card"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "rgba(172, 75, 255, 0.1)",
                      border: "1px solid var(--color-purple)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 0 15px rgba(172, 75, 255, 0.25)",
                    }}
                  >
                    <Icon size={22} color="var(--color-purple)" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        display: "block",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {org.type}
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                      }}
                    >
                      {org.name}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      <div className="glow-divider" />
    </section>
  );
}
