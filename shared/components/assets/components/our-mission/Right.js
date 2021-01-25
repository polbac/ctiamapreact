import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';

import timings from '../../timings';
import s from '../../Graphic.scss';

export default class Right extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    enableAnim: PropTypes.bool,
  }

  componentDidMount() {
    const { enableAnim } = this.props;

    if (!enableAnim) {
      return;
    }

    this.lines = [this.el2, this.el5, this.el8, this.el11];
    this.circles = [this.el1, this.el3, this.el4, this.el6, this.el7, this.el9, this.el10];

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

    timeline.delay(timings.delay);

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
    const { className } = this.props;

    return (
      <svg className={s(s.graphic, s.graphicOurMission__right, className)} viewBox="0 0 866.64 330.06">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="409.49" y1="210.87" x2="409.49" y2="210.77" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="232.33" y1="30.99" x2="30" y2="30" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60px" x1="226.71" y1="121.38" x2="225.24" y2="121.41" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="30px" x1="309.71" y1="30.38" x2="308.24" y2="30.41" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60px" x1="328.07" y1="210.76" x2="151.49" y2="210.87" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="68.06" y1="210.83" x2="69.08" y2="211.84" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="389.49" y1="30.87" x2="389.49" y2="30.77" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="60px" x1="836.64" y1="120.06" x2="331.58" y2="121.06" />
        <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="30px" x1="142.64" y1="120.06" x2="142.49" y2="120.87" />
        <line ref={(c) => { this.el10 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="30px" x1="178.51" y1="300.06" x2="177.51" y2="301.06" />
        <line ref={(c) => { this.el11 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="336.51" y1="298.96" x2="241.24" y2="300.06" />
      </svg>
    );
  }
}
