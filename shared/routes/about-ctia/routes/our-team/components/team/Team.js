import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Team.scss';

export default class Team extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    small: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, small } = this.props;

    return (
      <div className={s.team}>
        <div className={s.team__container}>
          <div className={s(s.team__grid, { small })}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
