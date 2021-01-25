import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './NewsGrid.scss';

export default class NewsGrid extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className={s.newsGrid}>
        {children}
      </div>
    );
  }
}

