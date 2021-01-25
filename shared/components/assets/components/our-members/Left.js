import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';

import timings from '../../timings';
import s from '../../Graphic.scss';

export default class Left extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    enableAnim: PropTypes.bool,
    leftAlign: PropTypes.bool,
  }

  componentDidMount() {
    const { enableAnim } = this.props;

    if (!enableAnim) {
      return;
    }

    this.lines = [this.el1, this.el2, this.el7, this.el8, this.el9, this.el11];
    this.circles = [this.el3, this.el4, this.el5, this.el6, this.el10];

    TweenLite.set(
      this.lines,
      { drawSVG: '100% 100%' },
    );

    TweenLite.set(
      this.circles,
      { scale: 0 },
    );

    this.animate();
  }

  animate = () => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.addLabel('start');

    timeline.staggerFromTo(
      this.lines,
      timings.duration,
      { drawSVG: '100% 100%' },
      { drawSVG: '0% 100%', ease },
      timings.stagger,
    );

    timeline.staggerFromTo(
      this.circles,
      timings.duration,
      { scale: 0 },
      { scale: 1, ease },
      timings.stagger,
      'start+=0.2',
    );

    return timeline;
  }

  render() {
    const { className, leftAlign } = this.props;

    return (
      <svg className={s(s.graphic, s.graphicOurMembers__left, className, { leftAlign })} viewBox="0 0 536.02 618.27">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="361.62" y1="159.47" x2="219.36" y2="303.32" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="172.26" y1="349.02" x2="30" y2="492.87" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="409.92" y1="110.73" x2="409.92" y2="110.73" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="234.7" y1="160.24" x2="234.7" y2="160.24" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60" x1="233.48" y1="413.71" x2="232.41" y2="414.73" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60" x1="476.12" y1="298.75" x2="475.05" y2="299.77" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="423.32" y1="352.27" x2="187.61" y2="588.27" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="362.88" y1="285.1" x2="290.81" y2="357.24" />
        <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="506.02" y1="141.85" x2="480.58" y2="167.32" />
        <line ref={(c) => { this.el10 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="30" x1="434.02" y1="213.89" x2="434.01" y2="214.07" />
        <line ref={(c) => { this.el11 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60" x1="363.62" y1="30" x2="284.47" y2="109.25" />
      </svg>
    );
  }
}
