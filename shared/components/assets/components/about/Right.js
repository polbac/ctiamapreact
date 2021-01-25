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

    this.lines = [this.el1, this.el2, this.el6];
    this.circles = [this.el3, this.el4, this.el5];

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

    timeline.delay(timings.delay * 0.3);

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
      <svg className={s(s.graphic, s.graphicAbout__right, className)} viewBox="0 0 406.63 330.87">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60" x1="184.63" y1="120.68" x2="30" y2="119.67" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="376.63" y1="211.03" x2="222" y2="210.01" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60" x1="134.63" y1="210.52" x2="134.63" y2="210.52" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="272.63" y1="300.87" x2="272.63" y2="300.87" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="253.63" y1="120.87" x2="253.63" y2="120.87" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="290.44" y1="30" x2="178.44" y2="30" />
      </svg>
    );
  }
}
