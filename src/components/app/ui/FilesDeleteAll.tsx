import { Box, Highlight, Input, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import useFileStore from '@/store/useFileStore';

// Constants
const CONFIRM_TEXT = 'Delete all files';

// Workspace rename modal component
function FilesDeleteAll({ onClose }) {
  // Define store
  const deleteAllFiles = useFileStore((state) => state.deleteAllFiles);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Render
  return (
    <ConfirmModal
      title="Delete all workspaces"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        deleteAllFiles();
        setConfirmText('');
        onClose();
      }}
      disabled={confirmText !== CONFIRM_TEXT.toUpperCase()}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all files? This action cannot be undone.
        Please type the confirm text in&nbsp;
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <Text pb={4} textAlign="center">
        <Highlight
          query={CONFIRM_TEXT.toUpperCase()}
          styles={{
            px: '3',
            py: '1',
            rounded: 'sm',
            color: 'gray.50',
            bg: 'red.700',
            userSelect: 'none',
          }}
        >
          {CONFIRM_TEXT.toUpperCase()}
        </Highlight>
      </Text>

      <Box px={4}>
        <Input
          size="sm"
          variant="outline"
          color="gray.50"
          borderColor="gray.700"
          _placeholder={{ color: 'gray.700' }}
          _focusVisible={{ borderColor: 'gray.50' }}
          _readOnly={{ color: 'gray.500' }}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Enter confirm text here"
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default FilesDeleteAll;
