import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import Arrow from 'assets/images/wireless-industry/consumer-experience/arrow.svg';

import s from './Growth.scss';

export default class Growth extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

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

    timeline.fromTo(
      this.arrow,
      1.2,
      { autoAlpha: 0, x: -120, y: 120 },
      { autoAlpha: 1, x: 0, y: 0, ease },
    );

  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.growth}>
        <div className={s.growth__container}>
          <div className={s.growth__row}>
            <div className={s.growth__col}>
              <div className={s.growth__arrow} ref={(c) => { this.arrow = c; }}>
                <Arrow className={s.growth__svg} />
              </div>
            </div>
          </div>
        </div>
        <Waypoint
          topOffset="85%"
          onPositionChange={this.onPositionChange}
        />
        {children}
      </div>
    );
  }
}
