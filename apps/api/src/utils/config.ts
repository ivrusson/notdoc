import fs from 'fs';
import path from 'path';

export const getConfigFile = async (): Promise<{ dir: string } | null> => {
  const startDir = process.cwd();
  try {
    const file = await fs.promises.readFile(path.join(startDir, 'notdoc.json'), 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.error('Error reading config file:', error);
    return null;
  }
};