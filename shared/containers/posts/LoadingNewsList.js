import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Layout, { Group } from 'components/layout';
import NewsLayout from 'routes/news/components/layout';
import Heading from 'routes/news/components/heading';
import { Loading as LoadingBlock } from 'components/blocks';

export default class LoadingNewsList extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'gray',
  }

  render() {
    const { type } = this.props;

    const blocks = [];

    for (let i = 0; i < 12; i++) {
      blocks.push(<LoadingBlock key={i} />);
    }

    return (
      <Layout>
        <Group type={type} isLoading>
          <Heading isLoading>.</Heading>
          <NewsLayout>
            {blocks}
          </NewsLayout>
        </Group>
      </Layout>
    );
  }
}
