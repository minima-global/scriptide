import { TMDSFileList, TMDSFileLoad, TMDSFileUploadMessage } from './minima';
import { TMessage } from './response';

interface IWindow extends Window {
  DEBUG: string;
  DEBUG_HOST: string;
  DEBUG_MINIDAPPID: string;
  DEBUG_PORT: string;
  DEBUG_UID: string;

  MDS: {
    cmd: <T>(command: string, callback: (msg: TMessage<T>) => void) => void;
    file: {
      list: (
        path: string,
        callback: (msg: TMessage<TMDSFileList>) => void
      ) => void;
      save: (
        path: string,
        data: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      savebinary: (
        path: string,
        data: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      load: (
        path: string,
        callback: (msg: TMessage<TMDSFileLoad>) => void
      ) => void;
      loadbinary: (
        path: string,
        callback: (msg: TMessage<TMDSFileLoad>) => void
      ) => void;
      delete: (
        path: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      getpath: (
        path: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      makedir: (
        path: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      copy: (
        path: string,
        newPath: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      move: (
        path: string,
        newPath: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      upload: (
        data: unknown,
        callback: (msg: TMDSFileUploadMessage) => void
      ) => void;
      copytoweb: (
        path: string,
        newPath: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
      deletefromweb: (
        path: string,
        callback: (msg: TMessage<unknown>) => void
      ) => void;
    };
    filehost: string;
    init: (callback: (msg: TMessage<unknown>) => void) => void;
    util: {
      hexToBase64: (hex: string) => string;
      base64ToHex: (base64: string) => string;
    };
  };
}

export type { IWindow };
