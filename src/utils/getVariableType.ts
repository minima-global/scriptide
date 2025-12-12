/**
 * Get the type of a variable based on its value.
 *
 * This function only does a shallow check of the value, so it may not be accurate
 * when it comes to script variables.
 *
 * @param value - The value to get the type of
 * @returns
 */

// Import types
import { EVariableTypes } from '@/types';

function getVariableType(value: string): EVariableTypes {
  switch (true) {
    case /^0x[a-fA-F0-9]+/.test(value):
      return EVariableTypes.HEX;

    case /^\d+(\.\d+)?/.test(value):
      return EVariableTypes.NUMBER;

    case /\b(LET|IF|THEN|ELSEIF|ELSE|ENDIF|WHILE|DO|ENDWHILE|EXEC|MAST|ASSERT|RETURN|EQ|NEQ|GT|GTE|LT|LTE|AND|OR|XOR|NAND|NOR|NXOR)\b/.test(
      value
    ):
      return EVariableTypes.SCRIPT;

    case /\b(TRUE|FALSE)\b/.test(value):
      return EVariableTypes.BOOLEAN;

    case /.*?/.test(value):
      return EVariableTypes.STRING;

    default:
      return EVariableTypes.UNKNOWN;
  }
}

// Export
export default getVariableType;
