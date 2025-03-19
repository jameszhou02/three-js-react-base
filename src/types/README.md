# TypeScript Types for Three.js Base Project

This directory contains TypeScript type definitions for the Three.js Base project. These types help ensure code quality and provide better developer experience with autocompletion and error checking.

## Structure

- `index.ts`: Main entry point that exports all types
- `three.ts`: Types related to Three.js core functionality
- `physics.ts`: Types for physics simulation (Cannon.js)
- `components.ts`: Types for React components and props
- `declarations.d.ts`: Module declarations for third-party libraries

## Usage

Import types from the types directory:

```typescript
import { Vector3Tuple, ModelProps, PhysicsApi } from "../types";
```

## Type Categories

### Three.js Types

Basic Three.js types like vectors, matrices, and geometries.

### Physics Types

Types for physics simulation, including:

- Material properties
- Physics APIs
- Collision groups
- World configurations

### Component Props

Props for React components, including:

- Scene props
- Model props
- Physics object props

## Third-Party Library Declarations

The `declarations.d.ts` file provides type definitions for third-party libraries that may not have their own TypeScript definitions, or where we need to extend the existing definitions.

## Best Practices

1. Always provide explicit types for props, state, and function parameters
2. Use strict typing where possible
3. Use appropriate generic types
4. Avoid using `any` unless absolutely necessary
5. Add proper JSDoc comments for complex types
