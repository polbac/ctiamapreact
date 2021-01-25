import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Ctas.scss';

export default class Ctas extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.ctas}>
        <div className={s.ctas__container}>
          <div className={s.ctas__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
