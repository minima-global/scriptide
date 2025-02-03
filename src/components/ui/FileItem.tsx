// Import dependencies
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  LuBug,
  LuCopy,
  LuDownload,
  LuFile,
  LuPenLine,
  LuTrash,
} from 'react-icons/lu';
// Import hooks
import useFileSystem from '../../hooks/useFileSystem';
// Import components
import { MenuDividerBase, MenuItemBase, MenuListBase } from './MenuListBase';
import { useEffect } from 'react';

// File item context menu component
function FileItemContextMenu({ file }) {
  // Define file system
  const { handleDeleteFile } = useFileSystem();

  return (
    <MenuListBase>
      <MenuItemBase
        label="Rename File"
        icon={<LuPenLine />}
        onClick={() => {}}
        disabled
      >
        Rename
      </MenuItemBase>

      <MenuItemBase
        label="Delete File"
        icon={<LuTrash />}
        onClick={() => handleDeleteFile(file)}
      >
        Delete
      </MenuItemBase>

      <MenuDividerBase />

      <MenuItemBase
        label="Copy File"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy
      </MenuItemBase>

      <MenuItemBase
        label="Copy File Name"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy name
      </MenuItemBase>

      <MenuItemBase
        label="Copy File Path"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy path
      </MenuItemBase>

      <MenuDividerBase />

      <MenuItemBase
        label="Download File"
        icon={<LuDownload />}
        onClick={() => {}}
        disabled
      >
        Download
      </MenuItemBase>

      <MenuDividerBase />

      <MenuItemBase
        label="Debug"
        icon={<LuBug />}
        onClick={() => console.log(file)}
      >
        Debug
      </MenuItemBase>
    </MenuListBase>
  );
}

// File item component
function FileItem({ children, file, onClick, isActive = false }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define handlers
  const handleContextMenu = (event) => {
    event.preventDefault(); // Disable default menu
    onOpen();
  };

  /** Quick fix for a glitch where the context menu
   * would not close when scrolling.
   */
  useEffect(() => {
    (window as any).document
      .querySelector('#FILE_EXPLORER')
      ?.addEventListener('scroll', onClose);
    return () =>
      (window as any).document
        .querySelector('#FILE_EXPLORER')
        ?.addEventListener('scroll', onClose);
  }, []);

  // Render
  return (
    <Box cursor="pointer" w="100%">
      <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <MenuButton
          as="div"
          w="100%"
          onClick={onClick}
          onContextMenu={handleContextMenu}
        >
          <HStack
            w="100%"
            borderRadius={0}
            border="1px solid"
            borderColor={isOpen ? 'gray.700' : 'transparent'}
            justifyContent="space-between"
            gap={0}
            pl={2}
            pr={1}
            color={isActive ? 'gray.50' : 'gray.500'}
            bg={isActive ? 'gray.800' : 'transparent'}
            _hover={{ bg: 'gray.800', color: 'gray.50' }}
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

              <Text as="span" isTruncated>
                {children}
              </Text>
            </Text>
          </HStack>
        </MenuButton>

        <FileItemContextMenu file={file} />
      </Menu>
    </Box>
  );
}

// Export
export default FileItem;
