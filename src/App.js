import React, { useState } from "react";
import { ThreeProvider } from "./hooks/useThreeContext";
import Scene from "./components/Scene";
import BasicScene from "./scenes/BasicScene";

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
            background: activeScene === "simple" ? "#2196f3" : "#ffffff",
            color: activeScene === "simple" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Simple Scene
        </button>
      </div>

      <div style={{ width: "100vw", height: "100vh" }}>
        {activeScene === "basic" ? <BasicScene /> : <Scene />}
      </div>
    </ThreeProvider>
  );
}

export default App;
