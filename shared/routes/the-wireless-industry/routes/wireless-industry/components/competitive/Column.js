import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Column.scss';

export default class Column extends PureComponent {

  static propTypes = {
    image: PropTypes.string,
    altText: PropTypes.string,
    percentage: PropTypes.string,
    copy: PropTypes.string,
    imageRef: PropTypes.func,
    infoRef: PropTypes.func,
    index: PropTypes.number,
  }

  render() {
    const { image, altText, percentage, copy, imageRef, infoRef, index } = this.props;

    return (
      <div className={s(s.column, `column-${index}`)}>
        <img
          className={s.column__image}
          src={image}
          alt={altText}
          ref={imageRef}
        />

        <div className={s.column__infos} ref={infoRef}>
          <p className={s.column__copy}>{copy}</p>

          <h3 className={s.column__percentage}>
            {percentage}<span className={s.column__char}>%</span>
          </h3>
        </div>
      </div>
    );
  }
}
