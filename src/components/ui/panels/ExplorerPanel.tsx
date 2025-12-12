// Import dependencies
import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
// Import store
import useEditorStore from '@/stores/useEditorStore';
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import components
import { BasicHeading3 } from '../systems/BasicHeadings';
import { FileTree } from '../systems/FileTree';
import FilesMenu from '../FilesMenu';
import Workspace from '../Workspace';
import WorkspaceMenu from '../WorkspaceMenu';

// File explorer component
function ExplorerPanel() {
  // Define stores
  const allFiles = useFileStore((state) => state.allFiles);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const isLoadingFiles = useFileStore((state) => state.isLoadingFiles);
  const setTabIndex = useEditorStore((state) => state.setTabIndex);

  // Define theme
  const { colorAlt, borderColor } = useAppTheme();

  // Define state
  const [isExpanded, setIsExpanded] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded) || '{}'
    )
  );

  // Define memo
  const file = useMemo(() => {
    return [
      {
        isdir: true,
        isfile: false,
        location: `/workspaces/${currentWorkspace}`,
        name: currentWorkspace,
        _children: allFiles,
      },
    ];
  }, [currentWorkspace, allFiles]);

  // Define handlers
  function handleOnContextMenu(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function handleOnClick() {
    setCurrentFile(null);
    setCurrentFolder(null);
    setTabIndex(-1);
  }

  // Render
  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={3}>
      <VStack w="100%" fontSize="sm" gap={1}>
        <BasicHeading3 w="100%" color={colorAlt}>
          Workspaces
        </BasicHeading3>

        <HStack w="100%">
          <Workspace />

          <WorkspaceMenu />
        </HStack>
      </VStack>

      {isLoadingFiles ? (
        <VStack w="100%" flexGrow="1" justifyContent="center">
          <Spinner size="xl" color={borderColor} />
        </VStack>
      ) : (
        <>
          {workspaces.length > 0 ? (
            <VStack w="100%" h="100%" gap={1}>
              <FilesMenu setIsExpanded={setIsExpanded} />

              <VStack
                id="FILE_EXPLORER"
                w="100%"
                flexGrow="1"
                maxH="32rem"
                border="1px solid"
                borderColor={borderColor}
                p={1}
                gap={0.5}
                overflowY="scroll"
                className="alt-scrollbar"
                onContextMenu={handleOnContextMenu}
              >
                <FileTree
                  file={file}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  isRoot={true}
                />

                <Box
                  w="100%"
                  minH="1rem"
                  flexGrow="1"
                  onClick={handleOnClick}
                />
              </VStack>
            </VStack>
          ) : (
            <Text w="100%" color={colorAlt}>
              No workspaces
            </Text>
          )}
        </>
      )}
    </VStack>
  );
}

// Export
export default ExplorerPanel;
