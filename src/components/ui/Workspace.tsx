// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
// Import icons
import { LuChevronDown } from 'react-icons/lu';
// Import stores
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Workspace component
function Workspace() {
  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const updateWorkspace = useWorkspaceStore((state) => state.updateWorkspace);

  // Define theme
  const { bg, bgAlt, borderColor, color, colorAlt } = useAppTheme();

  // Render
  return (
    <Menu>
      <MenuButton
        textAlign="start"
        w="100%"
        size="sm"
        fontWeight="normal"
        variant="outline"
        color={colorAlt}
        borderColor={borderColor}
        _hover={{ color, bg: bgAlt }}
        _active={{ color, bg: bgAlt }}
        as={Button}
        rightIcon={<LuChevronDown />}
        disabled={workspaces.length < 1}
      >
        <Text isTruncated>
          {workspaces.length > 0 ? currentWorkspace : '---'}
        </Text>
      </MenuButton>

      <MenuList bg={bg} borderColor={borderColor} py={0} overflow="hidden">
        {workspaces.map((workspace, index) => (
          <MenuItem
            key={index}
            py={1}
            color={colorAlt}
            bg="transparent"
            borderColor={borderColor}
            _hover={{ color, bg: bgAlt }}
            onClick={() => updateWorkspace(workspace)}
          >
            {workspaces.length > 0 && workspace}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

// Export
export default Workspace;
