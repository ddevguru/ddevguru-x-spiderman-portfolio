import { useEffect, useRef, useState } from "react";

/**
 * =========================================================================
 * 🕷️ SILK SPIDER CURSOR - ULTRA-ACCURATE PEACOCK JUMPING SPIDER ENGINE
 * =========================================================================
 * 1. Visual Authenticity (Exact replica of Image 10 & Image 3):
 *    - Abdomen: Wide rounded shield with ivory/cream background, vivid scarlet
 *      arched chevron ribs, cream vertical spine, and fine black borders.
 *    - Cephalothorax: Iridescent emerald/teal sheen with a bright white
 *      V/anchor crest and dark chitin perimeter.
 *    - Brow & Face: Radiant orange-ochre ocular brow band.
 *    - Eyes: Four front-facing glossy jet-black jumping spider eyes. The two
 *      central ones are huge with brilliant white spherical specular glints.
 *    - Pedipalps: Fluffy mint-green/cream segmented feelers that twitch inquisitively.
 *    - 8 Zebra Legs: 3-jointed IK legs with cream fur, bold dark zebra bands,
 *      articulated knee joints, and dark tarsal claws.
 *    - 3D Drop Shadow: Soft blurred drop shadow beneath body and legs.
 *
 * 2. Right-Click Web Shooting:
 *    - Captured at document root phase ({ capture: true }) so NO element can block it.
 *    - Shoots strong silk lifeline from spinneret to click point.
 *    - Spawns multi-ring radial web net with spokes, sagging spirals, and anchor lines.
 *    - Spider does an authentic recoil jump.
 *
 * 3. Web Persistence & Dissolve:
 *    - Webs stay fully visible for 8.5 seconds before smoothly fading out over 3s.
 *    - Continuous silk walking trail left behind as the spider travels.
 *
 * 4. Idle Stance (Looking Straight UP):
 *    - Whenever mouse stops moving, spider turns to face UPWARDS (-Math.PI / 2).
 *    - Head tilts up toward viewer, big eyes dilate, glints shine, pedipalps twitch.
 *
 * 5. Full Click-through:
 *    - Canvas & container have pointer-events: none so all links, buttons, and
 *      form inputs work 100% normally.
 * =========================================================================
 */

export default function SilkSpiderCursor({
  bounceColor = "#e50914",
  spiderScale = 1.35,
  catchBugs = false,
}) {
  const canvasRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId;
    let dpr = window.devicePixelRatio || 1;
    let screenW = window.innerWidth;
    let screenH = window.innerHeight;

    const setupCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      screenW = window.innerWidth;
      screenH = window.innerHeight;
      canvas.width = screenW * dpr;
      canvas.height = screenH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();

    const onResize = () => setupCanvas();
    window.addEventListener("resize", onResize);

    // Mouse coordinates
    const mouse = {
      x: screenW / 2,
      y: screenH / 2,
      lastMoveTime: performance.now(),
      isMoving: false,
    };

    let idleTimer = null;
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMoveTime = performance.now();
      mouse.isMoving = true;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        mouse.isMoving = false;
      }, 160);
    };
    window.addEventListener("mousemove", onMouseMove, { capture: true, passive: true });
    document.addEventListener("mousemove", onMouseMove, { capture: true, passive: true });

    // Dynamic webs collection
    const webs = [];
    const webNets = [];
    const particles = [];

    // Helper: Shoot silk web strand
    const shootSilkStrand = (startX, startY, endX, endY, isStrong = false) => {
      webs.push({
        p1: { x: startX, y: startY },
        p2: { x: endX, y: endY },
        sag: isStrong ? 8 + Math.random() * 8 : 12 + Math.random() * 16,
        createdAt: performance.now(),
        stayDuration: 8500, // Stays fully visible for 8.5 seconds!
        fadeDuration: 3000, // Smooth 3-second dissolve!
        alpha: isStrong ? 0.95 : 0.82,
        width: isStrong ? 2.0 : 1.3,
      });
    };

    // Helper: Spawn authentic spiderweb net (Radial spokes + concentric sagging rings)
    const spawnRadialWebNet = (centerX, centerY) => {
      const spokes = 9;
      const maxRadius = 55 + Math.random() * 20;
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
        stayDuration: 9000, // Stays visible for 9 seconds!
        fadeDuration: 3000, // 3-second dissolve!
        alpha: 0.95,
      });

      // Radiate 4 anchor lines to surrounding areas
      for (let k = 0; k < 4; k++) {
        const radA = (k * Math.PI) / 2 + Math.random() * 0.8;
        const anchorDist = maxRadius * (1.6 + Math.random() * 0.8);
        shootSilkStrand(
          centerX,
          centerY,
          centerX + Math.cos(radA) * anchorDist,
          centerY + Math.sin(radA) * anchorDist,
          false
        );
      }

      // Silk burst anchor particles
      for (let i = 0; i < 14; i++) {
        particles.push({
          x: centerX,
          y: centerY,
          vx: (Math.random() - 0.5) * 5.5,
          vy: (Math.random() - 0.5) * 5.5,
          life: 1,
          decay: 0.03,
          color: "#ffffff",
        });
      }
    };

    // Right-Click Web Shooter Action (prevents context menu & blasts web!)
    let lastRightClickTime = 0;
    const triggerRightClickWeb = (clientX, clientY) => {
      const now = performance.now();
      if (now - lastRightClickTime < 100) return; // Debounce rapid double event
      lastRightClickTime = now;

      // Spinneret position at rear of spider abdomen
      const cosA = Math.cos(spider.angle);
      const sinA = Math.sin(spider.angle);
      const spinX = spider.x - cosA * (26 * spiderScale);
      const spinY = spider.y - sinA * (26 * spiderScale);

      // 1. Shoot main heavy silk lifeline from spider to target
      shootSilkStrand(spinX, spinY, clientX, clientY, true);

      // 2. Blast full radial spiderweb net at clicked point
      spawnRadialWebNet(clientX, clientY);

      // 3. Spider recoil jump animation
      spider.x += (spinX - clientX) * 0.05;
      spider.y += (spinY - clientY) * 0.05;
    };

    const onContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerRightClickWeb(e.clientX, e.clientY);
      return false;
    };
    window.addEventListener("contextmenu", onContextMenu, { capture: true, passive: false });
    document.addEventListener("contextmenu", onContextMenu, { capture: true, passive: false });

    // MouseDown handler: Handles both left-click anchor lines and right-click web blast
    const onMouseDown = (e) => {
      if (e.button === 2) {
        // Right click down
        e.preventDefault();
        e.stopPropagation();
        triggerRightClickWeb(e.clientX, e.clientY);
      } else if (e.button === 0) {
        // Left click down: shoot anchor silk line (clicks still pass to buttons/links)
        const clickX = e.clientX;
        const clickY = e.clientY;
        const cosA = Math.cos(spider.angle);
        const sinA = Math.sin(spider.angle);
        const spinX = spider.x - cosA * (26 * spiderScale);
        const spinY = spider.y - sinA * (26 * spiderScale);

        shootSilkStrand(spinX, spinY, clickX, clickY, false);

        // Silk anchor droplet
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: clickX,
            y: clickY,
            vx: (Math.random() - 0.5) * 2.8,
            vy: (Math.random() - 0.5) * 2.8,
            life: 1,
            decay: 0.045,
            color: "#ffffff",
          });
        }
      }
    };
    window.addEventListener("mousedown", onMouseDown, { capture: true, passive: false });
    document.addEventListener("mousedown", onMouseDown, { capture: true, passive: false });

    // Rare Bug fly (optional)
    const bug = {
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      wingPhase: 0,
      timer: 35000, // Spawns very rarely so it doesn't disturb cursor interaction
      caught: false,
      catchAnim: 0,
    };

    // -------------------------------------------------------------------------
    // 8-LEG JOINT CONFIGURATION (4 Left, 4 Right)
    // -------------------------------------------------------------------------
    const legConfigs = [
      // Left legs (0..3): Front to Back
      { side: -1, angle: -0.62, length1: 24, length2: 30, restDist: 55, group: 0 },
      { side: -1, angle: -1.22, length1: 22, length2: 28, restDist: 50, group: 1 },
      { side: -1, angle: -1.95, length1: 22, length2: 28, restDist: 50, group: 0 },
      { side: -1, angle: -2.62, length1: 26, length2: 34, restDist: 60, group: 1 },
      // Right legs (4..7): Front to Back
      { side: 1, angle: 0.62, length1: 24, length2: 30, restDist: 55, group: 1 },
      { side: 1, angle: 1.22, length1: 22, length2: 28, restDist: 50, group: 0 },
      { side: 1, angle: 1.95, length1: 22, length2: 28, restDist: 50, group: 1 },
      { side: 1, angle: 2.62, length1: 26, length2: 34, restDist: 60, group: 0 },
    ];

    const spider = {
      x: screenW / 2,
      y: screenH / 2,
      angle: -Math.PI / 2, // Starts facing UPWARDS
      targetAngle: -Math.PI / 2,
      speed: 0,
      isIdle: true,
      idleProgress: 1, // 1 = fully looking UP at user!
      isPouncing: false,
      pounceProgress: 0,
      lastAnchorPos: { x: screenW / 2, y: screenH / 2 },
      distSinceAnchor: 0,
      legs: legConfigs.map((cfg) => {
        const initX = screenW / 2 + Math.cos(cfg.angle) * cfg.restDist * spiderScale;
        const initY = screenH / 2 + Math.sin(cfg.angle) * cfg.restDist * spiderScale;
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

      // 1. Clear frame
      ctx.clearRect(0, 0, screenW, screenH);

      // 2. Navigation Target (Mouse Follower)
      const destX = mouse.x;
      const destY = mouse.y;

      const dx = destX - spider.x;
      const dy = destY - spider.y;
      const distToDest = Math.hypot(dx, dy);

      // Check whether mouse is moving or stopped
      const timeSinceMove = performance.now() - mouse.lastMoveTime;
      const isMouseStopped = timeSinceMove > 160;

      if (isMouseStopped && distToDest < 25) {
        // IDLE STATE: Spider has arrived or mouse is resting -> Turn directly UPWARDS (-Math.PI / 2)!
        spider.isIdle = true;
        spider.idleProgress = Math.min(spider.idleProgress + dt * 4.5, 1);
        spider.targetAngle = -Math.PI / 2; // Exact upright orientation (looking at user)
      } else {
        // MOVING STATE: Follow pointer
        spider.isIdle = false;
        spider.idleProgress = Math.max(spider.idleProgress - dt * 6, 0);
        if (distToDest > 8) {
          spider.targetAngle = Math.atan2(dy, dx);
        }
      }

      // Smooth body rotation towards targetAngle
      let diffA = spider.targetAngle - spider.angle;
      while (diffA > Math.PI) diffA -= Math.PI * 2;
      while (diffA < -Math.PI) diffA += Math.PI * 2;
      spider.angle += diffA * Math.min(dt * 11, 1);

      // Speed calculation
      let targetSpeed = 0;
      if (!spider.isIdle && distToDest > 10) {
        targetSpeed = Math.min(distToDest * 5.5, 480);
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

        // Walking Silk Trail: Anchor thread every 100px of travel
        spider.distSinceAnchor += moveDist;
        if (spider.distSinceAnchor > 100) {
          webs.push({
            p1: { x: spider.lastAnchorPos.x, y: spider.lastAnchorPos.y },
            p2: { x: spider.x, y: spider.y },
            sag: 9 + Math.random() * 12,
            createdAt: performance.now(),
            stayDuration: 8500, // Stays visible for 8.5 seconds!
            fadeDuration: 3000,
            alpha: 0.82,
            width: 1.2,
          });
          spider.lastAnchorPos = { x: spider.x, y: spider.y };
          spider.distSinceAnchor = 0;
        }
      }

      const cosA = Math.cos(spider.angle);
      const sinA = Math.sin(spider.angle);

      // 3. Inverse Kinematics Gait for 8 Legs
      const isWalking = spider.speed > 5;
      const gaitPhase = (currentTime * 0.012) % (Math.PI * 2);
      const activeGroup = Math.sin(gaitPhase) > 0 ? 0 : 1;

      spider.legs.forEach((leg, idx) => {
        // Hip socket attached to cephalothorax
        const hipFwd = idx < 2 || (idx >= 4 && idx < 6) ? 7 : -5;
        const hipSide = leg.side * 10 * spiderScale;
        const hx = spider.x + (cosA * hipFwd - sinA * hipSide) * spiderScale;
        const hy = spider.y + (sinA * hipFwd + cosA * hipSide) * spiderScale;
        leg.hip = { x: hx, y: hy };

        // Desired foot placement
        const legA = spider.angle + leg.angle;
        const idealX = spider.x + Math.cos(legA) * (leg.restDist * spiderScale);
        const idealY = spider.y + Math.sin(legA) * (leg.restDist * spiderScale);

        const dIdeal = Math.hypot(idealX - leg.currentFoot.x, idealY - leg.currentFoot.y);

        if (leg.stepProgress >= 1) {
          const stepDist = isWalking ? 18 * spiderScale : 34 * spiderScale;
          if (dIdeal > stepDist && (leg.group === activeGroup || dIdeal > 48 * spiderScale)) {
            leg.stepStartFoot = { x: leg.currentFoot.x, y: leg.currentFoot.y };
            const lead = isWalking ? Math.min(spider.speed * 0.1, 24) : 0;
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
          leg.currentFoot.z = Math.sin(t * Math.PI) * (14 * spiderScale);
        }
      });

      // -----------------------------------------------------------------------
      // 4. DRAW WEBS (Stay visible for ~8.5s, then smoothly dissolve over 3s)
      // -----------------------------------------------------------------------
      const nowMs = performance.now();

      // 4A. Single Silk Strands
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${curAlpha})`;
        ctx.lineWidth = wStrand.width || 1.2;
        ctx.moveTo(wStrand.p1.x, wStrand.p1.y);

        // Natural parabolic silk sag
        const midX = (wStrand.p1.x + wStrand.p2.x) / 2;
        const midY = (wStrand.p1.y + wStrand.p2.y) / 2 + (wStrand.sag || 10);
        ctx.quadraticCurveTo(midX, midY, wStrand.p2.x, wStrand.p2.y);
        ctx.stroke();

        // Glowing anchor node at end points
        ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(wStrand.p1.x, wStrand.p1.y, 1.8, 0, Math.PI * 2);
        ctx.arc(wStrand.p2.x, wStrand.p2.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4B. Radial Spiderweb Nets (Right-Click Web Blasts)
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

        ctx.strokeStyle = `rgba(255, 255, 255, ${curAlpha})`;
        ctx.lineWidth = 1.3;

        // Draw radial spokes
        net.spokeAngles.forEach((angle) => {
          const endX = net.centerX + Math.cos(angle) * net.maxRadius;
          const endY = net.centerY + Math.sin(angle) * net.maxRadius;
          ctx.beginPath();
          ctx.moveTo(net.centerX, net.centerY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(endX, endY, 2.0, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw concentric web spiral rings with delicate sag
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
            const midRingY = (y1 + y2) / 2 + 2.8;

            if (s === 0) ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(midRingX, midRingY, x2, y2);
          }
          ctx.stroke();
        }
      }

      // Active silk tether from spinneret to current ground anchor
      const spinX = spider.x - cosA * (26 * spiderScale);
      const spinY = spider.y - sinA * (26 * spiderScale);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.3;
      ctx.moveTo(spider.lastAnchorPos.x, spider.lastAnchorPos.y);
      const actMidX = (spider.lastAnchorPos.x + spinX) / 2;
      const actMidY = (spider.lastAnchorPos.y + spinY) / 2 + 6;
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
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      // -----------------------------------------------------------------------
      // 5. RENDER 3D JUMPING SPIDER (EXACT REPLICA OF PEACOCK SPIDER)
      // -----------------------------------------------------------------------
      ctx.save();

      // 5A. 3D REALISTIC DROP SHADOW (Gives physical depth above page)
      ctx.save();
      ctx.translate(spider.x + 9 * spiderScale, spider.y + 15 * spiderScale);
      ctx.rotate(spider.angle);
      ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
      ctx.filter = "blur(6px)";
      // Abdomen shadow
      ctx.beginPath();
      ctx.ellipse(-16 * spiderScale, 0, 22 * spiderScale, 17 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();
      // Head shadow
      ctx.beginPath();
      ctx.ellipse(11 * spiderScale, 0, 17 * spiderScale, 15 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5B. 8 BANDED ZEBRA LEGS (Thick 3D Articulated IK Limbs)
      spider.legs.forEach((leg) => {
        const hx = leg.hip.x;
        const hy = leg.hip.y;
        const fx = leg.currentFoot.x;
        const fy = leg.currentFoot.y - (leg.currentFoot.z || 0);

        const l1 = leg.length1 * spiderScale;
        const l2 = leg.length2 * spiderScale;
        const dLeg = Math.min(Math.hypot(fx - hx, fy - hy), l1 + l2 - 0.5);

        const aBase = Math.atan2(fy - hy, fx - hx);
        const cosB = (l1 * l1 + dLeg * dLeg - l2 * l2) / (2 * l1 * dLeg);
        const bKnee = Math.acos(Math.max(-1, Math.min(1, cosB)));

        const kneeAngle = aBase + leg.side * bKnee;
        const kx = hx + Math.cos(kneeAngle) * l1;
        const ky = hy + Math.sin(kneeAngle) * l1;

        // Shadow under each leg
        ctx.strokeStyle = "rgba(0, 0, 0, 0.28)";
        ctx.lineWidth = 4.0 * spiderScale;
        ctx.beginPath();
        ctx.moveTo(hx + 5, hy + 7);
        ctx.lineTo(kx + 5, ky + 7);
        ctx.lineTo(fx + 5, fy + 7);
        ctx.stroke();

        // Upper Limb: Femur (Rich Cream/Beige fur body)
        ctx.strokeStyle = "#eedec7";
        ctx.lineWidth = 5.2 * spiderScale;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(kx, ky);
        ctx.stroke();

        // Femur highlight (Top 3D ridge)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 2.0 * spiderScale;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(kx, ky);
        ctx.stroke();

        // Dark Zebra Bands on Femur
        ctx.strokeStyle = "#171412";
        ctx.lineWidth = 5.5 * spiderScale;
        const midFemurX = (hx + kx) / 2;
        const midFemurY = (hy + ky) / 2;
        ctx.beginPath();
        ctx.moveTo(midFemurX - (kx - hx) * 0.15, midFemurY - (ky - hy) * 0.15);
        ctx.lineTo(midFemurX + (kx - hx) * 0.15, midFemurY + (ky - hy) * 0.15);
        ctx.stroke();

        // Lower Limb: Tibia & Tarsus
        ctx.strokeStyle = "#dfceb7";
        ctx.lineWidth = 4.0 * spiderScale;
        ctx.beginPath();
        ctx.moveTo(kx, ky);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        // Tibia highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.6 * spiderScale;
        ctx.beginPath();
        ctx.moveTo(kx, ky);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        // Dark Zebra Ring on Tibia
        ctx.strokeStyle = "#171412";
        ctx.lineWidth = 4.4 * spiderScale;
        const midTibX = (kx + fx) / 2;
        const midTibY = (ky + fy) / 2;
        ctx.beginPath();
        ctx.moveTo(midTibX - (fx - kx) * 0.12, midTibY - (fy - ky) * 0.12);
        ctx.lineTo(midTibX + (fx - kx) * 0.12, midTibY + (fy - ky) * 0.12);
        ctx.stroke();

        // Chitinous Knee Joint Bulb
        ctx.fillStyle = "#26221f";
        ctx.beginPath();
        ctx.arc(kx, ky, 3.4 * spiderScale, 0, Math.PI * 2);
        ctx.fill();

        // Tarsal Foot Tip & Claws
        ctx.fillStyle = "#0c0a09";
        ctx.beginPath();
        ctx.arc(fx, fy, 2.6 * spiderScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5C. MAIN SPIDER BODY (Abdomen, Cephalothorax, Eyes, Pedipalps)
      ctx.save();
      ctx.translate(spider.x, spider.y);
      ctx.rotate(spider.angle);

      // -----------------------------------------------------------------------
      // 5D. ABDOMEN (Peacock Jumping Spider Fan Shield - Images 10 & 3)
      // -----------------------------------------------------------------------
      const abX = -15 * spiderScale;
      const abY = 0;
      const abRx = 23 * spiderScale;
      const abRy = 18 * spiderScale;

      // Soft cream fur fringe contour around abdomen
      ctx.fillStyle = "#ede6d8";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx + 2.5 * spiderScale, abRy + 2.5 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Deep dark perimeter contour
      ctx.fillStyle = "#1c1917";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx + 0.8 * spiderScale, abRy + 0.8 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Base ivory/white abdomen background
      ctx.fillStyle = "#fcfaf6";
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx, abRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // Clip inside abdomen for radiant patterns
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(abX, abY, abRx - 0.5, abRy - 0.5, 0, 0, Math.PI * 2);
      ctx.clip();

      // Arched Crimson / Scarlet Chevron Ribs (Maratus volans pattern)
      const redRibs = [
        { offset: -14, width: 3.5, spreadY: 15 },
        { offset: -7, width: 4.2, spreadY: 17 },
        { offset: 0, width: 4.8, spreadY: 18 },
        { offset: 7, width: 4.2, spreadY: 16 },
        { offset: 14, width: 3.4, spreadY: 13 },
      ];

      redRibs.forEach((rib) => {
        // Red Arched Band
        ctx.strokeStyle = "#dc2626"; // Vivid scarlet red
        ctx.lineWidth = rib.width * spiderScale;
        ctx.beginPath();
        ctx.moveTo(abX + rib.offset * spiderScale, -rib.spreadY * spiderScale);
        ctx.quadraticCurveTo(
          abX + (rib.offset + 4) * spiderScale,
          0,
          abX + rib.offset * spiderScale,
          rib.spreadY * spiderScale
        );
        ctx.stroke();

        // Inner Red Highlight
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = (rib.width * 0.5) * spiderScale;
        ctx.stroke();

        // Fine Black Chitin Border Outline
        ctx.strokeStyle = "#1a0808";
        ctx.lineWidth = 0.8 * spiderScale;
        ctx.stroke();
      });

      // Central Ivory/White Spine (Mid-dorsal ridge)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(abX, 0, 3.2 * spiderScale, 17.5 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soft 3D spherical shading across abdomen
      const abGrad = ctx.createRadialGradient(
        abX - 3 * spiderScale,
        -4 * spiderScale,
        2 * spiderScale,
        abX,
        0,
        abRx
      );
      abGrad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
      abGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.05)");
      abGrad.addColorStop(1, "rgba(0, 0, 0, 0.42)");
      ctx.fillStyle = abGrad;
      ctx.beginPath();
      ctx.ellipse(abX, 0, abRx, abRy, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Restore abdomen clip

      // -----------------------------------------------------------------------
      // 5E. CEPHALOTHORAX (Metallic Emerald / Teal Carapace with White Anchor Crest)
      // -----------------------------------------------------------------------
      const cepX = 11 * spiderScale;
      const cepY = 0;
      const cepRx = 16 * spiderScale;
      const cepRy = 14 * spiderScale;

      // Dark perimeter chitin rim
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.ellipse(cepX, cepY, cepRx + 1.2 * spiderScale, cepRy + 1.2 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Emerald-Teal Iridescent Carapace
      const cepGrad = ctx.createRadialGradient(
        cepX - 2 * spiderScale,
        -3 * spiderScale,
        2 * spiderScale,
        cepX,
        cepY,
        cepRx
      );
      cepGrad.addColorStop(0, "#14b8a6"); // Bright teal-green highlight
      cepGrad.addColorStop(0.5, "#0f766e"); // Deep emerald
      cepGrad.addColorStop(1, "#042f2e"); // Dark forest edge
      ctx.fillStyle = cepGrad;
      ctx.beginPath();
      ctx.ellipse(cepX, cepY, cepRx, cepRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // Signature White Anchor / Crest Marking (Images 10 & 3)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      // Center spine of the crest
      ctx.ellipse(cepX - 2 * spiderScale, 0, 3.0 * spiderScale, 1.8 * spiderScale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.6 * spiderScale;
      ctx.lineCap = "round";
      ctx.beginPath();
      // White V-arms branching left & right
      ctx.moveTo(cepX - 7 * spiderScale, -8 * spiderScale);
      ctx.quadraticCurveTo(cepX + 1 * spiderScale, 0, cepX - 7 * spiderScale, 8 * spiderScale);
      ctx.stroke();

      // White center chevron cap
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.moveTo(cepX - 6 * spiderScale, 0);
      ctx.lineTo(cepX + 2 * spiderScale, -4 * spiderScale);
      ctx.lineTo(cepX + 2 * spiderScale, 4 * spiderScale);
      ctx.closePath();
      ctx.fill();

      // -----------------------------------------------------------------------
      // 5F. OCULAR BROW & FORWARD-FACING JUMPING SPIDER EYES
      // -----------------------------------------------------------------------
      const tilt = spider.idleProgress; // 0 = walking, 1 = looking straight up at user

      // Vibrant Orange-Ochre Facial Brow Band
      ctx.fillStyle = "#ea580c";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 11 * spiderScale,
        0,
        5.2 * spiderScale,
        12.5 * spiderScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Orange brow 3D highlight
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 11.5 * spiderScale,
        0,
        2.5 * spiderScale,
        9.0 * spiderScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Fluffy Mint-Green Twitching Pedipalps
      const palpWiggle = Math.sin(currentTime * 0.007) * (1.2 * spiderScale);

      // Left Pedipalp
      ctx.fillStyle = "#6ee7b7";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 15 * spiderScale,
        -(5.0 + palpWiggle) * spiderScale,
        5.2 * spiderScale,
        3.6 * spiderScale,
        -0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.8 * spiderScale;
      ctx.stroke();

      // Right Pedipalp
      ctx.fillStyle = "#6ee7b7";
      ctx.beginPath();
      ctx.ellipse(
        cepX + 15 * spiderScale,
        (5.0 - palpWiggle) * spiderScale,
        5.2 * spiderScale,
        3.6 * spiderScale,
        0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.8 * spiderScale;
      ctx.stroke();

      // BIG GLOSSY FORWARD EYES (AME) - Dilate & gaze upwards when idle!
      const eyeR = (5.2 + tilt * 1.8) * spiderScale;
      const eyeX = cepX + (12 + tilt * 1.6) * spiderScale;
      const eyeSep = (5.8 - tilt * 0.6) * spiderScale;

      // Left Big Eye
      ctx.fillStyle = "#050508";
      ctx.beginPath();
      ctx.arc(eyeX, -eyeSep, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2410c"; // Deep amber chitin ring
      ctx.lineWidth = 1.4 * spiderScale;
      ctx.stroke();
      // Brilliant Specular Reflection Glint
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX + 1.8 * spiderScale, -eyeSep - 1.8 * spiderScale, eyeR * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Right Big Eye
      ctx.fillStyle = "#050508";
      ctx.beginPath();
      ctx.arc(eyeX, eyeSep, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2410c";
      ctx.lineWidth = 1.4 * spiderScale;
      ctx.stroke();
      // Brilliant Specular Reflection Glint
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX + 1.8 * spiderScale, eyeSep - 1.8 * spiderScale, eyeR * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Two Lateral Eyes (ALE)
      ctx.fillStyle = "#09090b";
      ctx.beginPath();
      ctx.arc(cepX + 8.5 * spiderScale, -12 * spiderScale, 2.6 * spiderScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cepX + 9.2 * spiderScale, -12.5 * spiderScale, 0.9 * spiderScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#09090b";
      ctx.beginPath();
      ctx.arc(cepX + 8.5 * spiderScale, 12 * spiderScale, 2.6 * spiderScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cepX + 9.2 * spiderScale, 11.5 * spiderScale, 0.9 * spiderScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Restore body translation & rotation
      ctx.restore(); // Restore overall canvas state

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
      cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
    };
  }, [bounceColor, spiderScale, catchBugs]);

  if (isTouchDevice) return null;

  return (
    <div
      className="silk-spider-cursor-container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        pointerEvents: "none", // 100% click-through for all buttons, links, inputs
        overflow: "hidden",
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
