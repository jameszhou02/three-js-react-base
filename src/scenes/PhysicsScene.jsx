import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
}

function Ball({ position, color }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.5],
  }));

  // Apply a random force on component mount
  React.useEffect(() => {
    api.applyImpulse(
      [Math.random() * 2 - 1, Math.random() * 10, Math.random() * 2 - 1],
      [0, 0, 0]
    );
  }, [api]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function PhysicsScene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Physics>
        <Plane />
        <Ball position={[0, 5, 0]} color="hotpink" />
        <Ball position={[1, 7, -1]} color="lightblue" />
        <Ball position={[-1, 9, 1]} color="orange" />
        <Ball position={[2, 6, 2]} color="lightgreen" />
        <Ball position={[-2, 8, -2]} color="yellow" />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}

export default PhysicsScene;
