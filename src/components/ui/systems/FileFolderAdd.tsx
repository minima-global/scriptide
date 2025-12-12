// Import dependencies
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import components
import FileInput from './FileInput';

// File item add component
function FileFolderAdd() {
  // Define toast
  const toast = useToast();

  // Define state
  const [fileName, setFileName] = useState('');

  // Define store
  const files = useFileStore((state) => state.files);
  const addFile = useFileStore((state) => state.addFile);
  const addFolder = useFileStore((state) => state.addFolder);
  const setIsAddingFile = useFileStore((state) => state.setIsAddingFile);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const isFolder = useFileStore((state) => state.isFolder);
  const setIsFolder = useFileStore((state) => state.setIsFolder);

  // Define handlers
  function handleOnBlur() {
    setIsAddingFile(false);
    setIsFolder(null);
  }
  function handleOnChange(e) {
    setFileName(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      let name = fileName.trim();
      if (name.length < 1) {
        toast({
          title: isFolder
            ? 'Folder name cannot be empty.'
            : 'File name cannot be empty.',
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
          name += '.txt';
        } else if (name.endsWith('.')) {
          name += 'txt';
        }
      }

      name = name.split(' ').join('_');

      const path = `${currentFolder}/${name}`;
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

      if (isFolder) {
        addFolder(path);
      } else {
        addFile(path);
      }

      setIsAddingFile(false);
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
export default FileFolderAdd;
