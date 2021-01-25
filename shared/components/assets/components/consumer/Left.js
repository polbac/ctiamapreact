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
    this.circles = [this.el2, this.el3];

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
      <svg className={s(s.graphic, s.graphicConsumer__left, className, { leftAlign })} viewBox="0 0 578.25 359.35">
        <g style={{ isolation: 'isolate' }}>
          <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="474.46" y1="30" x2="33.05" y2="30" />
          <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="60" x1="379.09" y1="120.47" x2="380.25" y2="119.03" />
          <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="30" x1="563.25" y1="255.01" x2="563.25" y2="255.01" />
          <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="232.3" y1="120.26" x2="30" y2="119.23" />
          <path ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" fillRule="evenodd" d="M584.26,307.06a120,120,0,0,0-159.4.43" transform="translate(-232 -7.33)" />
          <path ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="60" fillRule="evenodd" style={{ mixBlendMode: 'multiply' }} d="M584.84,306.62a120.14,120.14,0,0,0,159.46-.42" transform="translate(-232 -7.33)" />
        </g>
      </svg>
    );
  }
}
