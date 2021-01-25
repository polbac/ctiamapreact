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

    this.lines = [this.el1, this.el4, this.el5, this.el6];
    this.circles = [this.el2, this.el3, this.el7, this.el8, this.el9];

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
      <svg className={s(s.graphic, s.graphicChannel__left, className, { leftAlign })} viewBox="0 0 559.32 330.95">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="60" x1="397.1" y1="30.01" x2="297.05" y2="30" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="60" x1="324.09" y1="120.97" x2="325.25" y2="119.53" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="212.09" y1="300.95" x2="213.25" y2="299.51" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="232.3" y1="119.76" x2="30" y2="119.74" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="529.32" y1="119.79" x2="418" y2="119.74" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="349.25" y1="210.08" x2="249" y2="210.01" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="217.25" y1="30.01" x2="217.25" y2="30.01" />
        <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="30" x1="438.25" y1="210.05" x2="438.25" y2="210.04" />
        <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="30" x1="162.25" y1="210.05" x2="162.25" y2="210.04" />
      </svg>
    );
  }
}
