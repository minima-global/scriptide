// Import constants
import { APPLICATION_CHANGELOGS } from '@/constants';
// Import components
import { Changelog, FeatureItem } from './ChangelogBase';

// Changelog 3.0.0 component
function ChangelogV3_0_0() {
  // Render
  return (
    <Changelog version="3.0.0" date="January 20, 2025">
      <FeatureItem>{APPLICATION_CHANGELOGS['3.0.0'][0]}</FeatureItem>
    </Changelog>
  );
}

// Export
export default ChangelogV3_0_0;
