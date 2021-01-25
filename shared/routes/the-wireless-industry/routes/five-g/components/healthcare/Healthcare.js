import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import Animator from 'components/animator';
import convertToRouterLink from 'utils/convertToRouterLink';

import s from './Healthcare.scss';

export default class Healthcare extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  }

  state = {
    isAnimationComplete: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { isAnimationComplete } = this.state;

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    // const { isMobile } = this.state;

    const timeline = new TimelineLite({ id: '5g Healthcare' });
    // const ease = 'Power4.easeOut';
    const duration = 2;

    timeline.addLabel('start');

    timeline.fromTo(
      this.healthcareGradient,
      duration * 2,
      {
        attr: { x1: 1440, x2: 2880 },
      },
      {
        attr: { x1: -2800, x2: -1440 },
      },
    );

    this.timeline = timeline;
    return timeline;
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.healthcare}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.healthcare__container}>
          <svg
            viewBox="0 0 1440 810"
            xmlSpace="preserve"
            preserveAspectRatio="xMinYMax slice"
            className={s.healthcare__svg}
          >
            <defs>
              <mask id="healthcareMasker">
                <rect className="gradientBox" fill="url(#healthcareGradient)" x="0" y="0" width="1440" height="810" />
              </mask>

              <pattern id="healthcareBG" patternUnits="userSpaceOnUse" width="1440" height="810">
                <image xlinkHref={require('!file-loader!assets/images/5g/healthcare/05-Healthcare_1x.jpg')} x="0" y="0" width="1440" height="810" />
              </pattern>

              <linearGradient
                id="healthcareGradient"
                gradientUnits="userSpaceOnUse"
                x1="1440"
                y1="720"
                x2="2880"
                y2="720"
                // gradientTransform="scale(-1)"
                gradientTransform="rotate(180)"
                ref={(c) => { this.healthcareGradient = c; }}
              >
                <stop offset="0" stopColor="#000000" />
                <stop offset="1" stopColor="#ffffff" />
              </linearGradient>

            </defs>

            <g mask="url(#healthcareMasker)">
              <rect width="1440" height="810" x="0" y="0" fill="url(#healthcareBG)" />
            </g>
          </svg>

          <div className={s.healthcare__wrapper}>
            <Animator width="100%">
              <div className={s.healthcare__title}>
                {title}
              </div>
            </Animator>

            <Animator width="100%">
              <div className={s.healthcare__content}>
                {ReactHtmlParser(text, { transform: convertToRouterLink })}
              </div>
            </Animator>
          </div>
        </div>
      </div>
    );
  }
}

// import React, { PureComponent, Children, cloneElement } from 'react';
// import PropTypes from 'prop-types';

// import Waypoint from 'react-waypoint';
// import { TimelineLite } from 'gsap';

// import s from './Healthcare.scss';

// export default class Healthcare extends PureComponent {

//   static propTypes = {
//     children: PropTypes.node,
//   }

//   static defaultProps = {
//     children: undefined,
//   }

//   state = {
//     isAnimationComplete: false,
//   }

//   onPositionChange = ({ currentPosition }) => {
//     const { isAnimationComplete } = this.state;

//     if (currentPosition === 'above' && !isAnimationComplete) {
//       this.animate();
//       this.setState({ isAnimationComplete: true });
//     }
//   }

//   animate = () => {
//     const t = new TimelineLite();
//     const ease = 'Power4.easeInOut';

//     t
//       .addLabel('start')
//       .delay(0.2)
//       .fromTo(
//         this.doctor,
//         1.5,
//         { autoAlpha: 0, x: '-100%' },
//         { autoAlpha: 1, x: '0%', ease },
//         'start+=0.3',
//       )
//       .fromTo(
//         this.patient,
//         1.5,
//         { autoAlpha: 0, x: '100%' },
//         { autoAlpha: 1, x: '0%', ease },
//         'start+=0.3',
//       );
//   }

//   render() {
//     const { children } = this.props;

//     return (
//       <div className={s.healthcare}>
//         <Waypoint
//           topOffset="90%"
//           onPositionChange={this.onPositionChange}
//         />

//         <div className={s.healthcare__wrapper}>
//           {Children.map(children, c => cloneElement(c, { className: s.healthcare__row }))}

//           <img
//             className={s.healthcare__left}
//             src={require('!file-loader!assets/images/5g/healthcare/doctor.svg')}
//             alt=""
//             ref={(el) => { this.doctor = el; }}
//           />

//           <img
//             className={s.healthcare__right}
//             src={require('!file-loader!assets/images/5g/healthcare/patient.svg')}
//             alt=""
//             ref={(el) => { this.patient = el; }}
//           />
//         </div>

//         <div
//           ref={(el) => { this.plane = el; }}
//           className={s.healthcare__plane}
//         />
//       </div>
//     );
//   }
// }
