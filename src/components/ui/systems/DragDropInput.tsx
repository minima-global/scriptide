// Import dependencies
import { useState } from 'react';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import constants
import { INPUT_PLACEHOLDERS } from '@/constants';
// Import components
import BasicInput from './BasicInput';

// Drag and drop input component
function DragDropInput({ onDrop, ...props }) {
  // Define theme
  const { accent } = useAppTheme();

  // Define state
  const [isDragging, setIsDragging] = useState(false);

  // Define handlers
  function handleOnDragOver(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault(); // Prevent default behavior to allow drop
    e.stopPropagation(); // Stop event from bubbling up
    setIsDragging(true);
  }
  function handleOnDragLeave(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Set dragging state to false when leaving
  }
  function handleOnDrop(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event from bubbling up
    setIsDragging(false);

    onDrop(e);
  }

  // Render
  return (
    <BasicInput
      outlineColor={isDragging ? accent : ''}
      transition="outline-color 0.2s linear"
      placeholder={INPUT_PLACEHOLDERS.fileUpload}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      readOnly
      {...props}
    />
  );
}

// Export
export default DragDropInput;
