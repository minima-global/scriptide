// Import dependencies
import { Button, ModalBody, ModalFooter } from '@chakra-ui/react';
// Import components
import ModalBase from './ModalBase';

// Confirm modal component
function ConfirmModal({
  children,
  title,
  buttonLabel,
  onClose,
  onClick,
  disabled = false,
}) {
  // Render
  return (
    <ModalBase title={title}>
      <ModalBody>{children}</ModalBody>

      <ModalFooter justifyContent="center" gap={2}>
        <Button colorScheme="blue" onClick={onClick} disabled={disabled}>
          {buttonLabel}
        </Button>

        <Button variant="ghost" colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}

// Export
export default ConfirmModal;
