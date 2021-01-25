import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Header.scss';

export default class Header extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
  };

  state = {};

  render() {
    const { children, heading } = this.props;

    return (
      <div className={s.header__header}>
        <div>
          <div className={s.header__heading}>{heading}</div>
          <div className={s.header__text}>Choose your city and state to see the latest 5G news.</div>
        </div>

        <div>
          {children}
        </div>
      </div>
    );
  }
}
