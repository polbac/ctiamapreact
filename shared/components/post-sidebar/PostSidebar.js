import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './PostSidebar.scss';

export default class PostSidebar extends PureComponent {

  static propTypes = {
    bottom: PropTypes.bool,
    children: PropTypes.node,
    wide: PropTypes.bool,
  }

  static defaultProps = {
    bottom: true,
    children: undefined,
    wide: false,
  }

  render() {
    const { bottom, children, wide } = this.props;

    return (
      <div className={s(s.postSidebar, { bottom, wide })}>
        <div className={s.postSidebar__container}>
          <div className={s.postSidebar__row}>
            <div className={s.postSidebar__col}>
              <div className={s.postSidebar__wrap}>
                <div className={s.postSidebar__block}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
