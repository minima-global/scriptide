import useZipFile from '@/hooks/useZipFile';
import minima from '@/lib/minima';
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import isImageFile from '@/utils/isImageFile';
import {
  Box,
  Button,
  Input,
  Progress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAppTheme from '@/themes/useAppTheme';
import { DEFAULT_DAPP_CONFIG } from '@/constants';

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

  // Define state
  const [zipName, setZipName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasConfig, setHasConfig]: any = useState(null);

  // Define theme
  const { colorAlt } = useAppTheme();

  // Define handlers
  async function handleExport() {
    if (!zipName.endsWith('.zip')) {
      toast({
        title: 'Invalid zip name',
        description: 'Zip name must end with .zip',
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
            const binary = (await minima.file.loadbinary(file.location))
              .response.load.data;
            const base64 = minima.util.hexToBase64(binary);

            addZipImage(location, base64);
          } else {
            const data = (await minima.file.load(file.location)).response.load
              .data;

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

  // Define effects
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setZipName(`${currentWorkspace?.replaceAll(' ', '_')}.mds.zip`);
  }, [currentWorkspace]);

  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setHasConfig(!!files.find((file) => file.name === 'dapp.conf'));
  }, [currentWorkspace, files]);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3} color={colorAlt}>
      <Text w="100%" fontSize="sm" textAlign="center">
        Select a workspace to build a MiniDapp from.
      </Text>

      <VStack w="100%" gap={1}>
        <Text
          as="h3"
          w="100%"
          textTransform="uppercase"
          fontSize="xs"
          color={colorAlt}
        >
          Configurations
        </Text>

        <Box w="100%" maxW="24rem">
          <Button
            w="100%"
            size="sm"
            colorScheme="blue"
            onClick={() => {
              if (hasConfig === null) {
                return;
              }

              if (hasConfig) {
                const file = files.find((file) => file.name === 'dapp.conf');
                if (!file || currentFile === file?.location) {
                  return;
                }

                setCurrentFolder(
                  file.location.split('/').slice(0, -1).join('/')
                );
                setCurrentFile(file.location);
                loadFile(file.location);
                return;
              }

              addFile(
                `/workspaces/${currentWorkspace}/dapp.conf`,
                JSON.stringify(DEFAULT_DAPP_CONFIG, null, 2)
              );
            }}
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
        <Text
          as="h3"
          w="100%"
          textTransform="uppercase"
          fontSize="xs"
          color={colorAlt}
        >
          Build Name
        </Text>

        <Box w="100%">
          <Progress
            size="xs"
            bg="transparent"
            borderRadius="full"
            transform="scaleX(-1)"
            isIndeterminate={isLoading}
          />

          <Input
            size="sm"
            variant="outline"
            color="gray.50"
            borderColor="gray.700"
            _placeholder={{ color: 'gray.700' }}
            _focusVisible={{ borderColor: 'gray.50' }}
            _readOnly={{ color: 'gray.500' }}
            value={zipName}
            onChange={(e) => {
              const { value } = e.target;
              if (value.length <= 30) {
                setZipName(value);
              }
            }}
            placeholder="Enter zip name here"
            disabled={isLoading}
          />

          <Progress
            size="xs"
            bg="transparent"
            borderRadius="full"
            isIndeterminate={isLoading}
          />
        </Box>
      </VStack>

      <Box w="100%" maxW="24rem">
        <Button
          w="100%"
          size="sm"
          colorScheme="blue"
          onClick={handleExport}
          disabled={!currentWorkspace || !zipName || !hasConfig || isLoading}
        >
          Build MiniDapp
        </Button>
      </Box>
    </VStack>
  );
}

export default MiniDappBuild;
