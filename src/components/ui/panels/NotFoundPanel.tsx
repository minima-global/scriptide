// Import dependencies
import { Text, VStack } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Not found panel
function NotFoundPanel() {
  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
  return (
    <VStack
      w="100%"
      color={colorAlt}
      flexGrow="1"
      justify="center"
      gap={0}
      userSelect="none"
    >
      <Text as="h3" fontSize="4xl" fontWeight="bold">
        404
      </Text>

      <Text>Panel not found</Text>
    </VStack>
  );
}

// Export
export default NotFoundPanel;
