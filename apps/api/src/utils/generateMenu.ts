import path from 'path';
import fs from 'fs';
import { nanoid } from 'nanoid';
import { execSync } from 'child_process';

interface MenuItem {
  id: string;
  name: string;
  route: string;
  dirname: string;
  lastModified: string;
  creator: string;
  children?: MenuItem[];
}

// Function to get file creator from git
const getFileCreator = (filePath: string): string => {
  try {
    const creatorCommand = `git log --reverse --format=%an -- ${filePath}`;
    const creator = execSync(creatorCommand, { encoding: 'utf-8' }).trim().split('\n')[0];
    return creator || 'Unknown';
  } catch (error) {
    console.error(`Error getting file creator for ${filePath}:`, error);
    return 'Unknown';
  }
}

// Function to recursively generate menu from directory files
const generateMenu = (dirPath: string, parentRoute = ''): MenuItem[] => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const menuItems: MenuItem[] = [];

  entries.forEach(entry => {
    if (entry.isDirectory() || entry.name.endsWith('.md')) {
      const filePath = path.join(dirPath, entry.name);
      const stats = fs.statSync(filePath);
      const itemId = nanoid();
      const route = path.join(parentRoute, entry.name);

      // Get the creator of the file
      const creator = getFileCreator(filePath);

      // Create menu item
      const menuItem: MenuItem = {
        id: itemId,
        name: entry.name,
        route: route,
        dirname: path.dirname(filePath),
        lastModified: stats.mtime.toISOString(),
        creator: creator
      };

      if (entry.isDirectory()) {
        // Recursively generate menu for subdirectories
        menuItem.children = generateMenu(filePath, route);
      }

      // Add to menu items
      menuItems.push(menuItem);
    }
  });

  return menuItems;
};

export { generateMenu, MenuItem };