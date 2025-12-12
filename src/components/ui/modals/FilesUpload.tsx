// Import dependencies
import { Box, Button, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
// Import hooks
import useUploadFile from '@/hooks/useUploadFile';
// Import stores
import useModalStore from '@/stores/useModalStore';
// Import constants
import { ACCEPTED_FILE_FORMATS, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import BasicInput from '../systems/BasicInput';
import BasicProgressBar from '../systems/BasicProgressBar';
import ConfirmModal from './ConfirmModal';
import DragDropInput from '../systems/DragDropInput';

// Upload file modal component
function FilesUpload() {
  // Define toast
  const toast = useToast();

  // Define ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Define upload
  const { isError, isUploading, progress, handleUploadFile } =
    useUploadFile(fileInputRef);

  // Define store
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

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
  function handleFileNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length <= 30) {
      setFileName(value);
    }
  }
  function handleOnClick() {
    if (!fileToUpload) {
      return;
    }
    handleUploadFile(fileToUpload, fileName);
  }
  function handleOnDrop(e: React.DragEvent<HTMLInputElement>) {
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles) {
      setFileToUpload(droppedFiles[0]);
    }
  }

  // Define effects
  useEffect(() => {
    if (fileToUpload) {
      setFileName(fileToUpload.name);
      setUploadFileName(fileToUpload.name);
    }
  }, [fileToUpload]);
  useEffect(() => {
    if (progress === 1 && !isError) {
      toast({
        title: 'File uploaded',
        description: uploadFileName,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isError, progress, toast, uploadFileName]);

  // Render
  return (
    <ConfirmModal
      title="Upload file"
      buttonLabel="Upload"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={!fileToUpload || isUploading}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Upload a file from your computer. Please select a file to upload and
        click the "Upload" button.
      </Text>

      <Box px={4} pb={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.file}
          value={fileName}
          onChange={handleFileNameChange}
        />
      </Box>

      <Box px={4}>
        <Input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_FORMATS.file}
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

          <DragDropInput value={uploadFileName} onDrop={handleOnDrop} />
        </HStack>
      </Box>

      <Box pt={4}>
        <BasicProgressBar progress={progress} isError={isError} />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default FilesUpload;
