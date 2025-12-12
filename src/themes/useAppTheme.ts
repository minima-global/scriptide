// Import dependencies
import { EDITOR_THEMES } from '@/constants';
import { useColorModeValue } from '@chakra-ui/react';

// Constant
const COLOR_SCHEME = 'orange';

// App theme hook
function useAppTheme() {
  const theme = {
    accent: useColorModeValue(`${COLOR_SCHEME}.500`, `${COLOR_SCHEME}.400`),
    bg: useColorModeValue('gray.50', 'gray.900'),
    bgAlt: useColorModeValue('gray.200', 'gray.800'),
    bgReversed: useColorModeValue('gray.900', 'gray.50'),
    bgShade: useColorModeValue('blackAlpha.100', 'blackAlpha.300'),
    borderColor: useColorModeValue('gray.400', 'gray.700'),
    borderColorAlt: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    color: useColorModeValue('gray.900', 'gray.50'),
    colorAlt: useColorModeValue('gray.600', 'gray.400'),
    colorError: useColorModeValue('red.500', 'red.400'),
    colorReversed: useColorModeValue('gray.50', 'gray.900'),
    colorScheme: COLOR_SCHEME,
    colorSuccess: useColorModeValue('green.500', 'green.400'),
    colorWarning: useColorModeValue('yellow.500', 'yellow.400'),
    editorTheme: useColorModeValue(EDITOR_THEMES.light, EDITOR_THEMES.dark),
  };

  // Return theme
  return theme;
}

// Export
export default useAppTheme;
