// Import dependencies
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import stores
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import BasicInput from '../systems/BasicInput';
import ConfirmModal from './ConfirmModal';

// Rename workspace modal component
function WorkspaceRename() {
  // Define toast
  const toast = useToast();

  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const renameWorkspace = useWorkspaceStore((state) => state.renameWorkspace);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace || '');

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

    renameWorkspace(workspaceName);
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
      title="Rename workspace"
      buttonLabel="Save"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={workspaceName === currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Rename the current workspace. Please type a new name for the workspace.
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
export default WorkspaceRename;
