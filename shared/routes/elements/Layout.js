import React, { PureComponent, Fragment } from 'react';

import { Group } from 'components/layout';
import Segment from 'components/segment';

export default class LayoutRoute extends PureComponent {

  render() {
    return (
      <Fragment>
        <Group>
          <Segment>
            <h1>Group - White (Default)</h1>
          </Segment>
        </Group>

        <Group type="gray">
          <Segment>
            <h1>Group - Gray</h1>
          </Segment>
        </Group>

        <Group type="dotted">
          <Segment>
            <h1>Group - Dotted</h1>
          </Segment>
        </Group>

        <Group type="gray dotted">
          <Segment>
            <h1>Group - Dotted Gray</h1>
          </Segment>
        </Group>

        <Group type="gray shadow">
          <Segment>
            <h1>Group - Gray Inner Shadow</h1>
          </Segment>
        </Group>
      </Fragment>
    );
  }
}
