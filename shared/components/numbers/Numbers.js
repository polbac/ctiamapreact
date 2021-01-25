import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Numbers.scss';

export default class Numbers extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    single: PropTypes.bool,
  }

  blocks = []

  state = {
    isAnimationComplete: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { isAnimationComplete } = this.state;

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.staggerFromTo(
      this.blocks,
      0.85,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.25,
    );
  }

  render() {
    const { children, single } = this.props;
    const { length } = children;

    return (
      <div className={s(s.numbers, { single })}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.numbers__container}>
          <div className={s.numbers__row}>
            <div className={s(s.numbers__wrapper, `width-${length}`)}>
              {Children.map(children, (c, i) => cloneElement(c, {
                internalRef: (el) => { this.blocks[i] = el; },
                className: s.numbers__block,
              }))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
