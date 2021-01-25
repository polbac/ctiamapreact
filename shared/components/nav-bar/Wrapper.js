import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Wrapper.scss';

export default class Wrapper extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
  }

  render() {
    const { children, id } = this.props;

    return (
      <div className={s.wrapper} id={id}>
        {children}
      </div>
    );
  }
}
