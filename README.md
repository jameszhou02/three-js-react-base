# Minimal Three.js React Template

A minimal, best-practices template for Three.js applications built with React and Vite.

## Features

- **Optimized Structure**: Clean project organization with a focus on maintainability
- **Resource Management**: Proper cleanup of Three.js resources
- **Reusable Components**: Modular design for building complex 3D applications
- **Best Practices**: Following React and Three.js ecosystem recommendations
- **Fast Development**: Powered by Vite for lightning-fast builds and hot module replacement

## Project Structure

```
src/
  components/          # Reusable Three.js components
    Scene.jsx          # Generic scene with camera controls
    Model.jsx          # Model loader with resource management
  hooks/               # Custom React hooks
    useThreeContext.jsx # Context for sharing Three.js state
  scenes/              # Scene definitions
    BasicScene.jsx     # Example scene with best practices
  App.jsx              # Main application component
  index.jsx            # Application entry point
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
4. Build for production:
   ```
   pnpm build
   ```
5. Preview production build:
   ```
   pnpm preview
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
- [@react-three/cannon](https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon/README.md) - React hooks for cannon-es. Use this in combination with react-three-fiber
- [Vite](https://vitejs.dev/) - Next generation frontend tooling