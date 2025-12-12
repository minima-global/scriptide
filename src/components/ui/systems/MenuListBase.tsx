// Import dependencies
import useAppTheme from '@/themes/useAppTheme';
import {
  MenuDivider,
  MenuItem,
  MenuList,
  // Tooltip
} from '@chakra-ui/react';

// Menu divider base component
function MenuDividerBase() {
  return <MenuDivider my={1} />;
}

// Menu item base component
function MenuItemBase({
  children,
  // label,
  icon,
  onClick,
  disabled = false,
}) {
  // Define theme
  const { borderColor, color } = useAppTheme();

  // Render
  return (
    <>
      {/* Disabled the tooltip - was distractive */}
      {/* <Tooltip label={label} placement="right" hasArrow> */}
      <MenuItem
        py={1}
        bg="transparent"
        borderColor={borderColor}
        _hover={{ bg: borderColor, color }}
        icon={icon}
        onClick={onClick}
        isDisabled={disabled}
      >
        {children}
      </MenuItem>
      {/* </Tooltip> */}
    </>
  );
}

// Menu list base component
function MenuListBase({ children }) {
  // Define theme
  const { bg, borderColor, colorAlt } = useAppTheme();

  // Render
  return (
    <MenuList
      color={colorAlt}
      bg={bg}
      borderColor={borderColor}
      py={0}
      overflow="hidden"
      minW="auto"
    >
      {children}
    </MenuList>
  );
}

// Export
export { MenuDividerBase, MenuItemBase, MenuListBase };
