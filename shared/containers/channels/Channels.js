import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { Channels } from 'components/header';
import { permalinkResolver } from 'utils/urlResolver';

class ChannelsContainer extends PureComponent {

  static propTypes = {
    jobResult: PropTypes.object,
  };

  state = {};

  render() {
    const { jobResult } = this.props;
    const channels = jobResult.find(i => i.id === 'popular-channels');

    return (
      <Channels>
        {channels.items.map(channel => (
          <Link key={channel.id} to={permalinkResolver(channel.url, channel.type)}>
            {channel.title}
          </Link>
        ))}
      </Channels>
    );
  }
}

const channelsContainerWithJob = withJob({
  work: ({ wordpress }) => wordpress.menus(),
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering Home', error);
    return (
      <div />
    );
  },
})(ChannelsContainer);

export default inject('wordpress')(channelsContainerWithJob);
