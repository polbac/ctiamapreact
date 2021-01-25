/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './DataPoint.scss';

export default class DataPoint extends PureComponent {

  static propTypes = {
    id: PropTypes.number,
    isActive: PropTypes.bool,
    date: PropTypes.string,
    heading: PropTypes.string,
    position: PropTypes.number,
    click: PropTypes.func,
  }

  render() {
    const {
      id,
      isActive,
      date,
      heading,
      position,
      click,
    } = this.props;
    const dataPointStyle = {
      left: `${position}%`,
    };
    const arialabel = `${date}: ${heading}`;

    return (
      <div
        data-point-id={id}
        className={s(s.datapoint, { isActive })}
        style={dataPointStyle}
        role="button"
        tabIndex="0"
        onClick={click}
        aria-label={arialabel}
      />
    );
  }
}
