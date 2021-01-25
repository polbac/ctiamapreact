import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import s from './Table.scss';

export default class Row extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    thead: PropTypes.node,
  }

  render() {
    const {
      children,
      thead,
    } = this.props;

    // find first header
    const headers = _get(thead, '0.props.children', [])
      .map(head => _get(head, 'props.children'));

    return (
      <tr className={s.table__tr}>
        {children.map((cell, i) => React.cloneElement(cell, {
          key: i,
          header: _get(headers, i),
        }))}
      </tr>
    );
  }
}
