import { Vector3Tuple } from "./three";

// Physics material properties
export interface PhysicsMaterial {
  restitution: number;
  friction: number;
}

// Physics API from cannon.js bodies
export interface PhysicsApi {
  position: {
    subscribe: (callback: (position: Vector3Tuple) => void) => () => void;
    set: (...args: number[]) => void;
  };
  rotation: {
    subscribe: (callback: (rotation: Vector3Tuple) => void) => () => void;
    set: (...args: number[]) => void;
  };
  velocity: {
    subscribe: (callback: (velocity: Vector3Tuple) => void) => () => void;
    set: (...args: number[]) => void;
  };
  angularVelocity: {
    subscribe: (
      callback: (angularVelocity: Vector3Tuple) => void
    ) => () => void;
    set: (...args: number[]) => void;
  };
  applyForce: (force: Vector3Tuple, worldPoint: Vector3Tuple) => void;
  applyImpulse: (impulse: Vector3Tuple, worldPoint: Vector3Tuple) => void;
  applyTorque: (torque: Vector3Tuple) => void;
  sleep: () => void;
  wakeUp: () => void;
}

// Collision filter groups
export interface CollisionGroups {
  DEFAULT: number;
  STATIC: number;
  DYNAMIC: number;
  PLAYER: number;
  ENEMY: number;
  PROJECTILE: number;
  TRIGGER: number;
  SENSOR: number;
}

// Physics world configurations
export interface PhysicsWorldConfig {
  gravity: Vector3Tuple;
  defaultContactMaterial: PhysicsMaterial;
}

// Physics object presets
export interface PhysicsPreset {
  mass: number;
  material: PhysicsMaterial;
  linearDamping?: number;
  angularDamping?: number;
  fixedRotation?: boolean;
}

// Types for usePhysicsControls hook
export interface PhysicsControls {
  applyForce: (force: Vector3Tuple, worldPoint?: Vector3Tuple) => void;
  applyImpulse: (impulse: Vector3Tuple, worldPoint?: Vector3Tuple) => void;
  setVelocity: (velocity: Vector3Tuple) => void;
  setAngularVelocity: (angularVelocity: Vector3Tuple) => void;
  setPosition: (position: Vector3Tuple) => void;
  resetTransform: () => void;
}
