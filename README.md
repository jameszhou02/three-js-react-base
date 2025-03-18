# Minimal Three.js React Template

A minimal, best-practices template for Three.js applications built with React.

## Features

- **Optimized Structure**: Clean project organization with a focus on maintainability
- **Resource Management**: Proper cleanup of Three.js resources
- **Reusable Components**: Modular design for building complex 3D applications
- **Best Practices**: Following React and Three.js ecosystem recommendations

## Project Structure

```
src/
  components/          # Reusable Three.js components
    Scene.jsx          # Generic scene with camera controls
    Model.jsx          # Model loader with resource management
  hooks/               # Custom React hooks
    useThreeContext.js # Context for sharing Three.js state
  scenes/              # Scene definitions
    BasicScene.jsx     # Example scene with best practices
  App.js               # Main application component
  index.js             # Application entry point
  index.css            # Global styling
```

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm start
   ```

## Best Practices Used

1. **Resource Management**

   - Proper disposal of geometries and materials
   - Component unmount cleanup

2. **Performance Optimization**

   - FPS monitoring
   - React.memo for expensive components
   - Suspense for code splitting

3. **Code Organization**
   - Separation of concerns
   - Reusable hooks and components

## Dependencies

- [React](https://reactjs.org/) - UI library
- [Three.js](https://threejs.org/) - 3D graphics library
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [@react-three/drei](https://docs.pmnd.rs/drei) - Useful helpers for react-three-fiber
