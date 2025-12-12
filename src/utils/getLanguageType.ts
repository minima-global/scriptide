import { ELanguageTypes } from '@/types';

function getLanguageType(file: string): ELanguageTypes {
  const extension = file.split('.').pop();

  switch (extension) {
    case 'kvm':
      return ELanguageTypes.KISS_VM;

    case 'conf':
    case 'ignore':
    case 'json':
      return ELanguageTypes.JSON;

    case 'html':
      return ELanguageTypes.HTML;

    case 'css':
      return ELanguageTypes.CSS;

    case 'js':
      return ELanguageTypes.JAVASCRIPT;

    case 'keep':
    default:
      return ELanguageTypes.PLAINTEXT;
  }
}

export default getLanguageType;
