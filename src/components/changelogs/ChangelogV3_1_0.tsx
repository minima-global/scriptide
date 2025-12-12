// Import constants
import {
  APPLICATION_CHANGELOGS,
  APPLICATION_CHANGELOGS_QUERIES,
} from '@/constants';
// Import components
import { Changelog, FeatureHighlight, FeatureItem } from './ChangelogBase';

// Changelog 3.1.0 component
function ChangelogV3_1_0() {
  // Render
  return (
    <Changelog version="3.1.0" date="January 20, 2025">
      <FeatureItem>
        <FeatureHighlight query={APPLICATION_CHANGELOGS_QUERIES['3.1.0'][0]}>
          {APPLICATION_CHANGELOGS['3.1.0'][0]}
        </FeatureHighlight>
      </FeatureItem>

      <FeatureItem>
        <FeatureHighlight query={APPLICATION_CHANGELOGS_QUERIES['3.1.0'][1]}>
          {APPLICATION_CHANGELOGS['3.1.0'][1]}
        </FeatureHighlight>
      </FeatureItem>

      {APPLICATION_CHANGELOGS['3.1.0'].slice(2).map((item) => (
        <FeatureItem key={item}>{item}</FeatureItem>
      ))}
    </Changelog>
  );
}

// Export
export default ChangelogV3_1_0;
