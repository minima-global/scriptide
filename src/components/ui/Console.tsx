// Import dependencies
import { Box } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
// Import stores
import useEditorStore from '@/stores/useEditorStore';
import useConsoleStore from '@/stores/useConsoleStore';
// Import libraries
import { mds } from '@/lib/minima';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import monaco.editor for typing
import { editor } from 'monaco-editor';

// Console component
function Console() {
  // Define ref
  const consoleOutputRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Define theme
  const { borderColor, editorTheme } = useAppTheme();

  // Define stores
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const consoleOutput = useConsoleStore((state) => state.consoleOutput);
  const setConsoleOutput = useConsoleStore((state) => state.setConsoleOutput);
  const extendConsoleOut = useConsoleStore((state) => state.extendConsoleOut);

  // Define states
  const [userInput, setUserInput] = useState('');

  // Define handlers
  function handleOnMount(editor: editor.IStandaloneCodeEditor) {
    consoleOutputRef.current = editor;
  }
  function handleOnChange(value: string | undefined) {
    setConsoleOutput(value || '');
    setUserInput(value?.split('\n').pop() || '');
  }
  async function handleConsoleCommand(e: React.KeyboardEvent<HTMLDivElement>) {
    if (userInput && e.key === 'Enter') {
      const result = await new Promise((resolve) => {
        mds.cmd(userInput.trim(), (msg) => {
          resolve(msg);
        });
      });

      if (!userInput.endsWith('\n')) {
        setConsoleOutput(consoleOutput + '\n');
      }

      extendConsoleOut(
        '>> response start << \n' +
          JSON.stringify(result, null, 2) +
          '\n>> response end <<'
      );
      setUserInput('');
    }
  }

  // Define effect
  useEffect(() => {
    if (consoleOutputRef.current) {
      // Scroll to the bottom whenever the value updates
      const consoleOutput = consoleOutputRef.current;
      const model = consoleOutput.getModel();

      if (model) {
        const lineCount = model.getLineCount();
        consoleOutput.revealLine(lineCount); // Scroll to the last line
      }
    }
  }, [consoleOutput]);

  // Render
  return (
    <Box
      h="100%"
      borderTop="1px solid"
      borderColor={borderColor}
      onKeyDown={handleConsoleCommand}
    >
      <Editor
        height="100%"
        theme={editorTheme}
        language="shell"
        onMount={handleOnMount}
        value={consoleOutput}
        onChange={handleOnChange}
        options={{
          fontSize: 12 + editorZoom,
          fixedOverflowWidgets: true,
          minimap: { enabled: false },
          wordWrap: 'on',
          lineNumbers: () => '>',
          lineNumbersMinChars: 3,
        }}
      />
    </Box>
  );
}

// Export
export default Console;
