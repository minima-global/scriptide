// Import dependencies
import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
// Import icons
import { LuRotateCw } from 'react-icons/lu';
// Import hooks
import useZipFile from '@/hooks/useZipFile';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import isImageFile from '@/utils/isImageFile';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { DAPP_CONFIG, ICON_SIZES, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicTooltipButton } from './systems/BasicButtons';
import { BasicHeading3 } from './systems/BasicHeadings';
import BasicInput from './systems/BasicInput';

// MiniDapp builder component
function MiniDappBuild() {
  // Define toast
  const toast = useToast();

  // Define zip file
  const { addZipFile, addZipImage, generateZip } = useZipFile();

  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const addFile = useFileStore((state) => state.addFile);
  const loadFile = useFileStore((state) => state.loadFile);

  // Define states
  const [zipName, setZipName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasConfig, setHasConfig] = useState<boolean | null>(null);

  // Define memo
  const isNotCorrectFileType = useMemo(
    () => !zipName || !zipName.endsWith('.mds.zip'),
    [zipName]
  );

  // Define theme
  const { colorAlt } = useAppTheme();

  // Define handlers
  async function handleExport() {
    if (!zipName.endsWith('.mds.zip')) {
      toast({
        title: 'Invalid MiniDapp name',
        description: 'MiniDapp name must end with .mds.zip',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!currentWorkspace || files.length < 1) {
      toast({
        title: 'No workspace selected',
        description: 'Please select a workspace to export',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      for (const file of files) {
        const location = file.location.split('/').splice(3).join('/');
        // console.log(location);

        if (file.isfile) {
          if (isImageFile(file.name)) {
            const binary =
              (await minima.file.loadbinary(file.location)).response?.load
                .data || '';
            const base64 = minima.util.hexToBase64(binary);

            addZipImage(location, base64);
          } else {
            const data =
              (await minima.file.load(file.location)).response?.load.data || '';

            addZipFile(location, data);
          }
        }
      }

      generateZip(zipName);
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error exporting workspace',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  }
  function handleCreateEditConfig() {
    if (hasConfig === null) {
      return;
    }

    if (hasConfig) {
      const file = files.find((file) => file.name === 'dapp.conf');
      if (!file || currentFile === file?.location) {
        return;
      }

      setCurrentFolder(file.location.split('/').slice(0, -1).join('/'));
      setCurrentFile(file.location);
      loadFile(file.location);
      return;
    }

    addFile(
      `/workspaces/${currentWorkspace}/dapp.conf`,
      JSON.stringify(DAPP_CONFIG, null, 2)
    );
  }
  function handleChangeZipName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value.length <= 30) {
      setZipName(value);
    }
  }

  // Define callback handlers
  const handleUpdateDappName = useCallback(async () => {
    if (hasConfig) {
      const data =
        (await minima.file.load(`workspaces/${currentWorkspace}/dapp.conf`))
          .response?.load.data || '';
      const config = JSON.parse(data);

      setZipName(
        `${config.name?.replaceAll(' ', '-').toLowerCase()}-${
          config.version
        }.mds.zip`
      );
      return;
    }

    setZipName(
      `${currentWorkspace?.replaceAll(' ', '-').toLowerCase()}-0.0.0.mds.zip`
    );
  }, [currentWorkspace, hasConfig]);

  // Define effects
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setHasConfig(!!files.find((file) => file.name === 'dapp.conf'));
  }, [currentWorkspace, files]);
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    handleUpdateDappName();
  }, [currentWorkspace, handleUpdateDappName, hasConfig]);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3} color={colorAlt}>
      <Text w="100%" fontSize="sm" textAlign="center">
        Select a workspace to build a MiniDapp from.
      </Text>

      <VStack w="100%" gap={1}>
        <BasicHeading3 w="100%" color={colorAlt}>
          Configurations
        </BasicHeading3>

        <Box w="100%" maxW="24rem">
          <Button
            w="100%"
            size="sm"
            colorScheme="blue"
            onClick={handleCreateEditConfig}
            disabled={hasConfig === null || isLoading}
          >
            {hasConfig === null
              ? '---'
              : hasConfig
              ? 'Edit Config'
              : 'Create Config'}
          </Button>
        </Box>
      </VStack>

      <VStack w="100%" gap={1}>
        <HStack w="100%" justify="space-between">
          <BasicHeading3 w="100%" color={colorAlt}>
            Build Name
          </BasicHeading3>

          <BasicTooltipButton
            label="Refresh name"
            onClick={handleUpdateDappName}
            disabled={isLoading}
          >
            <LuRotateCw size={ICON_SIZES.xs} />
          </BasicTooltipButton>
        </HStack>

        <BasicInput
          value={zipName}
          onChange={handleChangeZipName}
          placeholder={INPUT_PLACEHOLDERS.zip}
          disabled={isLoading}
        />
      </VStack>

      <Box w="100%" maxW="24rem">
        <Button
          w="100%"
          size="sm"
          colorScheme="blue"
          onClick={handleExport}
          isLoading={isLoading}
          disabled={
            isNotCorrectFileType || !currentWorkspace || !hasConfig || isLoading
          }
        >
          Build MiniDapp
        </Button>
      </Box>
    </VStack>
  );
}

// Export
export default MiniDappBuild;
