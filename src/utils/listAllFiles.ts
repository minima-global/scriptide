// Import libraries
import minima from '@/lib/minima';

// Get all files utility function
async function listAllFiles(
  workspace: string,
  path: string = `workspaces/${workspace}`
) {
  const response = (await minima.file.list(path)).response?.list;
  if (!response) {
    return [];
  }

  let allFiles = response; // Start with the files in the current path
  for (const file of response) {
    if (file.isdir) {
      const subdirectoryFiles = await listAllFiles(
        workspace,
        `${path}/${file.name}`
      );
      allFiles = allFiles.concat(subdirectoryFiles);
    }
  }

  return allFiles;
}

// Export
export default listAllFiles;
