import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Physics,
  useBox,
  usePlane,
  useSpring,
  useSphere,
} from "@react-three/cannon";
import * as THREE from "three";
import type { Triplet, PlaneProps } from "@react-three/cannon";

// Floor plane
function Floor(props: PlaneProps) {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#303030" />
    </mesh>
  );
}

// Chain link consisting of boxes connected by springs
interface ChainProps {
  position: Triplet;
  links?: number;
  linkLength?: number;
}

function Chain({ position, links = 8, linkLength = 0.5 }: ChainProps) {
  return (
    <group position={position}>
      {/* Fixed anchor at the top */}
      <Anchor position={[0, 0, 0]} />

      {/* Create chain links */}
      {Array.from({ length: links }).map((_, i) => (
        <ChainLink
          key={i}
          position={[0, -(i + 1) * linkLength, 0]}
          previousPosition={[0, -i * linkLength, 0]}
          isFirst={i === 0}
        />
      ))}
    </group>
  );
}

// Fixed anchor point
interface AnchorProps {
  position: Triplet;
}

function Anchor({ position }: AnchorProps) {
  const [ref] = useBox<THREE.Mesh>(() => ({
    mass: 0,
    position,
    args: [0.3, 0.3, 0.3],
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// Individual chain link with spring constraint
interface ChainLinkProps {
  position: Triplet;
  previousPosition: Triplet;
  isFirst: boolean;
}

function ChainLink({ position, previousPosition, isFirst }: ChainLinkProps) {
  const [ref, _api] = useBox<THREE.Mesh>(() => ({
    mass: 1,
    position,
    args: [0.25, 0.25, 0.25],
    linearDamping: 0.5,
  }));

  // Create spring constraint to previous link
  useSpring(ref, isFirst ? null : undefined, {
    worldAnchorA: previousPosition,
    worldAnchorB: position,
    restLength: 0.5,
    stiffness: 100,
    damping: 5,
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial color="#1e88e5" />
    </mesh>
  );
}

// Pendulum with a sphere at the end
interface PendulumProps {
  position: Triplet;
  length?: number;
  sphereRadius?: number;
}

function Pendulum({ position, length = 3, sphereRadius = 0.5 }: PendulumProps) {
  // Anchor at the top
  const [anchorRef] = useBox<THREE.Mesh>(() => ({
    mass: 0,
    position,
    args: [0.2, 0.2, 0.2],
  }));

  // Pendulum bob
  const [bobRef, api] = useSphere<THREE.Mesh>(() => ({
    mass: 1,
    position: [position[0], position[1] - length, position[2]],
    args: [sphereRadius],
    linearDamping: 0.2,
  }));

  // Connect anchor to bob with a spring constraint
  useSpring(anchorRef, bobRef, {
    restLength: length,
    stiffness: 50,
    damping: 1,
  });

  // Give the pendulum an initial push
  useEffect(() => {
    api.applyImpulse([5, 0, 0], [0, 0, 0]);
  }, [api]);

  // Draw a line to visualize the pendulum string
  const points = useRef([new THREE.Vector3(), new THREE.Vector3()]);
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (anchorRef.current && bobRef.current && lineRef.current) {
      // Update line points
      anchorRef.current.getWorldPosition(points.current[0]);
      bobRef.current.getWorldPosition(points.current[1]);

      // Update line geometry
      if (lineRef.current.geometry instanceof THREE.BufferGeometry) {
        lineRef.current.geometry.setFromPoints(points.current);
      }
    }
  });

  return (
    <>
      <mesh ref={anchorRef}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh ref={bobRef} castShadow>
        <sphereGeometry args={[sphereRadius, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <lineSegments ref={lineRef}>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial attach="material" color="white" linewidth={1} />
      </lineSegments>
    </>
  );
}

// Spring-connected boxes
interface SpringBoxesProps {
  position: Triplet;
}

function SpringBoxes({ position }: SpringBoxesProps) {
  // First box (fixed)
  const [boxARef] = useBox<THREE.Mesh>(() => ({
    mass: 0,
    position: [position[0] - 2, position[1], position[2]],
    args: [0.5, 0.5, 0.5],
  }));

  // Second box (movable)
  const [boxBRef, api] = useBox<THREE.Mesh>(() => ({
    mass: 1,
    position: [position[0] + 2, position[1], position[2]],
    args: [0.5, 0.5, 0.5],
    linearDamping: 0.5,
  }));

  // Connect boxes with a spring
  useSpring(boxARef, boxBRef, {
    restLength: 4,
    stiffness: 80,
    damping: 2,
  });

  // Apply periodic force to make it oscillate
  useFrame(({ clock }) => {
    if (boxBRef.current) {
      const t = clock.getElapsedTime();
      if (t % 3 < 0.1) {
        api.applyImpulse([10, 0, 0], [0, 0, 0]);
      }
    }
  });

  // Draw a line to visualize the spring
  const points = useRef([new THREE.Vector3(), new THREE.Vector3()]);
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (boxARef.current && boxBRef.current && lineRef.current) {
      // Update line points
      boxARef.current.getWorldPosition(points.current[0]);
      boxBRef.current.getWorldPosition(points.current[1]);

      // Update line geometry
      if (lineRef.current.geometry instanceof THREE.BufferGeometry) {
        lineRef.current.geometry.setFromPoints(points.current);
      }
    }
  });

  return (
    <>
      <mesh ref={boxARef} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh ref={boxBRef} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <lineSegments ref={lineRef}>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial attach="material" color="white" linewidth={1} />
      </lineSegments>
    </>
  );
}

function ConstraintsPhysicsScene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <Physics
        gravity={[0, -9.8, 0]}
        defaultContactMaterial={{ restitution: 0.3 }}
      >
        <Floor />

        {/* Chain of boxes */}
        <Chain position={[-5, 8, 0]} />

        {/* Pendulums */}
        <Pendulum position={[0, 8, 0]} length={5} sphereRadius={0.8} />
        <Pendulum position={[2, 8, 2]} length={4} sphereRadius={0.5} />
        <Pendulum position={[-2, 8, -2]} length={3} sphereRadius={0.6} />

        {/* Spring boxes */}
        <SpringBoxes position={[5, 3, 0]} />
      </Physics>

      <OrbitControls enableDamping />
      <gridHelper args={[30, 30, 0x444444, 0x222222]} />
    </Canvas>
  );
}

export default ConstraintsPhysicsScene;
