// Import dependencies
import { VStack } from '@chakra-ui/react';
// Import icons
import {
  LuFiles,
  LuRocket,
  // LuPlug,
  // LuSearch,
  LuSettings,
  LuZap,
} from 'react-icons/lu';
// Import constants
import { ICON_SIZES, NAVIGATION_LABELS } from '@/constants';
// Import store
import useNavigationStore from '@/stores/useNavigationStore';
import usePanelStore from '@/stores/usePanelStore';
// Import types
import { ENavigationStates } from '@/types';
// Import components
import AppLogo from './systems/AppLogo';
import SidebarButton from './systems/SidebarButton';

// Sidebar component
function Sidebar() {
  // Define stores
  const navigation = useNavigationStore((state) => state.navigation);
  const setNavigation = useNavigationStore((state) => state.setNavigation);
  const isLeftSidePanelOpen = usePanelStore(
    (state) => state.isLeftSidePanelOpen
  );
  const toggleLeftSidePanel = usePanelStore(
    (state) => state.toggleLeftSidePanel
  );

  // Define handlers
  function handleNavigationChange(nav: string) {
    toggleLeftSidePanel(nav === navigation);

    if (nav !== navigation) {
      setNavigation(nav);
    }
  }
  function handleIsActive(nav: string) {
    return navigation === nav && isLeftSidePanelOpen;
  }

  // Render
  return (
    <VStack
      as="nav"
      h="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1.5}
      pr={1.5}
    >
      <SidebarButton
        label={NAVIGATION_LABELS.home}
        placement="right"
        isActive={handleIsActive(ENavigationStates.HOME)}
        onClick={() => handleNavigationChange(ENavigationStates.HOME)}
      >
        <AppLogo size={ICON_SIZES.lg} />
      </SidebarButton>

      <VStack mb="auto">
        <SidebarButton
          label={NAVIGATION_LABELS.explorer}
          isActive={handleIsActive(ENavigationStates.EXPLORER)}
          onClick={() => handleNavigationChange(ENavigationStates.EXPLORER)}
        >
          <LuFiles size={ICON_SIZES.md} />
        </SidebarButton>

        {/* TODO - enable search feature */}
        {/* <SidebarButton
          label={NAVIGATION_LABELS.search}
          isActive={handleIsActive(ENavigationStates.SEARCH)}
          onClick={() => handleNavigationChange(ENavigationStates.SEARCH)}
          disabled
        >
          <LuSearch size={ICON_SIZES.md} />
        </SidebarButton> */}

        <SidebarButton
          label={NAVIGATION_LABELS.kissVM}
          isActive={handleIsActive(ENavigationStates.KISS_VM)}
          onClick={() => handleNavigationChange(ENavigationStates.KISS_VM)}
        >
          <LuZap size={ICON_SIZES.md} />
        </SidebarButton>

        <SidebarButton
          label={NAVIGATION_LABELS.deployBuild}
          isActive={handleIsActive(ENavigationStates.DEPLOY_BUILD)}
          onClick={() => handleNavigationChange(ENavigationStates.DEPLOY_BUILD)}
        >
          <LuRocket size={ICON_SIZES.md} />
        </SidebarButton>
      </VStack>

      <VStack>
        {/* TODO - enable plugins features */}
        {/* <SidebarButton
          label={NAVIGATION_LABELS.plugins}
          isActive={handleIsActive(ENavigationStates.PLUGINS)}
          onClick={() => handleNavigationChange(ENavigationStates.PLUGINS)}
          disabled
        >
          <LuPlug size={ICON_SIZES.md} />
        </SidebarButton> */}

        <SidebarButton
          label={NAVIGATION_LABELS.settings}
          isActive={handleIsActive(ENavigationStates.SETTINGS)}
          onClick={() => handleNavigationChange(ENavigationStates.SETTINGS)}
        >
          <LuSettings size={ICON_SIZES.md} />
        </SidebarButton>
      </VStack>
    </VStack>
  );
}

// Export
export default Sidebar;
