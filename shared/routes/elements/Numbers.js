import React, { PureComponent, Fragment } from 'react';
import range from 'lodash/range';

import { Group } from 'components/layout';
import Segment from 'components/segment';
import { Number } from 'components/assets';

const s = {
  layout: {
    // display: 'flex',
    flexWrap: 'wrap',
    marginTop: 120,
  },

  layout__number: {
    // display: 'flex',
    marginRight: 60,
    marginBottom: 60,
  },
};

export default class NumbersRoute extends PureComponent {

  render() {
    return (
      <Fragment>
        <Group type="gray">
          <Segment>
            <h1>Blue purple</h1>

            <div style={s.layout}>
              {range(1, 20).map(val => (
                <div key={val} style={s.layout__number}>
                  <Number colors="blue-purple">{val}</Number>
                </div>
              ))}
            </div>
          </Segment>
        </Group>

        <Group>
          <Segment>
            <h1>Green blue</h1>

            <div style={s.layout}>
              {range(1, 20).map(val => (
                <div key={val} style={s.layout__number}>
                  <Number colors="green-blue">{val}</Number>
                </div>
              ))}
            </div>
          </Segment>
        </Group>

        <Group type="gray">
          <Segment>
            <h1>Blue orange</h1>

            <div style={s.layout}>
              {range(1, 20).map(val => (
                <div key={val} style={s.layout__number}>
                  <Number colors="blue-orange">{val}</Number>
                </div>
              ))}
            </div>
          </Segment>
        </Group>
      </Fragment>
    );
  }
}
