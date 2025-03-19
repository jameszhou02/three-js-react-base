// Export all types from their respective files
export * from "./three";
export * from "./physics";
export * from "./components";

// Export type declaration for drei and fiber
// This allows us to add type declarations for third-party libraries
declare module "@react-three/fiber" {
  // Add custom types here if needed
}

declare module "@react-three/drei" {
  // Add custom types here if needed
}

declare module "@react-three/cannon" {
  // Add custom types here if needed
}
