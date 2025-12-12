// Import dependencies
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Highlight,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
// Import icons
import { LuBadgeAlert, LuBadgeInfo, LuScrollText } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Changelog component
function Changelog({ children, version, date }) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem border="none">
        <Text as="h4">
          <AccordionButton
            px={2}
            py={1}
            color={colorAlt}
            _hover={{ color }}
            justifyContent="space-between"
          >
            <HStack>
              <LuScrollText />

              <Text as="span" flex="1" textAlign="left">
                [{version}] - {date}
              </Text>
            </HStack>

            <AccordionIcon />
          </AccordionButton>
        </Text>

        <AccordionPanel pb={2}>
          <List spacing={2} fontSize="sm" textAlign="start">
            {children}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function FeatureHighlight({ children, query }) {
  // Define theme
  const { bgReversed, colorReversed } = useAppTheme();

  // Render
  return (
    <Highlight
      query={query}
      styles={{
        color: colorReversed,
        bg: bgReversed,
        px: 1,
        rounded: 'sm',
        wordBreak: 'break-all',
        whiteSpace: 'wrap',
      }}
    >
      {children}
    </Highlight>
  );
}

// Feature item component
function FeatureItem({ children, alert = false }) {
  // Define theme
  const { colorSuccess, colorWarning } = useAppTheme();

  // Render
  return (
    <ListItem>
      <ListIcon
        as={alert ? LuBadgeAlert : LuBadgeInfo}
        color={alert ? colorWarning : colorSuccess}
      />
      {children}
    </ListItem>
  );
}

// Export
export { Changelog, FeatureHighlight, FeatureItem };
