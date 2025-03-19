/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly [key: string]: string | boolean | undefined;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
  };
}
