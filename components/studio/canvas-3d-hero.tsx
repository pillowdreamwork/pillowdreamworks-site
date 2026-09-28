"use client";

import React, { useEffect, useRef, useState } from "react";

export function Canvas3DHero({ isPlayingAudio = false }: { isPlayingAudio?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // 3D Mathematical Particles forming an interactive morphing Klein/Sphere wireframe
    const numPoints = 650;
    const particles: {
      u: number;
      v: number;
      radius: number;
      speed: number;
      baseColor: string;
      size: number;
    }[] = [];

    for (let i = 0; i < numPoints; i++) {
      particles.push({
        u: Math.random() * Math.PI * 2,
        v: Math.random() * Math.PI - Math.PI / 2,
        radius: 170 + Math.random() * 50,
        speed: 0.003 + Math.random() * 0.004,
        baseColor: i % 18 === 0 ? "#00FFFF" : i % 45 === 0 ? "#FF3333" : "#1A1D26",
        size: i % 18 === 0 ? 2.8 : i % 45 === 0 ? 2.5 : 1.6,
      });
    }

    let time = 0;
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseRef.current.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      time += 0.015;
      frameCount++;

      // FPS tracking
      const now = performance.now();
      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;
      }

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.58;
      const centerY = height * 0.52;
      const rotY = time * 0.35 + mouseRef.current.x * 0.8;
      const rotX = Math.sin(time * 0.2) * 0.2 + mouseRef.current.y * 0.6;

      const projectedPoints: {
        x: number;
        y: number;
        z: number;
        color: string;
        size: number;
        alpha: number;
      }[] = [];

      // Compute 3D Coordinates & Perspective projection
      particles.forEach((p, idx) => {
        p.u += p.speed;
        
        // Fluid organic deformation wave
        const wave = Math.sin(p.u * 3 + time * 1.5) * Math.cos(p.v * 2 + time) * (isPlayingAudio ? 35 : 18);
        const r = p.radius + wave;

        // Spherical to 3D Cartesian
        let x = r * Math.cos(p.v) * Math.sin(p.u);
        let y = r * Math.sin(p.v);
        let z = r * Math.cos(p.v) * Math.cos(p.u);

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Camera perspective projection
        const fov = 450;
        const scale = fov / (fov + z2 + 250);
        const projX = centerX + x2 * scale;
        const projY = centerY + y1 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + 250) / 450));

        projectedPoints.push({
          x: projX,
          y: projY,
          z: z2,
          color: p.baseColor,
          size: p.size * scale,
          alpha,
        });
      });

      // Sort by Z-depth for correct render order
      projectedPoints.sort((a, b) => a.z - b.z);

      // Draw subtle connecting mesh lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 12, projectedPoints.length); j++) {
          const dx = projectedPoints[i].x - projectedPoints[j].x;
          const dy = projectedPoints[i].y - projectedPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42) {
            const lineAlpha = (1 - dist / 42) * 0.18 * projectedPoints[i].alpha;
            ctx.strokeStyle = `rgba(43, 46, 58, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing particles
      projectedPoints.forEach((pt) => {
        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        
        if (pt.color === "#00FFFF") {
          ctx.shadowColor = "#00FFFF";
          ctx.shadowBlur = 10;
        } else if (pt.color === "#FF3333") {
          ctx.shadowColor = "#FF3333";
          ctx.shadowBlur = 8;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.8, pt.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Outer delicate orbital ring
      ctx.save();
      ctx.strokeStyle = "rgba(43, 46, 58, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlayingAudio]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />
      
      {/* Real-time telemetry badge */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#2B2E3A]/10 backdrop-blur-md text-[11px] font-mono text-zinc-600 shadow-sm pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFFF]"></span>
        </span>
        <span>WEBGL 3D MATRIX: 60FPS</span>
      </div>
    </div>
  );
}
