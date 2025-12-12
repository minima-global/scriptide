// Import constants
import { EDITOR_THEMES } from '@/constants';
// import darkTheme from '@/themes/editor/dark';
// import lightTheme from '@/themes/editor/light';

// Constants
const DEFAULT_THEME_COLORS_DARK = {
  // Tokens
  comment: '718096',
  type: 'D53F8C',
  keyword: '3182ce',
  string: '38A169',
  operator: 'F56565',
  function: '9F7AEA',
  identifier: 'F7FAFC',

  // Editor
  foreground: '#718096',
  background: '#171923',
  gutter: '#1A202C',
  border: '#2D3748',
  lineHighlight: '#4A5568',
  whitespace: '#718096',
  cursor: '#DD6B20',
  added: '#38A169',
  deleted: '#E53E3E',
  modified: '#3182ce',
};
const DEFAULT_THEME_COLORS_LIGHT = {
  // Tokens
  comment: '718096',
  type: 'D53F8C',
  keyword: '3182ce',
  string: '38A169',
  operator: 'F56565',
  function: '9F7AEA',
  identifier: '171923',

  // Editor
  foreground: '#4A5568',
  background: '#F7FAFC',
  gutter: '#EDF2F7',
  border: '#CBD5E0',
  lineHighlight: '#A0AEC0',
  whitespace: '#4A5568',
  cursor: '#DD6B20',
  added: '#38A169',
  deleted: '#E53E3E',
  modified: '#3182ce',
};

// Editor theme config
function minimaTheme(monaco) {
  // Define editor theme
  // Dark theme
  monaco.editor.defineTheme(EDITOR_THEMES.dark, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: 'comment',
        foreground: DEFAULT_THEME_COLORS_DARK.comment,
        fontStyle: 'italic',
      },
      { token: 'type', foreground: DEFAULT_THEME_COLORS_DARK.type },
      { token: 'placeholder', foreground: DEFAULT_THEME_COLORS_DARK.type },
      {
        token: 'keyword',
        foreground: DEFAULT_THEME_COLORS_DARK.keyword,
      },
      { token: 'relation', foreground: DEFAULT_THEME_COLORS_DARK.keyword },
      { token: 'logic', foreground: DEFAULT_THEME_COLORS_DARK.keyword },
      { token: 'global', foreground: DEFAULT_THEME_COLORS_DARK.keyword },
      { token: 'function', foreground: DEFAULT_THEME_COLORS_DARK.function },
      { token: 'boolean', foreground: DEFAULT_THEME_COLORS_DARK.function },
      { token: 'hex', foreground: DEFAULT_THEME_COLORS_DARK.function },
      { token: 'number', foreground: DEFAULT_THEME_COLORS_DARK.function },
      { token: 'string', foreground: DEFAULT_THEME_COLORS_DARK.string },
      { token: 'script', foreground: DEFAULT_THEME_COLORS_DARK.string },
      { token: 'operator', foreground: DEFAULT_THEME_COLORS_DARK.operator },
      { token: 'identifier', foreground: DEFAULT_THEME_COLORS_DARK.identifier },
    ],
    colors: {
      'editor.foreground': DEFAULT_THEME_COLORS_DARK.foreground,
      'editor.background': DEFAULT_THEME_COLORS_DARK.background,
      'editor.lineHighlightBackground': DEFAULT_THEME_COLORS_DARK.gutter,
      'editor.selectionBackground': DEFAULT_THEME_COLORS_DARK.lineHighlight,
      'editor.selectionHighlightBackground': DEFAULT_THEME_COLORS_DARK.gutter,
      'editor.findMatchBackground': DEFAULT_THEME_COLORS_DARK.lineHighlight,
      'editor.findMatchHighlightBackground': DEFAULT_THEME_COLORS_DARK.gutter,
      'editor.findRangeHighlightBackground': DEFAULT_THEME_COLORS_DARK.gutter,
      'editorBracketMatch.background': DEFAULT_THEME_COLORS_DARK.lineHighlight,
      'editorBracketMatch.border': DEFAULT_THEME_COLORS_DARK.whitespace,
      'editorCursor.foreground': DEFAULT_THEME_COLORS_DARK.foreground,
      'editorGutter.foreground': DEFAULT_THEME_COLORS_DARK.cursor,
      'editorGutter.background': DEFAULT_THEME_COLORS_DARK.background,
      'editorGutter.border': DEFAULT_THEME_COLORS_DARK.foreground,
      'editorGutter.addedBackground': DEFAULT_THEME_COLORS_DARK.added,
      'editorGutter.deletedBackground': DEFAULT_THEME_COLORS_DARK.deleted,
      'editorGutter.modifiedBackground': DEFAULT_THEME_COLORS_DARK.modified,
      'editorHoverWidget.background': DEFAULT_THEME_COLORS_DARK.gutter,
      'editorHoverWidget.border': DEFAULT_THEME_COLORS_DARK.border,
      'editorLink.activeForeground': DEFAULT_THEME_COLORS_DARK.foreground,
      'editorWhitespace.foreground': DEFAULT_THEME_COLORS_DARK.whitespace,
      'editorWidget.background': DEFAULT_THEME_COLORS_DARK.gutter,
      'editorWidget.border': DEFAULT_THEME_COLORS_DARK.border,
    },
    // color: darkTheme,
  });

  // Light theme
  monaco.editor.defineTheme(EDITOR_THEMES.light, {
    base: 'vs',
    inherit: true,
    rules: [
      {
        token: 'comment',
        foreground: DEFAULT_THEME_COLORS_LIGHT.comment,
        fontStyle: 'italic',
      },
      { token: 'type', foreground: DEFAULT_THEME_COLORS_LIGHT.type },
      { token: 'placeholder', foreground: DEFAULT_THEME_COLORS_LIGHT.type },
      {
        token: 'keyword',
        foreground: DEFAULT_THEME_COLORS_LIGHT.keyword,
      },
      { token: 'relation', foreground: DEFAULT_THEME_COLORS_LIGHT.keyword },
      { token: 'logic', foreground: DEFAULT_THEME_COLORS_LIGHT.keyword },
      { token: 'global', foreground: DEFAULT_THEME_COLORS_LIGHT.keyword },
      { token: 'function', foreground: DEFAULT_THEME_COLORS_LIGHT.function },
      { token: 'boolean', foreground: DEFAULT_THEME_COLORS_LIGHT.function },
      { token: 'hex', foreground: DEFAULT_THEME_COLORS_LIGHT.function },
      { token: 'number', foreground: DEFAULT_THEME_COLORS_LIGHT.function },
      { token: 'string', foreground: DEFAULT_THEME_COLORS_LIGHT.string },
      { token: 'script', foreground: DEFAULT_THEME_COLORS_LIGHT.string },
      { token: 'operator', foreground: DEFAULT_THEME_COLORS_LIGHT.operator },
      {
        token: 'identifier',
        foreground: DEFAULT_THEME_COLORS_LIGHT.identifier,
      },
    ],
    colors: {
      'editor.foreground': DEFAULT_THEME_COLORS_LIGHT.foreground,
      'editor.background': DEFAULT_THEME_COLORS_LIGHT.background,
      'editor.lineHighlightBackground': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editor.selectionBackground': DEFAULT_THEME_COLORS_LIGHT.lineHighlight,
      'editor.selectionHighlightBackground': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editor.findMatchBackground': DEFAULT_THEME_COLORS_LIGHT.lineHighlight,
      'editor.findMatchHighlightBackground': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editor.findRangeHighlightBackground': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editorBracketMatch.background': DEFAULT_THEME_COLORS_LIGHT.lineHighlight,
      'editorBracketMatch.border': DEFAULT_THEME_COLORS_LIGHT.whitespace,
      'editorCursor.foreground': DEFAULT_THEME_COLORS_LIGHT.foreground,
      'editorGutter.foreground': DEFAULT_THEME_COLORS_LIGHT.cursor,
      'editorGutter.background': DEFAULT_THEME_COLORS_LIGHT.background,
      'editorGutter.border': DEFAULT_THEME_COLORS_LIGHT.foreground,
      'editorGutter.addedBackground': DEFAULT_THEME_COLORS_LIGHT.added,
      'editorGutter.deletedBackground': DEFAULT_THEME_COLORS_LIGHT.deleted,
      'editorGutter.modifiedBackground': DEFAULT_THEME_COLORS_LIGHT.modified,
      'editorHoverWidget.background': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editorHoverWidget.border': DEFAULT_THEME_COLORS_LIGHT.border,
      'editorLink.activeForeground': DEFAULT_THEME_COLORS_LIGHT.foreground,
      'editorWhitespace.foreground': DEFAULT_THEME_COLORS_LIGHT.whitespace,
      'editorWidget.background': DEFAULT_THEME_COLORS_LIGHT.gutter,
      'editorWidget.border': DEFAULT_THEME_COLORS_LIGHT.border,
    },
    // color: lightTheme,
  });

  // Apply the themes
  // monaco.editor.setTheme(DEFAULT_EDITOR_THEME);
}

// Export
export default minimaTheme;
