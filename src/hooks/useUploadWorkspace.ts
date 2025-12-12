// Import dependencies
import JSZip from 'jszip';
import { useState } from 'react';
// Import stores
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import isImageFile from '@/utils/isImageFile';
import isTextFile from '@/utils/isTextFile';

// Upload workspace hook
function useUploadWorkspace() {
  // Define store
  const updateWorkspace = useWorkspaceStore((state) => state.updateWorkspace);
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Define states
  const [error, setError] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<{ [key: string]: string }>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  // Define handlers
  async function handleUploadWorkspace(file: File, workspace: string) {
    if (file) {
      try {
        setIsUploading(true);
        setProgress(null);
        setError(null);

        const zip = new JSZip();
        const content = await zip.loadAsync(file);
        const totalFiles = Object.values(content.files).filter(
          (f) => !f.dir
        ).length;
        const newFileContents = {};

        for (const filename in content.files) {
          const zipEntry = content.files[filename];
          if (!zipEntry.dir) {
            try {
              let fileContent: string | ArrayBuffer;
              if (isTextFile(filename)) {
                fileContent = await zipEntry.async('string');
              } else if (isImageFile(filename)) {
                fileContent = await zipEntry.async('base64');
              } else {
                fileContent = await zipEntry.async('string');
                // fileContent = await zipEntry.async('arraybuffer'); // Alternative
              }

              newFileContents[filename] = fileContent;
              setProgress(Object.keys(newFileContents).length / totalFiles);
            } catch (err: unknown) {
              console.error(`Error reading file ${filename}:`, err);

              if (err instanceof Error) {
                newFileContents[filename] = err.message;
              } else {
                newFileContents[filename] = 'Error reading file';
              }
            }
          }
        }

        setFileContents(newFileContents);

        const entryFiles: [string, string][] = Object.entries(newFileContents);
        entryFiles.forEach(async (entry) => {
          const [fileName, fileContent] = entry;
          if (isImageFile(fileName)) {
            const binary = minima.util.base64ToHex(fileContent);
            await minima.file.savebinary(
              `workspaces/${workspace}/${fileName}`,
              binary
            );
          } else {
            await minima.file.save(
              `workspaces/${workspace}/${fileName}`,
              fileContent
            );
          }
        });

        updateWorkspace(workspace);
        refreshWorkspaces();
        setProgress(1);
        setIsUploading(false);
      } catch (err: unknown) {
        console.error('Error loading zip file:', err);
        setIsUploading(false);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error loading zip file');
        }
      }
    }
  }

  return {
    error,
    fileContents,
    isUploading,
    progress,

    handleUploadWorkspace,
  };
}

// Export
export default useUploadWorkspace;
