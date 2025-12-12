import { TScriptVariables } from './stores';

interface IHandleRunScriptArgs {
  setState?: boolean;
  setPrevState?: boolean;
  setGlobals?: boolean;
  setSignatures?: boolean;
  setExtraScripts?: boolean;
  setOutput?: boolean;
}

interface IHandleRunScriptReturns {
  address: string;
  mxaddress: string;
  cleanscript: string;
  monotonic: boolean;
  parseok: boolean;
  success: boolean;
  trace: string;
  variables: TScriptVariables;
}

export type { IHandleRunScriptArgs, IHandleRunScriptReturns };
