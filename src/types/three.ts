import { Vector3, Euler } from "three";

// Common Vector3-like types
export type Vector3Tuple = [x: number, y: number, z: number];

// Type for props that can accept either Vector3, tuple, or number
export type Vector3Like = Vector3 | Vector3Tuple | number;

// Type for rotation (Euler-like)
export type EulerTuple = [x: number, y: number, z: number];
export type EulerLike = Euler | EulerTuple;

// Common component props
export interface ThreeBaseProps {
  position?: Vector3Tuple;
  rotation?: EulerTuple;
  scale?: Vector3Like;
}

// Model specific props
export interface ModelProps extends ThreeBaseProps {
  url: string;
  animate?: boolean;
}
