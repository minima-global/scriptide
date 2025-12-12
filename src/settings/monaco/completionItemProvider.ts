// Import types
import { ELanguageTypes } from '@/types';

// Completion item provider config
function completionItemProvider(monaco) {
  monaco.languages.registerCompletionItemProvider(ELanguageTypes.KISS_VM, {
    provideCompletionItems: (model, position) => {
      // Get word under cursor
      const word = model.getWordAtPosition(position);
      if (word) {
        const range = new monaco.Range(
          position.lineNumber, // Start line
          word.startColumn, // Start column (beginning of the word being typed)
          position.lineNumber, // End line (same as start line in this case)
          position.column // End column (current cursor position)
        );

        // Return worker
        return {
          suggestions: [
            // Object template
            /* {
              label: 'template',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '${0:arg1} ${1:arg2} ${2:arg3}', // Places the cursor at the $n position. Tab move the cursor to the next insert position. Use ${n:placeholder} to set a placeholder for the insert position
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, // Allow insert of the suggestion with $0, $1, $2 ... $n etc.
              range: range, // (Required) Set the range of the suggestion to be placed in the editor
              detail: 'Description', // (Optional) Add a description to the suggestion
              documentation: {
                value: 'Documentation', // (Optional) Add documentation to the suggestion
                isTrusted: true, // (Optional) Mark the documentation as trusted
              },
            }, */

            // Keywords
            {
              label: 'LET',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'LET',
              range: range,
            },
            {
              label: 'IF',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'IF',
              range: range,
            },
            {
              label: 'THEN',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'THEN',
              range: range,
            },
            {
              label: 'ELSEIF',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'ELSEIF',
              range: range,
            },
            {
              label: 'ELSE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'ELSE',
              range: range,
            },
            {
              label: 'ENDIF',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'ENDIF',
              range: range,
            },
            {
              label: 'WHILE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'WHILE',
              range: range,
            },
            {
              label: 'DO',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'DO',
              range: range,
            },
            {
              label: 'ENDWHILE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'ENDWHILE',
              range: range,
            },
            {
              label: 'EXEC',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'EXEC',
              range: range,
            },
            {
              label: 'MAST',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'MAST',
              range: range,
            },
            {
              label: 'ASSERT',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'ASSERT',
              range: range,
            },
            {
              label: 'RETURN',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'RETURN',
              range: range,
            },

            // Relations
            {
              label: 'EQ',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'EQ',
              range: range,
            },
            {
              label: 'NEQ',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'NEQ',
              range: range,
            },
            {
              label: 'GT',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'GT',
              range: range,
            },
            {
              label: 'GTE',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'GTE',
              range: range,
            },
            {
              label: 'LT',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'LT',
              range: range,
            },
            {
              label: 'LTE',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'LTE',
              range: range,
            },

            // Logics
            {
              label: 'AND',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'AND',
              range: range,
            },
            {
              label: 'OR',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'OR',
              range: range,
            },
            {
              label: 'XOR',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'XOR',
              range: range,
            },
            {
              label: 'NAND',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'NAND',
              range: range,
            },
            {
              label: 'NOR',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'NOR',
              range: range,
            },
            {
              label: 'NXOR',
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: 'NXOR',
              range: range,
            },

            // Values
            {
              label: 'string',
              kind: monaco.languages.CompletionItemKind.Value,
              insertText: '[${0:string}]',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'String',
            },
            {
              label: 'script',
              kind: monaco.languages.CompletionItemKind.Value,
              insertText: '$[${0:script}]',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Script String',
            },
            {
              label: 'TRUE',
              kind: monaco.languages.CompletionItemKind.Value,
              insertText: 'TRUE',
              range: range,
              detail: 'Boolean',
            },
            {
              label: 'FALSE',
              kind: monaco.languages.CompletionItemKind.Value,
              insertText: 'FALSE',
              range: range,
              detail: 'Boolean',
            },

            // Types
            {
              label: 'hex',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'hex',
              range: range,
            },
            {
              label: 'number',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'number',
              range: range,
            },
            {
              label: 'string',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'string',
              range: range,
            },
            {
              label: 'script',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'script',
              range: range,
            },
            {
              label: 'boolean',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'boolean',
              range: range,
            },

            // Globals
            {
              label: '@BLOCK',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@BLOCK',
              range: range,
              detail: 'Get the current block number',
            },
            {
              label: '@BLOCKMILLI',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@BLOCKMILLI',
              range: range,
              detail: 'Get the current block time in milliseconds',
            },
            {
              label: '@CREATED',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@CREATED',
              range: range,
              detail: 'Get the block this coin was created in',
            },
            {
              label: '@COINAGE',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@COINAGE',
              range: range,
              detail: 'Get the difference in @BLOCK and @CREATED',
            },
            {
              label: '@INPUT',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@INPUT',
              range: range,
              detail:
                'Get the input index of a coin used in the transaction, first input coin has an index of 0',
            },
            {
              label: '@COINID',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@COINID',
              range: range,
              detail: 'Get the coin ID',
            },
            {
              label: '@AMOUNT',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@AMOUNT',
              range: range,
              detail: 'Get the amount',
            },
            {
              label: '@ADDRESS',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@ADDRESS',
              range: range,
              detail: 'Get the address',
            },
            {
              label: '@TOKENID',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@TOKENID',
              range: range,
              detail: 'Get the token ID',
            },
            {
              label: '@SCRIPT',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@SCRIPT',
              range: range,
              detail: 'Get the script of this coin',
            },
            {
              label: '@TOTIN',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@TOTIN',
              range: range,
              detail: 'Get the total number of input coins',
            },
            {
              label: '@TOTOUT',
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: '@TOTOUT',
              range: range,
              detail: 'Get the total number of output coins',
            },

            // Functions
            {
              label: 'FUNC',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'FUNC(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: '',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nFUNC ( value: any )\n\t=> returnvalue: any\n```',
              },
            },

            // Hexes
            {
              label: 'ADDRESS',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'ADDRESS(${1:script})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the address of the script value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nADDRESS ( script: script )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'SETLEN',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SETLEN(${1:length} ${2:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Set the length of a hex value - trims if too large or pads with 0 if too short',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSETLEN (\n\tlength: number\n\thex: hex\n)\n\t=> returnvalue: hex\n```',
              },
            },

            // Hashes
            {
              label: 'SHA2',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SHA2(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Returns the SHA2 value of the hex or string value.',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSHA2 ( value: hex | string )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'SHA3',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SHA3(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Returns the SHA3 value of the hex or string value.',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSHA3 ( value: hex | string )\n\t=> returnvalue: hex\n```',
              },
            },

            // Strings
            {
              label: 'CONCAT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'CONCAT(${1:hexone} ${2:hextwo})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Concatenate two or more hex values together',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nCONCAT (\n\thexone: hex\n\thextwo: hex\n\t...\n\thexnumber?: hex\n)\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'OVERWRITE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText:
                'OVERWRITE(${1:hexone} ${2:posone} ${3:hextwo} ${4:postwo} ${5:length})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Copy bytes from the first hex at the given position to the second hex at the given position for the same length',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nOVERWRITE (\n\thexone: hex\n\tposone: number\n\thextwo: hex\n\tpostwo: number\n\tlength: number\n)\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'LEN',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'LEN(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the length of the hex or string value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLEN ( value: hex | string )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'REV',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'REV(${1:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Reverse the data of the hex value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nREV ( hex: hex )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'SUBSET',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SUBSET(${1:start} ${2:length} ${3:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the subset data of the hex value - starting at the given index to the given length',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSUBSET (\n\tstart: number\n\tlength: number\n\thex: hex\n)\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'REPLACE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'REPLACE(${1:string} ${2:replace} ${3:with})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Replace all occurrences of the substring with another in the given string value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nREPLACE (\n\tstring: string\n\treplace: string\n\twith: string\n)\n\t=> returnvalue: string\n```',
              },
            },
            {
              label: 'SUBSTR',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SUBSTR(${1:start} ${2:length} ${3:string})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the substring of the string value - starting at the given index to the given length',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSUBSTR (\n\tstart: number\n\tlength: number\n\tstring: string\n)\n\t=> returnvalue: string\n```',
              },
            },

            // Arrays
            {
              label: 'GET',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GET(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the stored array value at the given index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGET (\n\tindex: number\n\t...\n\tindexnumber?: number\n)\n\t=> returnvalue: any\n```',
              },
            },
            {
              label: 'EXISTS',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'EXISTS(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Verify if there exists an array value at the given index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nEXISTS (\n\tindex: number\n\t...\n\tindexnumber?: number\n)\n\t=> returnvalue: boolean\n```',
              },
            },

            // Converters
            {
              label: 'BOOL',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'BOOL(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Convert the given value to a boolean value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nBOOL ( value: any )\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'HEX',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'HEX(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Convert the given value to a hex value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nHEX ( value: any )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'NUMBER',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'NUMBER(${1:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Convert the given hex value to a number value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nNUMBER ( hex: hex )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'STRING',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'STRING(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Convert the given value to a string value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSTRING ( value: any )\n\t=> returnvalue: string\n```',
              },
            },
            {
              label: 'UTF8',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'UTF8(${1:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Convert the given hex value to a string value in UTF8 format',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nUTF8 ( hex: hex )\n\t=> returnvalue: string\n```',
              },
            },
            {
              label: 'ASCII',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'ASCII(${1:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Convert the given hex value to a string value in ASCII format',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nASCII ( hex: hex )\n\t=> returnvalue: string\n```',
              },
            },

            // Math
            {
              label: 'ABS',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'ABS(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the absolute value of a number value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nABS ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'CEIL',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'CEIL(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the number value rounded up',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nCEIL ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'FLOOR',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'FLOOR(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the number value rounded down',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nFLOOR ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'MIN',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'MIN(${1:numberone} ${2:numbertwo})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the minimum value of the given number values',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nMIN (\n\tnumberone: number\n\tnumbertwo: number\n)\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'MAX',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'MAX(${1:numberone} ${2:numbertwo})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the maximum value of the given number values',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nMAX (\n\tnumberone: number\n\tnumbertwo: number\n)\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'INC',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'INC(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Increment the number value by 1',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nINC ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'DEC',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'DEC(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Decrement the number value by 1',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nDEC ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'POW',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'POW(${1:power} ${2:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the power of a number value - the power must be a whole number',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nPOW (\n\tpower: number\n\tnumber: number\n)\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'SQRT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SQRT(${1:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Returns the square root of the number value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSQRT ( number: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'SIGDIG',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SIGDIG(${1:digits} ${2:number})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Set the significant digits of the number value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSIGDIG (\n\tdigits: number\n\tnumber: number\n)\n\t=> returnvalue: number\n```',
              },
            },

            // Bitwise
            {
              label: 'BITSET',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'BITSET(${1:hex} ${2:pos} ${3:onoff})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Set the value of the bit at the given position to 0 or 1 for the hex value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nBITSET (\n\thex: hex\n\tpos: number\n\tonoff: boolean\n)\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'BITGET',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'BITGET(${1:hex} ${2:pos})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Get the boolean value of the bit at the given position for the hex value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nBITGET (\n\thex: hex\n\tpos: number\n)\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'BITCOUNT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'BITCOUNT(${1:hex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Count the number of bits set in the hex value',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nBITCOUNT ( hex: hex )\n\t=> returnvalue: number\n```',
              },
            },

            // Signatures
            {
              label: 'SIGNEDBY',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SIGNEDBY(${1:publickey})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Returns TRUE if the transaction is signed by the public key',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSIGNEDBY ( publickey: hex )\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'MULTISIG',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText:
                'MULTISIG(${1:required} ${2:publickeyone} ${3:publickeytwo})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Returns TRUE if the transaction is signed by the required number of the public keys',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nMULTISIG (\n\trequired: number\n\tpublickeyone: hex\n\tpublickeytwo: hex\n\t...\n\tpublickeynumber?: hex\n)\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'CHECKSIG',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'CHECKSIG(${1:publickey} ${2:data} ${3:signature})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Check the public key, data and signature',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nCHECKSIG (\n\tpublickey: hex\n\tdata: hex\n\tsignature: hex\n)\n\t=> returnvalue: boolean\n```',
              },
            },

            // MMR
            {
              label: 'PROOF',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText:
                'PROOF(${1:data} ${2:proofval} ${3:proof} ${4:rootval} ${5:root})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Check the mmr data, mmr root, with mmr proof are correct - use 0 for non-sum mmr trees (same as mmrproof on Minima)',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nPROOF (\n\tdata: hex | string\n\tproofval: number\n\tproof: hex\n\trootval: number\n\troot: hex\n)\n\t=> returnvalue: boolean\n```',
              },
            },

            // Inputs
            {
              label: 'VERIFYIN',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText:
                'VERIFYIN(${1:index} ${2:address} ${3:amount} ${4:tokenid})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Verify the input at the given index has the specified values - address, amount and tokenid',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nVERIFYIN (\n\tindex: number\n\taddress: hex\n\tamount: number\n\ttokenid: hex\n)\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'SUMINPUTS',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SUMINPUTS(${1:tokenid})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the sum of the input amounts for the specified token',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSUMINPUTS ( tokenid: hex )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'GETINADDR',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETINADDR(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the address of the input at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETINADDR ( index: number )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'GETINAMT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETINAMT(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the amount of the input at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETINAMT ( index: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'GETINTOK',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETINTOK(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the token id of the input at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETINTOK ( index: number )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'GETINID',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETINID(${1:value})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Unknown function',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETINID ( value: unknown )\n\t=> returnvalue: unknown\n```',
              },
            },

            // Outputs
            {
              label: 'VERIFYOUT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText:
                'VERIFYOUT(${1:index} ${2:address} ${3:amount} ${4:tokenid} ${5:keepstate})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Verify the output at the given index has the specified values - address, amount, tokenid and keepstate',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nVERIFYOUT (\n\tindex: number\n\taddress: hex\n\tamount: number\n\ttokenid: hex\n\tkeepstate: boolean\n)\n\t=> returnvalue: boolean\n```',
              },
            },
            {
              label: 'SUMOUTPUTS',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SUMOUTPUTS(${1:tokenid})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the sum of the output amounts for the specified token',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSUMOUTPUTS ( tokenid: hex )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'GETOUTADDR',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETOUTADDR(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the address of the output at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETOUTADDR ( index: number )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'GETOUTAMT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETOUTAMT(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the amount of the output at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETOUTAMT ( index: number )\n\t=> returnvalue: number\n```',
              },
            },
            {
              label: 'GETOUTTOK',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETOUTTOK(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the token id of the output at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETOUTTOK ( index: number )\n\t=> returnvalue: hex\n```',
              },
            },
            {
              label: 'GETOUTKEEPSTATE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'GETOUTKEEPSTATE(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the keepstate of the output at the specified index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nGETOUTKEEPSTATE ( index: number )\n\t=> returnvalue: boolean\n```',
              },
            },

            // States
            {
              label: 'STATE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'STATE(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Return the state value for the given index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSTATE ( index: number )\n\t=> returnvalue: any\n```',
              },
            },
            {
              label: 'PREVSTATE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'PREVSTATE(${1:index})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return the state value for the given index stored in the coin MMR data - when the coin was created',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nPREVSTATE ( index: number )\n\t=> returnvalue: any\n```',
              },
            },
            {
              label: 'SAMESTATE',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SAMESTATE(${1:startindex} ${2:endindex})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                'Return TRUE if the previous state and current state are the same within the given range - from start index to end index',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nSAMESTATE (\n\tstartindex: number\n\tendindex: number\n)\n\t=> returnvalue: boolean\n```',
              },
            },

            // Generic Function
            {
              label: 'FUNCTION',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'FUNCTION(${1:script} ${2:paramone} ${3:paramtwo})$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail:
                "Run the script with the provided parameters - use the variable 'returnvalue' to return the result of the function",
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nFUNCTION (\n\tscript: script\n\tparamone: any\n\tparamtwo: any\n\t...\n\tparamnumber: any\n)\n\t=> returnvalue: any\n\n\n```\n---\n```' +
                  ELanguageTypes.KISS_VM +
                  '\n\nLET result = FUNCTION ( $[\n\tLET x = $1 /* 5 */\n\tLET y = $2 /* 3 */\n\tLET returnvalue = x + y /* 5 + 3 */\n] 5 3 )\n\t=> { result: 8 }\n```',
                isTrusted: true,
              },
            },

            // Code Snippets
            {
              label: 'comment',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '/* ${0:comment} */',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Add a comment to the script',
              documentation: {
                value: '```' + ELanguageTypes.KISS_VM + '\n/* comment */\n```',
              },
            },
            {
              label: 'let',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:name} = ${2:value}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: any\n```',
              },
            },
            {
              label: 'hex',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:hex} = ${2:0xFFEE67F7C}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a hex variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: hex\n```',
              },
            },
            {
              label: 'numb',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:number} = ${2:1234}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a number variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: number\n```',
              },
            },
            {
              label: 'str',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:string} = [${2:Hello World}]$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a string variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: string\n```',
              },
            },
            {
              label: 'scr',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:script} = $[\n\t${2:RETURN TRUE}\n]$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a script variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: script\n```',
              },
            },
            {
              label: 'bool',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:boolean} = ${2:TRUE}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a boolean variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: boolean\n```',
              },
            },
            {
              label: 'func',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET ${1:function} = ${2:FUNC()}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a function variable',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET name = value: any\n```',
              },
            },
            {
              label: 'array',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'LET (${1:index}) = ${2:value}$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create an array',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nLET (\n\tindex: number\n\t...\n\tindexnumber?: number\n) = value: any\n```',
              },
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'IF ${1:condition} THEN\n\t${2:block}\nENDIF\n$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create an IF statement',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nIF condition: boolean THEN\n\tblock: script\nENDIF\n```',
              },
            },
            {
              label: 'else',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                'IF ${1:condition} THEN\n\t${2:block}\nELSE\n\t${3:block}\nENDIF\n$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create an IF-ELSE statement',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nIF condition: boolean THEN\n\tblock: script\nELSE\n\tblock: script\nENDIF\n```',
              },
            },
            {
              label: 'elseif',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                'IF ${1:condition} THEN\n\t${2:block}\nELSEIF ${3:condition} THEN\n\t${4:block}\nELSE\n\t${5:block}\nENDIF\n$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create an IF-ELSEIF-ELSE statement',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nIF condition: boolean THEN\n\tblock: script\nELSEIF condition: boolean THEN\n\tblock: script\nELSE\n\tblock: script\nENDIF\n```',
              },
            },
            {
              label: 'while',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'WHILE ${1:condition} DO\n\t${2:block}\nENDWHILE\n$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a WHILE statement',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nWHILE condition: boolean DO\n\tblock: script\nENDWHILE\n```',
              },
            },
            {
              label: 'loop',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'WHILE ${1:condition} DO\n\t${2:block}\nENDWHILE\n$0',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
              detail: 'Create a WHILE statement',
              documentation: {
                value:
                  '```' +
                  ELanguageTypes.KISS_VM +
                  '\nWHILE condition: boolean DO\n\tblock: script\nENDWHILE\n```',
              },
            },
          ],
        };
      }
    },
  });
}

// Export
export default completionItemProvider;
