// Import dependencies
import { Input } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
// Import store
import useFileStore from '@/stores/useFileStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// File input component
function FileInput({ ...props }) {
  // Define ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Define theme
  const { bgAlt, borderColor } = useAppTheme();

  // Define store
  const isFolder = useFileStore((state) => state.isFolder);

  // Define effect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();

      const { value } = props;
      if (value || value.length > 0) {
        let selection = value;
        if (selection.includes('.')) {
          selection = selection.split('.');
          selection.pop();
          selection = selection.join('.');
        }

        inputRef.current.setSelectionRange(0, selection.length);
      }
    }
  }, []);

  // Render
  return (
    <Input
      ref={inputRef}
      placeholder={isFolder ? 'New_Folder' : 'New_File.kvm'}
      bg={bgAlt}
      size="xs"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="none"
      _placeholder={{ color: borderColor }}
      {...props}
    />
  );
}

// Export
export default FileInput;
