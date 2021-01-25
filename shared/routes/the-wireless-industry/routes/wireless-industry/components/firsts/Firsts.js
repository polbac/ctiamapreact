import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Firsts.scss';

export default class Firsts extends PureComponent {

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
      this.streak,
      2,
      { x: '-100%' },
      { x: '100%', ease },
    );

    timeline.staggerFromTo(
      this.images,
      0.95,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      0.095,
      'start+=.35',
    );

    timeline.staggerFromTo(
      this.infos,
      0.75,
      { autoAlpha: 0, x: -60 },
      { autoAlpha: 1, x: 0, ease },
      0.075,
      'start+=.45',
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.firsts}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <img
          src={require('!file-loader!assets/images/5g/hero/streak.svg')}
          className={s.firsts__streak}
          ref={(c) => { this.streak = c; }}
          alt=""
        />

        <div className={s.firsts__container}>
          <div className={s.firsts__row}>
            <div className={s.firsts__col}>
              {Children.map(children, (c, i) => cloneElement(c, {
                imageRef: (el) => { this.images[i] = el; },
                infosRef: (el) => { this.infos[i] = el; },
              }))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
