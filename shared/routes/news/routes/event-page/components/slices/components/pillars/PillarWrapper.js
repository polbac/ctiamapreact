import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './PillarWrapper.scss';

export default class PillarWrapper extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.pillars}>
        <div className={s.pillars__container}>
          <div className={s.pillars__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
