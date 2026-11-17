import ScrollProgress from "./components/common/ScrollProgress";
import Marquee from "./components/common/Marquee";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Competitions from "./components/sections/Competitions";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Certificates from "./components/sections/Certificates";
import StickyNotes from "./components/sections/StickyNotes";
import Contact from "./components/sections/Contact";
import MusicPlayer from "./components/common/MusicPlayer";
import TerminalBoot from "./components/common/TerminalBoot";
import HangingSpiders from "./components/common/HangingSpiders";
import QuickDock from "./components/common/QuickDock";
import PrecisionHUD from "./components/common/PrecisionHUD";
import CurtainSplitTransition from "./components/common/CurtainSplitTransition";
import LiveVideoBackground from "./components/common/LiveVideoBackground";
import SilkSpiderCursor from "./components/ui/silk-spider-cursor";
import { useState } from "react";

export default function App() {
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isRevealingCurtain, setIsRevealingCurtain] = useState(false);

  const handleBootComplete = () => {
    setIsBootComplete(true);
    setIsRevealingCurtain(true);
    setTimeout(() => setIsRevealingCurtain(false), 3000);
  };

  return (
    <>
      {/* Kexsio-inspired Curtain Split Transition */}
      <CurtainSplitTransition isRevealing={isRevealingCurtain} />

      {/* Music Player must be mounted immediately so TerminalBoot can trigger it */}
      <MusicPlayer />

      {!isBootComplete && <TerminalBoot onComplete={handleBootComplete} />}

      {isBootComplete && (
        <>
          {/* Global Persistent Live Video Background across entire site */}
          <LiveVideoBackground variant="global" showControls={false} />

          {/* Global cinematic overlays */}
          <div className="noise-overlay" />
          <div className="vignette" />
          <div className="scanlines" />
          
          {/* Spider Animations */}
          <HangingSpiders />

          {/* Interactive Silk Spider Cursor (Walking Spider, Spinning Silk Webs & Idle Look-Up) */}
          <SilkSpiderCursor bounceColor="#e50914" spiderScale={1.35} catchBugs={false} />

          {/* Scroll progress */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Precision Telemetry HUD (Heron AI Coordinate System) */}
          <PrecisionHUD />

          {/* Quick Floating Dock */}
          <QuickDock />

          {/* Main content */}
          <main style={{ position: "relative", zIndex: 1 }}>
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Competitions />
            <Skills />
            <Experience />
            <Education />
            <Certificates />
            <StickyNotes />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
}
