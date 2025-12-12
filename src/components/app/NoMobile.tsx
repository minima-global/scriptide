// Import dependencies
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
} from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// No mobile support component
function NoMobile() {
  // Define theme
  const { bgAlt, borderColor, colorAlt, colorError } = useAppTheme();

  // Render
  return (
    <VStack h="calc(100vh - 2.5rem)" justify="center" p={4}>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="content"
        bg={bgAlt}
        color={colorAlt}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        maxWidth="sm"
      >
        <AlertIcon boxSize="40px" mr={0} color={colorError} />

        <AlertTitle mt={4} mb={1} fontSize="lg" color={colorError}>
          Mobile not supported!
        </AlertTitle>

        <AlertDescription maxWidth="xs" fontSize="sm">
          MiniDapp is not compatible with mobile devices yet. Please be patient
          and use the desktop version for now.
        </AlertDescription>
      </Alert>
    </VStack>
  );
}

export default NoMobile;
