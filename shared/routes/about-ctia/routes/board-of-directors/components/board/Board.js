import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Board.scss';

export default class Board extends PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { children, title } = this.props;

    return (
      <div className={s.board}>
        <div className={s.board__container}>
          <div className={s.board__title}>{title}</div>
          <div className={s.board__row}>
            {React.Children.map(children, c => (
              <div className={s.board__col}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
