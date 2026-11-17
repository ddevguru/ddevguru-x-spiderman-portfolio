import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { certificates } from "../../data/certificates";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import { Award, X, ExternalLink, ShieldCheck, Eye } from "lucide-react";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const closeModal = useCallback(() => setSelectedCert(null), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedCert) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert, closeModal]);

  return (
    <section id="certificates" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="07"
          label="CREDENTIALS & LICENSES"
          title="VERIFIED"
          titleAccent="CERTIFICATES."
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
          Official technical certifications, Guinness World Record participation credentials, HackerRank Advanced SQL validation, and collegiate championship honors.
        </p>

        {/* Certificate cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={fadeUp}>
              <div
                className="neon-card with-crosshairs"
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedCert(cert)}
                aria-label={`View ${cert.title}`}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Image Showcase */}
                <div
                  style={{
                    width: "100%",
                    height: "230px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "1.5rem",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    className="cert-img"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="cert-hover-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(5, 5, 10, 0.75)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Eye size={28} color="var(--color-red)" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-white)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      CLICK TO ENLARGE
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <ShieldCheck size={16} color="var(--color-purple)" />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-purple)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        OFFICIAL CREDENTIAL
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {cert.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ExternalLink size={16} color="var(--color-text)" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="cert-modal-overlay" onClick={closeModal} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="cert-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "680px",
                width: "92vw",
                padding: "1.4rem 1.6rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Close certificate"
                style={{ top: "1rem", right: "1rem" }}
              >
                <X size={15} /> CLOSE (ESC)
              </button>

              <div style={{ marginTop: "0.5rem", marginBottom: "1rem", textAlign: "center", paddingRight: "5rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    marginBottom: "0.2rem",
                    lineHeight: 1.3,
                  }}
                >
                  {selectedCert.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--color-purple)",
                    margin: 0,
                  }}
                >
                  Issued by: {selectedCert.issuer}
                </p>
              </div>

              {/* Entire Certificate Image Fits Without Any Scrolling */}
              <div
                style={{
                  width: "100%",
                  maxHeight: "min(360px, 48vh)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                }}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "min(360px, 48vh)",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .neon-card:hover .cert-hover-overlay {
          opacity: 1 !important;
        }
        .neon-card:hover .cert-img {
          transform: scale(1.04);
        }
      `}} />

      <div className="glow-divider" />
    </section>
  );
}
