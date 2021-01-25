import React, { PureComponent, Fragment } from 'react';

import { Group } from 'components/layout';
import Segment from 'components/segment';

export default class GraphicsRoute extends PureComponent {

  render() {
    return (
      <Fragment>
        <Group graphics="about" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>about</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="article" type="blue">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>article</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="channel" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>channel</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="consumer" type="blue">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>consumer</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="home" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>home</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="industry" type="blue">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>industry</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="join-us" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>join-us</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="news" type="blue">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>news</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="our-members" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>our-members</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="our-mission" type="blue">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>our-mission</h1>
            </div>
          </Segment>
        </Group>

        <Group graphics="positions" type="gray">
          <Segment>
            <div style={{ height: '350px' }}>
              <h1>positions</h1>
            </div>
          </Segment>
        </Group>
      </Fragment>
    );
  }
}
