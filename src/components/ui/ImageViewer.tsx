// Import dependencies
import { Box, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
// Import utilities
import base64ToImage from '@/utils/base64ToImage';

// Image viewer component
function ImageViewer({ src }) {
  // Define ref
  const viewerRef = useRef<HTMLDivElement | null>(null);

  // Define states
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Define handlers
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    setStartY(e.pageY);
  }
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!isDragging) {
      return;
    }

    const container = viewerRef.current;
    if (container) {
      const deltaX = e.pageX - startX;
      const deltaY = e.pageY - startY;
      const newScrollLeft = container.scrollLeft - deltaX;
      const newScrollTop = container.scrollTop - deltaY;

      setScrollLeft(newScrollLeft);
      setScrollTop(newScrollTop);
      setStartX(e.pageX); // Important: Update startX for smooth dragging
      setStartY(e.pageY);
    }
  }
  function handleMouseUp() {
    setIsDragging(false);
  }
  function handleMouseLeave() {
    setIsDragging(false);
  }
  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (viewerRef.current) {
      if (e.ctrlKey) {
        if (e.deltaY > 0) {
          if (zoom <= 5) {
            return;
          }
          setZoom(zoom - 5);
        } else {
          if (zoom > 1000) {
            return;
          }
          setZoom(zoom + 5);
        }
      }
    }
  }

  // Define effects
  useEffect(() => {
    const container = viewerRef.current;
    if (container) {
      container.scrollLeft = scrollLeft;
      container.scrollTop = scrollTop;
    }
  }, [scrollLeft, scrollTop]);
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent default scrolling behavior
      }
    }

    const container = viewerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Render
  return (
    <Box
      ref={viewerRef}
      cursor={isDragging ? 'grabbing' : 'grab'}
      p={4}
      h="100%"
      overflow="auto"
      userSelect="none"
      className="alt-scrollbar"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Box w={zoom + '%'}>
        <Image src={base64ToImage(src || '') || ''} w="100%" />
      </Box>
    </Box>
  );
}

// Export
export default ImageViewer;
