// Import dependencies
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { appContext } from '../../../AppContext';
import { useContext } from 'react';
import { LuArrowDown, LuArrowUp, LuTrash2 } from 'react-icons/lu';

// Signatures component
function Signatures() {
  // Define context
  const { signatures, setSignatures } = useContext(appContext);

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <HStack w="100%" justify="space-between">
        <Text as="h3" textTransform="uppercase" color="gray.500" fontSize="xs">
          Signers
        </Text>

        <HStack gap={1}>
          <Button
            p={0}
            h="auto"
            minW="auto"
            bg="transparent"
            color="gray.500"
            _hover={{
              bg: 'transparent',
              color: signatures.length >= 10 ? '' : 'gray.50',
              transform: signatures.length >= 10 ? '' : 'scale(1.2)',
            }}
            _active={{ bg: 'transparent', color: 'gray.50' }}
            onClick={() => {
              if (signatures.length < 10) {
                setSignatures((prevState) => [...prevState, '']);
              }
            }}
            disabled={signatures.length >= 10}
          >
            <LuArrowDown size={20} />
          </Button>

          <Button
            p={0}
            h="auto"
            minW="auto"
            bg="transparent"
            color="gray.500"
            _hover={{
              bg: 'transparent',
              color: signatures.length < 1 ? '' : 'gray.50',
              transform: signatures.length < 1 ? '' : 'scale(1.2)',
            }}
            _active={{ bg: 'transparent', color: 'gray.50' }}
            onClick={() =>
              setSignatures((prevState) => {
                const temp = [...prevState];
                temp.pop();

                return temp;
              })
            }
            disabled={signatures.length < 1}
          >
            <LuArrowUp size={20} />
          </Button>

          <Button
            p={0}
            h="auto"
            minW="auto"
            bg="transparent"
            color="gray.500"
            _hover={{
              bg: 'transparent',
              color: signatures.length < 1 ? '' : 'gray.50',
              transform: signatures.length < 1 ? '' : 'scale(1.2)',
            }}
            _active={{ bg: 'transparent', color: 'gray.50' }}
            onClick={() => setSignatures([])}
            disabled={signatures.length < 1}
          >
            <LuTrash2 size={20} />
          </Button>
        </HStack>
      </HStack>

      {signatures.length > 0 ? (
        <>
          {signatures.map((_, index) => (
            <HStack key={index} w="100%">
              <InputGroup size="sm">
                <InputLeftAddon bg="gray.800" borderColor="gray.700">
                  <Text color="gray.500" whiteSpace="nowrap">
                    {index < 10 ? `0${index}` : index}
                  </Text>
                </InputLeftAddon>

                <Input
                  variant="outline"
                  borderColor="gray.700"
                  _placeholder={{ color: 'gray.700' }}
                  _readOnly={{ color: 'gray.500' }}
                  value={signatures[index]}
                  onChange={(e) =>
                    setSignatures((prevState) => {
                      prevState[index] = e.target.value;
                      return [...prevState];
                    })
                  }
                  placeholder="Enter value here"
                />
              </InputGroup>
            </HStack>
          ))}
        </>
      ) : (
        <Text w="100%" color="gray.500">
          No signatures
        </Text>
      )}
    </VStack>
  );
}

// Export
export default Signatures;
