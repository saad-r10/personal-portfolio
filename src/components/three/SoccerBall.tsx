"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import type { Mesh } from "three";
import { useDiscoveries } from "@/lib/discoveries";

const RADIUS = 0.5;
const GRAVITY = 9;
const HIT_IMPULSE = 5.5;
const RESTITUTION = 0.45;
const TRAIL_LENGTH = 5;

const INK = "#15140F";
const PAPER = "#F6F3EC";
const ACCENT = "#F5FF3A";

function createBallTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  if (!ctx) return texture;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, size, size);

  function pentagon(cx: number, cy: number, r: number, color: string) {
    if (!ctx) return;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  const cell = size / 4;
  for (let row = -1; row <= 4; row++) {
    for (let col = -1; col <= 4; col++) {
      const offsetX = Math.abs(row % 2) * (cell / 2);
      pentagon(col * cell + offsetX, row * cell, cell * 0.4, INK);
    }
  }
  pentagon(cell * 1.5, cell * 1.5, cell * 0.4, ACCENT);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function Scene({
  prefersReducedMotion,
  onHit,
  onDrop,
}: {
  prefersReducedMotion: boolean;
  onHit: (streak: number) => void;
  onDrop: (finalStreak: number) => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const shadowRef = useRef<Mesh>(null);
  const trailRefs = useRef<Mesh[]>([]);
  const velocity = useRef({ x: 0, y: 2 });
  const deform = useRef(0);
  const grounded = useRef(false);
  const restTimer = useRef(0);
  const streakRef = useRef(0);
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => createBallTexture(), []);

  useCursor(hovered);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport } = state;
    const boundX = viewport.width / 2 - RADIUS - 0.3;
    const groundY = -viewport.height / 2 + RADIUS + 0.4;

    velocity.current.y -= GRAVITY * delta;
    mesh.position.x += velocity.current.x * delta;
    mesh.position.y += velocity.current.y * delta;

    if (mesh.position.x > boundX) {
      mesh.position.x = boundX;
      velocity.current.x *= -0.6;
    } else if (mesh.position.x < -boundX) {
      mesh.position.x = -boundX;
      velocity.current.x *= -0.6;
    }

    if (mesh.position.y < groundY) {
      mesh.position.y = groundY;
      if (Math.abs(velocity.current.y) > 0.6) {
        velocity.current.y *= -RESTITUTION;
        velocity.current.x *= 0.7;
        if (!grounded.current) {
          grounded.current = true;
          onDrop(streakRef.current);
          streakRef.current = 0;
        }
        if (!prefersReducedMotion) deform.current = 0.4;
      } else {
        velocity.current.y = 0;
        restTimer.current += delta;
        if (restTimer.current > 0.5) {
          velocity.current.y = 4;
          velocity.current.x = (Math.random() - 0.5) * 2;
          grounded.current = false;
          restTimer.current = 0;
        }
      }
    }

    deform.current = THREE.MathUtils.lerp(deform.current, 0, delta * 6);
    if (prefersReducedMotion) {
      mesh.scale.set(1, 1, 1);
    } else {
      mesh.scale.set(1 + deform.current * 0.5, 1 - deform.current, 1 + deform.current * 0.5);
    }

    if (!prefersReducedMotion) {
      mesh.rotation.z -= velocity.current.x * delta * 1.5;
      mesh.rotation.x += delta * 0.2;
    }

    if (shadowRef.current) {
      const height = mesh.position.y - groundY;
      const s = Math.max(0.3, 1 - height / 3);
      shadowRef.current.position.x = mesh.position.x;
      shadowRef.current.position.y = groundY - RADIUS + 0.02;
      shadowRef.current.scale.set(s, s * 0.35, 1);
      const material = shadowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.25 * s;
    }

    if (!prefersReducedMotion) {
      trailPositions.current.unshift({ x: mesh.position.x, y: mesh.position.y });
      if (trailPositions.current.length > TRAIL_LENGTH) trailPositions.current.pop();
      trailRefs.current.forEach((trailMesh, i) => {
        const p = trailPositions.current[i + 1];
        const material = trailMesh.material as THREE.MeshBasicMaterial;
        if (p) {
          trailMesh.position.set(p.x, p.y, -0.1);
          material.opacity = 0.15 * (1 - i / TRAIL_LENGTH);
        } else {
          material.opacity = 0;
        }
      });
    }
  });

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    const mesh = meshRef.current;
    if (!mesh) return;

    const offsetX = event.point.x - mesh.position.x;
    velocity.current.y = Math.max(velocity.current.y, 0) + HIT_IMPULSE;
    velocity.current.x += -offsetX * 2.5;
    grounded.current = false;
    restTimer.current = 0;
    if (!prefersReducedMotion) deform.current = -0.3;

    streakRef.current += 1;
    onHit(streakRef.current);
  }

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />

      <mesh ref={shadowRef} position={[0, -1.5, -0.01]}>
        <circleGeometry args={[RADIUS * 1.3, 32]} />
        <meshBasicMaterial color={INK} transparent opacity={0.2} />
      </mesh>

      {!prefersReducedMotion &&
        Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) trailRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[RADIUS * 0.9, 16, 16]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0} />
          </mesh>
        ))}

      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </>
  );
}

export function SoccerBall({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const prefersReducedMotion = useReducedMotion();
  const { discover } = useDiscoveries();
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  function handleHit(newStreak: number) {
    setStreak(newStreak);
    setBest((b) => Math.max(b, newStreak));
    if (newStreak === 5) discover("juggle-5");
    if (newStreak === 10) discover("juggle-10");
    if (newStreak === 25) discover("juggle-25");
  }

  function handleDrop(finalStreak: number) {
    setStreak(0);
    setBest((b) => Math.max(b, finalStreak));
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0.4, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene
          prefersReducedMotion={!!prefersReducedMotion}
          onHit={handleHit}
          onDrop={handleDrop}
        />
      </Canvas>

      <div className="pointer-events-none absolute left-6 top-6 flex flex-col gap-1">
        <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-accent-ink">
          {streak}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
          streak{best > 0 ? ` · best ${best}` : ""}
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
        click the ball
      </div>
    </div>
  );
}
