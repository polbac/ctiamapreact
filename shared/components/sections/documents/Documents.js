import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Documents.scss';

export default class Documents extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className={s.documents}>
        {children}
      </div>
    );
  }
}

