// Import dependencies
import { HStack, Text, VStack } from '@chakra-ui/react';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
// Import store
import useStateVariableStore from '@/stores/useStateVariableStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { ICON_SIZES } from '@/constants';
// Import components
import { BasicHoverButton } from './systems/BasicButtons';
import StateInput from './systems/StateInput';

// State component
function States() {
  // Define stores
  const stateVariables = useStateVariableStore((state) => state.stateVariables);
  const addStateVariable = useStateVariableStore(
    (state) => state.addStateVariable
  );
  const updateStateVariableKey = useStateVariableStore(
    (state) => state.updateStateVariableKey
  );
  const updateStateVariableValue = useStateVariableStore(
    (state) => state.updateStateVariableValue
  );
  const removeStateVariable = useStateVariableStore(
    (state) => state.removeStateVariable
  );
  const removeAllStateVariables = useStateVariableStore(
    (state) => state.removeAllStateVariables
  );

  // Define theme
  const { colorAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={2}>
      <HStack w="100%" justify="space-between">
        <BasicHoverButton
          label="Add variable"
          onClick={addStateVariable}
          disabled={stateVariables.length > 255}
        >
          <LuPlus size={ICON_SIZES.sm} />
        </BasicHoverButton>

        <BasicHoverButton
          label="Remove all variables"
          onClick={removeAllStateVariables}
          disabled={stateVariables.length < 1}
        >
          <LuTrash2 size={ICON_SIZES.sm} />
        </BasicHoverButton>
      </HStack>

      <VStack w="100%">
        {stateVariables.length > 0 ? (
          <>
            {stateVariables.map((_, index) => (
              <StateInput
                key={index}
                indexValue={stateVariables[index].index}
                indexOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateStateVariableKey(index, e.target.value)
                }
                stateValue={stateVariables[index].value}
                stateValueOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateStateVariableValue(index, e.target.value)
                }
                onRemove={() => removeStateVariable(index)}
              />
            ))}
          </>
        ) : (
          <Text w="100%" color={colorAlt}>
            No state variables
          </Text>
        )}
      </VStack>
    </VStack>
  );
}

// Export
export default States;
