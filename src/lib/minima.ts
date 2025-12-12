// Import types
import { IMDS, IResponse, IWindow } from '@/types';
// Import utilities
import responseHandler from '../utils/responseHandler';

// Define MiniDapp System (MDS)
export const mds = (window as IWindow & typeof globalThis).MDS;

// Define MDS wrapper
const minima: IMDS = {
  version: '0.0.1',

  cmd: function <T>(command: string): Promise<IResponse<T>> {
    return new Promise((resolve, reject) => {
      mds.cmd<T>(command, (msg) => {
        responseHandler(
          msg,
          resolve,
          reject,
          'Failed to run command: ' + command
        );
      });
    });
  },

  file: {
    list: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.list(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to retrieve file or directory: ' + path
          );
        });
      });
    },
    save: function (path, data) {
      return new Promise((resolve, reject) => {
        mds.file.save(path, data, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    savebinary: function (path, hexdata) {
      return new Promise((resolve, reject) => {
        mds.file.savebinary(path, hexdata, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    load: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.load(path, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    loadbinary: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.loadbinary(path, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    delete: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.delete(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to delete file: ' + path
          );
        });
      });
    },
    getpath: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.getpath(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to get file path: ' + path
          );
        });
      });
    },
    makedir: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.makedir(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to make directory: ' + path
          );
        });
      });
    },
    copy: function (path, newPath) {
      return new Promise((resolve, reject) => {
        mds.file.copy(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file: ' + path + ' to ' + newPath
          );
        });
      });
    },
    move: function (path, newPath) {
      return new Promise((resolve, reject) => {
        mds.file.move(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to move file: ' + path + ' to ' + newPath
          );
        });
      });
    },
    copytoweb: function (path, newPath) {
      return new Promise((resolve, reject) => {
        mds.file.copytoweb(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file to web folder: ' + path + ' to ' + newPath
          );
        });
      });
    },
    deletefromweb: function (path) {
      return new Promise((resolve, reject) => {
        mds.file.deletefromweb(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to delete file from web folder: ' + path
          );
        });
      });
    },
  },

  util: {
    hexToBase64: function (hex) {
      return mds.util.hexToBase64(hex);
    },
    base64ToHex: function (str) {
      return mds.util.base64ToHex(str);
    },
  },
};

export default minima;
