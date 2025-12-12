// Import types
import { ELanguageTypes } from '@/types';

// Monarch token provider config
function monarchTokensProvider(monaco) {
  monaco.languages.setMonarchTokensProvider(ELanguageTypes.KISS_VM, {
    tokenizer: {
      root: [
        [/\/\*/, 'comment', '@comment'],
        [
          /\??\s*:\s*\b(hex|number|string|script|boolean|any|unknown)\b(\s*\|\s*\b(hex|number|string|script|boolean|any|unknown)\b)*/,
          'type',
        ],
        [/\$\d+/, 'placeholder'],
        [
          /\b(LET|IF|THEN|ELSEIF|ELSE|ENDIF|WHILE|DO|ENDWHILE|EXEC|MAST|ASSERT|RETURN)\b/,
          'keyword',
        ],
        [/\b(EQ|NEQ|GT|GTE|LT|LTE)\b/, 'relation'],
        [/\b(AND|OR|XOR|NAND|NOR|NXOR)\b/, 'logic'],
        // [/@/, 'global'], // Set @ to global color
        [
          /\b(BLOCK|BLOCKMILLI|CREATED|COINAGE|INPUT|AMOUNT|ADDRESS|TOKENID|COINID|SCRIPT|TOTIN|TOTOUT|X[0-9]+)\b/,
          'global',
        ],
        [
          /\b(FUNC|CONCAT|LEN|REV|SUBSET|GET|EXISTS|OVERWRITE|REPLACE|SUBSTR|ADDRESS|SETLEN|BOOL|HEX|NUMBER|STRING|UTF8|ASCII|ABS|CEIL|FLOOR|MIN|MAX|INC|DEC|SIGDIG|POW|SQRT|BITSET|BITGET|BITCOUNT|PROOF|SHA2|SHA3|SIGNEDBY|MULTISIG|CHECKSIG|FUNCTION|SUMINPUT|SUMOUTPUT|GETOUTADDR|GETOUTAMT|GETOUTTOK|GETOUTKEEPSTATE|VERIFYOUT|GETINADDR|GETINAMT|GETINTOK|GETINID|VERIFYIN|STATE|PREVSTATE|SAMESTATE)\b/,
          'function',
        ],
        [/0x[0-9a-fA-F]+/, 'hex'],
        [/\d+(\.\d+)?/, 'number'],
        [/\[/, 'string', '@string'],
        [/\$\[|\]/, 'script'],
        [/\b(TRUE|FALSE)\b/, 'boolean'],
        [/[=+\-*/%<>&|^!?]/, 'operator'],
        [/[A-Za-z_][\w$]*/, 'identifier'],
      ],

      comment: [
        [/\/\*/, 'comment', '@push'],
        [/\*\//, 'comment', '@pop'],
        [/./, 'comment'],
      ],

      string: [
        [/\[/, 'string', '@push'],
        [/\]/, 'string', '@pop'],
        [/./, 'string'],
      ],
    },
  });
}

// Export
export default monarchTokensProvider;
