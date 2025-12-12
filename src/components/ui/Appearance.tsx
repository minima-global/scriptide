// Import dependencies
import { Box, HStack, Select, Text, useColorMode } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Appearance settings component
function Appearance() {
  // Define themes
  const { colorMode, toggleColorMode } = useColorMode();
  const { accent, borderColor, color, colorAlt } = useAppTheme();

  // Render
  return (
    <HStack w="100%" gap={2} justify="space-between" flexWrap="wrap">
      <Text as="h4" textTransform="uppercase" fontSize="xs" color={colorAlt}>
        Color mode
      </Text>

      <Box>
        <Select
          size="xs"
          value={colorMode}
          onChange={toggleColorMode}
          borderColor={borderColor}
          _hover={{ borderColor: color }}
          _focusVisible={{ borderColor: accent }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </Box>
    </HStack>
  );
}

// Export
export default Appearance;
