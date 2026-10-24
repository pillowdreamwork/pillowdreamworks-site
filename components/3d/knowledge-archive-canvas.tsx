"use client";

import * as React from "react";
import * as THREE from "three";


interface KnowledgeArchiveCanvasProps {
  className?: string;
  onSelectTopic?: (category: string) => void;
}

const TOPICS = [
  { name: "PsychSnaps", key: "PsychSnaps", color: 0x24483B, angle: 0 },
  { name: "Articles", key: "Articles", color: 0xC5A880, angle: (Math.PI * 2) / 4 },
  { name: "Founder Notes", key: "Founder Notes", color: 0x8FA89E, angle: (Math.PI * 2 * 2) / 4 },
  { name: "Resources", key: "Resources", color: 0x9B4D3C, angle: (Math.PI * 2 * 3) / 4 },
];

export function KnowledgeArchiveCanvas({
  className,
  onSelectTopic,
}: KnowledgeArchiveCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredTopic, setHoveredTopic] = React.useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = React.useState(true);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.8);

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

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x24483B,
      roughness: 0.25,
      metalness: 0.8,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    const coreWire = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({ color: 0xC5A880, wireframe: true, transparent: true, opacity: 0.28 })
    );
    mainGroup.add(coreWire);

    // Golden Equatorial Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xC6A46A,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    mainGroup.add(ring);

    // Floating Topic Origami Planes (Curved Cards)
    const topicMeshes: { mesh: THREE.Mesh; data: typeof TOPICS[0] }[] = [];
    const cardGeo = new THREE.BoxGeometry(0.9, 1.2, 0.05);

    TOPICS.forEach((t) => {
      const radius = 2.4;
      const x = Math.cos(t.angle) * radius;
      const z = Math.sin(t.angle) * radius;
      const y = Math.sin(t.angle * 2) * 0.3;

      const cardMat = new THREE.MeshStandardMaterial({
        color: t.color,
        roughness: 0.35,
        metalness: 0.4,
      });
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(x, y, z);
      card.lookAt(0, 0, 0);
      card.rotateY(Math.PI); // face camera outward
      card.userData = { topic: t };

      const edgeGeo = new THREE.EdgesGeometry(cardGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xFDFBF7, transparent: true, opacity: 0.4 });
      const edge = new THREE.LineSegments(edgeGeo, edgeMat);
      card.add(edge);

      mainGroup.add(card);
      topicMeshes.push({ mesh: card, data: t });
    });

    // Particle field (Ivory, Sage, Gold, Vermilion)
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const ivoryCol = new THREE.Color(0xFDFBF7);
    const sageCol = new THREE.Color(0x8FA89E);
    const goldCol = new THREE.Color(0xC6A46A);
    const vermilionCol = new THREE.Color(0xE85D3F);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const rnd = Math.random();
      const mixed =
        rnd > 0.75
          ? vermilionCol
          : rnd > 0.5
          ? sageCol
          : rnd > 0.25
          ? goldCol
          : ivoryCol;

      pColors[i * 3] = mixed.r;
      pColors[i * 3 + 1] = mixed.g;
      pColors[i * 3 + 2] = mixed.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Dynamic 3D Lighting — Warm Ivory, Gold, Vermilion Rim, & Forest Ambient
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFDFBF7, 2.0);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xC6A46A, 2.2, 10);
    goldPoint.position.set(-3, -2, 4);
    scene.add(goldPoint);

    const vermilionPoint = new THREE.PointLight(0xE85D3F, 2.2, 9);
    vermilionPoint.position.set(3, -2, 2);
    scene.add(vermilionPoint);

    const forestPoint = new THREE.PointLight(0x24483B, 2.0, 9);
    forestPoint.position.set(-3, 2, -2);
    scene.add(forestPoint);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
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

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(topicMeshes.map((t) => t.mesh));
      if (intersects.length > 0) {
        const topic = intersects[0].object.userData.topic;
        if (topic) {
          setHoveredTopic(topic.name);
          container.style.cursor = "pointer";
        }
      } else {
        setHoveredTopic(null);
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

    const onPointerUp = () => {
      if (isDragging) {
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObjects(topicMeshes.map((t) => t.mesh));
        if (intersects.length > 0) {
          const topic = intersects[0].object.userData.topic;
          if (topic && onSelectTopic) {
            onSelectTopic(topic.key);
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

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotY += 0.12 * delta;
      }

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.07;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.07;

      core.rotation.y = elapsed * 0.3;
      core.rotation.x = elapsed * 0.2;
      coreWire.rotation.y = -elapsed * 0.2;

      ring.rotation.z = elapsed * 0.15;
      particles.rotation.y = -elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

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
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      cardGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectTopic]);

  if (!webGlSupported) return null;

  return (
    <div className={`relative w-full h-[300px] sm:h-[380px] select-none ${className || ""}`}>
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2.5 px-4 py-2 rounded-full glass-content-card border border-sage/25 text-ink text-[11px] font-medium shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion shadow-[0_0_8px_rgba(232,93,63,0.7)]" />
        </span>
        <span className="font-semibold text-forest">Interactive 3D Reading Archive</span>
        <span className="text-ink-muted/60 hidden sm:inline">| Drag to orbit • Click cards to filter</span>
      </div>

      {hoveredTopic && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-5 py-2.5 rounded-full glass-card border border-forest/25 text-ink text-xs font-serif font-semibold shadow-xl animate-fadeIn flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-forest" />
          <span className="text-forest font-bold">{hoveredTopic}</span>
          <span className="text-[10px] font-sans font-normal text-ink-muted">· Click to filter collection</span>
        </div>
      )}
    </div>
  );
}
