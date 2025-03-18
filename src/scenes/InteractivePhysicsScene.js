import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Draggable physics object
function DraggableObject({ position, size = [1, 1, 1], color = "white" }) {
  const { camera, gl, viewport } = useThree();
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: size,
  }));

  // Track if we're dragging this object
  const [isDragging, setIsDragging] = useState(false);
  const dragPos = useRef([0, 0, 0]);

  useEffect(() => {
    // Store position while dragging
    const unsubscribe = api.position.subscribe((p) => {
      dragPos.current = p;
    });

    return unsubscribe;
  }, [api.position]);

  useFrame(() => {
    if (isDragging) {
      // Calculate the position based on mouse position
      // This is a simplified version that works on a plane
      const x = dragPos.current[0];
      const y = Math.max(size[1] / 2 + 0.1, dragPos.current[1]); // Keep above ground
      const z = dragPos.current[2];

      // Set velocity to zero while dragging
      api.velocity.set(0, 0, 0);
      api.position.set(x, y, z);
    }
  });

  // Mouse event handlers
  const onPointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);

    // Apply a random impulse when releasing
    api.applyImpulse(
      [Math.random() * 5 - 2.5, Math.random() * 5, Math.random() * 5 - 2.5],
      [0, 0, 0]
    );
  };

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        opacity={isDragging ? 0.6 : 1}
        transparent={isDragging}
      />
    </mesh>
  );
}

// Floor plane
function Floor(props) {
  const [ref] = usePlane(() => ({
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

// Walls to contain objects
function Walls() {
  const wallProps = { mass: 0 };
  const wallThickness = 0.5;
  const wallHeight = 5;
  const wallSize = 15;

  return (
    <>
      {/* Back wall */}
      <Box
        position={[0, wallHeight / 2, -wallSize / 2]}
        args={[wallSize, wallHeight, wallThickness]}
        {...wallProps}
      />
      {/* Front wall */}
      <Box
        position={[0, wallHeight / 2, wallSize / 2]}
        args={[wallSize, wallHeight, wallThickness]}
        {...wallProps}
      />
      {/* Left wall */}
      <Box
        position={[-wallSize / 2, wallHeight / 2, 0]}
        args={[wallThickness, wallHeight, wallSize]}
        {...wallProps}
      />
      {/* Right wall */}
      <Box
        position={[wallSize / 2, wallHeight / 2, 0]}
        args={[wallThickness, wallHeight, wallSize]}
        {...wallProps}
      />
    </>
  );
}

// Simple box for walls
function Box({ position, args, ...props }) {
  const [ref] = useBox(() => ({ position, args, ...props }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#555555" transparent opacity={0.2} />
    </mesh>
  );
}

// Bouncy sphere
function BouncySphere({ position, radius = 1, color = "hotpink" }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [radius],
    // Make it bouncy
    restitution: 0.9,
  }));

  // Apply initial impulse
  useEffect(() => {
    api.applyImpulse([0, 10, 0], [0, 0, 0]);
  }, [api]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function InteractivePhysicsScene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
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
        <Walls />

        {/* Add some draggable objects */}
        <DraggableObject position={[0, 3, 0]} color="royalblue" />
        <DraggableObject
          position={[2, 5, -2]}
          size={[1.5, 1.5, 1.5]}
          color="tomato"
        />
        <DraggableObject
          position={[-2, 7, 1]}
          size={[1, 2, 1]}
          color="limegreen"
        />

        {/* Add some bouncy spheres */}
        <BouncySphere position={[3, 10, 3]} radius={0.7} color="gold" />
        <BouncySphere position={[-3, 8, -3]} radius={1.2} color="violet" />
      </Physics>

      <OrbitControls enableDamping />
      <gridHelper args={[30, 30, 0x444444, 0x222222]} />
    </Canvas>
  );
}

export default InteractivePhysicsScene;
