// Import dependencies
import { Box, Button, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LuRotateCw } from 'react-icons/lu';
// Import constants
import { NAVIGATION_LABELS } from '@/constants';
// Import store
import useNavigationStore, {
  NAVIGATION_STATES,
} from '@/stores/useNavigationStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import DeployBuildPanel from './panels/DeployBuildPanel';
import ExplorerPanel from './panels/ExplorerPanel';
import HomePanel from './panels/HomePanel';
import KissVMPanel from './panels/KissVMPanel';
import SettingsPanel from './panels/SettingsPanel';

// Control panel component
function LeftSidePanel() {
  // Define theme
  const { color, colorAlt, borderColor } = useAppTheme();

  // Define store
  const navigation = useNavigationStore((state) => state.navigation);
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Define state
  const currentNavigation = useMemo(() => {
    switch (navigation) {
      case NAVIGATION_STATES.HOME:
        return <HomePanel />;

      case NAVIGATION_STATES.EXPLORER:
        return <ExplorerPanel />;

      case NAVIGATION_STATES.SEARCH:
        return null;

      case NAVIGATION_STATES.KISS_VM:
        return <KissVMPanel />;

      case NAVIGATION_STATES.DEPLOY_BUILD:
        return <DeployBuildPanel />;

      case NAVIGATION_STATES.PLUGINS:
        return null;

      case NAVIGATION_STATES.SETTINGS:
        return <SettingsPanel />;

      default:
        return null;
    }
  }, [navigation]);

  // Render
  return (
    <Box h="100%" p={2} borderLeft="1px solid" borderColor={borderColor}>
      <VStack as="section" h="100%" pr={2} overflow="auto">
        <HStack as="header" w="100%" justifyContent="space-between">
          <Text
            as="h2"
            textTransform="uppercase"
            fontSize="lg"
            color={colorAlt}
            minH="2rem"
            display="flex"
            alignItems="center"
          >
            {NAVIGATION_LABELS[navigation]}
          </Text>

          {navigation !== NAVIGATION_STATES.HOME &&
            navigation !== NAVIGATION_STATES.SETTINGS && (
              <Tooltip label="Refresh workspaces" placement="bottom" hasArrow>
                <Button
                  p={0}
                  size="sm"
                  bg="transparent"
                  color={colorAlt}
                  _hover={{ bg: 'transparent', color }}
                  onClick={() => refreshWorkspaces()}
                >
                  <LuRotateCw size={20} />
                </Button>
              </Tooltip>
            )}
        </HStack>

        {currentNavigation}
      </VStack>
    </Box>
  );
}

export default LeftSidePanel;
