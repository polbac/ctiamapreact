import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components/wrappers';

import s from './LogoWrapper.scss';

export default class LogoWrapper extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { heading, children } = this.props;

    return (
      <div className={s.LogoWrapper}>
        <div className={s.LogoWrapper__container}>
          {heading && (
            <Header isCenter>{heading}</Header>
          )}
          <div className={s.LogoWrapper__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
