import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Column.scss';

export default class Column extends PureComponent {

  static propTypes = {
    image: PropTypes.string,
    altText: PropTypes.string,
    percentage: PropTypes.string,
    copy: PropTypes.string,
    internalRef: PropTypes.func,
  }

  render() {
    const { image, altText, percentage, copy, internalRef } = this.props;

    return (
      <div className={s.column} ref={internalRef}>
        <img
          className={s.column__image}
          src={image}
          alt={altText}
        />

        <div>
          <h3 className={s.column__percentage}>
            {percentage}<span className={s.column__char}>%</span>
          </h3>

          <p className={s.column__copy}>{copy}</p>
        </div>
      </div>
    );
  }
}
