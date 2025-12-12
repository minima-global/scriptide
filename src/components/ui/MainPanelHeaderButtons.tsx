// Import dependencies
import { Box, HStack, Input, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// Import icons
import {
  LuChevronsLeft,
  LuChevronsRight,
  LuSave,
  LuToggleLeft,
  LuToggleRight,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
import { TbPlayerPlayFilled } from 'react-icons/tb';
// Import store
import useEditorStore from '@/stores/useEditorStore';
import useFileStore from '@/stores/useFileStore';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
import usePanelStore from '@/stores/usePanelStore';
// Import hooks
import useRunScript from '@/hooks/useRunScript';
// Import utilities
import isImageFile from '@/utils/isImageFile';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import { BasicTooltipButton } from './systems/BasicButtons';
import { ICON_SIZES } from '@/constants';

// Right sidebar button component
function RightSidebarButton() {
  // Define store
  const togglePreview = useLivePreviewStore((state) => state.togglePreview);
  const isRightSidePanelOpen = usePanelStore(
    (state) => state.isRightSidePanelOpen
  );
  const toggleRightSidePanel = usePanelStore(
    (state) => state.toggleRightSidePanel
  );

  // Define handler
  function handleTogglePreview() {
    togglePreview();
    toggleRightSidePanel();
  }

  // Render
  return (
    <BasicTooltipButton
      label={`${isRightSidePanelOpen ? 'Hide' : 'Show'} live preview`}
      onClick={handleTogglePreview}
    >
      {isRightSidePanelOpen ? <LuChevronsRight /> : <LuChevronsLeft />}
    </BasicTooltipButton>
  );
}

// Run script button component
function RunScriptButton() {
  // Define theme
  const { borderColor, colorSuccess } = useAppTheme();

  // Define run script
  const { isRunning, handleRunScript } = useRunScript();

  // Define handler
  function handleOnRun() {
    handleRunScript({
      setState: true,
      setPrevState: true,
      setGlobals: true,
      setSignatures: true,
      setExtraScripts: true,
      setOutput: true,
    });
  }

  // Render
  return (
    <Box borderRight="1px solid" borderColor={borderColor}>
      <BasicTooltipButton
        label="Run script"
        hoverColor={colorSuccess}
        onClick={handleOnRun}
        isLoading={isRunning}
        disabled={isRunning}
      >
        <TbPlayerPlayFilled />
      </BasicTooltipButton>
    </Box>
  );
}

// Save file buttons component
function SaveFileButtons() {
  // Define toast
  const toast = useToast();

  // Define theme
  const { accent, borderColor } = useAppTheme();

  // Define store
  const allCodes = useEditorStore((state) => state.allCodes);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const toggleEditorAutoSave = useEditorStore(
    (state) => state.toggleEditorAutoSave
  );
  const currentFile = useFileStore((state) => state.currentFile);
  const saveFile = useFileStore((state) => state.saveFile);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );

  // Define handler
  function handleOnSave() {
    const fileToSave = allCodes.find((f) => f.file === currentFile);
    if (!fileToSave) {
      return;
    }

    const { file, code } = fileToSave;
    saveFile(file, code || '');
    refreshLivePreview();
    toast({
      title: 'File Saved',
      description: file,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  // Render
  return (
    <HStack gap={0} borderRight="1px solid" borderColor={borderColor}>
      <BasicTooltipButton
        label="Save file"
        onClick={handleOnSave}
        disabled={currentFile === null || isImageFile(currentFile)}
      >
        <LuSave />
      </BasicTooltipButton>

      <BasicTooltipButton
        label={`Auto save: ${editorAutoSave ? 'on' : 'off'}`}
        onClick={toggleEditorAutoSave}
      >
        {editorAutoSave ? (
          <Box as="span" color={accent}>
            <LuToggleRight size={ICON_SIZES.sm} />
          </Box>
        ) : (
          <LuToggleLeft size={ICON_SIZES.sm} />
        )}
      </BasicTooltipButton>
    </HStack>
  );
}

// Zoom editor buttons component
function ZoomEditorButtons() {
  // Define theme
  const { accent, borderColor, color } = useAppTheme();

  // Define store
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const setEditorZoom = useEditorStore((state) => state.setEditorZoom);
  const editorZoomIn = useEditorStore((state) => state.editorZoomIn);
  const editorZoomOut = useEditorStore((state) => state.editorZoomOut);

  // Define states
  const [zoom, setZoom] = useState(editorZoom || '0');

  // Define handlers
  function handleEditorZoom() {
    if (zoom === '-') {
      setZoom(editorZoom);
      return;
    }

    const currentZoom = Number(zoom);

    if (!currentZoom && currentZoom !== 0) {
      return;
    }
    if (isNaN(currentZoom)) {
      setEditorZoom(editorZoom);
      return;
    }

    setEditorZoom(currentZoom);
  }
  function handleChangeZoomValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (!/(^-[1-6]|[0-9]|[1-9][0-9])?$/.test(value)) {
      return;
    }
    if (
      Number(value) < -6 ||
      Number(value) > 99 ||
      (value.startsWith('0') && value.length > 1) ||
      value.startsWith('--') ||
      (!value.startsWith('-') && isNaN(Number(value)))
    ) {
      return;
    }

    setZoom(value);
  }
  function handleOnEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleEditorZoom();
    }
  }

  // Define effect
  useEffect(() => {
    setZoom(editorZoom);
  }, [editorZoom]);

  // Render
  return (
    <HStack gap={0} borderRight="1px solid" borderColor={borderColor}>
      <BasicTooltipButton
        label="Zoom out"
        onClick={editorZoomOut}
        disabled={editorZoom <= -6}
      >
        <LuZoomOut />
      </BasicTooltipButton>

      <Input
        value={zoom}
        onChange={handleChangeZoomValue}
        size="xs"
        maxW={8}
        textAlign="center"
        borderColor={borderColor}
        _hover={{ borderColor: color }}
        _focusVisible={{
          borderColor: accent,
        }}
        onBlur={handleEditorZoom}
        onKeyDown={handleOnEnterPress}
      />

      <BasicTooltipButton label="Zoom in" onClick={editorZoomIn}>
        <LuZoomIn />
      </BasicTooltipButton>
    </HStack>
  );
}

// Export
export {
  RightSidebarButton,
  RunScriptButton,
  SaveFileButtons,
  ZoomEditorButtons,
};
