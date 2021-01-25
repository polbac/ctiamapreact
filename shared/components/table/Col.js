import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Table.scss';

export default class Col extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    elementType: PropTypes.string,
    isHighlighted: PropTypes.bool,
  }

  render() {
    const {
      children,
      header,
      elementType = 'td',
      isHighlighted,
      ...rest
    } = this.props;

    if (elementType === 'th') {
      return (
        <th className={s.table__th} {...rest}>{children}</th>
      );
    }

    return (
      <td className={s(s.table__td, { isHighlighted })} data-th={header} {...rest}>
        <span>{children}</span>
      </td>
    );
  }
}
