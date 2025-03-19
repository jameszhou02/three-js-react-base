import { ReactNode } from "react";
import { ThreeBaseProps } from "./three";
import { Vector3Tuple } from "./three";

// Generic children prop interface
export interface WithChildren {
  children?: ReactNode;
}

// Props for scene components
export interface SceneProps extends WithChildren {
  shadows?: boolean;
  camera?: {
    position?: Vector3Tuple;
    fov?: number;
  };
}

// Props for floor/plane components
export interface FloorProps extends ThreeBaseProps {
  size?: [number, number];
}

// Props for object with physics
export interface PhysicsObjectProps extends ThreeBaseProps {
  mass?: number;
  color?: string;
  isDraggable?: boolean;
  size?: [number, number, number];
}
