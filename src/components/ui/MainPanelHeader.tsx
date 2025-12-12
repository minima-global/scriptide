// Import dependencies
import { HStack } from '@chakra-ui/react';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import components
import {
  RightSidebarButton,
  RunScriptButton,
  SaveFileButtons,
  ZoomEditorButtons,
} from './MainPanelHeaderButtons';

// Code editor header component
function MainPanelHeader() {
  // Define store
  const currentFile = useFileStore((state) => state.currentFile);

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <HStack gap={0}>
        {currentFile?.endsWith('.kvm') && <RunScriptButton />}

        <SaveFileButtons />

        <ZoomEditorButtons />
      </HStack>

      <RightSidebarButton />
    </HStack>
  );
}

// Export
export default MainPanelHeader;
