import { Hono } from "hono";
import path from "path";
import fs from "fs";
import { getMenuCache } from '@/utils/cache';
import { MenuItem } from "@/utils/generateMenu";

// Recursive function to find an item by ID
const findItemById = (items: MenuItem[], id: string): MenuItem | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    } else if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

const app = new Hono();

app.get("/", async (c) => {
  return c.json({ files: [] });
});

// Route to load a markdown file
app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const menu = await getMenuCache();
  console.log('menu', menu);
  if (!menu) {
    return c.text('Menu cache is not initialized', 500);
  }

  const foundItem = findItemById(menu, id);
  console.log(foundItem);
  if (!foundItem) {
    return c.text('Not found', 404);
  }

  try {
    const content = await fs.promises.readFile(path.join(foundItem.dirname, foundItem.name), 'utf-8');
    return c.text(content);
  } catch (err) {
    console.error('Error loading file:', err);
    return c.text('Error loading file', 500);
  }
});

export default app;