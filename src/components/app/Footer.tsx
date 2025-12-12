// Import dependencies
import { HStack, Text } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// App footer component
function Footer() {
  // Define theme
  const { borderColor } = useAppTheme();

  // Render
  return (
    <HStack
      as="footer"
      h="1rem"
      px={1}
      color={borderColor}
      borderTop="1px solid"
      borderColor={borderColor}
      fontSize="2xs"
      textTransform="uppercase"
      justify="space-between"
      userSelect="none"
    >
      <Text>Minima Script IDE</Text>

      <Text>Version 3.1.4</Text>
    </HStack>
  );
}

// Export
export default Footer;
