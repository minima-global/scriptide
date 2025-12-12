// Import dependencies
import { HStack, Text, VStack } from '@chakra-ui/react';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
// Import store
import usePrevStateVariableStore from '@/stores/usePrevStateVariableStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { ICON_SIZES } from '@/constants';
// Import components
import { BasicHoverButton } from './systems/BasicButtons';
import StateInput from './systems/StateInput';

// PrevState component
function PrevStates() {
  // Define stores
  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );
  const addPrevStateVariable = usePrevStateVariableStore(
    (state) => state.addPrevStateVariable
  );
  const updatePrevStateVariableKey = usePrevStateVariableStore(
    (state) => state.updatePrevStateVariableKey
  );
  const updatePrevStateVariableValue = usePrevStateVariableStore(
    (state) => state.updatePrevStateVariableValue
  );
  const removePrevStateVariable = usePrevStateVariableStore(
    (state) => state.removePrevStateVariable
  );
  const removeAllPrevStateVariables = usePrevStateVariableStore(
    (state) => state.removeAllPrevStateVariables
  );

  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={2}>
      <HStack w="100%" justify="space-between">
        <BasicHoverButton
          label="Add variable"
          onClick={addPrevStateVariable}
          disabled={prevStateVariables.length > 255}
        >
          <LuPlus size={ICON_SIZES.sm} />
        </BasicHoverButton>

        <BasicHoverButton
          label="Remove all variables"
          onClick={removeAllPrevStateVariables}
          disabled={prevStateVariables.length < 1}
        >
          <LuTrash2 size={ICON_SIZES.sm} />
        </BasicHoverButton>
      </HStack>

      <VStack w="100%">
        {prevStateVariables.length > 0 ? (
          <>
            {prevStateVariables.map((_, index) => (
              <StateInput
                key={index}
                indexValue={prevStateVariables[index].index}
                indexOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updatePrevStateVariableKey(index, e.target.value)
                }
                stateValue={prevStateVariables[index].value}
                stateValueOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updatePrevStateVariableValue(index, e.target.value)
                }
                onRemove={() => removePrevStateVariable(index)}
              />
            ))}
          </>
        ) : (
          <Text w="100%" color={colorAlt}>
            No prevstate variables
          </Text>
        )}
      </VStack>
    </VStack>
  );
}

// Export
export default PrevStates;
