import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Physics,
  useBox,
  usePlane,
  useCompoundBody,
} from "@react-three/cannon";
import {
  PHYSICS_MATERIALS,
  COLLISION_GROUPS,
  PHYSICS_WORLD_CONFIGS,
  usePhysicsControls,
} from "../utils/physics";
import {
  FloorProps,
  PhysicsObjectProps,
  Vector3Tuple,
  PhysicsApi,
} from "../types";
import type { PublicApi } from "@react-three/cannon";

/**
 * Helper function to safely convert from @react-three/cannon's API to our PhysicsApi type
 * This is type-safe and ensures we only access methods that exist on both types
 */
function toPhysicsApi(api: PublicApi): PhysicsApi {
  return {
    position: api.position,
    rotation: api.rotation,
    velocity: api.velocity,
    angularVelocity: api.angularVelocity,
    applyForce: api.applyForce,
    applyImpulse: api.applyImpulse,
    applyTorque: api.applyTorque,
    sleep: api.sleep,
    wakeUp: api.wakeUp,
  };
}

// Reusable floor component with physics
const Floor = ({ size = [10, 10], position = [0, 0, 0] }: FloorProps) => {
  // Note args is an array
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: position as Vector3Tuple,
    args: size,
    type: "Static",
    material: PHYSICS_MATERIALS.default,
    collisionFilterGroup: COLLISION_GROUPS.STATIC,
    collisionFilterMask: COLLISION_GROUPS.DEFAULT | COLLISION_GROUPS.DYNAMIC,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[...size]} />
      <meshStandardMaterial color="#303030" />
    </mesh>
  );
};

// Reusable box component with physics
const PhysicsBox = ({
  size = [1, 1, 1],
  position = [0, 0, 0],
  color = "white",
  mass = 1,
  isDraggable = false,
}: PhysicsObjectProps) => {
  // Using proper args as an array
  const [ref, api] = useBox(() => ({
    mass,
    position: position as Vector3Tuple,
    args: size,
    material: PHYSICS_MATERIALS.default,
    collisionFilterGroup: COLLISION_GROUPS.DYNAMIC,
    collisionFilterMask:
      COLLISION_GROUPS.DEFAULT |
      COLLISION_GROUPS.STATIC |
      COLLISION_GROUPS.DYNAMIC,
  }));

  // Track position for dragging
  const [isDragging, setIsDragging] = useState(false);
  const currentPos = useRef<Vector3Tuple>([0, 0, 0]);

  // Subscribe to position updates - proper cleanup
  useEffect(() => {
    if (!isDraggable) return;

    const unsubscribe = api.position.subscribe((p) => {
      currentPos.current = p;
    });

    return unsubscribe;
  }, [api.position, isDraggable]);

  // Handle dragging
  useFrame(() => {
    if (isDraggable && isDragging) {
      api.velocity.set(0, 0, 0);
      api.position.set(
        currentPos.current[0],
        Math.max(size[1] / 2, currentPos.current[1]),
        currentPos.current[2]
      );
    }
  });

  // Use our custom hook for physics controls
  // Convert api to PhysicsApi safely using our utility function
  const { applyImpulse, resetTransform } = usePhysicsControls(
    toPhysicsApi(api)
  );

  // Event handlers for interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggable) return;

    e.stopPropagation();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    resetTransform();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggable) return;

    e.stopPropagation();
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Apply random impulse on release
    applyImpulse(
      [Math.random() * 5 - 2.5, Math.random() * 10, Math.random() * 5 - 2.5],
      [0, 0, 0]
    );
  };

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        opacity={isDragging ? 0.6 : 1}
        transparent={isDragging}
      />
    </mesh>
  );
};

// Complex object with compound physics body
const CompoundObject = ({
  position = [0, 0, 0],
}: {
  position?: Vector3Tuple;
}) => {
  // Using compound body for complex shapes
  const [ref, api] = useCompoundBody(() => ({
    mass: 1,
    position,
    shapes: [
      { type: "Box", position: [0, 0, 0], args: [1, 0.5, 1] },
      { type: "Sphere", position: [0, 0.5, 0], args: [0.5] },
    ],
    linearDamping: 0.2,
    angularDamping: 0.2,
  }));

  // Apply initial force
  useEffect(() => {
    api.applyTorque([0, 10, 0]);
  }, [api]);

  return (
    <group ref={ref}>
      {/* Base box */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial color="teal" />
      </mesh>

      {/* Top sphere */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="coral" />
      </mesh>
    </group>
  );
};

// Main component that demonstrates proper usage
const PhysicsExample = () => {
  return (
    <Physics {...PHYSICS_WORLD_CONFIGS.standard}>
      {/* Static environment */}
      <Floor size={[20, 20]} />

      {/* Dynamic objects */}
      <PhysicsBox position={[0, 5, 0]} color="royalblue" isDraggable={true} />
      <PhysicsBox
        position={[2, 8, -2]}
        size={[1.5, 1.5, 1.5]}
        color="tomato"
        isDraggable={true}
      />
      <PhysicsBox
        position={[-2, 3, 1]}
        size={[0.5, 2, 0.5]}
        color="limegreen"
      />

      {/* Compound physics object */}
      <CompoundObject position={[4, 5, 3]} />
    </Physics>
  );
};

export default PhysicsExample;
