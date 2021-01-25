import React, { PureComponent, Fragment } from 'react';

import { Group } from 'components/layout';
import Hero, { Label, Heading, Copy } from 'components/hero';

export default class LayoutRoute extends PureComponent {

  render() {
    return (
      <Fragment>
        <Group type="dotted">
          <Hero center>
            <Label>Label</Label>
            <Heading>Center hero</Heading>
            <Copy>The hero is wrapped inside a group component to add the dotted background</Copy>
          </Hero>
        </Group>

        <Group type="gray shadow">
          <Hero>
            <Label>Label</Label>
            <Heading>Left align hero</Heading>
            <Copy>The hero is wrapped inside a group component to add the gray background
            and the inner shadow</Copy>
          </Hero>
        </Group>
      </Fragment>
    );
  }
}
