// Import dependencies
import { Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
// Import store
import useRunScriptStore from '@/stores/useRunScriptStore';
import useGlobalVariableStore from '@/stores/useGlobalVariableStore';
// Import constants
import {
  LOCAL_STORAGE_KEYS,
  INPUT_PLACEHOLDERS,
  GLOBAL_VARIABLE_DETAILS,
} from '@/constants';
// Import components
import {
  AccordionBaseAlt,
  AccordionItemBaseAlt,
} from './systems/AccordionBase';
import BasicInput from './systems/BasicInput';

// Global variables component
function Globals() {
  // Define stores
  const script0xAddress = useRunScriptStore((state) => state.script0xAddress);
  const globals = useGlobalVariableStore((state) => state.globals);
  const globalUpdate = useGlobalVariableStore((state) => state.globalUpdate);

  // Define states
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.globalsAccordionIndex) || '[1]'
    )
  );

  // Define handlers
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.globalsAccordionIndex,
      JSON.stringify(index)
    );
  }

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <AccordionBaseAlt index={accordionIndex} onChange={handleOnChange}>
        {Object.keys(globals).map((global, index) => (
          <AccordionItemBaseAlt
            key={global}
            title={global}
            isTop={index === 0}
            isBottom={index === Object.keys(globals).length - 1}
          >
            <Text pb={4}>{GLOBAL_VARIABLE_DETAILS[global]}</Text>

            <BasicInput
              placeholder={
                global === '@ADDRESS'
                  ? 'Run script first to see address'
                  : INPUT_PLACEHOLDERS.value
              }
              /* If the global is '@ADDRESS', show the script address
               * from the script0xAddress state, and disable onchange handler
               * and set the access to read only.
               */
              value={global === '@ADDRESS' ? script0xAddress : globals[global]}
              {...(global !== '@ADDRESS' && {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  globalUpdate(global, e.target.value),
              })}
              readOnly={global === '@ADDRESS'}
            />
          </AccordionItemBaseAlt>
        ))}
      </AccordionBaseAlt>
    </VStack>
  );
}

// Export
export default Globals;
