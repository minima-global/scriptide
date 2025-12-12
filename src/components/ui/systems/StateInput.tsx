// Import dependencies
import { InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
// Import icons
import { LuX } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { ICON_SIZES, INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import { BasicButton } from './BasicButtons';
import BasicInput from './BasicInput';

// State input component
function StateInput({
  indexValue,
  indexOnChange,
  stateValue,
  stateValueOnChange,
  onRemove,
}) {
  // Define theme
  const { bg, bgAlt, borderColor, colorError } = useAppTheme();

  // Render
  return (
    <InputGroup size="sm">
      <InputLeftAddon bg={bgAlt} borderColor={borderColor} px={1}>
        <BasicInput
          size="xs"
          bg={bg}
          maxW={10}
          textAlign="center"
          placeholder="---"
          value={indexValue}
          onChange={indexOnChange}
        />
      </InputLeftAddon>

      <BasicInput
        value={stateValue}
        onChange={stateValueOnChange}
        placeholder={INPUT_PLACEHOLDERS.value}
      />

      <InputRightAddon bg={bgAlt} borderColor={borderColor} px={0}>
        <BasicButton hoverColor={colorError} onClick={onRemove}>
          <LuX size={ICON_SIZES.sm} />
        </BasicButton>
      </InputRightAddon>
    </InputGroup>
  );
}

// Export
export default StateInput;
