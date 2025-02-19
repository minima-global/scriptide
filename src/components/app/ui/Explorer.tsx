/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
// Import store
import useFileStore from '@/store/useFileStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import FilesMenu from './FilesMenu';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';
import { FileTree } from './FileTree';

// File explorer component
function Explorer() {
  // Define stores
  const allFiles = useFileStore((state) => state.allFiles);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const isLoadingFiles = useFileStore((state) => state.isLoadingFiles);

  // Define state
  const [isExpanded, setIsExpanded] = useState({});

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

  // Define effects
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setIsExpanded(
      JSON.parse(
        localStorage.getItem(`${currentWorkspace}-explorer-expanded`) || '{}'
      )
    );
  }, [currentWorkspace]);

  // Render
  return (
    <>
      <VStack w="100%" h="100%" fontSize="sm" gap={3}>
        <VStack w="100%" fontSize="sm" gap={1}>
          <Text
            w="100%"
            as="h3"
            fontSize="xs"
            textTransform="uppercase"
            color="gray.500"
          >
            Workspaces
          </Text>

          <HStack w="100%">
            <Workspace />

            <WorkspaceMenu workspaces={workspaces} />
          </HStack>
        </VStack>

        {isLoadingFiles ? (
          <VStack w="100%" flexGrow="1" justifyContent="center">
            <Spinner size="xl" color="gray.700" />
          </VStack>
        ) : (
          <>
            {workspaces.length > 0 ? (
              <VStack w="100%" h="100%" gap={1}>
                <FilesMenu />

                <VStack
                  id="FILE_EXPLORER"
                  w="100%"
                  flexGrow="1"
                  maxH="32rem"
                  borderTop="1px solid"
                  borderLeft="1px solid"
                  borderBottom="1px solid"
                  borderColor="gray.700"
                  p={1}
                  gap={0.5}
                  overflowY="scroll"
                  className="alt-scrollbar"
                  // display="box"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    // console.log('context menu');
                  }}
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
                    onClick={() => {
                      setCurrentFile(null);
                      setCurrentFolder(null);
                    }}
                  />
                </VStack>
              </VStack>
            ) : (
              <Text w="100%" color="gray.500">
                No workspaces
              </Text>
            )}
          </>
        )}
      </VStack>
    </>
  );
}

// Export
export default Explorer;
