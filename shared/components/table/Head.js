import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './Table.scss';

export default class Head extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <thead className={s.table__thead}>
        <tr>
          {children.map((col, i) => React.cloneElement(col, {
            key: i,
            elementType: 'th',
          }))}
        </tr>
      </thead>
    );
  }
}
