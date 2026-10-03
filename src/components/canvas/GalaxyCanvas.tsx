"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  WARP_START,
  WARP_PEAK,
  WARP_END,
  WARP_BOOST,
  introStart,
} from "@/lib/introTiming";

// Nebula Shader Code
const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uReducedMotion;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(st * frequency);
      st += vec2(1.7, 9.2);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    
    // Mouse parallax offset for background nebula
    st += uMouse * 0.025;

    float time = uReducedMotion > 0.5 ? 0.0 : uTime * 0.012;

    // Deep cosmic dark base
    vec3 baseColor = vec3(0.01, 0.012, 0.025);

    // Left Nebula - Violet / Purple (#6d28d9)
    vec2 qLeft = st + vec2(0.45, 0.15);
    float nLeft = fbm(qLeft * 1.6 + vec2(time * 0.3, time * 0.15));
    float nLeft2 = fbm(qLeft * 3.2 - vec2(time * 0.2, 0.0));
    float leftIntensity = smoothstep(-0.1, 0.8, nLeft + nLeft2 * 0.4) * smoothstep(0.9, -0.7, st.x);
    vec3 leftColor = vec3(0.38, 0.09, 0.62) * leftIntensity;

    // Right Nebula - Blue / Cyan (#0284c7 / #0891b2)
    vec2 qRight = st - vec2(0.5, -0.1);
    float nRight = fbm(qRight * 1.8 - vec2(time * 0.25, time * 0.35));
    float nRight2 = fbm(qRight * 3.6 + vec2(0.0, time * 0.15));
    float rightIntensity = smoothstep(-0.1, 0.8, nRight + nRight2 * 0.4) * smoothstep(-0.9, 0.7, st.x);
    vec3 rightColor = vec3(0.02, 0.42, 0.68) * rightIntensity;

    // Center magenta/purple clouds
    vec2 qCenter = st * 1.3;
    float nCenter = fbm(qCenter * 2.0 + vec2(time * 0.15, -time * 0.2));
    float centerIntensity = smoothstep(0.1, 0.85, nCenter) * (1.0 - length(st) * 0.75);
    vec3 centerColor = vec3(0.42, 0.08, 0.48) * centerIntensity;

    // Combine volumetric nebula layers
    vec3 color = baseColor + leftColor * 0.8 + rightColor * 0.8 + centerColor * 0.5;

    // Cinematic vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(st));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// GPU Star Travel Shaders
// NOTE: uTravel is a "travel clock" that is accumulated on the CPU.
// Because speed changes are integrated into it, the warp never makes
// stars jump or restart. uTime is only used for twinkling.
const starVertexShader = `
  uniform float uTime;
  uniform float uTravel;
  uniform vec2 uMouse;

  attribute float aVelocity;
  attribute float aLayer;
  attribute float aSeed;

  varying float vLayer;
  varying float vAlpha;
  varying float vSeed;
  varying vec3 vColor;
  varying float vStreak;

  const float Z_NEAR = 10.0;
  const float Z_FAR = 600.0;
  const float Z_RANGE = 590.0;

  void main() {
    vLayer = aLayer;
    vSeed = aSeed;

    // Time animation factor per star speed
    float speedMultiplier = aVelocity * 22.0;
    if (aLayer > 1.5) {
      speedMultiplier *= 1.8; // Foreground stars travel faster
    } else if (aLayer < 0.5) {
      speedMultiplier *= 0.5; // Background stars travel slower
    }

    float t = uTravel * speedMultiplier;

    // Animate depth Z moving forward with seamless modular wrap-around
    float origZ = position.z;
    float currentZ = Z_FAR - mod((Z_FAR - origZ) + t, Z_RANGE);

    // Depth ratio: 0.0 near camera, 1.0 deep distant vanishing point
    float depthRatio = (currentZ - Z_NEAR) / Z_RANGE;
    depthRatio = clamp(depthRatio, 0.0, 1.0);

    // Mouse Parallax proportional to depth & layer
    float parallaxStrength = (1.0 - depthRatio * 0.75) * (aLayer + 1.0) * 12.0;
    vec3 pos = vec3(
      position.x + uMouse.x * parallaxStrength,
      position.y + uMouse.y * parallaxStrength,
      currentZ
    );

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float distToCam = -mvPosition.z;

    // Base point size by layer
    float baseSize = 2.0;
    if (aLayer < 0.5) {
      baseSize = 1.8 + aSeed * 1.0; // Background tiny stars
    } else if (aLayer < 1.5) {
      baseSize = 3.0 + aSeed * 1.6; // Midground medium stars
    } else {
      baseSize = 4.5 + aSeed * 3.0; // Foreground particles
    }

    // Size attenuation based on distance to camera
    float pSize = baseSize * (320.0 / max(distToCam, 1.0));

    // Foreground streak calculation
    float streak = 1.0;
    if (aLayer > 1.5 && depthRatio < 0.3) {
      streak = 1.0 + (0.3 - depthRatio) * 8.0 * (0.6 + aSeed * 0.4);
    }
    vStreak = streak;

    gl_PointSize = clamp(pSize * (1.0 + (streak - 1.0) * 0.5), 2.2, 18.0);

    // Smooth fade-in at vanishing point (Z_FAR) and fade-out near camera (Z_NEAR)
    float fadeIn = smoothstep(Z_FAR, Z_FAR - 90.0, currentZ);
    float fadeOut = smoothstep(Z_NEAR, Z_NEAR + 45.0, currentZ);
    float alpha = fadeIn * fadeOut;

    // Subtle twinkling for background stars
    if (aLayer < 0.5) {
      float twinkle = sin(uTime * 2.5 + aSeed * 6.28318) * 0.35 + 0.65;
      alpha *= twinkle;
    }

    vAlpha = clamp(alpha, 0.0, 1.0);

    // Color distribution: soft white, icy blue, pale violet, subtle cyan
    vec3 cWhite = vec3(0.96, 0.98, 1.0);
    vec3 cCyan = vec3(0.55, 0.88, 1.0);
    vec3 cViolet = vec3(0.82, 0.68, 1.0);
    vec3 cBlue = vec3(0.45, 0.72, 1.0);

    if (aSeed < 0.45) {
      vColor = mix(cWhite, cCyan, aSeed * 2.22);
    } else if (aSeed < 0.75) {
      vColor = mix(cCyan, cViolet, (aSeed - 0.45) * 3.33);
    } else {
      vColor = mix(cViolet, cBlue, (aSeed - 0.75) * 4.0);
    }
  }
`;

const starFragmentShader = `
  varying float vLayer;
  varying float vAlpha;
  varying float vSeed;
  varying vec3 vColor;
  varying float vStreak;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    // r = 0 at the star center, 1 at the edge of the point sprite
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;

    // Soft glow that reaches exactly 0 at the sprite edge (no square edges)
    float edge = 1.0 - smoothstep(0.0, 1.0, r);
    float glow = pow(edge, 1.5) * 0.75;
    float core = smoothstep(0.6, 0.0, r);

    float alpha = clamp(glow + core, 0.0, 1.0) * vAlpha;
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Warp streak shaders (thin lines, only visible during the intro warp)
// Each streak is a line with two vertices: the head (aEnd = 0) and a tail
// (aEnd = 1) that sits farther away, so the line points to the center.
const streakVertexShader = `
  uniform float uTravel;
  uniform float uWarp;
  uniform vec2 uMouse;

  attribute float aVelocity;
  attribute float aSeed;
  attribute float aEnd;

  varying float vAlpha;
  varying vec3 vColor;

  const float Z_NEAR = 10.0;
  const float Z_FAR = 600.0;
  const float Z_RANGE = 590.0;

  void main() {
    float speedMultiplier = aVelocity * 22.0 * 1.8;
    float t = uTravel * speedMultiplier;

    float currentZ = Z_FAR - mod((Z_FAR - position.z) + t, Z_RANGE);
    float depthRatio = clamp((currentZ - Z_NEAR) / Z_RANGE, 0.0, 1.0);

    // Streak length grows with the warp; the tail is farther from the camera
    float len = uWarp * (30.0 + aSeed * 90.0);
    float z = currentZ + aEnd * len;

    vec3 pos = vec3(
      position.x + uMouse.x * 8.0,
      position.y + uMouse.y * 8.0,
      z
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    float fadeIn = smoothstep(Z_FAR, Z_FAR - 140.0, currentZ);
    float fadeOut = smoothstep(Z_NEAR, Z_NEAR + 40.0, currentZ);
    float brightness = 0.35 + 0.65 * aSeed;

    // Tail is fainter than the head, so each streak fades out softly
    vAlpha = fadeIn * fadeOut * uWarp * brightness
           * (1.0 - depthRatio * 0.45) * (1.0 - aEnd * 0.9);

    vec3 cWhite = vec3(0.96, 0.98, 1.0);
    vec3 cCyan = vec3(0.55, 0.88, 1.0);
    vec3 cViolet = vec3(0.82, 0.68, 1.0);
    if (aSeed < 0.5) {
      vColor = mix(cWhite, cCyan, aSeed * 2.0);
    } else {
      vColor = mix(cCyan, cViolet, (aSeed - 0.5) * 2.0);
    }
  }
`;

const streakFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    if (vAlpha < 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

// Warp strength over time (0 = calm, 1 = full warp)
function warpAt(seconds: number): number {
  if (seconds <= WARP_START) return 0;
  if (seconds < WARP_PEAK) {
    // Accelerate (ease-in)
    const u = (seconds - WARP_START) / (WARP_PEAK - WARP_START);
    return u * u;
  }
  if (seconds < WARP_END) {
    // Decelerate and settle (ease-out)
    const u = (seconds - WARP_PEAK) / (WARP_END - WARP_PEAK);
    return (1 - u) * (1 - u);
  }
  return 0;
}

export default function GalaxyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    // Device Pixel Ratio capped at 1.5 (1.0 on mobile)
    const maxDpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(maxDpr);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Fullscreen Background Nebula Mesh (Ortho Quad)
    const nebulaUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uReducedMotion: { value: prefersReducedMotion ? 1.0 : 0.0 },
    };

    const nebulaMaterial = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: nebulaUniforms,
      depthWrite: false,
      depthTest: false,
    });

    const nebulaGeometry = new THREE.PlaneGeometry(2, 2);
    const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    
    // Render nebula in a separate background scene or quad
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    bgScene.add(nebulaMesh);

    // 3. GPU 3D Star Travel Particle System
    // Mobile: 2,500 particles, Desktop: 5,500 particles
    const particleCount = isMobile ? 2200 : 5000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const layers = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);

    const Z_NEAR = 10.0;
    const Z_FAR = 600.0;

    for (let i = 0; i < particleCount; i++) {
      // Determine layer distribution: 70% Background (0), 22% Midground (1), 8% Foreground (2)
      const randLayer = Math.random();
      let layer = 0;
      if (randLayer > 0.92) {
        layer = 2; // Foreground (fast, streaks)
      } else if (randLayer > 0.70) {
        layer = 1; // Midground
      } else {
        layer = 0; // Background
      }
      layers[i] = layer;

      // Radial spread: central vanishing point origin expanding outward
      // Radius distribution: background wider, foreground closer to line of sight
      // Even spread (sqrt) + a small clear zone in the middle, so stars do
      // not pile up at the vanishing point
      const angle = Math.random() * Math.PI * 2;
      const minRadius = 30;
      const maxRadius = layer === 0 ? 320 : 260;
      const radius = minRadius + Math.sqrt(Math.random()) * (maxRadius - minRadius);

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = Z_NEAR + Math.random() * (Z_FAR - Z_NEAR); // Z depth

      velocities[i] = 0.8 + Math.random() * 0.7; // Speed factor
      seeds[i] = Math.random();
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("aVelocity", new THREE.BufferAttribute(velocities, 1));
    starGeometry.setAttribute("aLayer", new THREE.BufferAttribute(layers, 1));
    starGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const starUniforms = {
      uTime: { value: 0 },
      uTravel: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: starUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    starField.frustumCulled = false;
    scene.add(starField);

    // 3b. Warp streaks (thin glowing lines, only visible during the intro)
    const streakCount = isMobile ? 220 : 650;
    const streakPositions = new Float32Array(streakCount * 2 * 3);
    const streakVelocities = new Float32Array(streakCount * 2);
    const streakSeeds = new Float32Array(streakCount * 2);
    const streakEnds = new Float32Array(streakCount * 2);

    for (let i = 0; i < streakCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 1.1) * 230;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Z_NEAR + Math.random() * (Z_FAR - Z_NEAR);
      const vel = 0.8 + Math.random() * 0.7;
      const seed = Math.random();

      // Two vertices per streak: head (0) and tail (1)
      for (let k = 0; k < 2; k++) {
        const idx = i * 2 + k;
        streakPositions[idx * 3] = x;
        streakPositions[idx * 3 + 1] = y;
        streakPositions[idx * 3 + 2] = z;
        streakVelocities[idx] = vel;
        streakSeeds[idx] = seed;
        streakEnds[idx] = k;
      }
    }

    const streakGeometry = new THREE.BufferGeometry();
    streakGeometry.setAttribute("position", new THREE.BufferAttribute(streakPositions, 3));
    streakGeometry.setAttribute("aVelocity", new THREE.BufferAttribute(streakVelocities, 1));
    streakGeometry.setAttribute("aSeed", new THREE.BufferAttribute(streakSeeds, 1));
    streakGeometry.setAttribute("aEnd", new THREE.BufferAttribute(streakEnds, 1));

    const streakUniforms = {
      uTravel: { value: 0 },
      uWarp: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const streakMaterial = new THREE.ShaderMaterial({
      vertexShader: streakVertexShader,
      fragmentShader: streakFragmentShader,
      uniforms: streakUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const streakLines = new THREE.LineSegments(streakGeometry, streakMaterial);
    streakLines.frustumCulled = false;
    streakLines.visible = false; // only shown while the warp is active
    scene.add(streakLines);

    // 4. Mouse interaction handler
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized screen coordinates -1.0 to 1.0
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const newDpr = mobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(newDpr);
      renderer.setSize(w, h);

      nebulaUniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Tab Visibility Handler (Pause rendering when tab hidden)
    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 7. Animation Loop
    let animationFrameId: number;
    const canvasStart = performance.now();
    let lastFrame = canvasStart;
    let travel = 0; // accumulated "travel clock" (see star shader note)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();

      if (!isTabActive) {
        lastFrame = now;
        return;
      }

      // Cap dt so coming back to the tab never causes a jump
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;

      const elapsedTime = (now - canvasStart) / 1000;

      // Intro warp: 0 = calm, 1 = full speed (skipped for reduced motion)
      const warp = prefersReducedMotion ? 0 : warpAt((now - introStart) / 1000);

      // Integrate speed into travel so speed changes are perfectly smooth
      if (!prefersReducedMotion) {
        travel += dt * (1 + warp * WARP_BOOST);
      }

      // Smooth lerping for mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update uniforms
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nebulaUniforms.uTime.value = elapsedTime;
      nebulaUniforms.uMouse.value.set(mx, my);

      starUniforms.uTime.value = elapsedTime;
      starUniforms.uTravel.value = travel;
      starUniforms.uMouse.value.set(mx, my);

      streakUniforms.uTravel.value = travel;
      streakUniforms.uWarp.value = warp;
      streakUniforms.uMouse.value.set(mx, my);
      streakLines.visible = warp > 0.005;

      // Render background nebula quad first
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(bgScene, bgCamera);

      // Render 3D particle starfield (+ warp streaks) over nebula
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      streakGeometry.dispose();
      streakMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen overflow-hidden bg-[#030308]"
      aria-hidden="true"
    />
  );
}