import { Object3D, Group, Material, AnimationClip, Camera } from "three";
import type { Triplet } from "@pmndrs/cannon-worker-api";
import type { GLTF as ThreeJSGLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

declare module "@react-three/drei" {
  /**
   * Type definition for what is returned by the useGLTF hook from @react-three/drei.
   * This is different from the official ThreeJS GLTF type.
   *
   * - ThreeJSGLTF: The official Three.js GLTF interface from GLTFLoader
   * - DreiGLTFResult: What @react-three/drei's useGLTF hook actually returns
   */
  export interface DreiGLTFResult {
    // 3D objects organized by their names in the GLTF file
    nodes: Record<string, Object3D>;

    // Materials from the GLTF file
    materials: Record<string, Material>;

    // Animations from the GLTF file
    animations: AnimationClip[];

    // Main scene from the GLTF file
    scene: Group;

    // All scenes from the GLTF file
    scenes: Group[];

    // Cameras from the GLTF file
    cameras: Camera[];

    // Asset metadata
    asset: {
      generator: string;
      version: string;
    };

    // GLTF parser (implementation-specific)
    parser: unknown;

    // User data attached to the GLTF
    userData: Record<string, unknown>;
  }

  /**
   * useGLTF hook from @react-three/drei loads GLTF models and returns a DreiGLTFResult
   */
  export function useGLTF(url: string): DreiGLTFResult;

  // Static methods on useGLTF
  export namespace useGLTF {
    /**
     * Preloads a GLTF model to avoid loading delays when it's first rendered
     */
    function preload(url: string): void;
  }
}

declare module "@react-three/cannon" {
  export type ShapeType =
    | "Box"
    | "Sphere"
    | "Plane"
    | "Cylinder"
    | "Heightfield"
    | "Particle"
    | "Trimesh";

  /**
   * Common properties for all physics bodies
   */
  export interface BodyProps {
    type?: "Static" | "Dynamic" | "Kinematic";
    mass?: number;
    position?: Triplet;
    rotation?: Triplet;
    linearDamping?: number;
    angularDamping?: number;
    material?: {
      friction?: number;
      restitution?: number;
    };
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
    fixedRotation?: boolean;
    allowSleep?: boolean;
    sleepSpeedLimit?: number;
    sleepTimeLimit?: number;
    userData?: Record<string, unknown>;
    onCollide?: (event: CollisionEvent) => void;
    onCollideBegin?: (event: CollisionEvent) => void;
    onCollideEnd?: (event: CollisionEvent) => void;
  }

  /**
   * Event data for collision events
   */
  export interface CollisionEvent {
    body: Object3D;
    target: Object3D;
    contact: {
      ni: Triplet; // Normal impulse
      ri: Triplet; // Relative impulse
      rj: Triplet;
      impactVelocity: number;
    };
  }

  /**
   * Box-specific physics properties
   */
  export interface BoxProps extends BodyProps {
    args?: [width: number, height: number, depth: number];
  }

  /**
   * Sphere-specific physics properties
   */
  export interface SphereProps extends BodyProps {
    args?: [radius: number];
  }

  /**
   * Plane-specific physics properties
   */
  export interface PlaneProps extends BodyProps {
    args?: [width: number, height: number];
  }

  /**
   * Properties for the Physics component/world
   */
  export type PhysicsProps = {
    gravity?: Triplet;
    defaultContactMaterial?: {
      friction: number;
      restitution: number;
    };
    allowSleep?: boolean;
    iterations?: number;
    broadphase?: "Naive" | "SAP";
    size?: number;
    step?: number;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
  };
}

/**
 * Type definitions for events in @react-three/fiber
 */
declare module "@react-three/fiber" {
  export interface ThreeEvent<NativeEvent> {
    stopPropagation: () => void;
    target: Object3D<Event> & {
      setPointerCapture: (id: number) => void;
      releasePointerCapture: (id: number) => void;
    };
    pointerId: number;
    nativeEvent: NativeEvent;
    buttons: number;
    button: number;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    intersections: Intersection[];
    object: Object3D;
    eventObject: Object3D;
    unprojectedPoint: Vector3;
    ray: Ray;
    camera: Camera;
    delta: number;
    distance: number;
    point: Vector3;
    normal?: Vector3;
    uv?: Vector2;
    instanceId?: number;
    faceIndex?: number;
    face?: Face;
  }
}
