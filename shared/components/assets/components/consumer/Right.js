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

    this.lines = [this.el1, this.el3, this.el4, this.el7, this.el8];
    this.circles = [this.el2, this.el5, this.el6];

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
      <svg className={s(s.graphic, s.graphicConsumer__right, className)} viewBox="0 0 849.6 359.87">
        <line ref={(c) => { this.el1 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="819.6" y1="150.74" x2="378.18" y2="150.74" />
        <line ref={(c) => { this.el2 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#593c81" strokeWidth="60" x1="294.39" y1="150.74" x2="294.39" y2="150.74" />
        <line ref={(c) => { this.el3 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="200.44" y1="329.87" x2="58.14" y2="328.87" />
        <line ref={(c) => { this.el4 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" x1="346.44" y1="240.27" x2="264.14" y2="239.27" />
        <line ref={(c) => { this.el5 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="30" x1="418.39" y1="240.15" x2="418.14" y2="239.39" />
        <line ref={(c) => { this.el6 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="30" x1="173.31" y1="240.15" x2="173.06" y2="239.39" />
        <line ref={(c) => { this.el7 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#eceef2" strokeWidth="60" x1="783.37" y1="328.88" x2="278.39" y2="329.86" />
        <path ref={(c) => { this.el8 = c; }} fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="60" fillRule="evenodd" d="M617.21,420.81a120.57,120.57,0,0,0-160.11.43" transform="translate(-427.1 -360.61)" />
      </svg>
    );
  }
}
