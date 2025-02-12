// Import dependencies
import { Box, Input, Progress, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import ConfirmModal from './ConfirmModal';
import useZipFile from '@/hooks/useZipFile';
import useFileStore from '@/store/useFileStore';
import minima from '@/lib/minima';

// Workspace rename modal component
function WorkspaceDownload({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define zip file
  const { addZipFile, generateZip } = useZipFile();

  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const files = useFileStore((state) => state.files);

  // Define state
  const [zipName, setZipName] = useState(
    `${currentWorkspace?.replaceAll(' ', '_')}.zip`
  );
  const [isLoading, setIsLoading] = useState(false);

  // Define handlers
  async function handleDownload() {
    if (!currentWorkspace || !files) {
      return;
    }

    try {
      setIsLoading(true);

      for (const file of files) {
        const data = (
          await minima.file.load(`workspaces/${currentWorkspace}/${file}`)
        ).response.load.data;

        addZipFile(file, data);
      }

      generateZip(zipName);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error downloading workspace',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  }

  // Render
  return (
    <ConfirmModal
      title="Download workspace"
      buttonLabel="Download"
      onClose={onClose}
      onClick={() => {
        if (!zipName.endsWith('.zip')) {
          toast({
            title: 'Invalid zip name',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        handleDownload();
      }}
      disabled={!zipName || isLoading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a zip file of the workspace for download. Please type a name for
        the downloaded zip file.
      </Text>

      <Box px={4}>
        <Progress
          size="xs"
          bg="transparent"
          borderRadius="full"
          transform="scaleX(-1)"
          isIndeterminate={isLoading}
        />

        <Input
          size="sm"
          variant="outline"
          color="gray.50"
          borderColor="gray.700"
          _placeholder={{ color: 'gray.700' }}
          _focusVisible={{ borderColor: 'gray.50' }}
          _readOnly={{ color: 'gray.500' }}
          value={zipName}
          onChange={(e) => {
            const { value } = e.target;
            if (value.length <= 30) {
              setZipName(value);
            }
          }}
          placeholder="Enter zip name here"
          disabled={isLoading}
        />

        <Progress
          size="xs"
          bg="transparent"
          borderRadius="full"
          isIndeterminate={isLoading}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceDownload;
