import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Arrow from 'assets/images/icons/arrow-link.svg';

import s from './ArrowScroll.scss';

export default class ArrowScroll extends PureComponent {

  static propTypes = {
    internalRef: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const { internalRef, className } = this.props;

    return (
      <div className={s(s.arrow, className)} ref={internalRef}>
        <p className={s.arrow__copy}>Scroll</p>
        <Arrow className={s.arrow__arrow} />
      </div>
    );
  }
}
