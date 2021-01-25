import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { renderPosts } from 'utils/renderProps';

import LatestNews from '../../components/latest-news';

export default class LatestNewsContainer extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const { data, ...props } = this.props;

    return (
      <LatestNews {...props}>
        {renderPosts(data, { showPremiumImage: true, blockLimit: 6 })}
      </LatestNews>
    );
  }
}
