// Import dependencies
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
// Import constants
import { CONFIRM_TEXTS, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicConfirmHighlight } from '../systems/BasicHighlights';
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Delete all files modal component
function FilesDeleteAll() {
  // Define store
  const deleteAllFiles = useFileStore((state) => state.deleteAllFiles);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Define handlers
  function handleOnClick() {
    deleteAllFiles();
    setConfirmText('');
    onClose();
  }

  // Render
  return (
    <ConfirmModal
      title="Delete all files"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={confirmText !== CONFIRM_TEXTS.deleteAllFiles}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all files? This action cannot be undone.
        Please type the confirm text in&nbsp;
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <BasicConfirmHighlight
        pb={4}
        query={CONFIRM_TEXTS.deleteAllFiles || '---'}
      />

      <Box px={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.confirm}
          value={confirmText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmText(e.target.value)
          }
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default FilesDeleteAll;
