// Import dependencies
import {
  Box,
  Button,
  Card,
  Code,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useRunScriptStore from '@/stores/useRunScriptStore';
// Import hooks
import useRunScript from '@/hooks/useRunScript';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import { BasicHeading3 } from './systems/BasicHeadings';
import KissVMFiles from './KissVMFiles';
import KissVMFilesHeading from './KissVMFilesHeading';
import KissVMFilesMenu from './KissVMFilesMenu';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';

// Script status component
function ScriptStatus({ children, label, bool, colors = ['green', 'red'] }) {
  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
  return (
    <HStack gap={1}>
      <Text color={colorAlt} textTransform="uppercase">
        {label}
      </Text>

      <Code
        border="1px solid"
        borderColor="blackAlpha.300"
        colorScheme={bool === null ? 'gray' : bool ? colors[0] : colors[1]}
      >
        {children}
      </Code>
    </HStack>
  );
}

// Run and debug script component
function KissVMRunDebug() {
  // Define stores
  const scriptParse = useRunScriptStore((state) => state.scriptParse);
  const scriptSuccess = useRunScriptStore((state) => state.scriptSuccess);
  const scriptMonotonic = useRunScriptStore((state) => state.scriptMonotonic);
  const currentFile = useFileStore((state) => state.currentFile);

  // Define theme
  const { bgAlt, colorAlt } = useAppTheme();

  // Define run script
  const { isRunning, handleRunScript } = useRunScript();

  // Define memo
  const hasNoActiveScript = useMemo(
    () =>
      !currentFile ||
      !(currentFile?.endsWith('.kvm') && currentFile?.includes('contracts')),
    [currentFile]
  );

  // Define handler
  function handleRunDebug() {
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
    <VStack w="100%" gap={3}>
      <VStack w="100%" gap={1}>
        <VStack w="100%" gap={1}>
          <BasicHeading3 w="100%" color={colorAlt}>
            Workspaces
          </BasicHeading3>

          <HStack w="100%">
            <Workspace />

            <WorkspaceMenu />
          </HStack>
        </VStack>

        <VStack w="100%" gap={1}>
          <KissVMFilesHeading />

          <HStack w="100%">
            <KissVMFiles />

            <KissVMFilesMenu />
          </HStack>
        </VStack>
      </VStack>

      <Box w="100%" maxW="24rem">
        <Button
          w="100%"
          colorScheme="green"
          onClick={handleRunDebug}
          isLoading={isRunning}
          disabled={hasNoActiveScript}
        >
          Run and Debug
        </Button>
      </Box>

      <Card bg={bgAlt} px={3}>
        <HStack py={2} gap={3} flexWrap="wrap" justifyContent="center">
          <ScriptStatus label="Parse" bool={scriptParse}>
            {scriptParse === null ? 'N/A' : scriptParse ? 'OK' : 'FAIL'}
          </ScriptStatus>

          <ScriptStatus label="Run" bool={scriptSuccess}>
            {scriptSuccess === null ? 'N/A' : scriptSuccess ? 'OK' : 'FAIL'}
          </ScriptStatus>

          <ScriptStatus
            label="Monotonic"
            bool={scriptMonotonic}
            colors={['blue', 'purple']}
          >
            {scriptMonotonic === null ? 'N/A' : scriptMonotonic ? 'YES' : 'NO'}
          </ScriptStatus>
        </HStack>
      </Card>
    </VStack>
  );
}

// Export
export default KissVMRunDebug;
