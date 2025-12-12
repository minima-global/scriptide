// Import dependencies
import {
  HStack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
// Import icons
import { LuPlus, LuTrash2, LuX } from 'react-icons/lu';
// Import store
import useSignatureStore from '@/stores/useSignatureStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { ICON_SIZES, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicButton, BasicHoverButton } from './systems/BasicButtons';
import BasicInput from './systems/BasicInput';

// Signatures component
function Signatures() {
  // Define store
  const signatures = useSignatureStore((state) => state.signatures);
  const setSignatures = useSignatureStore((state) => state.setSignatures);
  const addSignature = useSignatureStore((state) => state.addSignature);
  const updateSignature = useSignatureStore((state) => state.updateSignature);
  const removeSignature = useSignatureStore((state) => state.removeSignature);

  // Define theme
  const { bgAlt, borderColor, colorAlt, colorError } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={2}>
      <HStack w="100%" justify="space-between">
        <BasicHoverButton
          label="Add signature"
          onClick={addSignature}
          disabled={signatures.length >= 10}
        >
          <LuPlus size={ICON_SIZES.sm} />
        </BasicHoverButton>

        <BasicHoverButton
          label="Remove all signatures"
          onClick={() => setSignatures([])}
          disabled={signatures.length < 1}
        >
          <LuTrash2 size={ICON_SIZES.sm} />
        </BasicHoverButton>
      </HStack>

      {signatures.length > 0 ? (
        <>
          {signatures.map((_, index) => (
            <HStack key={index} w="100%">
              <InputGroup size="sm">
                <InputLeftAddon bg={bgAlt} borderColor={borderColor}>
                  <Text color={colorAlt} whiteSpace="nowrap">
                    {index}
                  </Text>
                </InputLeftAddon>

                <BasicInput
                  placeholder={INPUT_PLACEHOLDERS.value}
                  value={signatures[index]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateSignature(index, e.target.value)
                  }
                />

                <InputRightAddon
                  bg={bgAlt}
                  borderColor={borderColor}
                  borderLeft={0}
                  p={0}
                >
                  <BasicButton
                    hoverColor={colorError}
                    onClick={() => removeSignature(index)}
                  >
                    <LuX size={ICON_SIZES.sm} />
                  </BasicButton>
                </InputRightAddon>
              </InputGroup>
            </HStack>
          ))}
        </>
      ) : (
        <Text w="100%" color={colorAlt}>
          No signatures
        </Text>
      )}
    </VStack>
  );
}

// Export
export default Signatures;
