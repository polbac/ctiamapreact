import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Frame.scss';

export default class Frame extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.frame}>
        {children}
      </div>
    );
  }
}
