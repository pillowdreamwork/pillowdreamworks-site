"use client";

import * as React from "react";
import * as THREE from "three";


interface TherapeuticSanctuaryCanvasProps {
  className?: string;
  onSelectSculpture?: (sectionId: string) => void;
}

const SERVICE_SCULPTURES = [
  {
    id: "counselling",
    title: "1-on-1 Clinical Consultations",
    type: "octahedron",
    color: 0x24483B,
    accent: 0x8FA89E,
    pos: [-2.6, 0.4, 0],
    scale: 0.9,
  },
  {
    id: "crisis",
    title: "CentreLine & Stabilisation",
    type: "torus",
    color: 0x8B2626,
    accent: 0xE85D3F,
    pos: [-0.85, -0.3, 0.6],
    scale: 0.85,
  },
  {
    id: "graphology",
    title: "Graphotherapy & Subconscious Alignment",
    type: "mobius",
    color: 0xC6A46A,
    accent: 0xFDFBF7,
    pos: [0.95, 0.4, 0.2],
    scale: 0.9,
  },
  {
    id: "courses",
    title: "Psychoeducational Masterclasses",
    type: "gyroscope",
    color: 0x1A2A4A,
    accent: 0xC5A880,
    pos: [2.7, -0.3, -0.2],
    scale: 0.88,
  },
];

export function TherapeuticSanctuaryCanvas({
  className,
  onSelectSculpture,
}: TherapeuticSanctuaryCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredTitle, setHoveredTitle] = React.useState<string | null>(null);
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
    const height = container.clientHeight || 380;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 7.2);

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
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4. Subtle Ambient Floating Dust Field (Ivory, Sage, Gold, Vermilion)
    const dustCount = 220;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const ivoryCol = new THREE.Color(0xFDFBF7);
    const sageCol = new THREE.Color(0x8FA89E);
    const goldCol = new THREE.Color(0xC6A46A);
    const vermilionCol = new THREE.Color(0xE85D3F);

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const rnd = Math.random();
      const mixed =
        rnd > 0.75
          ? vermilionCol
          : rnd > 0.5
          ? sageCol
          : rnd > 0.25
          ? goldCol
          : ivoryCol;

      dustColors[i * 3] = mixed.r;
      dustColors[i * 3 + 1] = mixed.g;
      dustColors[i * 3 + 2] = mixed.b;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    mainGroup.add(dust);

    // 5. Build 4 Interactive Sculptures
    const sculptureMeshes: { group: THREE.Group; id: string; title: string }[] = [];

    // Octahedron
    const g1 = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(0.75, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: SERVICE_SCULPTURES[0].color,
      roughness: 0.25,
      metalness: 0.8,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    const octWire = new THREE.Mesh(
      octGeo,
      new THREE.MeshBasicMaterial({ color: 0xFDFBF7, wireframe: true, transparent: true, opacity: 0.25 })
    );
    g1.add(octMesh);
    g1.add(octWire);
    g1.position.set(...(SERVICE_SCULPTURES[0].pos as [number, number, number]));
    g1.userData = { id: SERVICE_SCULPTURES[0].id, title: SERVICE_SCULPTURES[0].title };
    mainGroup.add(g1);
    sculptureMeshes.push({ group: g1, id: SERVICE_SCULPTURES[0].id, title: SERVICE_SCULPTURES[0].title });

    // Torus
    const g2 = new THREE.Group();
    const torGeo = new THREE.TorusGeometry(0.65, 0.22, 24, 48);
    const torMat = new THREE.MeshStandardMaterial({
      color: SERVICE_SCULPTURES[1].color,
      roughness: 0.3,
      metalness: 0.6,
    });
    const torMesh = new THREE.Mesh(torGeo, torMat);
    const torWire = new THREE.Mesh(
      torGeo,
      new THREE.MeshBasicMaterial({ color: 0xFDFBF7, wireframe: true, transparent: true, opacity: 0.15 })
    );
    g2.add(torMesh);
    g2.add(torWire);
    g2.position.set(...(SERVICE_SCULPTURES[1].pos as [number, number, number]));
    g2.userData = { id: SERVICE_SCULPTURES[1].id, title: SERVICE_SCULPTURES[1].title };
    mainGroup.add(g2);
    sculptureMeshes.push({ group: g2, id: SERVICE_SCULPTURES[1].id, title: SERVICE_SCULPTURES[1].title });

    // Torus Knot / Möbius
    const g3 = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(0.55, 0.18, 64, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: SERVICE_SCULPTURES[2].color,
      roughness: 0.2,
      metalness: 0.9,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    g3.add(knotMesh);
    g3.position.set(...(SERVICE_SCULPTURES[2].pos as [number, number, number]));
    g3.userData = { id: SERVICE_SCULPTURES[2].id, title: SERVICE_SCULPTURES[2].title };
    mainGroup.add(g3);
    sculptureMeshes.push({ group: g3, id: SERVICE_SCULPTURES[2].id, title: SERVICE_SCULPTURES[2].title });

    // Nested Gyroscope Rings
    const g4 = new THREE.Group();
    const ring1Geo = new THREE.TorusGeometry(0.72, 0.05, 16, 48);
    const ring2Geo = new THREE.TorusGeometry(0.55, 0.05, 16, 48);
    const ring3Geo = new THREE.SphereGeometry(0.24, 24, 24);
    const gyroMat = new THREE.MeshStandardMaterial({
      color: SERVICE_SCULPTURES[3].color,
      roughness: 0.2,
      metalness: 0.85,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC6A46A,
      roughness: 0.3,
      metalness: 0.7,
    });
    const r1 = new THREE.Mesh(ring1Geo, gyroMat);
    const r2 = new THREE.Mesh(ring2Geo, goldMat);
    const r3 = new THREE.Mesh(ring3Geo, gyroMat);
    r2.rotation.x = Math.PI / 2.5;
    g4.add(r1);
    g4.add(r2);
    g4.add(r3);
    g4.position.set(...(SERVICE_SCULPTURES[3].pos as [number, number, number]));
    g4.userData = { id: SERVICE_SCULPTURES[3].id, title: SERVICE_SCULPTURES[3].title };
    mainGroup.add(g4);
    sculptureMeshes.push({ group: g4, id: SERVICE_SCULPTURES[3].id, title: SERVICE_SCULPTURES[3].title });

    // 6. Dynamic 3D Lights — Warm Ivory, Gold, Vermilion Rim, & Forest Ambient
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFDFBF7, 2.2);
    dirLight.position.set(4, 6, 5);
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xC6A46A, 2.2, 11);
    goldPoint.position.set(-2, 3, 3);
    scene.add(goldPoint);

    const vermilionPoint = new THREE.PointLight(0xE85D3F, 2.3, 10);
    vermilionPoint.position.set(3, -2, 2);
    scene.add(vermilionPoint);

    const forestPoint = new THREE.PointLight(0x24483B, 2.0, 9);
    forestPoint.position.set(-3, 2, -2);
    scene.add(forestPoint);

    // 7. Interactive Mouse / Pointer
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
        targetRotY += deltaX * 0.005;
        targetRotX += deltaY * 0.005;
        prevPointerX = clientX;
        prevPointerY = clientY;
      }

      // Check hover
      raycaster.setFromCamera(mouseVector, camera);
      const objectsToCheck: THREE.Object3D[] = [];
      sculptureMeshes.forEach((s) => objectsToCheck.push(...s.group.children));
      const intersects = raycaster.intersectObjects(objectsToCheck);
      if (intersects.length > 0) {
        const parent = intersects[0].object.parent;
        if (parent && parent.userData?.title) {
          setHoveredTitle(parent.userData.title);
          container.style.cursor = "pointer";
        }
      } else {
        setHoveredTitle(null);
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
        const objectsToCheck: THREE.Object3D[] = [];
        sculptureMeshes.forEach((s) => objectsToCheck.push(...s.group.children));
        const intersects = raycaster.intersectObjects(objectsToCheck);
        if (intersects.length > 0) {
          const parent = intersects[0].object.parent;
          if (parent && parent.userData?.id) {
            const targetId = parent.userData.id;
            if (onSelectSculpture) {
              onSelectSculpture(targetId);
            } else {
              const el = document.getElementById(targetId);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
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

    // 8. Resize Observer
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

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle float for each sculpture
      g1.rotation.y = elapsed * 0.45;
      g1.rotation.x = elapsed * 0.25;
      g1.position.y = SERVICE_SCULPTURES[0].pos[1] + Math.sin(elapsed * 1.2) * 0.08;

      g2.rotation.x = elapsed * 0.35;
      g2.rotation.y = elapsed * 0.28;
      g2.position.y = SERVICE_SCULPTURES[1].pos[1] + Math.cos(elapsed * 1.1) * 0.08;

      g3.rotation.y = elapsed * 0.4;
      g3.rotation.z = elapsed * 0.3;
      g3.position.y = SERVICE_SCULPTURES[2].pos[1] + Math.sin(elapsed * 1.3 + 1) * 0.08;

      r1.rotation.x = elapsed * 0.5;
      r2.rotation.y = elapsed * 0.7;
      g4.position.y = SERVICE_SCULPTURES[3].pos[1] + Math.cos(elapsed * 1.0 + 2) * 0.08;

      // Group tilt
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.07;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.07;

      dust.rotation.y = elapsed * 0.02;

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
      octGeo.dispose();
      octMat.dispose();
      torGeo.dispose();
      torMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      gyroMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectSculpture]);

  if (!webGlSupported) return null;

  return (
    <div className={`relative w-full h-[320px] sm:h-[400px] select-none ${className || ""}`}>
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD & Instructions */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2.5 px-4 py-2 rounded-full glass-content-card border border-sage/25 text-ink text-[11px] font-medium shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion shadow-[0_0_8px_rgba(232,93,63,0.7)]" />
        </span>
        <span className="font-semibold text-forest">Interactive 3D Sanctuary</span>
        <span className="text-ink-muted/60 hidden sm:inline">| Drag to tilt • Click sculpture to jump to service</span>
      </div>

      {hoveredTitle && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-5 py-2.5 rounded-full glass-card border border-forest/25 text-ink text-xs font-serif font-semibold shadow-xl animate-fadeIn flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-forest" />
          <span className="text-forest font-bold">{hoveredTitle}</span>
          <span className="text-[10px] font-sans font-normal text-ink-muted">· Click to explore clinical details</span>
        </div>
      )}
    </div>
  );
}
