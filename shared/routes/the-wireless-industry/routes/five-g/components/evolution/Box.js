import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Box.scss';

export default class Box extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string,
    launched: PropTypes.string,
    speed: PropTypes.string,
    image: PropTypes.string,
    isActive: PropTypes.bool,
  }

  render() {
    const { heading, copy, launched, speed, image, isActive } = this.props;

    return (
      <div className={s(s.box, `box-${heading}`, { isActive })}>
        <img
          className={s.box__image}
          src={image}
          alt={heading}
        />

        <p className={s.box__copy}>
          {/* <span className={s.box__heading}>{heading}</span> */}
          {heading} {copy}
        </p>

        <div className={s.box__infos}>
          <div className={s.box__group}>
            <span className={s.box__label}>Lauched in</span>
            <p className={s.box__data}>{launched}</p>
          </div>

          <div className={s.box__group}>
            <span className={s.box__label}>Speed</span>
            <p className={s.box__data}>{speed}</p>
          </div>
        </div>
      </div>
    );
  }
}
