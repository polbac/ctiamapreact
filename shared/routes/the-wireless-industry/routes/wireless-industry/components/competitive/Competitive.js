import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Competitive.scss';

export default class Competitive extends PureComponent {

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
    const easeOut = 'Power4.easeOut';

    timeline.addLabel('start');

    timeline.fromTo(
      this.mask,
      0.85,
      { x: '0%' },
      { x: '100%', ease: easeOut },
    );

    timeline.staggerFromTo(
      this.images,
      0.85,
      { scale: 0 },
      { scale: 1, ease },
      0.25,
      'start+=.2',
    );

    timeline.staggerFromTo(
      this.infos,
      0.85,
      { autoAlpha: 0, x: -80 },
      { autoAlpha: 1, x: 0, ease },
      0.25,
      'start+=.25',
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.competitive}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.competitive__background}>
          <div className={s.competitive__mask} ref={(c) => { this.mask = c; }} />

          <img src={require('!file-loader!assets/images/wireless-industry/competitive-industry/background.svg')} alt="" />
        </div>

        <div className={s.competitive__container}>
          <div className={s.competitive__row}>
            <div className={s.competitive__col}>
              {Children.map(children, (c, i) => cloneElement(c, {
                index: i,
                imageRef: (el) => { this.images[i] = el; },
                infoRef: (el) => { this.infos[i] = el; },
              }))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
