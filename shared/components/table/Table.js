import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Head from './Head';
import s from './Table.scss';

export default class Table extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    const headerType = (<Head />).type;
    const childs = React.Children.toArray(children);

    // Filter thead out from the rest
    const thead = childs.filter(c => (c.type === headerType));
    const rest = childs.filter(c => (c.type !== headerType));

    return (
      <table className={s.table}>
        {thead}

        <TransitionGroup component="tbody">
          {rest.map((row, i) => (
            <CSSTransition
              key={i}
              timeout={1000}
              classNames={{
                enter: s.table__tbodyEnter,
                enterActive: s.table__tbodyEnterActive,
                appear: s.table__tbodyAppear,
                appearActive: s.table__tbodyAppearActive,
              }}
            >
              {React.cloneElement(row, {
                thead,
              })}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </table>
    );
  }
}
