// Import dependencies
import { HashRouter, Route, Routes } from 'react-router-dom';
// Import components
import Layout from '@/components/Layout';
// import LivePreview from '@/components/ui/LivePreview';

/**
 * This router was added to support the live preview feature
 * in a new tab or new window.
 *
 * For now its on hold as it needs some more work.
 */

const Router = () => {
  // Render
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          {/* 404 page */}
          <Route path="*" element={<>Page 404</>} />

          {/* Home page */}
          <Route index element={<Layout />} />

          {/* Live preview */}
          {/* TODO - add live preview page for new tabs and new windows */}
          {/* <Route path="/live-preview" element={<LivePreview />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

// Export
export default Router;
