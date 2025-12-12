// Import dependencies
import { List, ListItem, Text } from '@chakra-ui/react';
// Import constants
import { APPLICATION_CHANGELOGS } from '@/constants';
// Import components
import { Changelog, FeatureItem } from './ChangelogBase';

// Changelog 3.0.2 component
function ChangelogV3_0_2() {
  // Render
  return (
    <Changelog version="3.0.2" date="February 5, 2025">
      {APPLICATION_CHANGELOGS['3.0.2'].slice(0, 3).map((item) => (
        <FeatureItem key={item}>{item}</FeatureItem>
      ))}

      <List spacing={2}>
        <ListItem>
          <Text as="h4" w="100%" fontSize="md">
            Known Issues (3.0.2):
          </Text>
        </ListItem>

        <List spacing={2} pl={2}>
          {APPLICATION_CHANGELOGS['3.0.2'].slice(3).map((item) => (
            <FeatureItem key={item} alert>
              {item}
            </FeatureItem>
          ))}
        </List>
      </List>
    </Changelog>
  );
}

// Export
export default ChangelogV3_0_2;
