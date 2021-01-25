import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Column.scss';

export default class Column extends PureComponent {

  static propTypes = {
    image: PropTypes.string,
    year: PropTypes.string,
    heading: PropTypes.string,
    copy: PropTypes.string,
    imageRef: PropTypes.func,
    infosRef: PropTypes.func,
  }

  render() {
    const { image, year, heading, copy, imageRef, infosRef } = this.props;

    return (
      <div className={s.column}>
        <img
          className={s.column__image}
          src={image}
          alt={heading}
          ref={imageRef}
        />

        <div className={s.column__infos} ref={infosRef}>
          <div className={s.column__header}>
            <span className={s.column__year}>{year}</span>
            <span className={s.column__heading}>{heading}</span>
          </div>

          <p className={s.column__copy}>{copy}</p>
        </div>
      </div>
    );
  }
}
