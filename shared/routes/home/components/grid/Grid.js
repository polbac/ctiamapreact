import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Grid.scss';

export default class Grid extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.grid}>
        <div className={s.grid__container}>
          <div className={s.grid__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
