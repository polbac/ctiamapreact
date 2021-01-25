import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Sitemap.scss';

export default class Sitemap extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  state = {};

  render() {
    const { children } = this.props;

    return (
      <div className={s.sitemap}>
        <div className={s.sitemap__container}>
          {children}
        </div>
      </div>
    );
  }
}
