import React, { PureComponent } from 'react';

import StateMapContainer from 'containers/state-map';
import Map from 'components/map';

export default class Map5g extends PureComponent {

  render() {
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
              number: '$475B',
              copy: 'Annual GDP Contribution',
            },
            {
              number: '4.7M',
              copy: 'Wireless-related Jobs',
            },
          ];

          return (
            <Map
              heading="Our Economic Impact"
              subline={
                <span>
                  Wireless fuels our economy, supporting 4.7 million jobs and contributing
                  $475 billion each year. That accounts for 2.6 percent of America’s GDP, making
                  the U.S. wireless industry the 24th largest economy in the world. Explore our
                  interactive map to see how the wireless industry contributes to your state.
                </span>
              }
              data={data}
              onChange={this.onChange}
              onClose={this.onClose}
              options={options}
              type="4g"
            />
          );
        }}
      </StateMapContainer>
    );
  }
}
