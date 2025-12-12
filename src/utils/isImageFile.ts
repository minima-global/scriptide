function isImageFile(fileName: string | null) {
  if (!fileName) {
    return false;
  }

  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext) {
    return false;
  }

  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif'].includes(
    ext
  );
}

export default isImageFile;
