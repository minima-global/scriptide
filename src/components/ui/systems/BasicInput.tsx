// Import dependencies
import { Input } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Input component
function BasicInput({ ...props }) {
  // Define theme
  const { accent, borderColor, color, colorAlt } = useAppTheme();

  // Render
  return (
    <Input
      size="sm"
      variant="outline"
      color={color}
      borderColor={borderColor}
      _hover={{ borderColor: color }}
      _placeholder={{ color: borderColor }}
      _focusVisible={{ borderColor: accent }}
      _readOnly={{ color: colorAlt }}
      {...props}
    />
  );
}

// Export
export default BasicInput;
