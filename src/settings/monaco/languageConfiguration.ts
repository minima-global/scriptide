// Import types
import { ELanguageTypes } from '@/types';

// Language configuration config
function languageConfiguration(monaco) {
  monaco.languages.setLanguageConfiguration(ELanguageTypes.KISS_VM, {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['$[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '/*', close: '*/' },
    ],
    comments: {
      blockComment: ['/*', '*/'],
    },
    indentationRules: {
      increaseIndentPattern: /({|\[|\()/,
      decreaseIndentPattern: /(}|\]|\))/,
    },
  });
}

// Export
export default languageConfiguration;
