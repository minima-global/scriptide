/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { createContext, useRef, useEffect, useState } from 'react';
// Import constants
import {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_TIMESTAMP,
  GLOBALS_DEFAULT_OBJECT,
} from './constants';
// Import hooks
import useTryCatch from './hooks/useTryCatch';
// Import utils
import getFiles from './utils/getFiles';

// Interfaces
interface IProps {
  children: any;
}

// App context
export const appContext = createContext({} as any);

// App provider
const AppProvider = ({ children }: IProps) => {
  // Define trycatch
  const tryCatch = useTryCatch();

  // Define refs
  const loaded = useRef(false);

  // Define file system states
  const [files, setFiles]: [string[], any] = useState([]);
  const [currentFile, setCurrentFile]: [string | null, any] = useState(null);
  const [workspaces, setWorkspaces]: [string[], any] = useState([]);
  const [currentWorkspace, setCurrentWorkspace]: [string | null, any] =
    useState(null);

  // Define editor states
  const [code, setCode]: [string | null, any] = useState(null);
  const [editorZoom, setEditorZoom] = useState(
    Number(localStorage.getItem('editor-zoom')) || 0
  );
  const [editorAutoSave, setEditorAutoSave] = useState(
    JSON.parse((localStorage as any).getItem('editor-auto-save')) || false
  );

  // Define navigation states
  const [navigation, setNavigation] = useState(
    localStorage.getItem('navigation-state') || 'home'
  );

  // Define run script states
  const [script0xAddress, setScript0xAddress] = useState('');
  const [scriptMxAddress, setScriptMxAddress] = useState('');
  const [scriptParse, setScriptParse] = useState(null);
  const [scriptSuccess, setScriptSuccess] = useState(null);
  const [scriptMonotonic, setScriptMonotonic] = useState(null);
  const [scriptVariables, setScriptVariables] = useState({});
  const [totalScriptInstructions, setTotalScriptInstructions] = useState('');
  const [cleanScript, setCleanScript] = useState('');

  // Define console states
  const [consoleOutput, setConsoleOutput] = useState(CONSOLE_DEFAULT);
  const [consoleTimestamp, setConsoleTimestamp] = useState(
    CONSOLE_DEFAULT_TIMESTAMP
  );

  // Define control states
  const [globals, setGlobals] = useState(GLOBALS_DEFAULT_OBJECT);
  const [signatures, setSignatures] = useState([]);
  const [stateVariables, setStateVariables] = useState([]);
  const [prevStateVariables, setPrevStateVariables] = useState([]);
  const [extraScripts, setExtraScripts] = useState([]);

  // Initialize MDS
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((msg: any) => {
        if (msg.event === 'inited') {
          // do something Minim-y
        }
      });
    }
  }, [loaded]);

  // Get workspaces on load
  useEffect(() => {
    tryCatch(async () => {
      const folders: any = await getFiles('workspaces');

      setWorkspaces(folders);
      setCurrentWorkspace(folders[0]);
    });
  }, []);

  // Get files from workspace
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    tryCatch(async () => {
      setFiles(await getFiles(`workspaces/${currentWorkspace}`));
    });
  }, [currentWorkspace]);

  // Render
  return (
    <appContext.Provider
      value={{
        files,
        setFiles,
        currentFile,
        setCurrentFile,

        workspaces,
        setWorkspaces,
        currentWorkspace,
        setCurrentWorkspace,

        code,
        setCode,
        editorZoom,
        setEditorZoom,
        editorAutoSave,
        setEditorAutoSave,

        navigation,
        setNavigation,

        script0xAddress,
        setScript0xAddress,
        scriptMxAddress,
        setScriptMxAddress,
        scriptParse,
        setScriptParse,
        scriptSuccess,
        setScriptSuccess,
        scriptMonotonic,
        setScriptMonotonic,
        scriptVariables,
        setScriptVariables,
        totalScriptInstructions,
        setTotalScriptInstructions,
        cleanScript,
        setCleanScript,

        consoleOutput,
        setConsoleOutput,
        consoleTimestamp,
        setConsoleTimestamp,

        globals,
        setGlobals,
        signatures,
        setSignatures,
        stateVariables,
        setStateVariables,
        prevStateVariables,
        setPrevStateVariables,
        extraScripts,
        setExtraScripts,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

// Export
export default AppProvider;
