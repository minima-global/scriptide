// Import dependencies
import { Highlight, Text } from '@chakra-ui/react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
import { IBasicHighlightProps } from '@/types';

// Confirm highlight component
function BasicConfirmHighlight({ query, ...props }) {
  // Render
  return (
    <Text textAlign="center" {...props}>
      <Highlight
        query={query}
        styles={{
          px: '2',
          py: '1',
          rounded: 'sm',
          color: 'gray.50',
          bg: 'red.700',
          userSelect: 'none',
        }}
      >
        {query}
      </Highlight>
    </Text>
  );
}

// Highlight component
function BasicHighlight({
  children,
  query,
  hColor,
  hBg,
  ...props
}: IBasicHighlightProps) {
  // Define theme
  const { bgReversed, colorReversed } = useAppTheme();

  // Render
  return (
    <Text {...props}>
      <Highlight
        query={query}
        styles={{
          color: hColor || colorReversed,
          bg: hBg || bgReversed,
          px: 1,
          rounded: 'sm',
          wordBreak: 'break-all',
          whiteSpace: 'wrap',
        }}
      >
        {children}
      </Highlight>
    </Text>
  );
}

// Export
export { BasicConfirmHighlight, BasicHighlight };
