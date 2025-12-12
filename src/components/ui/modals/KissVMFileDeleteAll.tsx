// Import dependencies
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { CONFIRM_TEXTS, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicConfirmHighlight } from '../systems/BasicHighlights';
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Delete all scripts modal component
function KissVMFileDeleteAll() {
  // Define store
  const deleteFolder = useFileStore((state) => state.deleteFolder);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Define handlers
  function handleOnClick() {
    deleteFolder(`/workspaces/${currentWorkspace}/contracts`);
    setConfirmText('');
    onClose();
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmText(e.target.value);
  }

  // Render
  return (
    <ConfirmModal
      title="Delete all scripts"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={confirmText !== CONFIRM_TEXTS.deleteAllScripts}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all scripts? This action cannot be
        undone. Please type the confirm text in&nbsp;
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <BasicConfirmHighlight
        pb={4}
        query={CONFIRM_TEXTS.deleteAllScripts || '---'}
      />

      <Box px={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.confirm}
          value={confirmText}
          onChange={handleOnChange}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default KissVMFileDeleteAll;
