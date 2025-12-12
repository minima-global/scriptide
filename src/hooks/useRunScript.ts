// Import dependencies
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
// Import utilities
import parseComments from '../utils/parseComments';
// Import libraries
import minima from '@/lib/minima';
// Import store
import useConsoleStore from '@/stores/useConsoleStore';
import useEditorStore from '@/stores/useEditorStore';
import useRunScriptStore from '@/stores/useRunScriptStore';
import useGlobalVariableStore from '@/stores/useGlobalVariableStore';
import useSignatureStore from '@/stores/useSignatureStore';
import useStateVariableStore from '@/stores/useStateVariableStore';
import usePrevStateVariableStore from '@/stores/usePrevStateVariableStore';
import useFileStore from '@/stores/useFileStore';
// Import types
import {
  IHandleRunScriptArgs,
  IHandleRunScriptReturns,
  TFile,
  TMDSCommandMMRCreate,
  TMDSCommandRunScript,
} from '@/types';

// Run script hook
function useRunScript() {
  // Define toast
  const toast = useToast();

  // Define state
  const [isRunning, setIsRunning] = useState(false);

  // Define store
  const files = useFileStore((state) => state.files);
  const currentFile = useFileStore((state) => state.currentFile);
  const allCodes = useEditorStore((state) => state.allCodes);
  const globals = useGlobalVariableStore((state) => state.globals);
  const signatures = useSignatureStore((state) => state.signatures);
  const stateVariables = useStateVariableStore((state) => state.stateVariables);
  const prevStateVariables = usePrevStateVariableStore(
    (state) => state.prevStateVariables
  );
  const extendConsoleOut = useConsoleStore((state) => state.extendConsoleOut);
  const setCleanScript = useRunScriptStore((state) => state.setCleanScript);
  const setScript0xAddress = useRunScriptStore(
    (state) => state.setScript0xAddress
  );
  const setScriptMxAddress = useRunScriptStore(
    (state) => state.setScriptMxAddress
  );
  const setScriptParse = useRunScriptStore((state) => state.setScriptParse);
  const setScriptSuccess = useRunScriptStore((state) => state.setScriptSuccess);
  const setScriptMonotonic = useRunScriptStore(
    (state) => state.setScriptMonotonic
  );
  const setScriptVariables = useRunScriptStore(
    (state) => state.setScriptVariables
  );
  const setTotalScriptInstructions = useRunScriptStore(
    (state) => state.setTotalScriptInstructions
  );

  // Define getters
  function getStateVariables() {
    // Get the state variables and stringify them
    const variables = {};
    for (const { index, value } of stateVariables) {
      if (value !== '') {
        variables[index] = value;
      }
    }
    // console.log(variables);

    return JSON.stringify(variables);
  }
  function getPrevStateVariables() {
    // Get the prev state variables and stringify them
    const variables = {};
    for (const { index, value } of prevStateVariables) {
      if (value !== '') {
        variables[index] = value;
      }
    }
    // console.log(variables);

    return JSON.stringify(variables);
  }
  async function getGlobalVariables(script: string) {
    // Get the globals and stringify them
    const variables = {};
    for (const [name, value] of Object.entries(globals)) {
      if (value !== '') {
        variables[name] = value;
      }
    }

    /* Get the mmrproof of the run script, taking the returned address (data)
     * of the script and passing it into the global variables object before run.
     */
    const {
      root: { data: atAddress },
    } = (
      await minima.cmd<TMDSCommandMMRCreate>(`mmrcreate nodes:["${script}"]`)
    ).response || { root: { data: '' } };
    // console.log(atAddress);

    variables['@ADDRESS'] = atAddress;
    // console.log(variables);

    return JSON.stringify(variables);
  }
  function getSignatures() {
    const signers: string[] = [];
    for (const value of signatures) {
      if (value !== '') {
        signers.push(value);
      }
    }
    // console.log(signers);

    return JSON.stringify(signers);
  }
  async function getExtraScripts(script: string) {
    // Get the extra scripts and stringify them
    const extraScripts = {};
    for (const file of files.filter(
      (f: TFile) =>
        f.location.split('/').splice(3)[0] === 'contracts' &&
        f.name.endsWith('.kvm')
    )) {
      // Get the name and location
      const { location } = file;
      const name = file.name.split('.')[0];

      // Check if the script imports the extra script
      if (script.includes(`@[${name}]`)) {
        // load imported script data and clean it
        const value =
          (await minima.file.load(location)).response?.load.data || '';
        let extraScript = '';
        try {
          extraScript = handleParseScript(value);
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : 'Error parsing extra script'
          );
        }
        if (!extraScript) {
          throw new Error('One or more extra script is empty!');
        }

        // If the extra script is not empty, get the script mmrproof and address
        const {
          nodes: [{ proof }],
          root: { data },
        } = (
          await minima.cmd<TMDSCommandMMRCreate>(
            `mmrcreate nodes:["${extraScript}"]`
          )
        ).response || { nodes: [{ proof: '' }], root: { data: '' } };
        // console.log(proof, data);

        // Add the script and proof
        extraScripts[extraScript] = proof;

        // Dynamically add imported extra script address to script before running
        script = script.replaceAll(`@[${name}]`, data);
        // console.log(script);
      }
    }
    // console.log(extraScripts);

    return {
      extraScripts: JSON.stringify(extraScripts),
      parsedScript: script,
    };
  }

  // Define handler
  function handleParseScript(code: string) {
    // Get the code from the editor
    const txt = code.trim();
    // console.log(txt);

    //Check for killer characters (single or double quotes) before parsing
    if (txt.indexOf("'") != -1 || txt.indexOf('"') != -1) {
      throw new Error('NO single or double Quotes Allowed in Scripts!');
    }

    // Get the script and parse out types and comments
    let script = txt.replace(/\s+/g, ' ').trim();
    script = script.replaceAll('$[', '[');
    script = script.replaceAll(' = ', '=');
    script = script.replace(
      /\??\s*:\s*\b(hex|number|string|script|boolean|any|unknown)\b(\s*\|\s*\b(hex|number|string|script|boolean|any|unknown)\b)*/g,
      ''
    );
    script = parseComments(script).trim();
    if (script === '') {
      return '';
    }
    // console.log(script);

    //Check for killer characters (commas, colons, semi-colons) after parsing
    if (script.indexOf(',') != -1) {
      throw new Error('NO commas Allowed in Scripts!');
    }
    if (script.indexOf(':') != -1 || script.indexOf(';') != -1) {
      throw new Error('NO colons or semi-colons Allowed in Scripts!');
    }

    // Return the parsed script
    return script;
  }
  async function handleRunScript({
    setState = false,
    setPrevState = false,
    setGlobals = false,
    setSignatures = false,
    setExtraScripts = false,
    setOutput = false,
  }: IHandleRunScriptArgs): Promise<IHandleRunScriptReturns | undefined> {
    if (!currentFile) {
      toast({
        title: 'No file selected! Please select a file.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsRunning(true);
    // Get the code from the editor
    const code = allCodes.find((c) => c.file === currentFile)?.code;
    if (!code) {
      setIsRunning(false);
      toast({
        title: 'No script to run!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Parse the script
    let script = '';
    try {
      script = handleParseScript(code);
    } catch (error) {
      setIsRunning(false);
      toast({
        title: 'Error parsing script',
        description:
          error instanceof Error
            ? error.message
            : 'Something went wrong parsing the script.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!script) {
      setIsRunning(false);
      toast({
        title: 'No script to run!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let stateVars = '';
    if (setState) {
      stateVars = getStateVariables();
    }

    let prevStateVars = '';
    if (setPrevState) {
      prevStateVars = getPrevStateVariables();
    }

    let globalVariables = '';
    if (setGlobals) {
      globalVariables = await getGlobalVariables(script);
    }

    let signers = '';
    if (setSignatures) {
      signers = getSignatures();
    }

    let extraScriptsStr = '';
    if (setExtraScripts) {
      try {
        const { extraScripts, parsedScript } = await getExtraScripts(script);
        extraScriptsStr = extraScripts;
        script = parsedScript;
      } catch (error) {
        setIsRunning(false);
        toast({
          title: 'Error parsing extra scripts',
          description:
            error instanceof Error
              ? error.message
              : 'Something went wrong parsing the extra scripts.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    // Build the command
    let cmd = `runscript script:"${script}"`;
    if (setState) {
      cmd += ` state:${stateVars}`;
    }
    if (setPrevState) {
      cmd += ` prevstate:${prevStateVars}`;
    }
    if (setGlobals) {
      cmd += ` globals:${globalVariables}`;
    }
    if (setSignatures) {
      cmd += ` signatures:${signers}`;
    }
    if (setExtraScripts) {
      cmd += ` extrascripts:${extraScriptsStr}`;
    }
    // console.log(cmd);

    // Run the script
    const {
      clean: { address, mxaddress, script: cleanscript },
      monotonic,
      parseok,
      success,
      trace,
      variables,
    } = (await minima.cmd<TMDSCommandRunScript>(cmd)).response || {
      clean: { address: '', mxaddress: '', cleanscript: '' },
      monotonic: false,
      parseok: false,
      success: false,
      trace: '',
      variables: {},
    };

    if (setOutput) {
      const consoleOut = trace.split('\n');
      consoleOut.splice(-1, 1, '>> run script end <<');
      for (let i = 0; i < consoleOut.length; i++) {
        if (consoleOut[i].includes('Contract instructions')) {
          setTotalScriptInstructions(
            consoleOut[i].split(':')[1].trim().split(' ')[0]
          );
        }
      }

      // Set the application states
      extendConsoleOut('>> run script start << \n' + consoleOut.join('\n'));
      setScriptParse(parseok);
      setScriptSuccess(success);
      setScriptMonotonic(monotonic);
      setScript0xAddress(address);
      setScriptMxAddress(mxaddress);
      setCleanScript(cleanscript || '');
      setScriptVariables(variables);
    }

    // Show a toast - Comment out as they where distracting
    // May not use them like this...
    /* if (parseok) {
      toast({
        title: 'Run script alert',
        description: 'Script parsed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Run script alert',
        description: 'Script failed to parse.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }

    if (success && parseok) {
      toast({
        title: 'Run script alert',
        description: 'Script returns TRUE.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (!success && parseok) {
      toast({
        title: 'Run script alert',
        description: 'Script returns FALSE.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } else if (!success && !parseok) {
      toast({
        title: 'Run script alert',
        description: 'Script execution failed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } */

    setIsRunning(false);
    return {
      address,
      mxaddress,
      cleanscript: cleanscript || '',
      monotonic,
      parseok,
      success,
      trace,
      variables,
    };
  }

  // Return run script
  return {
    isRunning,
    setIsRunning,

    getStateVariables,
    getPrevStateVariables,
    getGlobalVariables,
    getSignatures,
    getExtraScripts,

    handleParseScript,
    handleRunScript,
  };
}

// Export
export default useRunScript;
