import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Material, Object3D, Mesh } from "three";
import { ModelProps } from "../types";

/**
 * 3D Model component that loads and displays a GLTF model
 */
const Model = ({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animate = false,
}: ModelProps) => {
  const groupRef = useRef<Group>(null);

  // Using the DreiGLTFResult type defined in declarations.d.ts
  // This is different from Three.js's GLTF type
  const { scene } = useGLTF(url);

  // Handle rotation animation if animate is true
  useFrame((_, delta) => {
    if (animate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((object: Object3D) => {
          if ((object as Mesh).isMesh) {
            const mesh = object as Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material: Material) =>
                  material.dispose()
                );
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

export default Model;

// Preload the model to avoid jank during first render
// useGLTF.preload('/path/to/your/model.glb');
