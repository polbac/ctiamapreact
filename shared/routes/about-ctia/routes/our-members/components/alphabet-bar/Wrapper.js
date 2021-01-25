import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './AlphabetBar.scss';

export default class Wrapper extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.wrapper} id="top">
        {children}
      </div>
    );
  }
}
