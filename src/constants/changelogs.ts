const APPLICATION_CHANGELOGS = {
  '3.0.0': [
    'Laid the foundation for a redesigned Script IDE, including prototyping improvements to features and UI.',
  ],

  '3.0.2': [
    'Updated the write, run, and debug features with a refreshed UI.',
    'Enhanced script output inspection - clean script, 0xaddress, mxaddress, total instructions, and script variables.',
    'Improved UX for managing and testing state, prevstate, global variables, signatures, and extra scripts (with experimental script insertion).',

    // Known issues
    'State, prevstate, global variables, and signatures are not persisted between sessions.',
    "Extra scripts are stored in the browser's local storage and will be lost if the cache is cleared.",
    'Functions relying on txn input and output are currently non-functional.',
    'The dapp lacks loading states, potentially leading to a suboptimal user experience during certain operations.',
    'Performance optimizations are still in progress. Some features have been temporarily limited for performance reasons (maximum 10 workspaces, 8 script files, and 10 extra script slots). These limitations will be removed as the dapp is further optimized.',
  ],

  '3.0.4': [
    'Resolved an issue where the @ADDRESS global variable was not being set correctly.',
  ],

  '3.1.0': [
    'Added a real-time HTML rendering panel. To enable MDS debugging, create a debug.conf file with { "debug": "...", "host": "...", "port": "...", "uid": "..." } (customize values as needed). This file is automatically included in the HTML for live preview.',
    'Workspaces can now be exported and imported as .zip files for easy sharing and backup.',
    'Added support for uploading single files directly within the Explorer Panel.',
    'Introduced a new panel for streamlined dapp building, script management, and script deployment.',
    'Image files now open in a dedicated preview mode instead of the editor, supporting zoom-in, zoom-out, and panning.',
    'Implemented a new file tree structure for better navigation in the Explorer Panel.',
    "Consolidated all script-related panels into a single 'Run and Debug KISS VM' panel.",
    "Introduced a light mode, which can be toggled in the new 'Settings' panel.",
    'Upgraded the Editor Panel with a new tabbed interface for improved multitasking.',
    'Added a fresh, single-color icon for the dapp.',
    'Improved the console, allowing direct execution of Minima commands.',
    'The interface now retains its previous session state using local storage, ensuring a seamless user experience.',
  ],

  '3.1.3': [
    'Restructured the codebase for better organization and maintainability (ongoing).',
    'Optimized panel state management using state stores, improving performance slightly.',
    'Improved file tab breadcrumbs, refined tooltip interactions, and made other minor visual improvements.',
    'Fixed some typos, misspelled titles, words, and phrases.',
  ],

  '3.1.4': [
    'Fixed an issue where folders did not expand when creating new files or folders.',
    'Fixed an issue where the code editor was not cleared when all files were deleted from the workspace.',
  ],
};

const APPLICATION_CHANGELOGS_QUERIES = {
  '3.1.0': [
    [
      'debug.conf',
      '{ "debug": "...", "host": "...", "port": "...", "uid": "..." }',
    ],
    '.zip',
  ],
};

export { APPLICATION_CHANGELOGS, APPLICATION_CHANGELOGS_QUERIES };
