// Import dependencies
import { Box, Progress } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Progress bar component
function BasicProgressBar({ progress, isError, ...props }) {
  // Define theme
  const { borderColor } = useAppTheme();

  // Render
  return (
    <Box border="1px solid" borderColor={borderColor} borderRadius="md" p={2}>
      <Progress
        hasStripe
        value={progress ? progress * 100 : 0}
        colorScheme={
          isError ? 'red' : progress && progress < 1 ? 'blue' : 'green'
        }
        bg={borderColor}
        {...props}
      />
    </Box>
  );
}

// Export
export default BasicProgressBar;
