import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import { Number } from 'components/assets';

import s from './Economic.scss';

export default class Economic extends PureComponent {

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
    const ease = 'Power4.easeOut';

    timeline.addLabel('start');

    timeline.staggerFromTo(
      this.heading.childNodes,
      0.85,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, ease },
      0.075,
    );

    timeline.staggerFromTo(
      [this.back, this.front],
      1.25,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, ease },
      0.125,
      'start+=.1',
    );

    timeline.fromTo(
      this.illu1,
      0.9,
      { autoAlpha: 0, x: -120, y: 120 },
      { autoAlpha: 1, x: 0, y: 0, ease },
      'start+=.5',
    );

    timeline.fromTo(
      this.illu2,
      0.9,
      { autoAlpha: 0, y: 120 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.7',
    );

    timeline.fromTo(
      this.illu3,
      0.9,
      { autoAlpha: 0, x: 120 },
      { autoAlpha: 1, x: 0, ease },
      'start+=.9',
    );
  }

  render() {
    const { data, copy } = this.props;

    return (
      <div className={s.economic}>
        <Waypoint
          topOffset="60%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.economic__container}>
          <div className={s.economic__row}>
            <div className={s.economic__col}>
              <div className={s.economic__wrapper} ref={(c) => { this.heading = c; }}>
                <Number className={s.economic__number} colors="green-blue">{data}</Number>
                <p className={s.economic__copy}>{copy}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={s.economic__illustrations}>
          <img
            src={require('!file-loader!assets/images/wireless-industry/economic-driver/illustration-1.svg')}
            className={s.economic__illu1}
            ref={(c) => { this.illu1 = c; }}
            alt="utility worker"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/economic-driver/illustration-2.svg')}
            className={s.economic__illu2}
            ref={(c) => { this.illu2 = c; }}
            alt="person using a computer"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/economic-driver/illustration-3.svg')}
            className={s.economic__illu3}
            ref={(c) => { this.illu3 = c; }}
            alt="person using a tablet"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/economic-driver/cloud-blue.svg')}
            className={s.economic__front}
            ref={(c) => { this.front = c; }}
            alt="foreground clouds"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/economic-driver/cloud-white.svg')}
            className={s.economic__back}
            ref={(c) => { this.back = c; }}
            alt="background clouds"
          />
        </div>
      </div>
    );
  }
}
