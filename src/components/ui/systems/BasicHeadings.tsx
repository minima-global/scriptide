// Import dependencies
import { Text } from '@chakra-ui/react';

// Heading (h2) component
function BasicHeading2({ children, ...props }) {
  // Render
  return (
    <Text
      as="h2"
      textTransform="uppercase"
      fontSize="lg"
      minH="2rem"
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </Text>
  );
}

// Heading (h3) component
function BasicHeading3({ children, ...props }) {
  // Render
  return (
    <Text as="h3" textTransform="uppercase" fontSize="xs" {...props}>
      {children}
    </Text>
  );
}

// Export
export { BasicHeading2, BasicHeading3 };
