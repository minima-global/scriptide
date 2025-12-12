// Import dependencies
import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
// Import icons
import { LuHammer, LuShare2 } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import components
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import KissVMDeploy from '../KissVMDeploy';
import MiniDappBuild from '../MiniDappBuild';
import Workspace from '../Workspace';
import { BasicHeading3 } from '../systems/BasicHeadings';

// Deploy and build panel component
function DeployBuildPanel() {
  // Define theme
  const { colorAlt } = useAppTheme();

  // Define state
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.deployBuildPanelAccordionIndex) ||
        '[1]'
    )
  );

  // Define handler
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.deployBuildPanelAccordionIndex,
      JSON.stringify(index)
    );
  }

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <VStack w="100%" gap={1}>
        <BasicHeading3 w="100%" color={colorAlt}>
          Workspaces
        </BasicHeading3>

        <Workspace />
      </VStack>

      <AccordionBase index={accordionIndex} onChange={handleOnChange}>
        <AccordionItemBase title="Build MiniDapp" icon={<LuHammer />} isTop>
          <MiniDappBuild />
        </AccordionItemBase>

        <AccordionItemBase
          title="Deploy KissVM Scripts"
          icon={<LuShare2 />}
          isBottom
        >
          <KissVMDeploy />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

// Export
export default DeployBuildPanel;
