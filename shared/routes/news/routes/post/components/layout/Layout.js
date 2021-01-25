import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Layout.scss';

export default class Layout extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    event: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, event } = this.props;

    return (
      <div className={s(s.layout, { event })}>
        {children}
      </div>
    );
  }
}
