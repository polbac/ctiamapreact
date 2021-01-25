import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Wireless.scss';

const WIDTH = 2086;

export default class Wireless extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isAnimationFlowComplete: false,
    isAnimationIllusComplete: false,
  }

  // componentDidMount() {
  //   this.init();
  // }

  init = () => {
    if (!this.flow) {
      return;
    }

    this.streaks = Array.prototype.slice.call(this.flow.childNodes);
    this.widest = Math.max(...this.streaks.map(streak => streak.getBBox().width));

    TweenLite.set(
      this.streaks,
      { x: `-${this.widest}` },
    );
  }

  onPositionChangeFlow = ({ currentPosition }) => {
    const { isAnimationFlowComplete } = this.state;

    // if (!this.streaks) {
    //   return;
    // }

    // if (currentPosition === 'above' && !isAnimationFlowComplete) {
    //   this.animateFlow();
    //   this.setState({ isAnimationFlowComplete: true });
    // }
  }

  onPositionChangeIllus = ({ currentPosition }) => {
    const { isAnimationIllusComplete } = this.state;

    // if (!this.leftIllu || !this.rightIllu) {
    if (!this.leftIllu) {
      return;
    }

    if (currentPosition === 'above' && !isAnimationIllusComplete) {
      this.animateIllus();
      this.setState({ isAnimationIllusComplete: true });
    }
  }

  animateFlow = () => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeIn';
    const easeOut = 'Power4.easeOut';

    timeline.staggerFromTo(
      this.streaks,
      2.2,
      { x: `-${this.widest}` },
      { x: WIDTH, ease },
      0.05,
    );

    timeline.set({}, {}, '+=1.25');

    timeline.addLabel('start');

    // Percentage positions of each streak
    [
      -11.01, 25.31, 88.13, 35.75, 49.34, 84.85, 65.12,
      38.31, -2.41, 96.94, 62.31, 77.31, 3.87, 95.34,
      59.26, 22.08, 9.02, 61.38, -13.17, 64.34, 2.31,
      54.21, 61.32, 43.23, 23.31, 16.41,
    ].map((pos, i) => timeline.fromTo(
      this.streaks[i],
      2.85,
      { x: `-${this.widest}` },
      { x: (pos * WIDTH) / 100, ease: easeOut },
      'start+=.085',
    ));

    this.timeline = timeline;
  }

  animateIllus = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeOut';

    t.addLabel('start');

    t.fromTo(
      this.leftIllu,
      1,
      { autoAlpha: 0, x: -150 },
      { autoAlpha: 1, x: 0, ease },
    );

    // t.fromTo(
    //   this.rightIllu,
    //   1,
    //   { autoAlpha: 0, x: 150 },
    //   { autoAlpha: 1, x: 0, ease },
    //   'start+=.2',
    // );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.wireless}>
        {/* <Waypoint
          topOffset="85%"
          onPositionChange={this.onPositionChangeFlow}
        />

        <svg viewBox={`0 0 ${WIDTH} 227`} className={s.wireless__flow} ref={(c) => { this.flow = c; }}>
          <path fill="#7BCDD0" d="M283.2,227H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,223.4,287.5,227,283.2,227C283.2,227,283.2,227,283.2,227z" />
          <path fill="#C4D247" d="M283.2,105H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,101.4,287.5,105,283.2,105C283.2,105,283.2,105,283.2,105z" />
          <path fill="#7BCDD0" d="M283.2,157H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,153.4,287.5,157,283.2,157C283.2,157,283.2,157,283.2,157z" />
          <path fill="#DDEEEF" d="M283.2,204H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,200.4,287.5,204,283.2,204C283.2,204,283.2,204,283.2,204z" />
          <path fill="#DDEEEF" d="M56.2,19H7.8C3.5,19,0,15.4,0,11c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h48.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C64,15.4,60.5,19,56.2,19C56.2,19,56.2,19,56.2,19z" />
          <path fill="#DDEEEF" d="M97.2,107H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h89.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C105,103.4,101.5,107,97.2,107C97.2,107,97.2,107,97.2,107z" />
          <path fill="#FFFFFF" d="M77.2,25H7.8C3.5,25,0,21.4,0,17c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h69.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C85,21.4,81.5,25,77.2,25C77.2,25,77.2,25,77.2,25z" />
          <path fill="#DDEEEF" d="M77.2,55H7.8C3.5,55,0,51.4,0,47c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h69.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C85,51.4,81.5,55,77.2,55C77.2,55,77.2,55,77.2,55z" />
          <path fill="#DDEEEF" d="M199.2,107H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h191.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C207,103.4,203.5,107,199.2,107C199.2,107,199.2,107,199.2,107z" />
          <path fill="#FFFFFF" d="M283.2,58H7.8C3.5,58,0,54.4,0,50c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,54.4,287.5,58,283.2,58z" />
          <path fill="#FFFFFF" d="M283.2,203H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,199.4,287.5,203,283.2,203C283.2,203,283.2,203,283.2,203z" />
          <circle fill="#F87A4E" cx="8" cy="196" r="8" />
          <circle fill="#5470C0" cx="8" cy="219" r="8" />
          <circle fill="#DDEEEF" cx="10" cy="10" r="10" />
          <circle fill="#D1E142" cx="10" cy="58" r="10" />
          <circle fill="#FFFFFF" cx="10" cy="45" r="10" />
          <circle fill="#F87A4E" cx="8" cy="99" r="8" />
          <circle fill="#7BCDD0" cx="8" cy="150" r="8" />
          <path fill="#FFFFFF" d="M183,156H5.1c-2.8,0-5.1-3.6-5.1-8l0,0c0-4.4,2.3-8,5.1-8H183c2.8,0,5.1,3.6,5.1,8l0,0C188,152.4,185.7,156,183,156z" />
          <path fill="#FFFFFF" d="M181.9,159H8.1c-2.8,0-8.1-3.6-8.1-8l0,0c0-4.4,5.3-8,8.1-8h173.9c2.8,0,6.1,3.6,6.1,8l0,0C188,155.4,184.7,159,181.9,159z" />
          <path fill="#F6F6F6" d="M183,158H5.1c-2.8,0-5.1-3.6-5.1-8l0,0c0-4.4,2.3-8,5.1-8H183c2.8,0,5.1,3.6,5.1,8l0,0C188,154.4,185.7,158,183,158z" />
          <path fill="#DDEEEF" d="M77.2,134H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8h69.4c4.4,0,7.9,3.6,7.8,8l0,0C85,130.4,81.5,134,77.2,134C77.2,134,77.2,134,77.2,134z" />
          <path fill="#7BCDD0" d="M283.2,65H7.8C3.5,65,0,61.4,0,57c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,61.4,287.5,65,283.2,65C283.2,65,283.2,65,283.2,65z" />
          <path fill="#DDEEEF" d="M127.2,112H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h119.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C135,108.4,131.5,112,127.2,112C127.2,112,127.2,112,127.2,112z" />
          <path fill="#DDEEEF" d="M67.2,18H7.8C3.5,18,0,14.4,0,10c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8c0,0,0,0,0,0h59.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C75,14.4,71.5,18,67.2,18C67.2,18,67.2,18,67.2,18z" />
          <path fill="#C4D247" d="M283.2,156H7.8c-4.4,0-7.9-3.6-7.8-8c0,0,0,0,0,0l0,0c0-4.4,3.5-7.9,7.8-8h275.4c4.4,0,7.9,3.6,7.8,8c0,0,0,0,0,0l0,0C291,152.4,287.5,156,283.2,156C283.2,156,283.2,156,283.2,156z" />
        </svg> */}

        <div className={s.wireless__content}>
          <div className={s.wireless__wrapper}>
            <Waypoint
              topOffset="55%"
              onPositionChange={this.onPositionChangeIllus}
            />

            {children}

            <img
              className={s.wireless__left}
              src={require('!file-loader!assets/images/5g/wireless/02-Tablet_1x.png')}
              ref={(c) => { this.leftIllu = c; }}
              alt="a glowing tablet device with a blue and orange ball floating above it"
            />

            {/* <img
              className={s.wireless__right}
              src={require('!file-loader!assets/images/5g/wireless/right.svg')}
              ref={(c) => { this.rightIllu = c; }}
              alt=""
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
