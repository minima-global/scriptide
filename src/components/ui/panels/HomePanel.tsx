// Import dependencies
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import AppLogo from '../systems/AppLogo';
import ChangelogV3_0_0 from '@/components/changelogs/ChangelogV3_0_0';
import ChangelogV3_0_2 from '@/components/changelogs/ChangelogV3_0_2';
import ChangelogV3_0_4 from '@/components/changelogs/ChangelogV3_0_4';
import ChangelogV3_1_0 from '@/components/changelogs/ChangelogV3_1_0';
import ChangelogV3_1_3 from '@/components/changelogs/ChangelogV3_1_3';
import ChangelogV3_1_4 from '@/components/changelogs/ChangelogV3_1_4';

// Home panel component
function HomePanel() {
  // Define theme
  const { borderColor, colorAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" pb={4} color={colorAlt} textAlign="center">
      <Box maxW="200px" p={4}>
        <AppLogo size="100%" />
      </Box>

      <Text as="h3" w="100%" fontSize="lg">
        Welcome to Minima Script IDE!
      </Text>

      <Divider borderColor={borderColor} />

      <VStack w="100%" gap={3} py={4}>
        <Text w="100%">
          This is an IDE for writing and testing Minima scripts (KISS VM) or
          create simple MiniDapps.
        </Text>

        <Text w="100%">
          It is a work in progress and will be improved as time goes by. If you
          find any bugs or have any suggestions, please let me know, and please
          be patient as this project is still under development.
        </Text>
      </VStack>

      <Divider borderColor={borderColor} />

      <Text as="h3" w="100%" fontSize="lg">
        Changelog
      </Text>

      <ChangelogV3_0_0 />
      <ChangelogV3_0_2 />
      <ChangelogV3_0_4 />
      <ChangelogV3_1_0 />
      <ChangelogV3_1_3 />
      <ChangelogV3_1_4 />
    </VStack>
  );
}

// Export
export default HomePanel;
