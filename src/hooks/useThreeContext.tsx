import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context
interface ThreeContextType {
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;
  activeCameraPosition: number[];
  updateCameraPosition: (position: number[]) => void;
  fps: number;
  updateFps: (newFps: number) => void;
}

// Create context with initial values
const ThreeContext = createContext<ThreeContextType | null>(null);

interface ThreeProviderProps {
  children: ReactNode;
}

export const ThreeProvider = ({ children }: ThreeProviderProps) => {
  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const [activeCameraPosition, setActiveCameraPosition] = useState<number[]>([
    0, 0, 5,
  ]);
  const [fps, setFps] = useState<number>(0);

  // Calculate FPS and update state
  const updateFps = (newFps: number) => {
    setFps(Math.round(newFps));
  };

  // Update camera position
  const updateCameraPosition = (position: number[]) => {
    setActiveCameraPosition(position);
  };

  // Value to be provided by context
  const value: ThreeContextType = {
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
export const useThreeContext = (): ThreeContextType => {
  const context = useContext(ThreeContext);
  if (context === null) {
    throw new Error("useThreeContext must be used within a ThreeProvider");
  }
  return context;
};

export default useThreeContext;
