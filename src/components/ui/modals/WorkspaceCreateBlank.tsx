// Import dependencies
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Create blank workspace modal component
function WorkspaceCreateBlank() {
  // Define toast
  const toast = useToast();

  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(`Workspace ${Date.now()}`);

  // Define handlers
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

    addWorkspace(workspaceName);
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
      title="Create new workspace"
      buttonLabel="Create"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={!workspaceName}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a new blank workspace. Please type a name for the new workspace.
      </Text>

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
export default WorkspaceCreateBlank;
