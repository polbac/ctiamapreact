import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Field.scss';

export default class Field extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    columns: PropTypes.number,
  }

  static defaultProps = {
    children: undefined,
    columns: 2,
  }

  render() {
    const { children, columns } = this.props;

    return (
      <div className={s(s.field, `split${columns}`)}>
        {children}
      </div>
    );
  }
}
