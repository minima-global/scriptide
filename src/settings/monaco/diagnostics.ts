/* eslint-disable @typescript-eslint/no-explicit-any */

// Import types
import { ELanguageTypes } from '@/types';

// Constants
const LANGUAGE_CHECKER_ID = 'kvm';

// Language register config
function diagnostics(monaco) {
  function validateCustomLangModel(model) {
    if (!model || model.getLanguageId() !== ELanguageTypes.KISS_VM) return;

    const code = model.getValue();
    const markers: any = [];
    const lines: string[] = code.split('\n');
    // console.log(lines);

    lines.forEach((line, i) => {
      // Examples
      /* if (line.includes('ERROR')) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: i + 1,
          startColumn: line.indexOf('ERROR') + 1,
          endLineNumber: i + 1,
          endColumn: line.indexOf('ERROR') + 6,
          message: 'Detected ERROR in code.',
          source: LANGUAGE_CHECKER_ID,
        });
      }
      if (line.includes('WARNING')) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          startLineNumber: i + 1,
          startColumn: line.indexOf('WARNING') + 1,
          endLineNumber: i + 1,
          endColumn: line.indexOf('WARNING') + 8,
          message: 'Detected WARNING.',
          source: LANGUAGE_CHECKER_ID,
        });
      } */

      const instructions = line.replace(/\s+/g, ' ').trim().split(' ');
      instructions.forEach((instruction, j) => {
        if (instruction.includes('LET')) {
          if (/([^a-z]+)/.test(instructions[j + 1])) {
            // console.log(instructions[j + 1]);

            markers.push({
              severity: monaco.MarkerSeverity.ERROR,
              startLineNumber: i + 1,
              startColumn: line.indexOf(instructions[j + 1]) + 1,
              endLineNumber: i + 1,
              endColumn:
                line.indexOf(instructions[j + 1]) +
                instructions[j + 1].length +
                1,
              message: 'Variable names must only consist of lowercase letters.',
              source: LANGUAGE_CHECKER_ID,
            });
          }
        }
      });
    });

    monaco.editor.setModelMarkers(model, LANGUAGE_CHECKER_ID, markers);
  }

  monaco.editor.onDidCreateModel((model) => {
    if (model.getLanguageId() === ELanguageTypes.KISS_VM) {
      validateCustomLangModel(model);

      model.onDidChangeContent(() => {
        validateCustomLangModel(model);
      });
    }
  });
}

// Export
export default diagnostics;
