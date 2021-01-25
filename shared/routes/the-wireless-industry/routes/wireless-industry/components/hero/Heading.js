import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import isIE from 'utils/is-ie';

import s from './Heading.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    subheading: PropTypes.string,
  }

  get timeline() {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.addLabel('start');

    timeline.to(
      this.svg,
      0.2,
      { autoAlpha: 1 },
    );

    if (isIE() === 0) {
      timeline.staggerFromTo(
        this.svg.childNodes,
        0.45,
        { drawSVG: '100% 100%' },
        { drawSVG: '0% 100%', ease },
        0.01,
        'start+=.2',
      );

      timeline.fromTo(
        this.subheading,
        0.3,
        { autoAlpha: 0, x: -20 },
        { autoAlpha: 1, x: 0, ease },
        'start+=.3',
      );
    }

    return timeline;
  }

  render() {
    const { className, subheading } = this.props;

    return (
      <div className={s(s.heading, className)}>
        <svg
          viewBox="0 0 883.94 362.21"
          className={s.heading__svg}
          ref={(c) => { this.svg = c; }}
        >
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="699.18" y1="256.54" x2="617.37" y2="256.54" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" d="M573.86,303.61C594.31,306.32,600.91,319,600.2,330c-.82,12.63-13.74,24.23-27.5,24.23s-26.51-8.21-33.3-16.26" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="875.94" y1="257.07" x2="829.69" y2="353.57" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="499.44" y1="256.82" x2="499.44" y2="324.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" x1="755.19" y1="309.32" x2="793.02" y2="351.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="436.44" y1="256.82" x2="436.44" y2="324.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="331.44" y1="256.5" x2="331.44" y2="353.5" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" x1="218.44" y1="257.82" x2="218.44" y2="352.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="163.44" y1="257.82" x2="163.44" y2="307.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" x1="280.44" y1="257.82" x2="280.44" y2="352.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="730.27" y1="256.5" x2="730.27" y2="353.5" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} d="M331.38,256.5H347c26.13,0,47.32,21.73,47.32,48.54S373.11,353.58,347,353.58h-15.6" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" style={{ mixBlendMode: 'multiply' }} x1="218.5" y1="257.91" x2="280.5" y2="352.91" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="163.44" y1="308.82" x2="163.44" y2="352.82" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" style={{ mixBlendMode: 'multiply' }} d="M499.38,325.61c0,15.34-14.13,27.77-31.56,27.77S436.61,341,436.61,325.61" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} d="M730.37,256.44h23.71c16.34,0,29.59,11.57,29.59,25.85s-13.25,25.85-29.59,25.85H730.52" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" style={{ mixBlendMode: 'multiply' }} d="M573.86,303.45c-15.59,0-30.53-11.57-30.53-24.23s11.15-22.92,24.91-22.92,20.08,6.56,27.14,14.54" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="817.69" y1="257.57" x2="851.19" y2="308.82" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" style={{ mixBlendMode: 'multiply' }} x1="660.27" y1="256.5" x2="660.27" y2="353.5" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="381.94" y1="109.78" x2="321.13" y2="109.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="572.94" y1="109.78" x2="512.13" y2="109.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="162.38" y1="110.63" x2="162.38" y2="160.63" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="381.94" y1="205.78" x2="321.13" y2="205.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" x1="365.94" y1="158.78" x2="321.13" y2="158.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="321.38" y1="109.3" x2="321.38" y2="206.3" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="483.94" y1="205.78" x2="423.13" y2="205.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="423.38" y1="109.3" x2="423.38" y2="206.3" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" x1="243.13" y1="161.29" x2="281.71" y2="204.96" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="218.54" y1="108.64" x2="218.54" y2="205.64" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" d="M635.13,156c20.25,3.25,26.72,15.81,26,26.82-.82,12.63-13.74,24.23-27.5,24.23s-27-7.3-33.3-16.26" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" style={{ mixBlendMode: 'multiply' }} d="M634.88,156c-14.67-1.67-30.61-11.84-30.61-24.5s11.15-22.35,24.91-22.35,20.33,6.44,27.14,14.54" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="512.38" y1="109.3" x2="512.38" y2="206.3" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" d="M725.88,156c-14.67-1.67-30.61-11.84-30.61-24.5s11.15-22.35,24.91-22.35,20.33,6.44,27.14,14.54" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} d="M218.59,108.71h23.71c16.34,0,29.59,11.77,29.59,26.28s-13.25,26.28-29.59,26.28H218.74" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="162.38" y1="161.63" x2="162.38" y2="205.63" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="572.94" y1="205.78" x2="512.13" y2="205.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" style={{ mixBlendMode: 'multiply' }} x1="556.94" y1="158.78" x2="512.13" y2="158.78" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#78cdd1" x1="22.63" y1="109.77" x2="36.13" y2="205.83" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="16" stroke="#c5d2df" x1="69.71" y1="135.38" x2="103.21" y2="205.96" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="69.63" y1="135.38" x2="36.13" y2="205.96" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} x1="116.63" y1="109.77" x2="103.13" y2="205.83" />
          <path fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="16" style={{ mixBlendMode: 'multiply' }} d="M726.13,156c20.25,3.25,26.72,15.81,26,26.82-.82,12.63-13.74,24.23-27.5,24.23s-27-7.3-33.3-16.26" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="112.52" y1="5.98" x2="92.41" y2="5.98" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="112.52" y1="37.73" x2="92.41" y2="37.73" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c5d2df" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="106.57" y1="22.18" x2="92.41" y2="22.18" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="92.49" y1="5.82" x2="92.49" y2="37.9" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c5d2df" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="33.61" y1="4.48" x2="4" y2="4.48" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="18.81" y1="4.07" x2="18.81" y2="39.18" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c4d438" strokeWidth="8" x1="47.55" y1="4" x2="47.55" y2="39.11" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#78cdd1" strokeWidth="8" x1="71.1" y1="4" x2="71.1" y2="39.11" />
          <line fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="#c5d2df" strokeWidth="8" style={{ mixBlendMode: 'multiply' }} x1="70.86" y1="21.56" x2="47.79" y2="21.56" />
        </svg>

        <h2
          className={s.heading__subheading}
          ref={(c) => { this.subheading = c; }}
        >
          {subheading}
        </h2>
      </div>
    );
  }
}
