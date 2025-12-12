// Import dependencies
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import ConfirmModal from './ConfirmModal';
import BasicInput from '../systems/BasicInput';

// Create script modal component
function KissVMFileCreate() {
  // Define toast
  const toast = useToast();

  // Define stores
  const files = useFileStore((state) => state.files);
  const addFile = useFileStore((state) => state.addFile);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const onClose = useModalStore((state) => state.onClose);

  // Define state
  const [fileName, setFileName] = useState('New_Script_' + Date.now());

  // Define handlers
  function handleOnClick() {
    const find = files.find(
      (f) =>
        f.location.split('/').splice(3)[0] === 'contracts' &&
        f.name === `${fileName.replaceAll(' ', '_')}.kvm`
    );

    if (find) {
      toast({
        title: 'Script name already exists',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (!currentWorkspace) {
      return;
    }

    addFile(
      `/workspaces/${currentWorkspace}/contracts/${fileName.replaceAll(
        ' ',
        '_'
      )}.kvm`
    );
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
      title="Create new script"
      buttonLabel="Create"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={!fileName}
    >
      <Text fontSize="sm" pb={4} textAlign="center">
        Create a new script. Please type a name for the new script.
      </Text>

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
export default KissVMFileCreate;
