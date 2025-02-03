import responseHandler from '../utils/responseHandler';

/* eslint-disable @typescript-eslint/no-explicit-any */
const minima: any = {
  version: '0.0.1',
  file: {
    list: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.list(path, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to retrieve file or directory: ' + path
          );
        });
      });
    },
    save: function (path: string, data: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.save(path, data, (msg: any) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    load: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.load(path, (msg: any) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    delete: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.delete(path, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to delete file: ' + path
          );
        });
      });
    },
    makedir: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.makedir(path, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to make directory: ' + path
          );
        });
      });
    },
    copy: function (oldPath: string, newPath: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.copy(oldPath, newPath, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file: ' + oldPath + ' to ' + newPath
          );
        });
      });
    },
    move: function (oldPath: string, newPath: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.move(oldPath, newPath, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to move file: ' + oldPath + ' to ' + newPath
          );
        });
      });
    },
  },
};

export default minima;
