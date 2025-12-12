function isTextFile(fileName: string | null) {
  if (!fileName) {
    return false;
  }

  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext) {
    return false;
  }

  return [
    'txt',
    'csv',
    'json',
    'xml',
    'html',
    'css',
    'js',
    'kvm',
    'conf',
    'ignore',
    'keep',
  ].includes(ext);
}

export default isTextFile;
