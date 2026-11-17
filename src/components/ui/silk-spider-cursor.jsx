import { useEffect, useRef } from "react";

/**
 * =========================================================================
 * 🕷️ SILK SPIDER CURSOR - ULTRA-ACCURATE PEACOCK JUMPING SPIDER ENGINE
 * =========================================================================
 * - Exact replica of the 3D Maratus / Peacock Jumping Spider (Images 10 & 3)
 * - Ivory abdomen with vivid scarlet arched chevron ribs & black borders
 * - Emerald-teal metallic carapace with signature white anchor/V-crest
 * - Four glossy obsidian jumping spider eyes with white spherical glints
 * - Fluffy mint-green pedipalps with white tips
 * - 8 banded zebra legs with 2-bone Inverse Kinematics (IK)
 * - Soft drop shadow & subtle reduced opacity (0.85) for sleek cinematic feel
 * - Responsive Scale: Compact on mobile (<480px / <768px) so it doesn't
 *   cover content, full size on desktop
 * - Touch & Mobile: Full touchmove, touchstart, double-tap web shoot support
 *   with passive listeners so scrolling is 100% smooth and never blocked
 * - Right-Click (Desktop): Full radial spiderweb net blast
 * - Idle State: Automatically turns to face straight UPWARDS (-Math.PI / 2)
 *   whenever mouse/touch stops moving
 * =========================================================================
 */

export default function SilkSpiderCursor({
  bounceColor = "#e50914",
  spiderScale = 1.3,
  catchBugs = false,
  opacity = 0.85,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId;
    let dpr = window.devicePixelRatio || 1;
    let screenW = window.innerWidth;
    let screenH = window.innerHeight;

    // Responsive scaling based on device viewport
    const getActiveScale = () => {
      const w = window.innerWidth;
      if (w < 480) return spiderScale * 0.58; // Mobile phones: cute & compact
      if (w < 768) return spiderScale * 0.72; // Tablets: medium
      return spiderScale; // Desktop: rich & detailed
    };

    let activeScale = getActiveScale();

    const setupCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      screenW = window.innerWidth;
      screenH = window.innerHeight;
      activeScale = getActiveScale();
      canvas.width = screenW * dpr;
      canvas.height = screenH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();

    const onResize = () => setupCanvas();
    window.addEventListener("resize", onResize);

    // Coordinate tracking (mouse & touch)
    const pointer = {
      x: screenW / 2,
      y: screenH / 2,
      lastMoveTime: performance.now(),
      isMoving: false,
    };

    let idleTimer = null;
    const handlePointerMove = (clientX, clientY) => {
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.lastMoveTime = performance.now();
      pointer.isMoving = true;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        pointer.isMoving = false;
      }, 160);
    };

    const onMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove, { capture: true, passive: true });
    document.addEventListener("mousemove", onMouseMove, { capture: true, passive: true });

    // Touch event handlers for mobile
    let lastTapTime = 0;
    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY);

      const now = performance.now();
      // Double-tap on mobile shoots full web net!
      if (now - lastTapTime < 320) {
        triggerWebNet(t.clientX, t.clientY);
      } else {
        // Single tap drops anchor line
        triggerAnchorLine(t.clientX, t.clientY);
      }
      lastTapTime = now;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      pointer.isMoving = false;
    };

    window.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", onTouchMove, { capture: true, passive: true });
    window.addEventListener("touchend", onTouchEnd, { capture: true, passive: true });

    // Webs collection
    const webs = [];
    const webNets = [];
    const particles = [];

    // Helper: Shoot silk web strand
    const shootSilkStrand = (startX, startY, endX, endY, isStrong = false) => {
      webs.push({
        p1: { x: startX, y: startY },
        p2: { x: endX, y: endY },
        sag: isStrong ? 7 + Math.random() * 7 : 10 + Math.random() * 14,
        createdAt: performance.now(),
        stayDuration: 8500, // Stays visible for 8.5 seconds
        fadeDuration: 3000, // Smooth 3-second dissolve
        alpha: isStrong ? 0.92 : 0.78,
        width: isStrong ? 1.8 : 1.1,
      });
    };

    // Helper: Spawn radial web net
    const triggerWebNet = (centerX, centerY) => {
      const spokes = 9;
      const maxRadius = (activeScale / spiderScale) * (50 + Math.random() * 18);
      const spokeAngles = [];
      for (let s = 0; s < spokes; s++) {
        spokeAngles.push((s * Math.PI * 2) / spokes + (Math.random() - 0.5) * 0.18);
      }

      webNets.push({
        centerX,
        centerY,
        spokeAngles,
        maxRadius,
        rings: 4,
        createdAt: performance.now(),
        stayDuration: 9000,
        fadeDuration: 3000,
        alpha: 0.9,
      });

      // Radiate anchor lines to surrounding elements
      for (let k = 0; k < 4; k++) {
        const radA = (k * Math.PI) / 2 + Math.random() * 0.8;
        const anchorDist = maxRadius * (1.5 + Math.random() * 0.7);
        shootSilkStrand(
          centerX,
          centerY,
          centerX + Math.cos(radA) * anchorDist,
          centerY + Math.sin(radA) * anchorDist,
          false
        );
      }

      // Silk burst particles
      for (let i = 0; i < 12; i++) {
        particles.push({
          x: centerX,
          y: centerY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          life: 1,
          decay: 0.035,
          color: "#ffffff",
        });
      }

      // Spider recoil jump
      const cosA = Math.cos(spider.angle);
      const sinA = Math.sin(spider.angle);
      const spinX = spider.x - cosA * (24 * activeScale);
      const spinY = spider.y - sinA * (24 * activeScale);
      shootSilkStrand(spinX, spinY, centerX, centerY, true);
      spider.x += (spinX - centerX) * 0.05;
      spider.y += (spinY - centerY) * 0.05;
    };

    // Helper: Single anchor silk line
    const triggerAnchorLine = (clickX, clickY) => {
      const cosA = Math.cos(spider.angle);
      const sinA = Math.sin(spider.angle);
      const spinX = spider.x - cosA * (24 * activeScale);
      const spinY = spider.y - sinA * (24 * activeScale);

      shootSilkStrand(spinX, spinY, clickX, clickY, false);

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          life: 1,
          decay: 0.05,
          color: "#ffffff",
        });
      }
    };

    // Right-Click Web Shooter Action (Desktop)
    let lastRightClickTime = 0;
    const onContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const now = performance.now();
      if (now - lastRightClickTime < 100) return false;
      lastRightClickTime = now;
      triggerWebNet(e.clientX, e.clientY);
      return false;
    };
    window.addEventListener("contextmenu", onContextMenu, { capture: true, passive: false });
    document.addEventListener("contextmenu", onContextMenu, { capture: true, passive: false });

    const onMouseDown = (e) => {
      if (e.button === 2) {
        e.preventDefault();
        e.stopPropagation();
        triggerWebNet(e.clientX, e.clientY);
      } else if (e.button === 0) {
        triggerAnchorLine(e.clientX, e.clientY);
      }
    };
    window.addEventListener("mousedown", onMouseDown, { capture: true, passive: false });
    document.addEventListener("mousedown", onMouseDown, { capture: true, passive: false });

    // 8-LEG JOINT CONFIGURATION
    const legConfigs = [
      // Left legs (0..3): Front to Back
      { side: -1, angle: -0.62, length1: 24, length2: 30, restDist: 54, group: 0 },
      { side: -1, angle: -1.22, length1: 22, length2: 28, restDist: 48, group: 1 },
      { side: -1, angle: -1.95, length1: 22, length2: 28, restDist: 48, group: 0 },
      { side: -1, angle: -2.62, length1: 26, length2: 34, restDist: 58, group: 1 },
      // Right legs (4..7): Front to Back
      { side: 1, angle: 0.62, length1: 24, length2: 30, restDist: 54, group: 1 },
      { side: 1, angle: 1.22, length1: 22, length2: 28, restDist: 48, group: 0 },
      { side: 1, angle: 1.95, length1: 22, length2: 28, restDist: 48, group: 1 },
      { side: 1, angle: 2.62, length1: 26, length2: 34, restDist: 58, group: 0 },
    ];

    const spider = {
      x: screenW / 2,
      y: screenH / 2,
      angle: -Math.PI / 2, // Starts facing UPWARDS
      targetAngle: -Math.PI / 2,
      speed: 0,
      isIdle: true,
      idleProgress: 1,
      lastAnchorPos: { x: screenW / 2, y: screenH / 2 },
      distSinceAnchor: 0,
      legs: legConfigs.map((cfg) => {
        const initX = screenW / 2 + Math.cos(cfg.angle) * cfg.restDist * activeScale;
        const initY = screenH / 2 + Math.sin(cfg.angle) * cfg.restDist * activeScale;
        return {
          ...cfg,
          currentFoot: { x: initX, y: initY, z: 0 },
          targetFoot: { x: initX, y: initY },
          stepStartFoot: { x: initX, y: initY },
          stepProgress: 1,
          stepDuration: 90,
          stepStartTime: 0,
        };
      }),
    };

    let lastTime = performance.now();

    // -------------------------------------------------------------------------
    // MAIN ANIMATION LOOP
    // -------------------------------------------------------------------------
    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      screenW = window.innerWidth;
      screenH = window.innerHeight;
      activeScale = getActiveScale();

      // Clear frame
      ctx.clearRect(0, 0, screenW, screenH);

      // Target Navigation
      const destX = pointer.x;
      const destY = pointer.y;

      const dx = destX - spider.x;
      const dy = destY - spider.y;
      const distToDest = Math.hypot(dx, dy);

      const timeSinceMove = performance.now() - pointer.lastMoveTime;
      const isPointerStopped = timeSinceMove > 160;

      if (isPointerStopped && distToDest < 22) {
        // IDLE STATE: Look directly UPWARDS (-Math.PI / 2)
        spider.isIdle = true;
        spider.idleProgress = Math.min(spider.idleProgress + dt * 4.5, 1);
        spider.targetAngle = -Math.PI / 2;
      } else {
        // MOVING: Face pointer direction
        spider.isIdle = false;
        spider.idleProgress = Math.max(spider.idleProgress - dt * 6, 0);
        if (distToDest > 8) {
          spider.targetAngle = Math.atan2(dy, dx);
        }
      }

      // Smooth body rotation
      let diffA = spider.targetAngle - spider.angle;
      while (diffA > Math.PI) diffA -= Math.PI * 2;
      while (diffA < -Math.PI) diffA += Math.PI * 2;
      spider.angle += diffA * Math.min(dt * 11, 1);

      // Speed calculation
      let targetSpeed = 0;
      if (!spider.isIdle && distToDest > 8) {
        targetSpeed = Math.min(distToDest * 5.6, 500);
      } else {
        targetSpeed = 0;
      }
      spider.speed += (targetSpeed - spider.speed) * Math.min(dt * 12, 1);

      // Advance spider forward
      if (spider.speed > 1) {
        const moveDist = spider.speed * dt;
        const moveA = distToDest > 6 ? Math.atan2(dy, dx) : spider.angle;
        spider.x += Math.cos(moveA) * moveDist;
        spider.y += Math.sin(moveA) * moveDist;

        // Walking Silk Trail: Drop anchor thread every 90px
        spider.distSinceAnchor += moveDist;
        if (spider.distSinceAnchor > 90) {
          webs.push({
            p1: { x: spider.lastAnchorPos.x, y: spider.lastAnchorPos.y },
            p2: { x: spider.x, y: spider.y },
            sag: 8 + Math.random() * 10,
            createdAt: performance.now(),
            stayDuration: 8500,
            fadeDuration: 3000,
            alpha: 0.78,
            width: 1.1,
          });
          spider.lastAnchorPos = { x: spider.x, y: spider.y };
          spider.distSinceAnchor = 0;
        }
      }

      const cosA = Math.cos(spider.angle);
      const sinA = Math.sin(spider.angle);

      // 8-Leg Gait IK Calculations
      const isWalking = spider.speed > 5;
      const gaitPhase = (currentTime * 0.012) % (Math.PI * 2);
      const activeGroup = Math.sin(gaitPhase) > 0 ? 0 : 1;

      spider.legs.forEach((leg, idx) => {
        const hipFwd = idx < 2 || (idx >= 4 && idx < 6) ? 7 : -5;
        const hipSide = leg.side * 10 * activeScale;
        const hx = spider.x + (cosA * hipFwd - sinA * hipSide) * activeScale;
        const hy = spider.y + (sinA * hipFwd + cosA * hipSide) * activeScale;
        leg.hip = { x: hx, y: hy };

        const legA = spider.angle + leg.angle;
        const idealX = spider.x + Math.cos(legA) * (leg.restDist * activeScale);
        const idealY = spider.y + Math.sin(legA) * (leg.restDist * activeScale);

        const dIdeal = Math.hypot(idealX - leg.currentFoot.x, idealY - leg.currentFoot.y);

        if (leg.stepProgress >= 1) {
          const stepDist = isWalking ? 16 * activeScale : 32 * activeScale;
          if (dIdeal > stepDist && (leg.group === activeGroup || dIdeal > 45 * activeScale)) {
            leg.stepStartFoot = { x: leg.currentFoot.x, y: leg.currentFoot.y };
            const lead = isWalking ? Math.min(spider.speed * 0.1, 22) : 0;
            leg.targetFoot = {
              x: idealX + Math.cos(spider.angle) * lead,
              y: idealY + Math.sin(spider.angle) * lead,
            };
            leg.stepProgress = 0;
            leg.stepStartTime = currentTime;
            leg.stepDuration = isWalking ? 65 : 95;
          }
        } else {
          const elapsed = currentTime - leg.stepStartTime;
          leg.stepProgress = Math.min(elapsed / leg.stepDuration, 1);
          const t = leg.stepProgress;
          const ease = t * t * (3 - 2 * t);
          leg.currentFoot.x = leg.stepStartFoot.x + (leg.targetFoot.x - leg.stepStartFoot.x) * ease;
          leg.currentFoot.y = leg.stepStartFoot.y + (leg.targetFoot.y - leg.stepStartFoot.y) * ease;
          leg.currentFoot.z = Math.sin(t * Math.PI) * (13 * activeScale);
        }
      });

      // -----------------------------------------------------------------------
      // DRAW WEBS (8.5s duration + 3s dissolve)
      // -----------------------------------------------------------------------
      const nowMs = performance.now();

      // Single Silk Strands
      for (let i = webs.length - 1; i >= 0; i--) {
        const wStrand = webs[i];
        const age = nowMs - wStrand.createdAt;

        let curAlpha = wStrand.alpha;
        if (age > wStrand.stayDuration) {
          const fadeProgress = (age - wStrand.stayDuration) / wStrand.fadeDuration;
          curAlpha = Math.max(0, wStrand.alpha * (1 - fadeProgress));
          if (fadeProgress >= 1) {
            webs.splice(i, 1);
            continue;
          }
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${curAlpha * 0.9})`;
        ctx.lineWidth = wStrand.width || 1.1;
        ctx.moveTo(wStrand.p1.x, wStrand.p1.y);

        const midX = (wStrand.p1.x + wStrand.p2.x) / 2;
        const midY = (wStrand.p1.y + wStrand.p2.y) / 2 + (wStrand.sag || 9);
        ctx.quadraticCurveTo(midX, midY, wStrand.p2.x, wStrand.p2.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(wStrand.p1.x, wStrand.p1.y, 1.6, 0, Math.PI * 2);
        ctx.arc(wStrand.p2.x, wStrand.p2.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Radial Spiderweb Nets
      for (let i = webNets.length - 1; i >= 0; i--) {
        const net = webNets[i];
        const age = nowMs - net.createdAt;

        let curAlpha = net.alpha;
        if (age > net.stayDuration) {
          const fadeProgress = (age - net.stayDuration) / net.fadeDuration;
          curAlpha = Math.max(0, net.alpha * (1 - fadeProgress));
          if (fadeProgress >= 1) {
            webNets.splice(i, 1);
            continue;
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${curAlpha * 0.9})`;
        ctx.lineWidth = 1.2;

        net.spokeAngles.forEach((angle) => {
          const endX = net.centerX + Math.cos(angle) * net.maxRadius;
          const endY = net.centerY + Math.sin(angle) * net.maxRadius;
          ctx.beginPath();
          ctx.moveTo(net.centerX, net.centerY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(endX, endY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });

        for (let r = 1; r <= net.rings; r++) {
          const ringRad = (net.maxRadius / (net.rings + 1)) * r;
          ctx.beginPath();
          for (let s = 0; s < net.spokeAngles.length; s++) {
            const a1 = net.spokeAngles[s];
            const a2 = net.spokeAngles[(s + 1) % net.spokeAngles.length];
            const x1 = net.centerX + Math.cos(a1) * ringRad;
            const y1 = net.centerY + Math.sin(a1) * ringRad;
            const x2 = net.centerX + Math.cos(a2) * ringRad;
            const y2 = net.centerY + Math.sin(a2) * ringRad;

            const midRingX = (x1 + x2) / 2;
            const midRingY = (y1 + y2) / 2 + 2.5;

            if (s === 0) ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(midRingX, midRingY, x2, y2);
          }
          ctx.stroke();
        }
      }

      // Active silk tether
      const spinX = spider.x - cosA * (24 * activeScale);
      const spinY = spider.y - sinA * (24 * activeScale);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
      ctx.lineWidth = 1.2;
      ctx.moveTo(spider.lastAnchorPos.x, spider.lastAnchorPos.y);
      const actMidX = (spider.lastAnchorPos.x + spinX) / 2;
      const actMidY = (spider.lastAnchorPos.y + spinY) / 2 + 5;
      ctx.quadraticCurveTo(actMidX, actMidY, spinX, spinY);
      ctx.stroke();

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.9})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      // -----------------------------------------------------------------------
      // RENDER 3D PEACOCK JUMPING SPIDER
      // -----------------------------------------------------------------------
      ctx.save();

      // 3D Soft Drop Shadow
      ctx.save();
      ctx.translate(spider.x + 8 * activeScale, spider.y + 13 * activeScale);
      ctx.rotate(spider.angle);
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.filter = "blur(5px)";
      ctx.beginPath();
      ctx.ellipse(-15 * activeScale, 0, 21 * activeScale, 16 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10 * activeScale, 0, 16 * activeScale, 14 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 8 Banded Zebra Legs
      spider.legs.forEach((leg) => {
        const hx = leg.hip.x;
        const hy = leg.hip.y;
        const fx = leg.currentFoot.x;
        const fy = leg.currentFoot.y - (leg.currentFoot.z || 0);

        const l1 = leg.length1 * activeScale;
        const l2 = leg.length2 * activeScale;
        const dLeg = Math.min(Math.hypot(fx - hx, fy - hy), l1 + l2 - 0.5);

        const aBase = Math.atan2(fy - hy, fx - hx);
        const cosB = (l1 * l1 + dLeg * dLeg - l2 * l2) / (2 * l1 * dLeg);
        const bKnee = Math.acos(Math.max(-1, Math.min(1, cosB)));

        const kneeAngle = aBase + leg.side * bKnee;
        const kx = hx + Math.cos(kneeAngle) * l1;
        const ky = hy + Math.sin(kneeAngle) * l1;

        // Shadow under leg
        ctx.strokeStyle = "rgba(0, 0, 0, 0.22)";
        ctx.lineWidth = 3.6 * activeScale;
        ctx.beginPath();
        ctx.moveTo(hx + 4, hy + 6);
        ctx.lineTo(kx + 4, ky + 6);
        ctx.lineTo(fx + 4, fy + 6);
        ctx.stroke();

        // Femur (Cream / Sand fur)
        ctx.strokeStyle = "#ede0cc";
        ctx.lineWidth = 4.8 * activeScale;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(kx, ky);
        ctx.stroke();

        // Femur highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.8 * activeScale;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(kx, ky);
        ctx.stroke();

        // Zebra band on Femur
        ctx.strokeStyle = "#171412";
        ctx.lineWidth = 5.0 * activeScale;
        const midFemurX = (hx + kx) / 2;
        const midFemurY = (hy + ky) / 2;
        ctx.beginPath();
        ctx.moveTo(midFemurX - (kx - hx) * 0.14, midFemurY - (ky - hy) * 0.14);
        ctx.lineTo(midFemurX + (kx - hx) * 0.14, midFemurY + (ky - hy) * 0.14);
        ctx.stroke();

        // Tibia & Tarsus
        ctx.strokeStyle = "#decbb5";
        ctx.lineWidth = 3.8 * activeScale;
        ctx.beginPath();
        ctx.moveTo(kx, ky);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        // Zebra ring on Tibia
        ctx.strokeStyle = "#171412";
        ctx.lineWidth = 4.2 * activeScale;
        const midTibX = (kx + fx) / 2;
        const midTibY = (ky + fy) / 2;
        ctx.beginPath();
        ctx.moveTo(midTibX - (fx - kx) * 0.12, midTibY - (fy - ky) * 0.12);
        ctx.lineTo(midTibX + (fx - kx) * 0.12, midTibY + (fy - ky) * 0.12);
        ctx.stroke();

        // Knee joint knob
        ctx.fillStyle = "#26221f";
        ctx.beginPath();
        ctx.arc(kx, ky, 3.2 * activeScale, 0, Math.PI * 2);
        ctx.fill();

        // Claw tip
        ctx.fillStyle = "#0c0a09";
        ctx.beginPath();
        ctx.arc(fx, fy, 2.4 * activeScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spider Body
      ctx.save();
      ctx.translate(spider.x, spider.y);
      ctx.rotate(spider.angle);

      // Abdomen Fan Shield (Maratus Peacock Pattern)
      const abX = -14 * activeScale;
      const abY = 0;
      const abRx = 22 * activeScale;
      const abRy = 17 * activeScale;

      // Cream fur fringe
      ctx.fillStyle = "#ede6d8";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx + 2.2 * activeScale, abRy + 2.2 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dark contour
      ctx.fillStyle = "#1c1917";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx + 0.8 * activeScale, abRy + 0.8 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ivory shield
      ctx.fillStyle = "#fcfaf6";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx, abRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // Abdomen pattern clipping
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx - 0.5, abRy - 0.5, 0, 0, Math.PI * 2);
      ctx.clip();

      const redRibs = [
        { offset: -13, width: 3.4, spreadY: 14 },
        { offset: -6, width: 4.0, spreadY: 16 },
        { offset: 0, width: 4.6, spreadY: 17 },
        { offset: 6, width: 4.0, spreadY: 15 },
        { offset: 13, width: 3.2, spreadY: 12 },
      ];

      redRibs.forEach((rib) => {
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = rib.width * activeScale;
        ctx.beginPath();
        ctx.moveTo(abX + rib.offset * activeScale, -rib.spreadY * activeScale);
        ctx.quadraticCurveTo(
          abX + (rib.offset + 4) * activeScale,
          0,
          abX + rib.offset * activeScale,
          rib.spreadY * activeScale
        );
        ctx.stroke();

        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = (rib.width * 0.5) * activeScale;
        ctx.stroke();

        ctx.strokeStyle = "#1a0808";
        ctx.lineWidth = 0.8 * activeScale;
        ctx.stroke();
      });

      // Mid-dorsal white spine
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(abX, 0, 3.0 * activeScale, 16.5 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soft 3D shading gradient
      const abGrad = ctx.createRadialGradient(
        abX - 3 * activeScale,
        -4 * activeScale,
        2 * activeScale,
        abX,
        0,
        abRx
      );
      abGrad.addColorStop(0, "rgba(255, 255, 255, 0.32)");
      abGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.05)");
      abGrad.addColorStop(1, "rgba(0, 0, 0, 0.38)");
      ctx.fillStyle = abGrad;
      ctx.beginPath();
      ctx.ellipse(abX, 0, abRx, abRy, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Cephalothorax (Emerald-Teal Carapace with White Crest)
      const cepX = 10 * activeScale;
      const cepY = 0;
      const cepRx = 15 * activeScale;
      const cepRy = 13 * activeScale;

      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.ellipse(cepX, cepY, cepRx + 1.2 * activeScale, cepRy + 1.2 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();

      const cepGrad = ctx.createRadialGradient(
        cepX - 2 * activeScale,
        -3 * activeScale,
        2 * activeScale,
        cepX,
        cepY,
        cepRx
      );
      cepGrad.addColorStop(0, "#14b8a6");
      cepGrad.addColorStop(0.5, "#0f766e");
      cepGrad.addColorStop(1, "#042f2e");
      ctx.fillStyle = cepGrad;
      ctx.beginPath();
      ctx.ellipse(cepX, cepY, cepRx, cepRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // White Crest Marking
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(cepX - 2 * activeScale, 0, 2.8 * activeScale, 1.6 * activeScale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.4 * activeScale;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cepX - 6 * activeScale, -7 * activeScale);
      ctx.quadraticCurveTo(cepX + 1 * activeScale, 0, cepX - 6 * activeScale, 7 * activeScale);
      ctx.stroke();

      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.moveTo(cepX - 5 * activeScale, 0);
      ctx.lineTo(cepX + 2 * activeScale, -3.5 * activeScale);
      ctx.lineTo(cepX + 2 * activeScale, 3.5 * activeScale);
      ctx.closePath();
      ctx.fill();

      // Orange Facial Brow & Big Glossy Eyes
      const tilt = spider.idleProgress;

      ctx.fillStyle = "#ea580c";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 10 * activeScale,
        0,
        4.8 * activeScale,
        11.5 * activeScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 10.5 * activeScale,
        0,
        2.2 * activeScale,
        8.5 * activeScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Mint-Green Pedipalps
      const palpWiggle = Math.sin(currentTime * 0.007) * (1.1 * activeScale);

      ctx.fillStyle = "#6ee7b7";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 14 * activeScale,
        -(4.6 + palpWiggle) * activeScale,
        4.8 * activeScale,
        3.4 * activeScale,
        -0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6 * activeScale;
      ctx.stroke();

      ctx.fillStyle = "#6ee7b7";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 14 * activeScale,
        (4.6 - palpWiggle) * activeScale,
        4.8 * activeScale,
        3.4 * activeScale,
        0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6 * activeScale;
      ctx.stroke();

      // Forward-Facing Big Eyes (AME)
      const eyeR = (4.8 + tilt * 1.6) * activeScale;
      const eyeX = cepX + (11 + tilt * 1.5) * activeScale;
      const eyeSep = (5.4 - tilt * 0.5) * activeScale;

      // Left Big Eye
      ctx.fillStyle = "#050508";
      ctx.beginPath();
      ctx.arc(eyeX, -eyeSep, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2410c";
      ctx.lineWidth = 1.3 * activeScale;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX + 1.6 * activeScale, -eyeSep - 1.6 * activeScale, eyeR * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Right Big Eye
      ctx.fillStyle = "#050508";
      ctx.beginPath();
      ctx.arc(eyeX, eyeSep, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2410c";
      ctx.lineWidth = 1.3 * activeScale;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX + 1.6 * activeScale, eyeSep - 1.6 * activeScale, eyeR * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Lateral Eyes (ALE)
      ctx.fillStyle = "#09090b";
      ctx.beginPath();
      ctx.arc(cepX + 7.5 * activeScale, -11 * activeScale, 2.4 * activeScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cepX + 8.2 * activeScale, -11.5 * activeScale, 0.8 * activeScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#09090b";
      ctx.beginPath();
      ctx.arc(cepX + 7.5 * activeScale, 11 * activeScale, 2.4 * activeScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cepX + 8.2 * activeScale, 10.5 * activeScale, 0.8 * activeScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove, { capture: true });
      document.removeEventListener("mousemove", onMouseMove, { capture: true });
      window.removeEventListener("mousedown", onMouseDown, { capture: true });
      document.removeEventListener("mousedown", onMouseDown, { capture: true });
      window.removeEventListener("contextmenu", onContextMenu, { capture: true });
      document.removeEventListener("contextmenu", onContextMenu, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
    };
  }, [bounceColor, spiderScale, catchBugs]);

  return (
    <div
      className="silk-spider-cursor-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        pointerEvents: "none", // 100% click-through & touch-through so scrolling and buttons work normally
        overflow: "hidden",
        opacity: opacity, // Subtle reduced opacity as requested
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
