import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StateMapContainer from 'containers/state-map';
import Map from 'components/state-map';

export default class Map5g extends PureComponent {

  static propTypes = {
    isNew5g: PropTypes.bool,
  }

  static defaultProps = {
    isNew5g: false,
  }

  render() {
    const { isNew5g } = this.props;

    return (
      <StateMapContainer>
        {(states) => {
          const options = states.map(state => ({
            key: state.abbreviation,
            value: state.abbreviation,
            text: state.name,
          }));

          const data = [
            {
              number: '3M',
              copy: 'new jobs',
            },
            {
              number: '$275B',
              copy: 'new investment',
            },
            {
              number: '$500B',
              copy: 'in economic growth',
            },
          ];

          return (
            <Map
              heading="5G Economic Impact"
              subline={
                <span>5G will unlock economic benefits in every state. Explore our
                interactive map to see how 5G will contribute to your community.<sup>3</sup></span>
              }
              data={data}
              onChange={this.onChange}
              onClose={this.onClose}
              options={options}
              type="5g"
              isNew5g={isNew5g}
            />
          );
        }}
      </StateMapContainer>
    );
  }
}
