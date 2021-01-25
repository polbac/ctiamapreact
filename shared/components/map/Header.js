import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Close from 'assets/images/icons/cross.svg';

import s from './Header.scss';

export default class Header extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    isModalOpen: PropTypes.bool,
    onCloseClick: PropTypes.func,
  };

  state = {};

  render() {
    const { children, heading, isModalOpen, onCloseClick } = this.props;

    return (
      <div className={s.header}>
        <div className={s.header__colLeft}>

          <div className={s.header__header}>
            <div className={s.header__coinWrapper}>
              <div className={s.header__coin}>
                <img
                  src={require('!file-loader!assets/images/icons/icon-economic-benefits.svg')}
                  className={s.header__svg}
                  alt=""
                />
              </div>
            </div>
            <h1 className={s.header__heading}>{heading}</h1>
          </div>
        </div>

        <div className={s.header__colRight}>
          {children}

          {isModalOpen && (
            <button className={s.header__close} onClick={onCloseClick}>
              <Close className={s.header__closeSvg} />
            </button>
          )}
        </div>
      </div>
    );
  }
}
