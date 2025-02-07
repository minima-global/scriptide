// Import dependencies
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
// Import store
import useWorkspaceStore from '@/store/useWorkspaceStore';

// Workspace component
function Workspace() {
  // Define stores
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const updateWorkspace = useWorkspaceStore((state) => state.updateWorkspace);

  // Render
  return (
    <Menu>
      <MenuButton
        textAlign="start"
        w="100%"
        size="sm"
        fontWeight="normal"
        variant="outline"
        color="gray.500"
        borderColor="gray.700"
        _hover={{ color: 'gray.50', bg: 'gray.800' }}
        _active={{ color: 'gray.50', bg: 'gray.800' }}
        as={Button}
        rightIcon={<LuChevronDown />}
        disabled={workspaces.length < 1}
      >
        <Text isTruncated>
          {workspaces.length > 0 ? currentWorkspace : '---'}
        </Text>
      </MenuButton>

      <MenuList bg="gray.800" borderColor="gray.700" py={0} overflow="hidden">
        {workspaces.map((workspace, index) => (
          <MenuItem
            key={index}
            py={1}
            bg="transparent"
            borderColor="gray.700"
            _hover={{ bg: 'gray.700' }}
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
