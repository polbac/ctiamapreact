import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import Animator from 'components/animator';
import convertToRouterLink from 'utils/convertToRouterLink';

import s from './SmartCity.scss';

export default class SmartCity extends PureComponent {

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

    const timeline = new TimelineLite({ id: '5g SmartCity' });
    // const ease = 'Power4.easeOut';
    const duration = 2;

    timeline.addLabel('start');

    timeline.fromTo(
      this.smartcityGradient,
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
      <div className={s.smartcity}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.smartcity__container}>
          <svg
            viewBox="0 0 1440 810"
            xmlSpace="preserve"
            preserveAspectRatio="xMinYMax slice"
            className={s.smartcity__svg}
          >
            <defs>
              <mask id="smartcityMasker">
                <rect className="gradientBox" fill="url(#smartcityGradient)" x="0" y="0" width="1440" height="810" />
              </mask>

              <pattern id="smartcityBG" patternUnits="userSpaceOnUse" width="1440" height="810">
                <image xlinkHref={require('!file-loader!assets/images/5g/smart/05-SmartCities_1x.jpg')} x="0" y="0" width="1440" height="810" />
              </pattern>

              <linearGradient
                id="smartcityGradient"
                gradientUnits="userSpaceOnUse"
                x1="1440"
                y1="720"
                x2="2880"
                y2="720"
                // gradientTransform="scale(-1)"
                gradientTransform="rotate(180)"
                ref={(c) => { this.smartcityGradient = c; }}
              >
                <stop offset="0" stopColor="#000000" />
                <stop offset="1" stopColor="#ffffff" />
              </linearGradient>

            </defs>

            <g mask="url(#smartcityMasker)">
              <rect width="1440" height="810" x="0" y="0" fill="url(#smartcityBG)" />
            </g>
          </svg>

          <div className={s.smartcity__wrapper}>
            <Animator width="100%">
              <div className={s.smartcity__title}>
                {title}
              </div>
            </Animator>

            <Animator width="100%">
              <div className={s.smartcity__content}>
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

// import s from './SmartCity.scss';

// export default class SmartCity extends PureComponent {

//   static propTypes = {
//     children: PropTypes.node,
//   }

//   static defaultProps = {
//     children: undefined,
//   }

//   state = {
//     isAnimationComplete: false,
//   };

//   onPositionChange = ({ currentPosition }) => {
//     const { isAnimationComplete } = this.state;

//     if (currentPosition === 'above' && !isAnimationComplete) {
//       this.animate();
//       this.setState({ isAnimationComplete: true });
//     }
//   }

//   animate = () => {
//     const timeline = new TimelineLite();
//     const ease = 'Power4.easeOut';
//     const poles = this.lightpoles.childNodes;

//     timeline
//       .addLabel('start')
//       .fromTo(
//         this.skyscraper,
//         1,
//         { y: '100%' },
//         { y: '0%', ease },
//         'start',
//       )
//       .fromTo(
//         this.cloudSmall,
//         1,
//         { autoAlpha: 0, x: '-20%' },
//         { autoAlpha: 1, x: '0%', ease },
//         'start',
//       )
//       .staggerFromTo(
//         poles,
//         1,
//         { y: '100%' },
//         { y: '0%', ease },
//         0.2,
//         'start=-0.5',
//       )
//       .fromTo(
//         this.cloud,
//         15,
//         { autoAlpha: 0, x: '0%' },
//         { autoAlpha: 1, x: '30%', ease },
//         'start=-0.5',
//       )
//       .fromTo(
//         this.bigLightpole,
//         1,
//         { autoAlpha: 0, y: '-5%', x: '-50%', scale: '1.3', rotationX: 30, transformPerspective: 1500 },
//         { autoAlpha: 1, y: '0%', x: '-50%', scale: '1', rotationX: 0, transformPerspective: 1000, ease },
//         'start=+1.5',
//       )
//       .fromTo(
//         this.moon,
//         1,
//         { autoAlpha: 0, y: '300%' },
//         { autoAlpha: 1, y: '0%', ease },
//         'start=+1.5',
//       )
//       .delay(1);
//   }

//   render() {
//     const { children } = this.props;

//     return (
//       <div className={s.smartcity}>
//         <Waypoint
//           topOffset="95%"
//           onPositionChange={this.onPositionChange}
//         />

//         <img
//           src={require('!file-loader!assets/images/5g/smart/cloud.svg')}
//           alt=""
//           className={s.smartcity__cloud}
//           ref={(el) => { this.cloud = el; }}
//         />

//         <img
//           src={require('!file-loader!assets/images/5g/smart/cloud.svg')}
//           alt=""
//           className={s.smartcity__cloudSmall}
//           ref={(el) => { this.cloudSmall = el; }}
//         />

//         <img
//           src={require('!file-loader!assets/images/5g/smart/moon.svg')}
//           alt=""
//           className={s.smartcity__moon}
//           ref={(el) => { this.moon = el; }}
//         />

//         <div className={s.smartcity__content}>
//           {Children.map(children, c => cloneElement(c, { className: s.smartcity__row }))}
//         </div>

//         <div className={s.smartcity__city}>
//           <img
//             src={require('!file-loader!assets/images/5g/smart/city-shape.svg')}
//             alt=""
//             className={s.smartcity__skyscraper}
//             ref={(el) => { this.skyscraper = el; }}
//           />

//           <div
//             className={s.smartcity__lightpoles}
//             ref={(el) => { this.lightpoles = el; }}
//           >
//             <img
//               src={require('!file-loader!assets/images/5g/smart/light-pole.svg')}
//               alt=""
//               className={s.smartcity__lightpole}
//             />
//             <img
//               src={require('!file-loader!assets/images/5g/smart/light-pole.svg')}
//               alt=""
//               className={s.smartcity__lightpole}
//             />

//             <img
//               src={require('!file-loader!assets/images/5g/smart/light-pole.svg')}
//               alt=""
//               className={s.smartcity__lightpole}
//             />
//             <img
//               src={require('!file-loader!assets/images/5g/smart/light-pole.svg')}
//               alt=""
//               className={s.smartcity__lightpole}
//             />
//           </div>
//         </div>

//         <div className={s.smartcity__road}>
//           <img
//             src={require('!file-loader!assets/images/5g/smart/big-light-pole.svg')}
//             alt=""
//             className={s.smartcity__lightpoleBig}
//             ref={(el) => { this.bigLightpole = el; }}
//           />
//         </div>
//       </div>
//     );
//   }
// }
