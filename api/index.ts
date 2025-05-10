// api/index.ts
// This file acts as the entry point for Vercel's Node.js runtime.
// It imports the Express app from your main server file.

import app from '../src/server/index';

// Vercel will take this Express app instance and handle the HTTP listening part.
export default app;
