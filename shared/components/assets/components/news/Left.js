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

    this.lines = [this.el6, this.el7];
    this.linesReversed = [this.el1, this.el3, this.el4];
    this.circles = [this.el2, this.el5, this.el8];

    TweenLite.set(
      this.lines,
      { drawSVG: '100% 100%' },
    );

    TweenLite.set(
      this.linesReversed,
      { drawSVG: '0% 0%' },
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
      timings.duration * 1.5,
      { drawSVG: '100% 100%' },
      { drawSVG: '0% 100%', ease },
      timings.stagger,
    );

    timeline.staggerFromTo(
      this.linesReversed,
      timings.duration * 1.5,
      { drawSVG: '0% 0%' },
      { drawSVG: '0% 100%', ease },
      timings.stagger,
      'start',
    );

    timeline.staggerFromTo(
      this.circles,
      timings.duration * 1.5,
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
      <svg className={s(s.graphic, s.graphicNews__left, className, { leftAlign })} viewBox="0 0 560.41 332.4">
        <path ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" fillRule="evenodd" d="M577.26,141.07c23.78,0,107.86-.18,107.86-.18,49.21,0,89.1,40.14,89.1,89.66s-39.89,89.66-89.1,89.66l-39.2-.13" transform="translate(-243.82 -19.58)" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="30" x1="280.12" y1="301.16" x2="279.11" y2="302.19" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="212.12" y1="300.96" x2="71.11" y2="302.4" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="46.11" y1="210.5" x2="283.11" y2="210.5" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#fa7a47" strokeWidth="60" x1="354.11" y1="210.5" x2="355.11" y2="210.5" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="60" x1="245.11" y1="121" x2="30" y2="120" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#fa7a47" strokeWidth="60" x1="401.11" y1="30.5" x2="186" y2="30" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="461.11" y1="30.5" x2="461.11" y2="30.5" />
      </svg>
    );
  }
}
