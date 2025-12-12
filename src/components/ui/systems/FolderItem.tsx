// Import dependencies
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// Import icons
import { LuChevronDown, LuChevronRight, LuFolder } from 'react-icons/lu';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import types
import { IWindow } from '@/types';
// Import components
import { FileTree } from './FileTree';
import { FolderItemContextMenu } from '../ContextMenu';
import FileFolderRename from './FileFolderRename';

// Define constants
const windowDocument = (window as IWindow & typeof globalThis).document;

function FolderItem({ file, isExpanded, setIsExpanded, isActive }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define stores
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const isAddingFile = useFileStore((state) => state.isAddingFile);

  // Define theme
  const { accent, color, colorAlt, bgAlt, borderColor } = useAppTheme();

  // Define state
  const [renamingFile, setRenamingFile] = useState(false);

  // Define handlers
  const handleContextMenu = (e) => {
    e.preventDefault(); // Disable default menu
    setCurrentFolder(file.location);
    onOpen();
  };
  function handleExpand() {
    setCurrentFolder(file.location);
    setIsExpanded((prevState) => {
      if (currentFolder !== file.location && isExpanded[file.location]) {
        return prevState;
      }

      const expand = {
        ...prevState,
        [file.location]: !prevState[file.location],
      };

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.fileExplorerExpanded,
        JSON.stringify(expand)
      );

      return expand;
    });
  }

  // Define effects
  useEffect(() => {
    /* Quick fix for a glitch where the context menu
     * would not close when scrolling.
     */
    windowDocument
      .querySelector('#FILE_EXPLORER')
      ?.addEventListener('scroll', onClose);

    return () =>
      windowDocument
        .querySelector('#FILE_EXPLORER')
        ?.addEventListener('scroll', onClose);
  }, []);

  return (
    <VStack w="100%" gap={0.5} borderRadius="sm" bg={isActive ? bgAlt : ''}>
      {renamingFile ? (
        <FileFolderRename file={file} setRenamingFile={setRenamingFile} />
      ) : (
        <Box
          cursor="pointer"
          w="100%"
          color={colorAlt}
          _hover={{ bg: borderColor, color }}
          borderRadius="sm"
        >
          <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
            <MenuButton
              as="div"
              w="100%"
              onClick={handleExpand}
              onContextMenu={handleContextMenu}
            >
              <HStack
                w="100%"
                borderRadius="sm"
                border="1px solid"
                borderColor={isOpen ? accent : 'transparent'}
                justifyContent="space-between"
                gap={0}
                bg={isOpen ? borderColor : ''}
              >
                <Box>
                  {isExpanded[file.location] ? (
                    <LuChevronDown size={16} />
                  ) : (
                    <LuChevronRight size={16} />
                  )}
                </Box>

                <HStack w="100%" gap={0} isTruncated>
                  <Text
                    w="100%"
                    display="flex"
                    gap={1}
                    alignItems="center"
                    isTruncated
                  >
                    <Box as="span">
                      <LuFolder />
                    </Box>

                    <Text as="span" userSelect="none" isTruncated>
                      {file.name}
                    </Text>
                  </Text>
                </HStack>
              </HStack>
            </MenuButton>

            <FolderItemContextMenu
              file={file}
              setRenamingFile={setRenamingFile}
              setIsExpanded={setIsExpanded}
            />
          </Menu>
        </Box>
      )}

      {isExpanded[file.location] && (
        <FileTree
          file={file._children}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isAddingFile={isAddingFile && file.location === currentFolder}
        />
      )}
    </VStack>
  );
}

export default FolderItem;
