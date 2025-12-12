// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useMemo } from 'react';
// Import icons
import { LuMenu, LuPenLine, LuPlus, LuTrash, LuTrash2 } from 'react-icons/lu';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useModalStore from '@/stores/useModalStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { ICON_SIZES } from '@/constants';
// Import types
import { EModalTypes } from '@/types';
// Import components
import BasicTooltip from './systems/BasicTooltip';

// Script files menu item component
function KissVMFilesMenuItem({
  children,
  label,
  icon,
  onClick,
  disabled = false,
}) {
  // Define theme
  const { bgAlt, borderColor, color, colorAlt } = useAppTheme();

  // Render
  return (
    <BasicTooltip label={label} placement="right">
      <MenuItem
        py={1}
        color={colorAlt}
        bg="transparent"
        borderColor={borderColor}
        _hover={{ color, bg: bgAlt }}
        icon={icon}
        onClick={onClick}
        isDisabled={disabled}
      >
        {children}
      </MenuItem>
    </BasicTooltip>
  );
}

// Script files menu component
function KissVMFilesMenu() {
  // Define theme
  const { bg, borderColor, color, colorAlt } = useAppTheme();

  // Define stores
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const setModalType = useModalStore((state) => state.setModalType);
  const onOpen = useModalStore((state) => state.onOpen);

  // Define memos
  const hasNoActiveScript = useMemo(
    () =>
      !currentFile ||
      !(currentFile?.endsWith('.kvm') && currentFile?.includes('contracts')),
    [currentFile]
  );
  const hasNoScripts = useMemo(
    () =>
      files.filter((f) => f.location.split('/').splice(3)[0] === 'contracts')
        .length < 1,
    [files]
  );

  // Define handlers
  function handleRenameScript() {
    setModalType(EModalTypes.RENAME_SCRIPT);
    onOpen();
  }
  function handleCreateNewScript() {
    setModalType(EModalTypes.CREATE_SCRIPT);
    onOpen();
  }
  function handleDeleteScript() {
    setModalType(EModalTypes.DELETE_SCRIPT);
    onOpen();
  }
  function handleDeleteAllScripts() {
    setModalType(EModalTypes.DELETE_ALL_SCRIPT);
    onOpen();
  }

  // Render
  return (
    <Menu>
      <MenuButton
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color={colorAlt}
        _hover={{ bg: 'transparent', color }}
        _active={{ bg: 'transparent', color }}
        as={Button}
      >
        <LuMenu size={ICON_SIZES.md} />
      </MenuButton>

      <MenuList
        bg={bg}
        borderColor={borderColor}
        py={0}
        overflow="hidden"
        minW="auto"
      >
        <KissVMFilesMenuItem
          label="Rename Script"
          icon={<LuPenLine />}
          onClick={handleRenameScript}
          disabled={hasNoActiveScript}
        >
          Rename...
        </KissVMFilesMenuItem>

        <MenuDivider my={1} />

        <KissVMFilesMenuItem
          label="Create Script"
          icon={<LuPlus />}
          onClick={handleCreateNewScript}
        >
          Create
        </KissVMFilesMenuItem>

        <KissVMFilesMenuItem
          label="Delete Script"
          icon={<LuTrash />}
          onClick={handleDeleteScript}
          disabled={hasNoActiveScript}
        >
          Delete
        </KissVMFilesMenuItem>

        <MenuDivider my={1} />

        <KissVMFilesMenuItem
          label="Delete All Scripts"
          icon={<LuTrash2 />}
          onClick={handleDeleteAllScripts}
          disabled={hasNoScripts}
        >
          Delete all
        </KissVMFilesMenuItem>
      </MenuList>
    </Menu>
  );
}

// Export
export default KissVMFilesMenu;
