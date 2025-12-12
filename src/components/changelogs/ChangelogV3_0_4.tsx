// Import constants
import { APPLICATION_CHANGELOGS } from '@/constants';
// Import components
import { Changelog, FeatureHighlight, FeatureItem } from './ChangelogBase';

// Changelog 3.0.4 component
function ChangelogV3_0_4() {
  // Render
  return (
    <Changelog version="3.0.4" date="February 6, 2025">
      <FeatureItem>
        <FeatureHighlight query="@ADDRESS">
          {APPLICATION_CHANGELOGS['3.0.4'][0]}
        </FeatureHighlight>
      </FeatureItem>
    </Changelog>
  );
}

// Export
export default ChangelogV3_0_4;
