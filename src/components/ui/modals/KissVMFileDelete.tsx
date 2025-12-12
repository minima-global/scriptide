// Import dependencies
import { Box, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicConfirmHighlight } from '../systems/BasicHighlights';
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Delete script modal component
function KissVMFileDelete() {
  // Define stores
  const currentFile = useFileStore((state) => state.currentFile);
  const deleteFile = useFileStore((state) => state.deleteFile);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [fileName, setFileName] = useState('');

  // Define memo
  const fileToDelete = useMemo(() => {
    if (currentFile) {
      return currentFile.split('/').pop()?.replace('.kvm', '');
    }

    return null;
  }, [currentFile]);

  // Define handlers
  function handleOnClick() {
    if (!currentFile) {
      return;
    }

    deleteFile(currentFile);
    setFileName('');
    onClose();
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length <= 30) {
      setFileName(value);
    }
  }

  // Render
  return (
    <ConfirmModal
      title="Delete script"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={fileName !== fileToDelete}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete this script? This action cannot be
        undone. Please type the script name to confirm.
      </Text>

      <BasicConfirmHighlight pb={4} query={fileToDelete || '---'} />

      <Box px={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.script}
          value={fileName}
          onChange={handleOnChange}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default KissVMFileDelete;
