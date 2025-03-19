import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Mesh } from "three";
import { SceneProps, Vector3Tuple } from "../types";

const SceneContent = () => {
  const boxRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.5;
      boxRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Meshes */}
      <mesh ref={boxRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </>
  );
};

const Scene = ({
  shadows = true,
  camera = { position: [3, 3, 3], fov: 75 },
}: SceneProps) => {
  const { position, fov } = camera;

  return (
    <Canvas shadows={shadows}>
      <PerspectiveCamera
        makeDefault
        position={position as Vector3Tuple}
        fov={fov}
      />
      <OrbitControls enableDamping dampingFactor={0.05} />
      <SceneContent />
    </Canvas>
  );
};

export default Scene;
