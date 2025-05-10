import path from 'path';

import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Import routes
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';

// Load environment variables
dotenv.config();

// Install Remix globals
installGlobals();

const VITE_DEV_SERVER_URL = 'http://localhost:5173'; // Default Vite dev server port for Remix

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from 'public' folder
app.use(express.static('public'));

// Serve build artifacts from 'public/build' (Remix convention for Vite)
// or 'build' (Remix convention for classic compiler)
// Rsbuild output might be different, we'll adjust this path as Rsbuild integration progresses
app.use("/build", express.static("public/build")); 

// API routes (these should come before the Remix handler)
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Remix request handler
if (process.env.NODE_ENV === 'development') {
  // When using `remix dev --manual` and Vite, Remix handles HMR via Vite's dev server.
  // We need to proxy requests to the Vite dev server.
  // For Rsbuild, this might need a different approach or Rsbuild's dev server proxy.
  // For now, assuming a direct Remix handler or a simple proxy if Vite were used.
  // This part will be critical for Rsbuild integration.
  console.log(`Development mode: Remix will be served directly by Express or expect HMR from a dev server.`);
  // If NOT using Vite's dev server for HMR, then the Remix handler is used directly:
  app.all(
    "*",
    createRequestHandler({
      build: async () => {
        // Dynamically import the server build for HMR
        // The path might change depending on `remix.config.js` serverBuildPath
        // or Rsbuild's output for the server bundle.
         
        const build = await import("../../build/index.js?t=" + Date.now());
        return build;
      },
      mode: process.env.NODE_ENV,
    })
  );
} else {
  // Production mode: serve the stable build
  app.all(
    "*",
    createRequestHandler({
      // @ts-ignore - this is a path to the server build, not a module directly
      // eslint-disable-next-line import/no-unresolved
      build: await import("../../build/index.js"), // Adjust path as necessary
      mode: process.env.NODE_ENV,
    })
  );
}

// Start the server only when not in a serverless environment (like Vercel)
// and when this file is run directly.
// For local development, `bun src/server/index.ts` or `npm run dev` will trigger this.
// Vercel will import `app` and handle the serving.
if (process.env.NODE_ENV !== 'production' || process.env.LOCAL_DEV === 'true') {
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
    if (process.env.NODE_ENV === 'development') {
      console.log(`Remix app running at http://localhost:${PORT}/`);
    }
  });
}

export default app;