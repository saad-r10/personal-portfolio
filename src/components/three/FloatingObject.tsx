"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, useCursor } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Group, Mesh } from "three";

const ACCENT = "#F5FF3A";
const PAPER = "#F6F3EC";

function Icosahedron({
  prefersReducedMotion,
  onDiscover,
}: {
  prefersReducedMotion: boolean;
  onDiscover: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const spinBoost = useRef(0);
  const [flash, setFlash] = useState(false);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const baseSpeed = prefersReducedMotion ? 0 : 0.15;
      meshRef.current.rotation.x += delta * (baseSpeed + spinBoost.current);
      meshRef.current.rotation.y += delta * (baseSpeed + 0.05 + spinBoost.current);
      spinBoost.current = Math.max(0, spinBoost.current - delta * 2.5);
    }

    if (groupRef.current && !prefersReducedMotion) {
      const targetY = state.pointer.x * 0.4;
      const targetX = -state.pointer.y * 0.3;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    }
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    spinBoost.current += 4;
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
    onDiscover();
  }

  return (
    <group ref={groupRef}>
      <Float
        speed={prefersReducedMotion ? 0 : 1.4}
        rotationIntensity={prefersReducedMotion ? 0 : 0.6}
        floatIntensity={prefersReducedMotion ? 0 : 1.2}
      >
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color={flash ? PAPER : ACCENT} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export function FloatingObject({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [message, setMessage] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleDiscover() {
    setMessage(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(false), 2400);
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Icosahedron prefersReducedMotion={!!prefersReducedMotion} onDiscover={handleDiscover} />
      </Canvas>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink"
          >
            you found it.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
