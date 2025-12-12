// Import dependencies
import JSZip, { OutputType } from 'jszip';
import { useState } from 'react';

// Zip file hook
function useZipFile() {
  // Define state
  const [zipFile] = useState<JSZip>(new JSZip());

  // Define functions
  function addZipFile(path: string, content: string) {
    zipFile.file(path, content);
  }
  function addZipFolder(folder: string) {
    zipFile.folder(folder);
  }
  function addZipImage(path: string, base64Data: string) {
    zipFile.file(path, base64Data, { base64: true });
  }
  function generateZip(zipName: string) {
    zipFile.generateAsync({ type: 'blob' }).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipName;
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }
  function getZipFile(
    path: string,
    type: OutputType = 'string',
    callback: (content: unknown) => void
  ) {
    zipFile.file(path)?.async(type).then(callback);
  }
  function removeZipEntry(path: string) {
    zipFile.remove(path);
  }

  return {
    zipFile,
    addZipFile,
    addZipFolder,
    addZipImage,
    generateZip,
    getZipFile,
    removeZipEntry,
  };
}

// Export
export default useZipFile;
