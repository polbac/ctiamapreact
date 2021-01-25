import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { TimelineLite } from 'gsap';

import s from './Experience.scss';

export default class Experience extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    cta: PropTypes.object,
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
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';
    const easeOut = 'Power4.easeOut';

    t
      .addLabel('start')
      .staggerFromTo(
        [
          this.cloudSmall,
          this.cloudLeft,
          this.cloudMiddle,
          this.cloudRight,
          this.bigCloud,
        ],
        2,
        { autoAlpha: 0, y: '15%' },
        { autoAlpha: 1, y: '0%', ease },
        0.05,
      )
      .fromTo(
        this.schoolFigure,
        0.85,
        { autoAlpha: 0, y: '15%' },
        { autoAlpha: 1, y: '0%', ease: easeOut },
        'start+=0.8',
      )
      .fromTo(
        this.schoolText,
        0.85,
        { autoAlpha: 0, y: '15%' },
        { autoAlpha: 1, y: '0%', ease: easeOut },
        'start+=1',
      )
      .fromTo(
        this.dronesFigure,
        0.85,
        { autoAlpha: 0, x: '-25%', y: '-5%' },
        { autoAlpha: 1, x: '0%', y: '0%', ease: easeOut },
        'start+=1.2',
      )
      .fromTo(
        this.dronesText,
        0.85,
        { autoAlpha: 0, y: '15%' },
        { autoAlpha: 1, y: '0%', ease: easeOut },
        'start+=1.4',
      )
      .fromTo(
        this.energyFigure,
        0.85,
        { autoAlpha: 0, y: '15%', x: '15%' },
        { autoAlpha: 1, y: '0%', x: '0%', ease: easeOut },
        'start+=1.6',
      )
      .fromTo(
        this.energyText,
        0.85,
        { autoAlpha: 0, y: '15%' },
        { autoAlpha: 1, y: '0%', ease: easeOut },
        'start+=1.8',
      );
  }

  render() {
    const { children, cta } = this.props;
    const childNodes = Children.toArray(children);

    return (
      <div className={s.experience}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.experience__container}>
          <div className={s.experience__animationContainer}>
            <img
              src={require('!file-loader!assets/images/5g/360/school.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.schoolFigure = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/drone.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.dronesFigure = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/guy.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.energyFigure = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/big-cloud.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.bigCloud = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/cloud.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.cloudLeft = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/cloud.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.cloudMiddle = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/cloud.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.cloudRight = el; }}
            />
            <img
              src={require('!file-loader!assets/images/5g/360/cloud.svg')}
              alt=""
              className={s.experience__figure}
              ref={(el) => { this.cloudSmall = el; }}
            />
          </div>

          <div className={s.experience__row}>
            <div className={s.experience__list}>
              <div className={s.experience__item} ref={(el) => { this.schoolText = el; }}>
                {childNodes[0]}
              </div>

              <div className={s.experience__item} ref={(el) => { this.dronesText = el; }}>
                {childNodes[1]}
              </div>

              <div className={s.experience__item} ref={(el) => { this.energyText = el; }}>
                {childNodes[2]}
              </div>
            </div>
          </div>

          <div className={s.experience__cta}>
            {cta}
          </div>
        </div>
      </div>
    );
  }
}
