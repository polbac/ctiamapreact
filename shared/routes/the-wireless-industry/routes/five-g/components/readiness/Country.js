import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Country.scss';

export default class Country extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    position: PropTypes.number,
    flag: PropTypes.string,
    framed: PropTypes.bool,
    highlighted: PropTypes.bool,
    openCountry: PropTypes.func,
    index: PropTypes.number,
  }

  getOrdinal = (position) => {
    const ordinalSuffix = ['th', 'st', 'nd', 'rd'];

    return ordinalSuffix[
      ((position % 100) - 20) % 10] ||
       ordinalSuffix[(position % 100)] ||
       ordinalSuffix[0];
  }

  render() {
    const { name, position, framed, highlighted, flag, openCountry, index } = this.props;

    return (
      <button
        className={s(s.country, { framed, highlighted })}
        onClick={() => openCountry(index)}
        aria-label="opens a country by index"
      >
        <span className={s.country__position}>
          <span className={s.readiness_positionNbr}>{position}</span>

          <span className={s.country__positionOrdinal}>
            {this.getOrdinal(position)}
          </span>
        </span>

        <span className={s.country__flag}>
          <img
            src={flag}
            className={s.country__flagSvg}
            alt={name}
          />
        </span>

        <span className={s.country__text}>{name}</span>
      </button>
    );
  }
}
