import React, { PureComponent } from 'react';

import { Group } from 'components/layout';
import { Map5g, Map4g } from 'containers/maps';

export default class extends PureComponent {

  render() {
    return (
      <div>
        <Group type="powder dotted">
          <Map5g />
        </Group>

        <Group type="green dotted">
          <Map4g />
        </Group>
      </div>
    );
  }
}
