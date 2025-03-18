import React, { useState } from "react";
import { ThreeProvider } from "./hooks/useThreeContext.jsx";
import Scene from "./components/Scene.jsx";
import BasicScene from "./scenes/BasicScene.jsx";
import PhysicsScene from "./scenes/PhysicsScene.jsx";
import InteractivePhysicsScene from "./scenes/InteractivePhysicsScene.jsx";
import ConstraintsPhysicsScene from "./scenes/ConstraintsPhysicsScene.jsx";

function App() {
  const [activeScene, setActiveScene] = useState("basic");

  return (
    <ThreeProvider>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          padding: "1rem",
          color: "white",
        }}
      >
        <button
          onClick={() => setActiveScene("basic")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "1rem",
            background: activeScene === "basic" ? "#2196f3" : "#ffffff",
            color: activeScene === "basic" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Basic Scene
        </button>
        <button
          onClick={() => setActiveScene("simple")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "1rem",
            background: activeScene === "simple" ? "#2196f3" : "#ffffff",
            color: activeScene === "simple" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Simple Scene
        </button>
        <button
          onClick={() => setActiveScene("physics")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "1rem",
            background: activeScene === "physics" ? "#2196f3" : "#ffffff",
            color: activeScene === "physics" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Physics Scene
        </button>
        <button
          onClick={() => setActiveScene("interactive")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "1rem",
            background: activeScene === "interactive" ? "#2196f3" : "#ffffff",
            color: activeScene === "interactive" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Interactive Physics
        </button>
        <button
          onClick={() => setActiveScene("constraints")}
          style={{
            padding: "0.5rem 1rem",
            background: activeScene === "constraints" ? "#2196f3" : "#ffffff",
            color: activeScene === "constraints" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Physics Constraints
        </button>
      </div>

      <div style={{ width: "100vw", height: "100vh" }}>
        {activeScene === "basic" ? (
          <BasicScene />
        ) : activeScene === "simple" ? (
          <Scene />
        ) : activeScene === "physics" ? (
          <PhysicsScene />
        ) : activeScene === "interactive" ? (
          <InteractivePhysicsScene />
        ) : (
          <ConstraintsPhysicsScene />
        )}
      </div>
    </ThreeProvider>
  );
}

export default App;
