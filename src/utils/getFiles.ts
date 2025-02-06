// Import libraries
import minima from '../lib/minima';

// Get files utility function
async function getFiles(path: string) {
  const response: { name: string }[] = (await minima.file.list(path)).response
    .list;

  const files: string[] = [];

  if (response.length > 0) {
    for (const { name } of response) {
      files.push(name);
    }
  }

  return files;
}

// Export
export default getFiles;
