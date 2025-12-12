// Import dependencies
import {
  Box,
  Card,
  Code,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
// Import utilities
import getVariableIcon from '@/utils/getVariableIcon';
import getVariableType from '@/utils/getVariableType';
// Import stores
import useRunScriptStore from '@/stores/useRunScriptStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { IOverviewItemProps } from '@/types';
// Import components
import { BasicCopyButton } from './systems/BasicButtons';
import { BasicHeading3 } from './systems/BasicHeadings';
import BasicTooltip from './systems/BasicTooltip';

// Overview item component
function OverviewItem({
  children,
  label,
  placeholder,
  h = 'auto',
}: IOverviewItemProps) {
  // Define theme
  const { color, colorAlt, bgAlt } = useAppTheme();

  // Render
  return (
    <VStack as="section" w="100%" gap={1}>
      <HStack as="header" w="100%" justifyContent="space-between">
        <BasicHeading3 color={colorAlt}>{label}</BasicHeading3>

        <BasicCopyButton valueToCopy={children} />
      </HStack>

      <Card w="100%" bg={bgAlt} color={color} p={2}>
        <Text as="pre" h={h} overflow="auto" whiteSpace="pre-wrap" pr={2}>
          {children || (
            <Text as="span" color={colorAlt}>
              {placeholder}
            </Text>
          )}
        </Text>
      </Card>
    </VStack>
  );
}

// Variable item component
function VariableItem({ variable, value }) {
  // Define theme
  const { accent, colorReversed, bgReversed } = useAppTheme();

  // Render
  return (
    <BasicTooltip
      label={`${variable} : ${getVariableType(value)}`}
      placement="right"
    >
      <ListItem display="grid" gridTemplateColumns="1.5rem 1fr">
        <ListIcon
          as={getVariableIcon(getVariableType(value))}
          color={accent}
          my={1.5}
        />

        <VStack w="100%" gap={0.5}>
          <Text w="100%" wordBreak="break-all">
            {variable}&nbsp;
            <Text as="span" color={accent}>
              : {getVariableType(value)}
            </Text>
          </Text>

          <Code
            w="100%"
            flexGrow={1}
            color={colorReversed}
            bg={bgReversed}
            wordBreak="break-all"
          >
            {value}
          </Code>
        </VStack>
      </ListItem>
    </BasicTooltip>
  );
}

// Overview component
function Overview() {
  // Define stores
  const cleanScript = useRunScriptStore((state) => state.cleanScript);
  const script0xAddress = useRunScriptStore((state) => state.script0xAddress);
  const scriptMxAddress = useRunScriptStore((state) => state.scriptMxAddress);
  const scriptVariables = useRunScriptStore((state) => state.scriptVariables);
  const totalScriptInstructions = useRunScriptStore(
    (state) => state.totalScriptInstructions
  );

  // Define theme
  const { accent, color, colorAlt, bgAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <OverviewItem label="Clean script" placeholder="Clean script here" h={32}>
        {cleanScript}
      </OverviewItem>

      <OverviewItem label="0x Address" placeholder="Script 0xAddress here">
        {script0xAddress}
      </OverviewItem>

      <OverviewItem label="Mx Address" placeholder="Script MxAddress here">
        {scriptMxAddress}
      </OverviewItem>

      <VStack as="section" w="100%" gap={1}>
        <HStack as="header" w="100%" justifyContent="space-between">
          <BasicHeading3 color={colorAlt}>Total instructions</BasicHeading3>
        </HStack>

        <Card w="100%" bg={bgAlt} color={color} p={2}>
          <Text as="pre" h="auto" overflow="auto" whiteSpace="pre-wrap" pr={2}>
            {totalScriptInstructions ? (
              <>
                <Text as="span" color={accent}>
                  {totalScriptInstructions}
                </Text>
                &nbsp;instructions
              </>
            ) : (
              <Text as="span" color={colorAlt}>
                Script MxAddress here
              </Text>
            )}
          </Text>
        </Card>
      </VStack>

      <VStack as="section" w="100%" gap={1}>
        <Box as="header" w="100%">
          <BasicHeading3 color={colorAlt}>Script variables</BasicHeading3>
        </Box>

        <Card w="100%" bg={bgAlt} color={color} p={2}>
          {Object.entries(scriptVariables).length > 0 ? (
            <List spacing={1}>
              {Object.entries(scriptVariables).map(([variable, value]) => (
                <VariableItem
                  key={variable}
                  variable={variable}
                  value={value}
                />
              ))}
            </List>
          ) : (
            <Text as="pre" color={colorAlt} whiteSpace="pre-wrap">
              Script variables here
            </Text>
          )}
        </Card>
      </VStack>
    </VStack>
  );
}

// Export
export default Overview;
