import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './TopPages.scss';

export default class TopPages extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
  }

  render() {
    const { children, heading } = this.props;

    return (
      <div className={s.top}>
        <div className={s.top__container}>
          <h2 className={s.top__heading}>{heading}</h2>

          <div className={s.top__grid}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
