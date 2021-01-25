import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Graph from './Graph';
import s from './Evolution.scss';

export default class Evolution extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    defaultOpenItem: PropTypes.string,
  }

  state = {
    active: undefined,
  }

  handleMouseEnter = (item) => {
    this.setState({ active: item });
  }

  handleMouseLeave = () => {
    this.setState({ active: undefined });
  }

  render() {
    const { children, defaultOpenItem } = this.props;
    const { active } = this.state;

    return (
      <div className={s.evolution}>
        <div className={s.evolution__container}>
          <div className={s.evolution__row}>
            <div className={s.evolution__col}>
              {Children.map(children, c => cloneElement(c, {
                isActive: c.props.heading === active,
              }))}

              <Graph
                className={s.evolution__graph}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                defaultOpenItem={defaultOpenItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
