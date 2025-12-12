// Import dependencies
import {
  LuBinary,
  LuCode,
  LuDiff,
  LuHash,
  LuRectangleEllipsis,
  LuType,
} from 'react-icons/lu';
// Import types
import { IconType } from 'react-icons/lib';
import { EVariableTypes } from '@/types';

// Define function
function getVariableIcon(type: EVariableTypes): IconType {
  switch (type) {
    case EVariableTypes.BOOLEAN:
      return LuBinary;

    case EVariableTypes.NUMBER:
      return LuDiff;

    case EVariableTypes.HEX:
      return LuHash;

    case EVariableTypes.SCRIPT:
      return LuCode;

    case EVariableTypes.STRING:
      return LuType;

    default:
      return LuRectangleEllipsis;
  }
}

// Export
export default getVariableIcon;
