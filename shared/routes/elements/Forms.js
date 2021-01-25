import React, { PureComponent, Fragment } from 'react';

import { Group } from 'components/layout';
import Segment from 'components/segment';

export default class LayoutRoute extends PureComponent {

  render() {
    return (
      <Fragment>
        <Group>
          <Segment>
            <h1>Forms</h1>
          </Segment>
        </Group>
      </Fragment>
    );
  }
}
