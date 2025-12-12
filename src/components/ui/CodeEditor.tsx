// Import dependencies
import { Box, useToast } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
// Import store
import useEditorStore from '@/stores/useEditorStore';
import useFileStore from '@/stores/useFileStore';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
// Import utilities
import getLanguageType from '@/utils/getLanguageType';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import monaco.editor for typing
import { editor } from 'monaco-editor';

// Code editor component
function CodeEditor({ file, code }) {
  // Define toast
  const toast = useToast();

  // Define theme
  const { editorTheme } = useAppTheme();

  // Define ref
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Define stores
  const updateCode = useEditorStore((state) => state.updateCode);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const saveFile = useFileStore((state) => state.saveFile);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );

  // Define function
  function onSave() {
    saveFile(file, code);
    refreshLivePreview();
  }

  // Define handlers
  function handleOnMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }
  function handleOnBlur() {
    if (editorAutoSave) {
      onSave();
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // Save on ctrl+s
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault();
      onSave();
      toast({
        title: 'File saved',
        description: file,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  function handleOnChange(value: string | undefined) {
    updateCode(file, value || '');
  }

  // Render
  return (
    <Box h="100%" onBlur={handleOnBlur} onKeyDown={handleKeyDown}>
      <Editor
        height="100%"
        theme={editorTheme}
        language={getLanguageType(file)}
        onMount={handleOnMount}
        value={code}
        onChange={handleOnChange}
        options={{
          fontSize: 12 + editorZoom,
          fixedOverflowWidgets: true,
        }}
      />
    </Box>
  );
}

// Export
export default CodeEditor;
