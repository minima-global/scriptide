// Import types
import { TFile } from './file';
import { IResponse, TMessage } from './response';
import { TScriptVariables } from './stores';

// ============================================================== //
// Minima wrapper interface ------------------------------------- //
// ============================================================== //
interface IMDS {
  version: string;

  cmd: <T>(command: string) => Promise<IResponse<T>>;

  file: {
    list: (path: string) => Promise<IResponse<TMDSFileList>>;
    save: (path: string, data: string) => Promise<IResponse<unknown>>;
    savebinary: (path: string, data: string) => Promise<IResponse<unknown>>;
    load: (path: string) => Promise<IResponse<TMDSFileLoad>>;
    loadbinary: (path: string) => Promise<IResponse<TMDSFileLoad>>;
    delete: (path: string) => Promise<IResponse<unknown>>;
    getpath: (path: string) => Promise<IResponse<unknown>>;
    makedir: (path: string) => Promise<IResponse<unknown>>;
    copy: (path: string, newPath: string) => Promise<IResponse<unknown>>;
    move: (path: string, newPath: string) => Promise<IResponse<unknown>>;
    copytoweb: (path: string, newPath: string) => Promise<IResponse<unknown>>;
    deletefromweb: (path: string) => Promise<IResponse<unknown>>;
  };

  util: {
    base64ToHex: (base64: string) => string;
    hexToBase64: (hex: string) => string;
  };
}

// ============================================================== //
// Minima wrapper types ----------------------------------------- //
// ============================================================== //
type TMDSCommandMMRCreate = {
  nodes: { proof: string }[];
  root: {
    data: string;
  };
};
type TMDSCommandRunScript = {
  clean: { address: string; mxaddress: string; script: string };
  monotonic: boolean;
  parseok: boolean;
  success: boolean;
  trace: string;
  variables: TScriptVariables;
};
type TMDSFileList = {
  list: TFile[];
};
type TMDSFileLoad = {
  load: {
    data: string;
  };
};
type TMDSFileUploadMessage = TMessage<unknown> & {
  allchunks: number;
  chunk: number;
};

export type {
  IMDS,
  TMDSCommandMMRCreate,
  TMDSCommandRunScript,
  TMDSFileList,
  TMDSFileLoad,
  TMDSFileUploadMessage,
};
