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

    this.lines = [this.el1, this.el9, this.el10, this.el11, this.el12];
    this.circles = [this.el2, this.el3, this.el4, this.el5, this.el6, this.el7, this.el8];

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
      <svg className={s(s.graphic, s.graphicChannel__right, className)} viewBox="0 0 672 385">
        <g style={{ isolation: 'isolate' }}>
          <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#ffffff" strokeWidth="60" x1="302.17" y1="196.55" x2="120" y2="196.23" />
          <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="30" y1="196.39" x2="30" y2="196.39" />
          <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="30" x1="201" y1="107" x2="201" y2="107" />
          <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="109" y1="287.51" x2="109" y2="287.51" />
          <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="373" y1="196.39" x2="373" y2="196.39" />
          <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="373" y1="15" x2="373" y2="15" />
          <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="373" y1="370" x2="373" y2="370" />
          <line ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="282" y1="107" x2="282" y2="107" />
          <line ref={(c) => { this.el9 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="473" y1="107" x2="362" y2="107" />
          <line ref={(c) => { this.el10 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="59" y1="107" x2="124" y2="107" />
          <line ref={(c) => { this.el11 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="326.77" y1="287.51" x2="190" y2="287.52" />
          <line ref={(c) => { this.el12 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="60" style={{ mixBlendMode: 'multiply' }} x1="642" y1="286.97" x2="330.75" y2="288.06" />
        </g>
      </svg>
    );
  }
}
