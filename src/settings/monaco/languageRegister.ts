// Import types
import { ELanguageTypes } from '@/types';

// Language register config
function languageRegister(monaco) {
  monaco.languages.register({
    id: ELanguageTypes.KISS_VM,
    extensions: ['.kvm', '.extra.kvm'],
  });
}

// Export
export default languageRegister;
