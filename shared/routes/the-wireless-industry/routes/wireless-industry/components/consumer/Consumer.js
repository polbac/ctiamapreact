import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Consumer.scss';

export default class Consumer extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  images = []
  infos = []

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
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.addLabel('start');

    timeline.fromTo(
      this.dots,
      0.65,
      { width: '0%' },
      { width: '100%', ease },
    );

    timeline.fromTo(
      this.background,
      0.65,
      { width: '0%' },
      { width: '100%', ease },
      'start',
    );

    timeline.staggerFromTo(
      this.images,
      0.95,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, ease },
      0.095,
      'start+=.45',
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.consumer}>
        <Waypoint
          topOffset="85%"
          onPositionChange={this.onPositionChange}
        />

        <div
          className={s.consumer__dots}
          ref={(c) => { this.dots = c; }}
        />

        <div
          className={s.consumer__background}
          ref={(c) => { this.background = c; }}
        />

        <div className={s.consumer__container}>
          <div className={s.consumer__row}>
            <div className={s.consumer__col}>
              {Children.map(children, (c, i) => cloneElement(c, {
                internalRef: (el) => { this.images[i] = el; },
              }))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
