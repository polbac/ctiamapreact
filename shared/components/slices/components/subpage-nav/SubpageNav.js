import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './SubpageNav.scss';

export default class SubpageNav extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    isCenter: PropTypes.bool,
    isEven: PropTypes.bool,
  }

  render() {
    const { children, isCenter, isEven } = this.props;

    if (React.Children.toArray(children).length === 0) {
      return null;
    }

    return (
      <div className={s(s.subpageNav, { isCenter, isEven })}>
        <div className={s.subpageNav__container}>
          <div className={s.subpageNav__row}>
            <div className={s.subpageNav__col}>
              <div className={s.subpageNav__grid}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
