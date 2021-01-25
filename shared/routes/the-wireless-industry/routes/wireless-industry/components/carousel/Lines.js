import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';

export default class Lines extends PureComponent {

  static propTypes = {
    className: PropTypes.node,
  }

  componentDidMount() {
    this.lines = Array.prototype.slice.call(this.svg.querySelectorAll('path, line, rect'));
    this.circles = Array.prototype.slice.call(this.svg.querySelectorAll('circle'));

    TweenLite.set(
      this.lines,
      { autoAlpha: 0, drawSVG: '100% 100%' },
    );

    TweenLite.set(
      this.circles,
      { autoAlpha: 0, scale: 0 },
    );
  }

  animate = () => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.addLabel('start');

    timeline.staggerFromTo(
      this.lines,
      0.5,
      { autoAlpha: 0, drawSVG: '100% 100%' },
      { autoAlpha: 1, drawSVG: '0% 100%', ease },
      0.025,
    );

    timeline.staggerFromTo(
      this.circles,
      0.5,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease },
      0.025,
      'start+=.075',
    );

    timeline.addLabel('disappear');

    timeline.staggerTo(
      this.lines,
      0.5,
      { autoAlpha: 0, drawSVG: '0% 0%', ease },
      0.025,
    );

    timeline.staggerTo(
      this.circles,
      0.5,
      { autoAlpha: 0, scale: 0, ease },
      0.025,
      'disappear',
    );

    return timeline;
  }

  render() {
    const { className } = this.props;

    return (
      <svg viewBox="0 0 1860 800" ref={(c) => { this.svg = c; }} className={className}>
        <circle fill="#c7d4e2" cx="1304.23" cy="321.84" r="4.43" />
        <circle fill="#ff8c00" cx="1233.46" cy="553.71" r="5.95" />
        <path strokeWidth="18" strokeLinecap="round" stroke="#78cdd1" fill="none" strokeMiterlimit="10" d="M427.87,593.83a351,351,0,0,0,148.64-25.37L656.65,536" />
        <path stroke="#c4d438" strokeWidth="18" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M65.47,528.58a351.16,351.16,0,0,1,224.31-34.07" />
        <path strokeWidth="18" strokeLinecap="round" stroke="#78cdd1" fill="none" strokeMiterlimit="10" d="M1463.47,336.58a351.16,351.16,0,0,1,224.31-34.07" />
        <path strokeWidth="20" stroke="#f6f6f6" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M802.55,312.87a351.22,351.22,0,0,1,224.31-34.07" />
        <circle fill="#d1e42d" cx="688.27" cy="519.42" r="7.94" />
        <rect strokeWidth="2" stroke="#d1e42d" fill="none" strokeMiterlimit="10" x="496.1" y="248" width="159.77" height="28.58" rx="14.29" ry="14.29" />
        <circle fill="#f6f6f6" cx="642.01" cy="261.86" r="5.95" />
        <path strokeWidth="10" stroke="#c4d438" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M1049.32,616.78a597.77,597.77,0,0,0,163.9-47.7" />
        <path stroke="#ff8c00" strokeWidth="10" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M558.78,406.16,606,387c50.68-20.56,114.07-10.55,156.09,8.29,46.46,20.83,190.34,131.13,278.69,135" />
        <line strokeWidth="10" strokeLinecap="round" stroke="#78cdd1" fill="none" strokeMiterlimit="10" x1="1154.5" y1="321.54" x2="1285.04" y2="321.54" />
        <rect stroke="#c5d2df" strokeWidth="2" fill="none" strokeMiterlimit="10" x="1044.48" y="381.6" width="123.4" height="28.58" rx="14.29" ry="14.29" />
        <circle fill="#78cdd1" cx="1154.02" cy="395.46" r="5.95" />
        <circle fill="#78cdd1" cx="1643.02" cy="385.46" r="5.95" />
        <path strokeWidth="2" stroke="#78cdd1" fill="none" strokeMiterlimit="10" d="M454.3,419.56a11.75,11.75,0,0,1-6.94-2.27l-85.07-62a172.57,172.57,0,0,0-172.71-17.62,11.81,11.81,0,0,1-9.77-21.51,196.23,196.23,0,0,1,196.39,20l85.07,62a11.82,11.82,0,0,1-7,21.37Z" />
        <path strokeWidth="2" stroke="#f6f6f6" fill="none" strokeMiterlimit="10" d="M1644.3,371.69a11.74,11.74,0,0,0-6.94,2.26l-85.07,62a172.57,172.57,0,0,1-172.71,17.62,11.81,11.81,0,0,0-9.77,21.51,196.23,196.23,0,0,0,196.39-20l85.07-62a11.81,11.81,0,0,0-7-21.36Z" />
        <circle fill="#ff8c00" cx="453.52" cy="406.34" r="5.95" />
      </svg>
    );
  }
}
