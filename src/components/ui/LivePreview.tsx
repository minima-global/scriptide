// Import dependencies
import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
// Import icons
import { LuRotateCw, LuX } from 'react-icons/lu';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
import usePanelStore from '@/stores/usePanelStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import { BasicTooltipButton } from './systems/BasicButtons';

// Live preview component
function LivePreview() {
  // Define ref
  const iframeRef = useRef(null);

  // Define state
  const [previewURL, setPreviewURL] = useState('');

  // Define stores
  const livePreview = useLivePreviewStore((state) => state.livePreview);
  const setLivePreview = useLivePreviewStore((state) => state.setLivePreview);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );
  const files = useFileStore((state) => state.files);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const isLoadingLivePreview = useLivePreviewStore(
    (state) => state.isLoadingLivePreview
  );
  const closeRightSidePanel = usePanelStore(
    (state) => state.closeRightSidePanel
  );

  // Define theme
  const { borderColor, colorAlt } = useAppTheme();

  // Define handler
  function handleOnClose() {
    closeRightSidePanel();
    setLivePreview('');
  }

  // Define effects
  useEffect(() => {
    if (!files) {
      return;
    }

    for (const file of files) {
      if (file.location === `/workspaces/${currentWorkspace}/index.html`) {
        refreshLivePreview();
        return;
      }
    }

    setPreviewURL('');
  }, [currentWorkspace, files, refreshLivePreview]);
  useEffect(() => {
    if (!livePreview) {
      setPreviewURL(''); // Clear the preview URL if HTML is empty
      return;
    }

    setPreviewURL(livePreview);
  }, [livePreview]);

  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={0}>
      <HStack
        w="100%"
        justify="flex-end"
        borderBottom="1px solid"
        borderColor={borderColor}
        gap={0}
      >
        <HStack gap={0}>
          <Box borderLeft="1px solid" borderColor={borderColor}>
            <BasicTooltipButton
              label="Refresh preview"
              onClick={refreshLivePreview}
              disabled={!previewURL || isLoadingLivePreview}
            >
              <LuRotateCw />
            </BasicTooltipButton>
          </Box>

          <Box borderLeft="1px solid" borderColor={borderColor}>
            <BasicTooltipButton
              label="Close preview"
              onClick={handleOnClose}
              disabled={!previewURL}
            >
              <LuX />
            </BasicTooltipButton>
          </Box>
        </HStack>
      </HStack>

      {isLoadingLivePreview ? (
        <Box w="100%" h="100%" display="grid" placeItems="center">
          <Spinner size="xl" color={borderColor} />
        </Box>
      ) : (
        <>
          {previewURL ? (
            <iframe
              ref={iframeRef}
              src={previewURL}
              width="100%"
              height="100%"
              style={{ backgroundColor: 'white' }}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <Box
              w="100%"
              h="100%"
              display="grid"
              placeItems="center"
              color={colorAlt}
            >
              <Text>No preview available</Text>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}

export default LivePreview;
