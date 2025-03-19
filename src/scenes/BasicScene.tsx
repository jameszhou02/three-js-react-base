import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useThreeContext } from "../hooks/useThreeContext";

// Main scene content separate from Canvas for better organization
const SceneContent = () => {
  const { setSceneReady } = useThreeContext();

  useEffect(() => {
    // Signal that the scene is ready
    setSceneReady(true);

    return () => {
      setSceneReady(false);
    };
  }, [setSceneReady]);

  return (
    <>
      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
      />

      {/* Environment and lighting */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

      {/* Scene objects */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2196f3" roughness={0.5} metalness={0.2} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
      </mesh>
    </>
  );
};

// Loading fallback displayed while scene assets are loading
const LoadingFallback = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ff6347" wireframe />
    </mesh>
  );
};

// Main scene component
const BasicScene = () => {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <Suspense fallback={<LoadingFallback />}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
};

export default BasicScene;
