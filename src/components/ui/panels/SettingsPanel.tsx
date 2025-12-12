// Import dependencies
import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
// Import icons
import { LuPalette } from 'react-icons/lu';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import components
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import Appearance from '../Appearance';

// Settings panel component
function SettingsPanel() {
  // Define state
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.settingsPanelAccordionIndex) ||
        '[1]'
    )
  );

  // Define handler
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.settingsPanelAccordionIndex,
      JSON.stringify(index)
    );
  }

  // Render
  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={3}>
      <AccordionBase index={accordionIndex} onChange={handleOnChange}>
        <AccordionItemBase
          title="Appearance"
          icon={<LuPalette />}
          isTop
          isBottom
        >
          <Appearance />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

// Export
export default SettingsPanel;
