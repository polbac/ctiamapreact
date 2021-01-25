import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Layout, { Group } from 'components/layout';
import Heading from 'routes/news/components/heading';

export default class LoadingPage extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'gray',
  }

  render() {
    const { type } = this.props;

    return (
      <Layout>
        <Group type={type} isLoading>
          <Heading isLoading>.</Heading>
        </Group>
      </Layout>
    );
  }
}
