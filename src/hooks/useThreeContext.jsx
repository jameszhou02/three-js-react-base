import React, { createContext, useContext, useState } from "react";

// Create context for sharing Three.js state across components
const ThreeContext = createContext();

export const ThreeProvider = ({ children }) => {
  const [sceneReady, setSceneReady] = useState(false);
  const [activeCameraPosition, setActiveCameraPosition] = useState([0, 0, 5]);
  const [fps, setFps] = useState(0);

  // Calculate FPS and update state
  const updateFps = (newFps) => {
    setFps(Math.round(newFps));
  };

  // Update camera position
  const updateCameraPosition = (position) => {
    setActiveCameraPosition(position);
  };

  // Value to be provided by context
  const value = {
    sceneReady,
    setSceneReady,
    activeCameraPosition,
    updateCameraPosition,
    fps,
    updateFps,
  };

  return (
    <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>
  );
};

// Hook to use the Three.js context
export const useThreeContext = () => {
  const context = useContext(ThreeContext);
  if (context === undefined) {
    throw new Error("useThreeContext must be used within a ThreeProvider");
  }
  return context;
};

export default useThreeContext;
