import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Toggles.scss';

export default class Toggles extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.toggles}>
        {children}
      </div>
    );
  }
}
