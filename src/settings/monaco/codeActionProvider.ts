/* eslint-disable @typescript-eslint/no-explicit-any */

// Import types
import { ELanguageTypes } from '@/types';

// Language register config
function codeActionProvider(monaco) {
  monaco.languages.registerCodeActionProvider(ELanguageTypes.KISS_VM, {
    provideCodeActions: (
      model,
      range
      // context,
      // token
    ) => {
      const actions: any = [];

      if (range.startColumn === range.endColumn) {
        const wordAtPosition = model.getWordAtPosition(
          range.getStartPosition()
        );

        if (!wordAtPosition) return;

        const word = wordAtPosition.word;

        if (word === 'myvariable') {
          actions.push({
            title: 'Convert to uppercase',
            kind: 'quickfix',
            command: {
              id: 'convertToUppercase',
              title: 'Convert to uppercase',
              arguments: [model.uri.toString(), wordAtPosition, range],
            },
          });
        }
      }

      return {
        actions: actions,
        dispose: () => {},
      };
    },
  });

  // Ensure the command exists
  monaco.editor.registerCommand(
    'convertToUppercase',
    (_, resource, wordAtPosition, range) => {
      // Find the correct editor instance
      const editor = monaco.editor
        .getEditors()
        .find((e) => e.getModel()?.uri.toString() === resource);
      if (!editor) return;

      // Execute the edit
      editor.executeEdits('uppercase-action', [
        {
          range: new monaco.Range(
            range.startLineNumber,
            wordAtPosition.startColumn,
            range.endLineNumber,
            wordAtPosition.endColumn
          ),
          text: wordAtPosition.word.toUpperCase(),
          forceMoveMarkers: true,
        },
      ]);

      // Push the edit to the undo stack
      editor.pushUndoStop();
    }
  );
}

// Export
export default codeActionProvider;
