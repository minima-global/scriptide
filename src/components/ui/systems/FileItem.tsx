// Import dependencies
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// Import icons
import { LuFile } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { IWindow } from '@/types';
// Import components
import FileFolderRename from './FileFolderRename';
import { FileItemContextMenu } from '../ContextMenu';

// Define constants
const windowDocument = (window as IWindow & typeof globalThis).document;

// File item component
function FileItem({ file, onClick, isActive = false }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define theme
  const { accent, color, colorAlt, borderColor } = useAppTheme();

  // Define state
  const [renamingFile, setRenamingFile] = useState(false);

  // Define handlers
  const handleContextMenu = (event) => {
    event.preventDefault(); // Disable default menu
    onOpen();
  };

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

  // Render
  return (
    <>
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
              onClick={onClick}
              onContextMenu={handleContextMenu}
            >
              <HStack
                w="100%"
                borderRadius="sm"
                border="1px solid"
                borderColor={isOpen ? accent : 'transparent'}
                justifyContent="space-between"
                gap={0}
                pl={2}
                pr={1}
                color={isActive ? accent : ''}
                bg={isOpen ? borderColor : ''}
              >
                <Text
                  w="100%"
                  display="flex"
                  gap={1}
                  alignItems="center"
                  isTruncated
                >
                  <Box as="span">
                    <LuFile />
                  </Box>

                  <Text as="span" userSelect="none" isTruncated>
                    {file.name}
                  </Text>
                </Text>
              </HStack>
            </MenuButton>

            <FileItemContextMenu
              file={file}
              setRenamingFile={setRenamingFile}
            />
          </Menu>
        </Box>
      )}
    </>
  );
}

// Export
export default FileItem;
