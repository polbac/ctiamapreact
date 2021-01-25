import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Pages.scss';

export default class Pages extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.pages}>
        <div className={s.pages__container}>
          <div className={s.pages__row}>
            <div className={s.pages__col}>
              <div className={s.pages__content}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
