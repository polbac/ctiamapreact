import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import { Number } from 'components/assets';

import s from './MobileCarrier.scss';

export default class MobileCarrier extends PureComponent {

  static propTypes = {
    data: PropTypes.string,
    copy: PropTypes.string,
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

    timeline.addLabel('start');

    timeline.fromTo(
      this.bubble,
      0.85,
      { scale: 0 },
      { scale: 1, ease },
    );

    timeline.fromTo(
      this.wrapper,
      1,
      { autoAlpha: 0, y: -80 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.3',
    );

    timeline.staggerFromTo(
      this.phones.childNodes,
      1,
      { autoAlpha: 0, y: -80 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
      'start+=.4',
    );
  }

  render() {
    const { data, copy } = this.props;

    return (
      <div className={s.mobile}>
        <Waypoint
          topOffset="85%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.mobile__bubble} ref={(c) => { this.bubble = c; }}>
          <div className={s.mobile__wrapper} ref={(c) => { this.wrapper = c; }}>
            <Number className={s.mobile__number} colors="green-blue">{data}</Number>
            <p className={s.mobile__copy}>{copy}</p>

            <div className={s.mobile__phones} ref={(c) => { this.phones = c; }}>
              <img
                className={s.mobile__image1}
                src={require('assets/images/wireless-industry/competitive-industry/phone-left@2x.png')}
                alt="mobile phone on the left"
              />

              <img
                className={s.mobile__image2}
                src={require('assets/images/wireless-industry/competitive-industry/phone-middle@2x.png')}
                alt="mobile phone in the middle"
              />

              <img
                className={s.mobile__image3}
                src={require('assets/images/wireless-industry/competitive-industry/phone-right@2x.png')}
                alt="mobile phone on the right"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
