import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Filters.scss';

export default class Filters extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    const wide = React.Children.count(this.props.children) > 2;

    return (
      <div className={s(s.filters, { wide })}>
        <div className={s.filters__container}>
          <div className={s.filters__row}>
            <div className={s.filters__col}>
              <div className={s.filters__wrap}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
