"use client";

import * as React from "react";
import * as THREE from "three";

interface PsychometricMindCanvasProps {
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
  className?: string;
}

const DOMAIN_NODES = [
  { name: "Anxiety & Fear", key: "Anxiety", color: 0x8FA89E, pos: [0, 2.2, 0.4] },
  { name: "Mood & Affect", key: "Mood", color: 0xC5A880, pos: [1.8, 1.4, -0.6] },
  { name: "Stress & Trauma", key: "Stress & Trauma", color: 0x9B4D3C, pos: [-1.9, 1.3, -0.4] },
  { name: "Personality", key: "Personality", color: 0x24483B, pos: [1.5, -0.8, 1.2] },
  { name: "Sleep & Restoration", key: "Sleep", color: 0x6E857B, pos: [-1.4, -1.1, 1.3] },
  { name: "Cognitive & Attention", key: "Cognitive", color: 0xB5986E, pos: [2.1, 0.1, -1.1] },
  { name: "Motivation & Agency", key: "Motivation", color: 0xA6B7A1, pos: [-2.0, -0.2, -1.0] },
  { name: "Attachment & Relations", key: "Relationships", color: 0xD4A373, pos: [0.3, -2.1, 0.6] },
  { name: "Neurodevelopmental", key: "Neurodevelopmental", color: 0x3E5A4E, pos: [-0.6, 2.1, -1.2] },
  { name: "Somatic & Energy", key: "Somatic", color: 0x7A9387, pos: [1.2, 1.8, 1.1] },
  { name: "Executive Function", key: "Executive", color: 0xC6A46A, pos: [-1.3, 1.6, 1.0] },
  { name: "Graphotherapy", key: "Graphology", color: 0x1A2A4A, pos: [0.8, -1.8, -1.2] },
  { name: "Projective Batteries", key: "Projective", color: 0x8B2626, pos: [-1.1, -1.9, -0.8] },
  { name: "Life Transitions", key: "Transitions", color: 0x8A9E88, pos: [2.2, -1.4, 0.2] },
  { name: "Well-Being & Poise", key: "Well-Being", color: 0xE8C59A, pos: [0, 0, 2.4] },
];

export function PsychometricMindCanvas({
  selectedDomain,
  onSelectDomain,
  className,
}: PsychometricMindCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = React.useState(true);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Central Anchor Group
    const group = new THREE.Group();
    scene.add(group);

    // 4. Subtle Outer Shell Cage (Sacred Geometry Sphere)
    const cageGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x24483B,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    group.add(cage);

    // 5. Ambient Particles Dust Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const ivoryColor = new THREE.Color(0xF5F1E9);
    const goldColor = new THREE.Color(0xC5A880);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 2.2;
      const sinPhi = Math.sin(phi);

      positions[i * 3] = r * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? goldColor : ivoryColor;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // 6. 15 Domain Nodes (Spheres + Outer Halos)
    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: typeof DOMAIN_NODES[0] }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const haloGeo = new THREE.RingGeometry(0.24, 0.28, 32);

    DOMAIN_NODES.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.3,
        metalness: 0.7,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(node.pos[0], node.pos[1], node.pos[2]);

      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mesh.position);
      halo.lookAt(camera.position);

      mesh.userData = { domain: node };
      group.add(mesh);
      group.add(halo);

      nodeMeshes.push({ mesh, halo, data: node });
    });

    // 7. Connecting Neural Filaments (Golden Lines)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xC5A880,
      transparent: true,
      opacity: 0.16,
    });

    for (let i = 0; i < DOMAIN_NODES.length; i++) {
      for (let j = i + 1; j < DOMAIN_NODES.length; j++) {
        const p1 = new THREE.Vector3(...DOMAIN_NODES[i].pos);
        const p2 = new THREE.Vector3(...DOMAIN_NODES[j].pos);
        if (p1.distanceTo(p2) < 3.2) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(lineGeo, lineMat);
          group.add(line);
        }
      }
    }

    // 8. Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFDFBF7, 2.0);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xC6A46A, 2.5, 12);
    goldPoint.position.set(-3, -2, 4);
    scene.add(goldPoint);

    // 9. Interactive Pointer Drag & Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseVector.x = mouseX;
      mouseVector.y = mouseY;

      if (isDragging) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
        prevPointerX = clientX;
        prevPointerY = clientY;
      }

      // Raycast for hover
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
      if (intersects.length > 0) {
        const item = intersects[0].object.userData.domain;
        if (item) setHoveredNode(item.name);
        container.style.cursor = "pointer";
      } else {
        setHoveredNode(null);
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
      container.style.cursor = "grabbing";
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        // If it was a quick click without much drag, check intersect to select domain
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
        if (intersects.length > 0) {
          const item = intersects[0].object.userData.domain;
          if (item) {
            onSelectDomain(item.key);
          }
        }
      }
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 10. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 11. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Gentle auto rotation when idle
      if (!isDragging) {
        targetRotY += 0.08 * delta;
        targetRotX += Math.sin(clock.getElapsedTime() * 0.4) * 0.02 * delta;
      }

      // Smooth inertia lerp
      group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.08;

      // Pulse halos toward camera
      nodeMeshes.forEach(({ halo, mesh }) => {
        halo.position.copy(mesh.position);
        halo.lookAt(camera.position);
      });

      // Pulse particle field
      particles.rotation.y -= 0.03 * delta;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      renderer.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      haloGeo.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectDomain]);

  if (!webGlSupported) return null;

  return (
    <div className={`relative w-full h-[360px] sm:h-[440px] select-none ${className || ""}`}>
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD & Instructions */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151C17]/80 text-[#FDFBF7] text-[11px] font-medium backdrop-blur-md border border-white/15 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#C6A46A] animate-ping" />
        <span>Interactive 3D Mind Matrix</span>
        <span className="text-white/40 hidden sm:inline">| Drag to rotate • Click nodes to filter</span>
      </div>

      {hoveredNode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-2 rounded-full bg-[#FDFBF7]/90 backdrop-blur-xl border border-[#24483B]/20 text-[#151C17] text-xs font-serif font-semibold shadow-lg animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#24483B]" />
          <span>{hoveredNode}</span>
          <span className="text-[10px] font-sans font-normal text-navy/60">Click to filter catalog</span>
        </div>
      )}
    </div>
  );
}
