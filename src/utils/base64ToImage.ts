/**
 * Converts a base64 string to a Data URI string.
 * The Image Type is automatically determined from the base64 string.
 *
 * @param base64 - The base64 string to be converted to Data URI string.
 * @returns The Data URI string or null if no match is found.
 */

function base64ToImage(base64: string): string | null {
  // Determine Image Type (Best Guess):
  let imageType: string;

  switch (true) {
    case base64.startsWith('iVBORw0KGgo'):
      // Check for PNG signature
      imageType = 'image/png';
      break;

    case base64.startsWith('/9j/4AAQSkZJRg'):
      // Check for JPEG signature (more variations possible)
      imageType = 'image/jpeg';
      break;

    case base64.startsWith('R0lGODlh'):
      // Check for GIF
      imageType = 'image/gif';
      break;

    case base64.startsWith('Qk0'):
      // Check for BMP
      imageType = 'image/bmp';
      break;

    case base64.startsWith('AAABA'):
      // Check for ICO
      imageType = 'image/x-icon';
      break;

    case base64.startsWith('UklGR'):
      // Check for WebP
      imageType = 'image/webp';
      break;
    // Add more checks for other types if needed (e.g., TIFF, SVG)

    default:
      // If no match is found, return null
      return null;
  }

  // Add Data URI Prefix and return the complete Data URI string
  return `data:${imageType};base64,${base64}`;
}

export default base64ToImage;
