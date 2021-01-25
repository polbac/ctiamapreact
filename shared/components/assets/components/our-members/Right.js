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

    this.lines = [this.el1, this.el2, this.el5, this.el6, this.el10, this.el13];
    this.circles = [this.el3, this.el4, this.el7, this.el8, this.el9, this.el11, this.el12, this.el14, this.el15]; // eslint-disable-line

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

    timeline.delay(timings.delay * 0.6);

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
      timings.duration * 0.8,
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
      <svg className={s(s.graphic, s.graphicOurMembers__right, className)} viewBox="0 0 507.19 644.41">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="212.64" y1="370.98" x2="68.87" y2="513.41" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="424" y1="30" x2="193.65" y2="261.93" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60px" x1="271.58" y1="438.9" x2="270.56" y2="439.96" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="30px" x1="266.92" y1="315.8" x2="265.91" y2="316.87" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60px" x1="109.2" y1="345.83" x2="30" y2="425.08" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="60px" x1="406.45" y1="430.42" x2="281.67" y2="555.42" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="222.64" y1="614.41" x2="224.09" y2="614.41" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="465.1" y1="372.91" x2="465.03" y2="372.83" />
        <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="323.68" y1="259.72" x2="323.61" y2="259.65" />
        <line ref={(c) => { this.el10 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60px" x1="412.98" y1="296.42" x2="346.5" y2="364.49" />
        <line ref={(c) => { this.el11 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="30px" x1="212.2" y1="497.44" x2="212.67" y2="498.12" />
        <line ref={(c) => { this.el12 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="30px" x1="365.64" y1="601.44" x2="366.11" y2="602.11" />
        <line ref={(c) => { this.el13 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60px" x1="477.19" y1="488.26" x2="410.61" y2="556.44" />
        <line ref={(c) => { this.el14 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="30px" x1="213.93" y1="497.36" x2="212.92" y2="498.42" />
        <line ref={(c) => { this.el15 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="30px" x1="366.43" y1="600.86" x2="365.42" y2="601.92" />
      </svg>
    );
  }
}
