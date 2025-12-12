// Import types
import { ELanguageTypes } from '@/types';

// Language register config
function hoverProvider(monaco) {
  monaco.languages.registerHoverProvider(ELanguageTypes.KISS_VM, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      // console.log(word);

      if (!word) {
        return null;
      }

      switch (word.word) {
        case 'LET':
          return {
            contents: [
              {
                value:
                  '**LET**: The LET command is used to declare a variable.',
              },
            ],
          };

        default:
          return null;
      }
    },
  });
}

// Export
export default hoverProvider;
