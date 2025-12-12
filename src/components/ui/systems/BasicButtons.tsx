// Import dependencies
import { Button, useClipboard } from '@chakra-ui/react';
import { useEffect } from 'react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
import BasicTooltip from './BasicTooltip';

// Button component
function BasicButton({ children, hoverColor = '', ...props }) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Button
      size="sm"
      bg="transparent"
      color={colorAlt}
      p={0}
      _hover={{
        bg: 'transparent',
        color: props.disabled ? '' : hoverColor || color,
      }}
      _active={{
        bg: 'transparent',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

// Copy to clipboard button component
function BasicCopyButton({ valueToCopy, ...props }) {
  // Define clipboard
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  // Define theme
  const { color, colorAlt, colorSuccess, borderColor } = useAppTheme();

  // Define handler
  function handleOnCopy() {
    if (!valueToCopy || typeof valueToCopy !== 'string') {
      return;
    }

    onCopy();
  }

  // Define effect
  useEffect(() => {
    if (!valueToCopy || typeof valueToCopy !== 'string') {
      setValue('');
      return;
    }

    setValue(valueToCopy);
  }, [valueToCopy, setValue]);

  // Render
  return (
    <Button
      size="xs"
      h="16px"
      px={1}
      fontSize="2xs"
      borderRadius="sm"
      color={hasCopied ? colorSuccess : colorAlt}
      border="1px solid"
      borderColor={hasCopied ? colorSuccess : borderColor}
      bg="transparent"
      _hover={{
        color: !value ? '' : hasCopied ? colorSuccess : color,
        borderColor: !value ? '' : hasCopied ? colorSuccess : color,
      }}
      _active={{
        color: !value ? '' : color,
        borderColor: !value ? '' : color,
      }}
      textTransform="uppercase"
      onClick={handleOnCopy}
      disabled={!value}
      {...props}
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  );
}

// Hover button component
function BasicHoverButton({ children, label, ...props }) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <BasicTooltip label={label} placement="top">
      <Button
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color={colorAlt}
        _hover={{
          bg: 'transparent',
          color: props.disabled ? '' : color,
          transform: props.disabled ? '' : 'scale(1.2)',
        }}
        _active={{ bg: 'transparent' }}
        {...props}
      >
        {children}
      </Button>
    </BasicTooltip>
  );
}

// Tooltip button component
function BasicTooltipButton({ children, label, hoverColor = '', ...props }) {
  // Render
  return (
    <BasicTooltip label={label} placement="bottom">
      <BasicButton hoverColor={hoverColor} {...props}>
        {children}
      </BasicButton>
    </BasicTooltip>
  );
}

// Export
export { BasicButton, BasicCopyButton, BasicHoverButton, BasicTooltipButton };
