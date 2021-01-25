import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './SearchContainer.scss';

export default class SearchContainer extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.layout}>
        <div className={s.layout__container}>
          <div className={s.layout__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
