// Import dependencies
import { loader } from '@monaco-editor/react';
// Import settings
// import codeActionProvider from './codeActionProvider';
import completionItemProvider from './completionItemProvider';
// import diagnostics from './diagnostics';
// import hoverProvider from './hoverProvider';
import languageConfiguration from './languageConfiguration';
import languageRegister from './languageRegister';
import monarchTokensProvider from './monarchTokensProvider';
// Import themes
import minimaTheme from './theme';

function initMonaco() {
  loader.init().then((monaco) => {
    // register theme
    minimaTheme(monaco); // TODO - Work in progress

    // register language
    languageRegister(monaco);

    // register tokens provider
    monarchTokensProvider(monaco);

    // register language configuration
    languageConfiguration(monaco);

    // register completion item provider
    completionItemProvider(monaco);

    // register hover provider
    // hoverProvider(monaco); // TODO - Work in progress

    // register code action provider
    // codeActionProvider(monaco); // TODO - Work in progress

    // register diagnostics
    // diagnostics(monaco); // TODO - Work in progress
  });
}

export default initMonaco;
