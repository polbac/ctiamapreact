import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Logos.scss';

export default class Logos extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    headline: PropTypes.string,
    isCenter: PropTypes.bool,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
  };

  state = {};

  render() {
    const { children, headline, isCenter, isLoading, isWide } = this.props;

    return (
      <div className={s(s.logos, { isCenter, isLoading, isWide })}>
        <div className={s.logos__container}>
          <div className={s.logos__row}>
            <div className={s.logos__col}>
              {headline && (
                <div className={s.logos__headline}>{headline}</div>
              )}
              <div className={s.logos__items}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
