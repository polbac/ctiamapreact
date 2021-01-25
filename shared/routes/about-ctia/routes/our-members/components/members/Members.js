import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Members.scss';

export default class Board extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.members}>
        {children}
      </div>
    );
  }
}
