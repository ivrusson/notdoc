import { watch, promises as fsPromises } from 'fs';
import path from 'path';
import { generateMenu, MenuItem } from './generateMenu';
import { getConfigFile } from './config';

interface Cache {
  menu: MenuItem[] | null;
}

const cache: Cache = {
  menu: null
};
const cacheDir = path.join(process.cwd(), '.cache');
const cacheFilePath = path.join(cacheDir, 'menu.json');

// Ensure the cache directory and file exist
const ensureCacheSetup = async () => {
  try {
    await fsPromises.mkdir(cacheDir, { recursive: true }); // Ensure the directory exists
    try {
      await fsPromises.access(cacheFilePath); // Check if the file exists
    } catch {
      await fsPromises.writeFile(cacheFilePath, JSON.stringify([], null, 2)); // Create an empty JSON file if it doesn't exist
    }
  } catch (error) {
    console.error('Failed to set up cache directory or file:', error);
  }
};

export const getMenuCache = async (): Promise<MenuItem[] | null> => {
  await ensureCacheSetup(); // Ensure setup on each call, could be optimized
  if (cache.menu === null) {
    try {
      const data = await fsPromises.readFile(cacheFilePath, 'utf-8');
      cache.menu = JSON.parse(data);
    } catch (error) {
      console.error('Error loading cache:', error);
    }
  }
  return cache.menu;
};

export const setMenuCache = async (menu: MenuItem[]): Promise<void> => {
  await ensureCacheSetup(); // Ensure setup before writing
  try {
    await fsPromises.writeFile(cacheFilePath, JSON.stringify(menu, null, 2), 'utf-8');
    cache.menu = menu;
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
};

const watchDirectories = (dirPath: string, onChange: () => void) => {
  const watcher = watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    console.log(`Detected ${eventType} in ${filename}`);
    onChange();
  });

  return () => watcher.close();
};

export const initializeCacheAndWatcher = async (): Promise<void> => {
  const config = await getConfigFile();
  if (config?.dir) {
    const dirPath = path.join(process.cwd(), config.dir);
    const menu = await getMenuCache();
    if (!menu) {
      const generatedMenu = generateMenu(dirPath);
      await setMenuCache(generatedMenu);
    }
    watchDirectories(dirPath, async () => {
      console.log('Changes detected. Clearing cache and regenerating...');
      const updatedMenu = generateMenu(dirPath);
      await setMenuCache(updatedMenu);
    });
  }
};
