// Import dependencies
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
// Import icons
import { LuChevronRight, LuX } from 'react-icons/lu';
// Import stores
import useEditorStore from '@/stores/useEditorStore';
import useFileStore from '@/stores/useFileStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import CodeEditor from '../CodeEditor';
import ImageViewer from '../ImageViewer';
import BasicTooltip from '../systems/BasicTooltip';

// Active tab file path component
function ActiveTabFilePath({ path }: { path: string[] }) {
  // Define refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define theme
  const { accent, borderColor, colorAlt } = useAppTheme();

  // Define handlers
  function handleOnWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (scrollContainerRef.current) {
      // Change scroll behavior - left to right.
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  }

  // Define effect
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Scroll to the end of the path
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [path]);

  // Render
  return (
    <Box py={1} px={2}>
      <Breadcrumb
        ref={scrollContainerRef}
        spacing={1}
        color={colorAlt}
        fontSize="xs"
        separator={
          <Box color={borderColor}>
            <LuChevronRight />
          </Box>
        }
        userSelect="none"
        overflowX="auto"
        overflowY="hidden"
        className="no-scrollbar"
        onWheel={handleOnWheel}
      >
        {path.map((file, i) => (
          <BreadcrumbItem key={i} color={path.length - 1 === i ? accent : ''}>
            <Text>{file}</Text>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
}

// No file open component
function NoFileOpen() {
  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
  return (
    <Text
      h="100%"
      display="grid"
      placeItems="center"
      color={colorAlt}
      fontSize="sm"
      userSelect="none"
    >
      No file opened
    </Text>
  );
}

// Main panel component
function MainPanel() {
  // Define refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define theme
  const { accent, color, colorAlt, bg, bgShade, borderColor } = useAppTheme();

  // Define stores
  const allCodes = useEditorStore((state) => state.allCodes);
  const removeCode = useEditorStore((state) => state.removeCode);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const tabIndex = useEditorStore((state) => state.tabIndex);
  const setTabIndex = useEditorStore((state) => state.setTabIndex);

  // Define handlers
  function handleOnWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (scrollContainerRef.current) {
      // Change scroll behavior - left to right.
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  }
  function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
    const { id } = e.target as HTMLDivElement;
    if (id === 'tab-list') {
      setCurrentFile(null);
      setCurrentFolder(null);
      setTabIndex(-1);
    }
  }
  function handleSelectTab(file: string) {
    setCurrentFolder(file.split('/').slice(0, -1).join('/'));
    setCurrentFile(file);
  }
  function handleRemoveTab(file: string) {
    removeCode(file);

    const next = allCodes[tabIndex + 1];
    if (next) {
      setCurrentFile(next.file);
      setCurrentFolder(next.file.split('/').slice(0, -1).join('/'));
    } else {
      setCurrentFile(null);
      setCurrentFolder(null);
      setTabIndex(-1);
    }
  }

  // Render
  return (
    <Box h="100%" borderTop="1px solid" borderColor={borderColor}>
      {allCodes.length > 0 ? (
        <Tabs
          variant="enclosed"
          h="100%"
          w="100%"
          index={tabIndex}
          onChange={setTabIndex}
        >
          <Box
            pb={1}
            h="2.5rem"
            ref={scrollContainerRef}
            overflowX="auto"
            overflowY="hidden"
            className="tab-scrollbar"
            onWheel={handleOnWheel}
          >
            <TabList
              id="tab-list"
              bg={bgShade}
              borderColor={borderColor}
              minW="fit-content"
              onClick={handleOnClick}
            >
              {allCodes.map(({ file }) => (
                <BasicTooltip
                  openDelay={600}
                  key={file}
                  label={file.split('/').pop()}
                  placement="bottom"
                >
                  <Tab
                    p={0}
                    borderRadius="none"
                    borderTop="2px solid"
                    borderTopColor="transparent"
                    borderLeft="none"
                    borderRight="1px solid"
                    borderRightColor={borderColor}
                    _selected={{
                      bg,
                      borderColor: borderColor,
                      borderTopColor: accent,
                      borderBottomColor: bg,
                    }}
                  >
                    <HStack h="100%" gap={0}>
                      <Text
                        cursor="pointer"
                        h="100%"
                        maxW="10rem"
                        color={colorAlt}
                        pl={2}
                        fontSize="sm"
                        userSelect="none"
                        display="grid"
                        placeContent="center"
                        onClick={() => handleSelectTab(file)}
                        whiteSpace="nowrap"
                      >
                        <Text as="span" isTruncated>
                          {file.split('/').pop()}
                        </Text>
                      </Text>

                      <Box
                        p={2}
                        bg="transparent"
                        color={colorAlt}
                        _hover={{ bg: 'transparent', color }}
                        onClick={() => handleRemoveTab(file)}
                      >
                        <LuX />
                      </Box>
                    </HStack>
                  </Tab>
                </BasicTooltip>
              ))}
            </TabList>
          </Box>

          <TabPanels h="calc(100% - 2.5rem)">
            {allCodes.map(({ file, code, isImg }) => {
              const path = ['root', ...file.split('/').slice(3)];
              return (
                <TabPanel key={file} h="100%" p={0}>
                  <ActiveTabFilePath path={path} />

                  <Box h="calc(100% - 1.5rem)">
                    {isImg ? (
                      <ImageViewer src={code} />
                    ) : (
                      <CodeEditor file={file} code={code} />
                    )}
                  </Box>
                </TabPanel>
              );
            })}

            {!currentFile && <NoFileOpen />}
          </TabPanels>
        </Tabs>
      ) : (
        <NoFileOpen />
      )}
    </Box>
  );
}

// Export
export default MainPanel;
