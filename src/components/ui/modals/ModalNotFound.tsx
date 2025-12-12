import { Highlight, Text } from '@chakra-ui/react';
import InfoModal from './InfoModal';
import useModalStore from '@/stores/useModalStore';

// Not found modal component
function ModalNotFound() {
  // Define stores
  const modalType = useModalStore((state) => state.modalType);
  const onClose = useModalStore((state) => state.onClose);

  // Render
  return (
    <InfoModal title="Not found" onClose={onClose}>
      <Text fontSize="sm" pb={4} textAlign="center">
        The requested modal was not found. Please try again.
      </Text>

      <Text textAlign="center">
        <Highlight
          query={modalType ? modalType : '?'}
          styles={{
            px: '2',
            py: '1',
            rounded: 'sm',
            color: 'gray.50',
            bg: 'red.700',
            userSelect: 'none',
          }}
        >
          {modalType ? modalType : '?'}
        </Highlight>
      </Text>
    </InfoModal>
  );
}

// Export
export default ModalNotFound;
