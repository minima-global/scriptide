// Import dependencies
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import components
import FileInput from './FileInput';

function FileFolderRename({ file, setRenamingFile }) {
  // Define toast
  const toast = useToast();

  // Define state
  const [fileName, setFileName] = useState(file.name || '');

  // Define store
  const files = useFileStore((state) => state.files);
  const renameFile = useFileStore((state) => state.renameFile);
  const isFolder = useFileStore((state) => state.isFolder);
  const setIsFolder = useFileStore((state) => state.setIsFolder);

  // Define handlers
  function handleOnBlur() {
    setRenamingFile(false);
    setIsFolder(null);
  }
  function handleOnChange(e) {
    setFileName(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      let name = fileName.trim();

      if (name.length === 0) {
        toast({
          title: 'File name cannot be empty.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (isFolder) {
        name = name.split('.')[0];
      } else {
        if (!name.includes('.')) {
          name += '.kvm';
        } else if (name.endsWith('.')) {
          name += 'kvm';
        }
      }

      name = name.split(' ').join('_');

      const path = `${file.location.split('/').slice(0, -1).join('/')}/${name}`;

      for (const file of files) {
        if (file.location === path) {
          toast({
            title: 'File or directory with this name already exists.',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }

      renameFile(file.location, path);

      setRenamingFile(false);
      setIsFolder(null);
    }
  }

  // Render
  return (
    <FileInput
      value={fileName}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
    />
  );
}

// Export
export default FileFolderRename;
