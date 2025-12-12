// Import dependencies
import useAppTheme from '@/themes/useAppTheme';
import { Box, HStack, Text } from '@chakra-ui/react';
// Import icons
import { LuInfo } from 'react-icons/lu';
// Import components
import { BasicHighlight } from './systems/BasicHighlights';
import BasicTooltip from './systems/BasicTooltip';

// Script files heading component
function KissVMFilesHeading() {
  // Define theme
  const { bgAlt, color, colorAlt } = useAppTheme();

  // Render
  return (
    <HStack w="100%" color={colorAlt} gap={1}>
      <Text as="h3" textTransform="uppercase" fontSize="xs">
        KissVM Scripts
      </Text>

      <BasicTooltip
        label={
          <BasicHighlight
            query={['.kvm', 'contracts']}
            hColor={color}
            hBg={bgAlt}
          >
            Script files must end with .kvm and be placed in the contracts
            folder in the root of the workspace.
          </BasicHighlight>
        }
        placement="right"
        fontWeight="normal"
      >
        <Box cursor="pointer" _hover={{ color }}>
          <LuInfo />
        </Box>
      </BasicTooltip>
    </HStack>
  );
}

// Export
export default KissVMFilesHeading;
