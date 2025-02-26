// Import dependencies
import { Box, Input, Progress, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import components
import ConfirmModal from './ConfirmModal';
// Import hooks
import useZipFile from '@/hooks/useZipFile';
// Import stores
import useFileStore from '@/stores/useFileStore';
// Import libraries
import minima from '@/lib/minima';
import isImageFile from '@/utils/isImageFile';

// Workspace rename modal component
function WorkspaceExport({ onClose }) {
  // Define toast
  const toast = useToast();

  // Define zip file
  const { addZipFile, addZipFolder, addZipImage, generateZip } = useZipFile();

  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const files = useFileStore((state) => state.files);

  // Define state
  const [zipName, setZipName] = useState(
    `${currentWorkspace?.replaceAll(' ', '_')}.zip`
  );
  const [isLoading, setIsLoading] = useState(false);

  // Define handlers
  async function handleExport() {
    if (!zipName.endsWith('.zip')) {
      toast({
        title: 'Invalid zip name',
        description: 'Zip name must end with .zip',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!currentWorkspace || files.length < 1) {
      toast({
        title: 'No workspace selected',
        description: 'Please select a workspace to export',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      for (const file of files) {
        const location = file.location.split('/').splice(3).join('/');
        // console.log(location);

        // if (file.isdir) {
        //   addZipFolder(location);
        //   continue;
        // }

        if (file.isfile) {
          if (isImageFile(file.name)) {
            const binary = (await minima.file.loadbinary(file.location))
              .response.load.data;
            const base64 = minima.util.hexToBase64(binary);

            addZipImage(location, base64);
          } else {
            const data = (await minima.file.load(file.location)).response.load
              .data;

            addZipFile(location, data);
          }
        }
      }

      generateZip(zipName);
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error exporting workspace',
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
      title="Export workspace"
      buttonLabel="Export"
      onClose={onClose}
      onClick={handleExport}
      disabled={!zipName || isLoading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a zip file of the workspace for export. Please type a name for
        the exported zip file.
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
export default WorkspaceExport;
