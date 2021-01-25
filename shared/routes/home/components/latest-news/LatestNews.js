import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components/wrappers';

import s from './LatestNews.scss';

export default class LatestNews extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
  }

  state = {
    supportsGrid: false,
  }

  componentDidMount() {
    if (typeof CSS !== 'undefined') {
      this.setState({ supportsGrid: CSS.supports('display', 'grid') }); // eslint-disable-line
    }
  }

  render() {
    const { heading, children } = this.props;
    const { supportsGrid } = this.state;

    return (
      <div className={s.news}>
        <Header
          viewMore="/news"
          viewMoreText="See All News"
        >
          {heading}
        </Header>

        <div className={s.news__row}>
          {!supportsGrid ? (
            React.Children.map(children, c => (
              <div className={s.news__col}>{c}</div>
            ))
          ) : children}
        </div>
      </div>
    );
  }
}
