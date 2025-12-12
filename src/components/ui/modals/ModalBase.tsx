// Import dependencies
import { ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Modal base component
function ModalBase({ children, title }) {
  // Define theme
  const { bg, colorAlt } = useAppTheme();

  // Render
  return (
    <ModalContent bg={bg} color={colorAlt}>
      <ModalHeader fontSize="md" fontWeight="normal" textTransform="uppercase">
        {title}
      </ModalHeader>

      <ModalCloseButton />

      {children}
    </ModalContent>
  );
}

// Export
export default ModalBase;
