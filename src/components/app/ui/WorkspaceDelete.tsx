import { Box, Highlight, Input, Text } from '@chakra-ui/react';
import ConfirmModal from './ConfirmModal';
import useFileSystem from '../../hooks/useFileSystem';
import { useContext, useState } from 'react';
import { appContext } from '../../AppContext';

// Workspace rename modal component
function WorkspaceDelete({ onClose }) {
  // Define context
  const { currentWorkspace } = useContext(appContext);

  // Define file system
  const { handleDeleteWorkspace } = useFileSystem();

  // Define state
  const [workspaceName, setWorkspaceName] = useState('');

  // Render
  return (
    <ConfirmModal
      title="Delete workspace"
      buttonLabel="Confirm"
      onClose={onClose}
      onClick={() => {
        handleDeleteWorkspace();
        setWorkspaceName('');
        onClose();
      }}
      disabled={workspaceName !== currentWorkspace}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Are you sure you want to delete this workspace? This action cannot be
        undone. Please type the workspace name to confirm.
      </Text>

      <Text pb={4} textAlign="center">
        <Highlight
          query={currentWorkspace ? currentWorkspace : '---'}
          styles={{
            px: '3',
            py: '1',
            rounded: 'sm',
            color: 'gray.50',
            bg: 'red.700',
            userSelect: 'none',
          }}
        >
          {currentWorkspace ? currentWorkspace : '---'}
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
          value={workspaceName}
          onChange={(e) => {
            const { value } = e.target;
            if (value.length <= 30) {
              setWorkspaceName(value);
            }
          }}
          placeholder="Enter workspace name here"
        />
      </Box>
    </ConfirmModal>
  );
}

// Export
export default WorkspaceDelete;
