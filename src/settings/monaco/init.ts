// Import dependencies
import { loader } from '@monaco-editor/react';
import languageRegister from './languageRegister';
import monarchTokensProvider from './monarchTokensProvider';
import minimaTheme from './theme';
import languageConfiguration from './languageConfiguration';
import completionItemProvider from './completionItemProvider';
import hoverProvider from './hoverProvider';

function initMonaco() {
  loader.init().then((monaco) => {
    // register theme
    minimaTheme(monaco);

    // register language
    languageRegister(monaco);

    // register tokens provider
    monarchTokensProvider(monaco);

    // register language configuration
    languageConfiguration(monaco);

    // register completion item provider
    completionItemProvider(monaco);

    // register hover provider
    hoverProvider(monaco);
  });
}

export default initMonaco;
