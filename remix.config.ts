import type { AppConfig } from '@remix-run/dev';

const config: AppConfig = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app", // default
  // assetsBuildDirectory: "public/build", // default
  // publicPath: "/build/", // default
  // serverBuildPath: "build/index.js", // default for classic compiler, server/index.mjs for Vite
  // serverModuleFormat: "esm", // default based on 'type: module' in package.json
  tailwind: true,
  postcss: true,
  watchPaths: ['./tailwind.config.ts'],
  future: {
    // v3_fetcherPersist: true,
    // v3_relativeSplatPath: true,
    // v3_throwAbortReason: true,
  },
  // Example: To bundle all server dependencies (if issues arise with CJS/ESM interop)
  // serverDependenciesToBundle: "all",
};

export default config;
