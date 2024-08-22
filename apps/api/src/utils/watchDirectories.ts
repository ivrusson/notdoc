import { watch } from 'fs';

const watchDirectories = (dirPath: string, onChange: () => void) => {
  const watcher = watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    console.log(`Detected ${eventType} in ${filename}`);
    onChange();
  });

  return () => watcher.close();
};

export default watchDirectories;