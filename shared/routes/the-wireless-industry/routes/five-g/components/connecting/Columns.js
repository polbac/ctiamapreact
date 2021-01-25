import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Columns.scss';

export default class Columns extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    openBox: PropTypes.string,
  }

  columns = []

  get animate() {
    const t = new TimelineLite();

    t.addLabel('start');

    this.columns.forEach((c, i) => t.add(c.animate, `start+=${i * 0.65}`));

    return t;
  }

  render() {
    const { children, openBox } = this.props;

    return (
      <div className={s.columns}>
        <div className={s.columns__container}>
          <div className={s.columns__row}>
            {Children.map(children, (c, i) => cloneElement(c, {
              className: `column-${i}`,
              ref: (el) => { this.columns[i] = el; },
              isOpen: c.props.id === openBox,
            }))}
          </div>
        </div>
      </div>
    );
  }
}
