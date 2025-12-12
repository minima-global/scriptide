// Import dependencies
import { Box, Tooltip } from '@chakra-ui/react';
// Import types
import { IBasicTooltipProps } from '@/types';

// Tooltip component
function BasicTooltip({ children, openDelay, ...props }: IBasicTooltipProps) {
  // Render
  return (
    <Tooltip openDelay={openDelay || 300} hasArrow {...props}>
      <Box>{children}</Box>
    </Tooltip>
  );
}

// Export
export default BasicTooltip;
