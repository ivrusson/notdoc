import { Hono } from 'hono';
import { getMenuCache } from '@/utils/cache';

// Route to serve the menu
const app = new Hono();

app.get('/', async (c) => {
  const menu = await getMenuCache();
  return c.json(menu || { error: 'Menu is unavailable' });
});

export default app;
