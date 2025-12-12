// Import types
import { ButtonProps, TooltipProps } from '@chakra-ui/react';
import { Chunk } from 'node_modules/@chakra-ui/react/dist/types/highlight/highlight-words';
import { ReactNode } from 'react';

// ============================================================= //
// Component interfaces ---------------------------------------- //
// ============================================================= //
interface IAccordionItemBaseProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  isTop?: boolean;
  isBottom?: boolean;
}
interface IAccordionItemBaseAltProps {
  children: ReactNode;
  title: string;
  isTop?: boolean;
  isBottom?: boolean;
}
interface IAppLogoProps {
  size?: string | number;
  color?: string;
}
interface IBasicHighlightProps {
  children: string | ((props: Chunk[]) => ReactNode);
  query: string | string[];
  hColor?: string;
  hBg?: string;
}
interface IBasicTooltipProps extends TooltipProps {
  children: ReactNode;
  openDelay?: number;
}
interface IOverviewItemProps {
  children: ReactNode;
  label: string;
  placeholder: string;
  h?: string | number;
}
interface IScriptOverviewItemProps {
  children: ReactNode;
  title: string;
  h?: string | number;
  className?: string;
}
interface ISidebarButtonProps extends ButtonProps {
  children: ReactNode;
  label: string;
  placement?: TooltipProps['placement'];
  isActive: boolean;
}

// Export types
export type {
  IAccordionItemBaseProps,
  IAccordionItemBaseAltProps,
  IAppLogoProps,
  IBasicHighlightProps,
  IBasicTooltipProps,
  IOverviewItemProps,
  IScriptOverviewItemProps,
  ISidebarButtonProps,
};
