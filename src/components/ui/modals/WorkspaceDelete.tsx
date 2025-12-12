// Import dependencies
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
// Import stores
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicConfirmHighlight } from '../systems/BasicHighlights';
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Delete workspace modal component
function WorkspaceDelete() {
  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [workspaceName, setWorkspaceName] = useState('');

  // Define handlers
  function handleOnClick() {
    deleteWorkspace();
    setWorkspaceName('');
    onClose();
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length <= 30) {
      setWorkspaceName(value);
    }
  }

  // Render
  return (
    <ConfirmModal
      title="Delete workspace"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={workspaceName !== currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete this workspace? This action cannot be
        undone. Please type the workspace name to confirm.
      </Text>

      <BasicConfirmHighlight pb={4} query={currentWorkspace || '---'} />

      <Box px={4}>
        <BasicInput
          placeholder={INPUT_PLACEHOLDERS.workspace}
          value={workspaceName}
          onChange={handleOnChange}
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceDelete;
