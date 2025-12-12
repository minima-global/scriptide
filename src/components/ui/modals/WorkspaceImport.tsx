// Import dependencies
import { Box, Button, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
// Import stores
import useModalStore from '@/stores/useModalStore';
import useUploadWorkspace from '@/hooks/useUploadWorkspace';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { ACCEPTED_FILE_FORMATS, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import BasicInput from '../systems/BasicInput';
import BasicProgressBar from '../systems/BasicProgressBar';
import ConfirmModal from './ConfirmModal';
import DragDropInput from '../systems/DragDropInput';

// Import workspace modal component
function WorkspaceImport() {
  // Define toast
  const toast = useToast();

  // Define ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Define Store
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const onClose = useModalStore((state) => state.onClose);

  // Define upload
  const { error, isUploading, progress, handleUploadWorkspace } =
    useUploadWorkspace();

  // Define state
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');

  // Define handlers
  function handleOpenFileSelector() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setFileToUpload(files[0]);
    }
  }
  function handleWorkspaceNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length <= 30) {
      setWorkspaceName(value);
    }
  }
  function handleOnClick() {
    if (workspaces.includes(workspaceName)) {
      toast({
        title: 'Workspace name already exists',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!fileToUpload) {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    handleUploadWorkspace(fileToUpload, workspaceName);
    onClose();
  }
  function handleOnDrop(e: React.DragEvent<HTMLInputElement>) {
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles) {
      setFileToUpload(droppedFiles[0]);
    }
  }

  // Define effects
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error uploading file',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);
  useEffect(() => {
    if (fileToUpload) {
      setFileName(fileToUpload.name);
      setWorkspaceName(fileToUpload.name.split('.')[0]);
    }
  }, [fileToUpload]);
  useEffect(() => {
    if (progress === 1 && !error) {
      toast({
        title: 'File imported',
        description: fileName,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, fileName, progress, toast]);

  // Render
  return (
    <ConfirmModal
      title="Import Workspace"
      buttonLabel="Import"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={!fileToUpload || !workspaceName || isUploading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Import a workspace zip file from your computer. Please select a zipped
        workspace to import and click the "Import" button.
      </Text>

      <Box px={4} pb={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.workspace}
          value={workspaceName}
          onChange={handleWorkspaceNameChange}
        />
      </Box>

      <Box px={4}>
        <Input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_FORMATS.zip}
          display="none"
          onChange={handleFileUpload}
        />

        <HStack>
          <Box>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleOpenFileSelector}
              isLoading={isUploading}
            >
              Choose File
            </Button>
          </Box>

          <DragDropInput value={fileName} onDrop={handleOnDrop} />
        </HStack>
      </Box>

      <Box pt={4}>
        <BasicProgressBar progress={progress} isError={!!error} />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceImport;
