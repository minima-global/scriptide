// Import dependencies
import { HStack, Text } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// App header component
function Header() {
  // Define theme
  const { borderColor, colorAlt } = useAppTheme();

  // Render
  return (
    <HStack
      as="header"
      h="1.5rem"
      borderBottom="1px solid"
      borderColor={borderColor}
      px={2}
      justify="center"
    >
      <Text
        as="h1"
        color={colorAlt}
        fontWeight="medium"
        textTransform="uppercase"
        userSelect="none"
      >
        Minima Script IDE
      </Text>
    </HStack>
  );
}

// Export
export default Header;
