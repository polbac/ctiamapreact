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

    this.lines = [this.el1, this.el3, this.el7, this.el8, this.el10];
    this.circles = [this.el2, this.el4, this.el5, this.el6, this.el9];

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
      <svg className={s(s.graphic, s.graphicPositions__left, className, { leftAlign })} viewBox="0 0 449.98 588.99">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="204.14" y1="331.9" x2="61.97" y2="188.23" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="274.52" y1="529.79" x2="275.19" y2="529.06" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="419.98" y1="548.21" x2="352.6" y2="479.17" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#fa7a47" strokeWidth="60" x1="296.92" y1="425.07" x2="298.44" y2="424.98" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="249.86" y1="374.78" x2="249.86" y2="374.78" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#fa7a47" strokeWidth="30" x1="321.68" y1="573.99" x2="321.68" y2="573.99" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#fa7a47" strokeWidth="60" x1="219.35" y1="473.73" x2="140.16" y2="394.49" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="322.33" y1="322.42" x2="243.65" y2="244.08" />
        <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="121.33" y1="503.42" x2="121" y2="503" />
        <line ref={(c) => { this.el10 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="190.35" y1="190.36" x2="30" y2="30" />
      </svg>
    );
  }
}
