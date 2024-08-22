// src/server.ts

import fs from 'fs';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import filesRoute from './routes/files';
import menuRoute from './routes/menu';
import { initializeCacheAndWatcher } from './utils/cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Hono();

// Serve static files from the "public" directory
app.use("/public/*", serveStatic({ root: "./public" }));

app.use('/api/*', cors())

app.route('/api/menu', menuRoute);
app.route('/api/files', filesRoute);

// Fallback to serve index.html
app.get("*", (c) => {
  try {
    const htmlContent = fs.readFileSync(
      join(__dirname, "../public/index.html"),
      "utf-8",
    );
    return c.html(htmlContent);
  } catch (err) {
    console.error("Error loading index.html:", err);
    return c.text("Error loading index.html", 500);
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

// Initialize cache and watcher before the server starts
const initApp = async () => {
  await initializeCacheAndWatcher();
  serve({
    fetch: app.fetch,
    port,
  });
};

initApp().catch(console.error);
