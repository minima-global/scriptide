// Import dependencies
import { Box } from '@chakra-ui/react';
// Import theme
import useAppTheme from '@/themes/useAppTheme';
// Import components
import Router from '@/router';

// Component
function App() {
  // Define theme
  const { bg, color } = useAppTheme();

  // Render
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg={bg}
      color={color}
      display="flex"
      flexDirection="column"
    >
      <Router />
    </Box>
  );
}

// Export
export default App;
