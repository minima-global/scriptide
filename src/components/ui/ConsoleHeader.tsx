// Import dependencies
import { HStack } from '@chakra-ui/react';
// Import icons
import { LuBan, LuChevronsDown, LuChevronsUp } from 'react-icons/lu';
// Import stores
import useConsoleStore from '@/stores/useConsoleStore';
import usePanelStore from '@/stores/usePanelStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import { BasicTooltipButton } from './systems/BasicButtons';

// Console header component
function ConsoleHeader() {
  // Define theme
  const { colorError } = useAppTheme();

  // Define stores
  const clearConsoleOut = useConsoleStore((state) => state.clearConsoleOut);
  const isBottomBarPanelOpen = usePanelStore(
    (state) => state.isBottomBarPanelOpen
  );
  const toggleBottomBarPanel = usePanelStore(
    (state) => state.toggleBottomBarPanel
  );

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <BasicTooltipButton
        label={(isBottomBarPanelOpen ? 'Hide' : 'Show') + ' console'}
        onClick={toggleBottomBarPanel}
      >
        {isBottomBarPanelOpen ? <LuChevronsDown /> : <LuChevronsUp />}
      </BasicTooltipButton>

      <BasicTooltipButton
        label="Clear console"
        hoverColor={colorError}
        onClick={clearConsoleOut}
      >
        <LuBan />
      </BasicTooltipButton>
    </HStack>
  );
}

// Export
export default ConsoleHeader;
