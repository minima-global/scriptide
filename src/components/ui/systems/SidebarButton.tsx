// Import dependencies
import { Box, Button, HStack } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { ISidebarButtonProps } from '@/types';
// Import components
import BasicTooltip from './BasicTooltip';

// Sidebar button component
function SidebarButton({
  children,
  label,
  placement,
  ...props
}: ISidebarButtonProps) {
  // Define theme
  const { accent, color, colorAlt } = useAppTheme();

  // Render
  return (
    <BasicTooltip
      openDelay={300}
      label={label}
      placement={placement || 'top-start'}
      hasArrow
    >
      <HStack h="100%" gap={1}>
        <Box h="100%" w={0.5} bg={props.isActive ? accent : 'transparent'} />

        <Button
          p={0}
          bg="transparent"
          color={colorAlt}
          _hover={{
            color: props.disabled ? '' : color,
          }}
          _active={{
            color,
          }}
          {...props}
        >
          {children}
        </Button>
      </HStack>
    </BasicTooltip>
  );
}

// Export
export default SidebarButton;
