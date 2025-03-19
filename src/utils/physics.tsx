import { useCallback } from "react";
import * as THREE from "three";
import {
  PhysicsMaterial,
  PhysicsPreset,
  PhysicsWorldConfig,
  PhysicsApi,
  CollisionGroups as CollisionGroupsType,
  PhysicsControls,
  Vector3Tuple,
} from "../types";

// Common physics materials with appropriate properties
export const PHYSICS_MATERIALS: Record<string, PhysicsMaterial> = {
  default: { restitution: 0.3, friction: 0.5 },
  bouncy: { restitution: 0.8, friction: 0.3 },
  slippery: { restitution: 0.2, friction: 0.1 },
  sticky: { restitution: 0.1, friction: 0.9 },
  wood: { restitution: 0.2, friction: 0.6 },
  metal: { restitution: 0.5, friction: 0.5 },
  glass: { restitution: 0.7, friction: 0.2 },
};

// Common collision groups for filtering collisions
export const COLLISION_GROUPS: CollisionGroupsType = {
  DEFAULT: 1,
  STATIC: 2,
  DYNAMIC: 4,
  PLAYER: 8,
  ENEMY: 16,
  PROJECTILE: 32,
  TRIGGER: 64,
  SENSOR: 128,
};

// Utility to create collision filters
export const createCollisionFilter = (
  belongsTo: number,
  collidesWith: number
) => ({
  belongsTo,
  collidesWith,
});

// Common physics presets for different object types
export const PHYSICS_PRESETS: Record<string, PhysicsPreset> = {
  static: {
    mass: 0,
    material: PHYSICS_MATERIALS.default,
  },
  dynamic: {
    mass: 1,
    material: PHYSICS_MATERIALS.default,
    linearDamping: 0.1,
    angularDamping: 0.1,
  },
  character: {
    mass: 80,
    material: PHYSICS_MATERIALS.default,
    linearDamping: 0.5,
    angularDamping: 0.99,
    fixedRotation: true,
  },
  vehicle: {
    mass: 1200,
    material: PHYSICS_MATERIALS.default,
    linearDamping: 0.1,
    angularDamping: 0.5,
  },
};

// Hook to handle physics interactions like applying forces
export const usePhysicsControls = (api: PhysicsApi | null): PhysicsControls => {
  const applyForce = useCallback(
    (force: Vector3Tuple, worldPoint: Vector3Tuple = [0, 0, 0]) => {
      if (api) {
        api.applyForce(force, worldPoint);
      }
    },
    [api]
  );

  const applyImpulse = useCallback(
    (impulse: Vector3Tuple, worldPoint: Vector3Tuple = [0, 0, 0]) => {
      if (api) {
        api.applyImpulse(impulse, worldPoint);
      }
    },
    [api]
  );

  const setVelocity = useCallback(
    (velocity: Vector3Tuple) => {
      if (api) {
        api.velocity.set(...velocity);
      }
    },
    [api]
  );

  const setAngularVelocity = useCallback(
    (angularVelocity: Vector3Tuple) => {
      if (api) {
        api.angularVelocity.set(...angularVelocity);
      }
    },
    [api]
  );

  const setPosition = useCallback(
    (position: Vector3Tuple) => {
      if (api) {
        api.position.set(...position);
      }
    },
    [api]
  );

  const resetTransform = useCallback(() => {
    if (api) {
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    }
  }, [api]);

  return {
    applyForce,
    applyImpulse,
    setVelocity,
    setAngularVelocity,
    setPosition,
    resetTransform,
  };
};

// Physics configuration presets for different scenarios
export const PHYSICS_WORLD_CONFIGS: Record<string, PhysicsWorldConfig> = {
  standard: {
    gravity: [0, -9.81, 0],
    defaultContactMaterial: PHYSICS_MATERIALS.default,
  },
  space: {
    gravity: [0, 0, 0],
    defaultContactMaterial: PHYSICS_MATERIALS.slippery,
  },
  moon: {
    gravity: [0, -1.62, 0],
    defaultContactMaterial: PHYSICS_MATERIALS.default,
  },
  water: {
    gravity: [0, -2, 0],
    defaultContactMaterial: PHYSICS_MATERIALS.slippery,
  },
};

// Helper to map mesh to appropriate physics body
export const getCollisionShapeFromMesh = (mesh: THREE.Mesh | null): string => {
  // This is a simplified version
  // In a real implementation, you would analyze the geometry
  if (!mesh) return "box";

  const geometry = mesh.geometry;
  const type = geometry?.type || "";

  if (type.includes("Sphere")) return "sphere";
  if (type.includes("Plane")) return "plane";
  if (type.includes("Cylinder")) return "cylinder";
  if (type.includes("Cone")) return "cylinder"; // Approximation
  if (type.includes("Capsule")) return "capsule";

  return "box"; // Default fallback
};

// Create a simplified collision shape for complex meshes
export const createSimplifiedCollisionShape = (mesh: THREE.Object3D | null) => {
  if (!mesh) return null;

  // Here we would implement more complex logic to generate
  // simplified collision shapes for performance
  // This is a placeholder implementation
  const box = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  box.getSize(size);

  return {
    type: "box",
    args: [size.x, size.y, size.z],
  };
};

export default {
  PHYSICS_MATERIALS,
  COLLISION_GROUPS,
  PHYSICS_PRESETS,
  PHYSICS_WORLD_CONFIGS,
  createCollisionFilter,
  usePhysicsControls,
  getCollisionShapeFromMesh,
  createSimplifiedCollisionShape,
};
