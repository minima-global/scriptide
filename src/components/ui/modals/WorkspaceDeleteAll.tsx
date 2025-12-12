// Import dependencies
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
// Import stores
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { CONFIRM_TEXTS, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import ConfirmModal from './ConfirmModal';
import { BasicConfirmHighlight } from '../systems/BasicHighlights';
import BasicInput from '../systems/BasicInput';

// Delete all workspaces modal component
function WorkspaceDeleteAll() {
  // Define store
  const deleteAllWorkspaces = useWorkspaceStore(
    (state) => state.deleteAllWorkspaces
  );
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [confirmText, setConfirmText] = useState('');

  // Define handlers
  function handleOnClick() {
    deleteAllWorkspaces();
    setConfirmText('');
    onClose();
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmText(e.target.value);
  }

  // Render
  return (
    <ConfirmModal
      title="Delete all workspaces"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={confirmText !== CONFIRM_TEXTS.deleteAllWorkspaces}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete all workspaces? This action cannot be
        undone. Please type the confirm text in&nbsp;
        <span className="uppercase">uppercase</span> to confirm.
      </Text>

      <BasicConfirmHighlight
        pb={4}
        query={CONFIRM_TEXTS.deleteAllWorkspaces || '---'}
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
export default WorkspaceDeleteAll;
