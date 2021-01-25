import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Dots extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    internalRef: PropTypes.func,
  }

  render() {
    const { className, internalRef } = this.props;

    return (
      <svg viewBox="0 0 1860 800" ref={internalRef} className={className}>
        <circle fill="#d1e42d" cx="168.69" cy="33.5" r="5" />
        <circle fill="#d1e42d" cx="1339.69" cy="715.5" r="7.5" />
        <circle fill="#d1e42d" cx="166.69" cy="559.5" r="5" />
        <circle fill="#d1e42d" cx="923.19" cy="93" r="7.5" />
        <line fill="none" stroke="#78cdd1" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10" x1="709.19" y1="215" x2="709.19" y2="215" />
        <line fill="none" stroke="#78cdd1" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10" x1="1261.19" y1="45" x2="1261.19" y2="45" />
        <circle fill="#c7d4e2" cx="1748.69" cy="376.5" r="5" />
        <circle fill="#c7d4e2" cx="252.69" cy="282.5" r="5" />
        <circle fill="#78cdd1" cx="459.19" cy="31" r="6" />
        <circle fill="#78cdd1" cx="1662.19" cy="595" r="7.5" />
        <circle fill="#fa7a47" cx="1563.19" cy="189" r="7.5" />
      </svg>
    );
  }
}
