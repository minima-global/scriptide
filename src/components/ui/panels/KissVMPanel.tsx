// Import dependencies
import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
// Import icons
import {
  LuBraces,
  LuBrackets,
  LuChartNoAxesGantt,
  LuGlobe,
  LuLock,
} from 'react-icons/lu';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import components
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import Globals from '../Globals';
import KissVMRunDebug from '../KissVMRunDebug';
import Overview from '../Overview';
import PrevStates from '../PrevStates';
import Signatures from '../Signatures';
import States from '../States';

// KissVM script Panel Component
function KissVMPanel() {
  // Define states
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.kissVMPanelAccordionIndex) ||
        '[1]'
    )
  );

  // Define handlers
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.kissVMPanelAccordionIndex,
      JSON.stringify(index)
    );
  }

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <KissVMRunDebug />

      <AccordionBase index={accordionIndex} onChange={handleOnChange}>
        <AccordionItemBase title="Overview" icon={<LuChartNoAxesGantt />} isTop>
          <Overview />
        </AccordionItemBase>

        <AccordionItemBase title="Global Variables" icon={<LuGlobe />}>
          <Globals />
        </AccordionItemBase>

        <AccordionItemBase title="State Variables" icon={<LuBrackets />}>
          <States />
        </AccordionItemBase>

        <AccordionItemBase title="PrevState Variables" icon={<LuBraces />}>
          <PrevStates />
        </AccordionItemBase>

        <AccordionItemBase title="Txn Signatures" icon={<LuLock />} isBottom>
          <Signatures />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

// Export
export default KissVMPanel;
