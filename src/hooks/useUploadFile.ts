// Import dependencies
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import libraries
import minima, { mds } from '@/lib/minima';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

// Upload file hook
function useUploadFile(fileInput: React.RefObject<HTMLInputElement>) {
  // Define toast
  const toast = useToast();

  // Define store
  const files = useFileStore((state) => state.files);
  const refreshFiles = useFileStore((state) => state.refreshFiles);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define states
  const [, setFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Define functions
  function onError(err: string) {
    console.error(err);
    toast({
      title: 'Error uploading file',
      description: err,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });

    setIsError(true);
    setIsUploading(false);

    if (!currentWorkspace) {
      return;
    }
    refreshFiles(currentWorkspace, false);
  }

  // Define handlers
  async function handleUploadFile(file: File, newName?: string) {
    try {
      if (!newName?.includes('.') || newName.endsWith('.')) {
        onError('File name must include extension');
        return;
      }
      if (file.size === 0) {
        onError('File content cannot be empty');
        return;
      }

      const fileLocation = `${currentFolder}/${newName || file.name}`;
      for (const f of files) {
        if (f.location === fileLocation) {
          onError('File already exists');
          return;
        }
      }

      setFile(file);
      if (file) {
        setProgress(null);
        setIsUploading(true);
        setIsError(false);

        mds.file.upload(file, async function (msg) {
          if (msg.allchunks >= 10) {
            setProgress(msg.chunk / msg.allchunks);
          }

          if (msg.allchunks === msg.chunk) {
            setFile(undefined);
            setProgress(1);
            setIsUploading(false);

            await minima.file.move(`/fileupload/${file.name}`, fileLocation);
            refreshFiles(currentWorkspace as string, false);

            if (fileInput.current) {
              fileInput.current.value = '';
            }
          }
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError('Error uploading file');
      }
    }
  }

  return {
    progress,
    isUploading,
    isError,
    handleUploadFile,
  };
}

// Export
export default useUploadFile;
