import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Innovation.scss';

export default class Innovation extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
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
    const timeline = new TimelineLite({ id: 'innovation' });
    const ease = 'Power4.easeInOut';
    const column = this.columns.childNodes;

    timeline.addLabel('start');

    timeline.fromTo(
      this.mask,
      1.8,
      { rotation: 0, transformOrigin: 'bottom center' },
      { rotation: 180 },
    );

    timeline.fromTo(
      this.illu1,
      0.9,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      'start-=.2',
    );

    timeline.fromTo(
      this.illu2,
      0.8,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      'start+=.2',
    );

    timeline.fromTo(
      this.illu3,
      0.7,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      'start+=.35',
    );

    timeline.fromTo(
      this.illu4,
      0.8,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      'start+=.55',
    );

    timeline.fromTo(
      this.illu5,
      0.8,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      'start+=.75',
    );

    timeline.fromTo(
      this.heading,
      0.75,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
      'start+=1',
    );

    timeline.staggerFromTo(
      column,
      0.75,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
      0.1,
      'start+=1.2',
    );
  }

  render() {
    const { title, children } = this.props;

    return (
      <div className={s.innovation}>

        <div className={s.innovation__illustrations}>
          <Waypoint
            topOffset="85%"
            onPositionChange={this.onPositionChange}
          />

          <div className={s.innovation__container}>
            <div className={s.innovation__row}>
              <h2 className={s.innovation__heading} ref={(c) => { this.heading = c; }}>{title}</h2>

              <div className={s.innovation__col} ref={(c) => { this.columns = c; }}>
                {children}
              </div>
            </div>
          </div>

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/car.svg')}
            className={s.innovation__illu1}
            ref={(c) => { this.illu1 = c; }}
            alt="self-driving car"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/smartwatch.svg')}
            className={s.innovation__illu2}
            ref={(c) => { this.illu2 = c; }}
            alt="smart watch"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/vr.svg')}
            className={s.innovation__illu3}
            ref={(c) => { this.illu3 = c; }}
            alt="virtual reality goggles"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/drone.svg')}
            className={s.innovation__illu4}
            ref={(c) => { this.illu4 = c; }}
            alt="drone delivery"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/speakers.svg')}
            className={s.innovation__illu5}
            ref={(c) => { this.illu5 = c; }}
            alt="home assistant devices"
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/fueling-innovation/circle-dots.svg')}
            className={s.innovation__circle}
            ref={(c) => { this.circle = c; }}
            alt=""
          />

          <div className={s.innovation__mask} ref={(c) => { this.mask = c; }} />
        </div>
      </div>
    );
  }
}
