// Import dependencies
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
// Import icons
import { LuChevronDown, LuChevronUp, LuMinus, LuPlus } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { IAccordionItemBaseAltProps, IAccordionItemBaseProps } from '@/types';

// Accordion base component
function AccordionBase({ children, ...props }) {
  // Define theme
  const { borderColor } = useAppTheme();

  // Render
  return (
    <Accordion w="100%" borderColor={borderColor} allowMultiple {...props}>
      {/* Empty AccordionItem to prevent an index bug on mount/unmount */}
      <AccordionItem display="none">
        <AccordionButton />
      </AccordionItem>

      {children}
    </Accordion>
  );
}

// Accordion base alt component
function AccordionBaseAlt({ children, ...props }) {
  // Define theme
  const { bgAlt, borderColor } = useAppTheme();

  // Render
  return (
    <Accordion
      borderRadius="md"
      bg={bgAlt}
      border="1px solid"
      borderColor={borderColor}
      w="100%"
      allowMultiple
      {...props}
    >
      {/* Empty AccordionItem to prevent an index bug on mount/unmount */}
      <AccordionItem display="none">
        <AccordionButton />
      </AccordionItem>

      {children}
    </Accordion>
  );
}

// Accordion item base component
function AccordionItemBase({
  children,
  title,
  icon,
  isTop,
  isBottom,
}: IAccordionItemBaseProps) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <AccordionItem
      borderTop={isTop ? 'none' : ''}
      borderBottom={isBottom ? 'none' : ''}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton px={2} py={1} color={colorAlt} _hover={{ color }}>
            {icon && <Box mr={2}>{icon}</Box>}

            <Text as="span" flex="1" textAlign="left" textTransform="uppercase">
              {title}
            </Text>

            {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
          </AccordionButton>

          <AccordionPanel pb={4} px={2} color={colorAlt} minH={64}>
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

// Accordion item base component
function AccordionItemBaseAlt({
  children,
  title,
  isTop,
  isBottom,
}: IAccordionItemBaseAltProps) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <AccordionItem
      borderTop={isTop ? 'none' : ''}
      borderBottom={isBottom ? 'none' : ''}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton px={2} py={1} color={colorAlt} _hover={{ color }}>
            <Text
              as="span"
              flex="1"
              textAlign="left"
              textTransform="uppercase"
              fontSize="sm"
            >
              {title}
            </Text>

            {isExpanded ? <LuMinus /> : <LuPlus />}
          </AccordionButton>

          <AccordionPanel pb={4} color={colorAlt}>
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

// Export
export {
  AccordionBase,
  AccordionBaseAlt,
  AccordionItemBase,
  AccordionItemBaseAlt,
};
