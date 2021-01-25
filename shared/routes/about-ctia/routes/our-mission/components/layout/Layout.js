import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Layout.scss';

export default class Layout extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.layout}>
        {children}
      </div>
    );
  }
}
