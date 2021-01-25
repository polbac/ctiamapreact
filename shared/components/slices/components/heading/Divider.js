import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Divider.scss';

export default class Divider extends PureComponent {

  static propTypes = {
    theme: PropTypes.string,
  }

  render() {
    const { theme } = this.props;

    return (
      <svg className={s(s.divider, theme)} width="77px" height="10px">
        <path fillRule="evenodd" d="M5.000,-0.000 L16.000,-0.000 C18.762,-0.000 21.000,2.239 21.000,5.001 C21.000,7.762 18.762,10.000 16.000,10.000 L5.000,10.000 C2.239,10.000 -0.000,7.762 -0.000,5.001 C-0.000,2.239 2.239,-0.000 5.000,-0.000 Z" />
        <path fillRule="evenodd" d="M36.000,-0.000 L72.000,-0.000 C74.761,-0.000 77.000,2.239 77.000,5.000 C77.000,7.761 74.761,10.000 72.000,10.000 L36.000,10.000 C33.239,10.000 31.000,7.761 31.000,5.000 C31.000,2.239 33.239,-0.000 36.000,-0.000 Z" />
      </svg>
    );
  }
}
