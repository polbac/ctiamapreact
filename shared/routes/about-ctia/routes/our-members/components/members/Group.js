import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Group.scss';

export default class Group extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    symbol: PropTypes.string,
    groupId: PropTypes.string,
  }

  static defaultProps = {
    children: undefined,
    symbol: '#',
    groupId: '#',
  }

  render() {
    const { children, symbol, groupId } = this.props;

    return (
      <div id={groupId !== '#' ? groupId : `group-${symbol}`} className={s.group}>
        <div className={s.group__container}>
          <div className={s.group__row}>
            <div className={s.group__col}>
              <div className={s.group__symbol}>{symbol}</div>
              <ul className={s.group__list}>
                {React.Children.map(children, c => (
                  <li className={s.group__item}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
