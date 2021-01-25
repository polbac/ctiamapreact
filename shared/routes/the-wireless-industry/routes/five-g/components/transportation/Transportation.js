import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import Animator from 'components/animator';
import convertToRouterLink from 'utils/convertToRouterLink';

import s from './Transportation.scss';

export default class Transportation extends PureComponent {

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

    const timeline = new TimelineLite({ id: '5g Transportation' });
    // const ease = 'Power4.easeOut';
    const duration = 2;

    timeline.addLabel('start');

    timeline.fromTo(
      this.transportationGradient,
      duration * 2,
      {
        attr: { x1: 1440, x2: 2880 },
      },
      {
        // attr: { x1: -2800, x2: -1440 },
        attr: { x1: -1440, x2: 1 },
      },
    );

    this.timeline = timeline;
    return timeline;
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.transportation}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.transportation__container}>
          <svg
            viewBox="0 0 1440 810"
            xmlSpace="preserve"
            preserveAspectRatio="xMinYMax slice"
            className={s.transportation__svg}
          >
            <defs>
              <mask id="transportationMasker">
                <rect className="gradientBox" fill="url(#transportationGradient)" x="0" y="0" width="1440" height="810" />
              </mask>

              <pattern id="transportationBG" patternUnits="userSpaceOnUse" width="1440" height="810">
                <image xlinkHref={require('!file-loader!assets/images/5g/transportation/05-Transportation_1x.jpg')} x="0" y="0" width="1440" height="810" />
              </pattern>

              <linearGradient
                id="transportationGradient"
                gradientUnits="userSpaceOnUse"
                x1="1440"
                y1="720"
                x2="2880"
                y2="720"
                // gradientTransform="scale(-1)"
                // gradientTransform="rotate(180)"
                ref={(c) => { this.transportationGradient = c; }}
              >
                <stop offset="0" stopColor="#000000" />
                <stop offset="1" stopColor="#ffffff" />
              </linearGradient>

            </defs>

            <g mask="url(#transportationMasker)">
              <rect width="1440" height="810" x="0" y="0" fill="url(#transportationBG)" />
            </g>
          </svg>

          <div className={s.transportation__wrapper}>
            <Animator width="100%">
              <div className={s.transportation__title}>
                {title}
              </div>
            </Animator>

            <Animator width="100%">
              <div className={s.transportation__content}>
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

// import s from './Transportation.scss';

// export default class Transportation extends PureComponent {

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
//     const timeline = new TimelineLite();
//     const ease = 'Power4.easeOut';
//     const poles = this.lightpoles.childNodes;

//     timeline.addLabel('start');

//     timeline.fromTo(
//       this.skyscraper,
//       1,
//       { y: '100%' },
//       { y: '0%', ease },
//       'start',
//     );

//     timeline.staggerFromTo(
//       poles,
//       1,
//       { y: '100%' },
//       { y: '0%', ease },
//       0.2,
//       'start=-0.5',
//     );

//     timeline.fromTo(
//       this.cloud,
//       15,
//       { x: '0%' },
//       { x: '30%', ease },
//       'start=-0.5',
//     );

//     timeline.fromTo(
//       this.bluecar,
//       2.25,
//       { x: '-100%' },
//       { x: '90%', ease },
//       'start+=0.8',
//     );

//     timeline.fromTo(
//       this.greencar,
//       2.25,
//       { x: '-100%' },
//       { x: '-30%', ease },
//       'start+=1.8',
//     );
//   }

//   render() {
//     const { children } = this.props;

//     return (
//       <div className={s.transportation}>
//         <Waypoint
//           topOffset="95%"
//           onPositionChange={this.onPositionChange}
//         />

//         <img
//           src={require('!file-loader!assets/images/5g/transportation/cloud.svg')}
//           alt=""
//           className={s.transportation__cloud}
//           ref={(el) => { this.cloud = el; }}
//         />

//         <div className={s.transportation__content}>
//           {Children.map(children, c => cloneElement(c, { className: s.transportation__row }))}
//         </div>

//         <div className={s.transportation__city}>
//           <img
//             src={require('!file-loader!assets/images/5g/transportation/city-shape.svg')}
//             alt=""
//             className={s.transportation__skyscraper}
//             ref={(el) => { this.skyscraper = el; }}
//           />

//           <div
//             className={s.transportation__lightpoles}
//             ref={(el) => { this.lightpoles = el; }}
//           >
//             <img
//               src={require('!file-loader!assets/images/5g/transportation/light-pole.svg')}
//               alt=""
//               className={s.transportation__lightpole}
//             />
//             <img
//               src={require('!file-loader!assets/images/5g/transportation/light-pole.svg')}
//               alt=""
//               className={s.transportation__lightpole}
//             />
//             <img
//               src={require('!file-loader!assets/images/5g/transportation/light-pole.svg')}
//               alt=""
//               className={s.transportation__lightpole}
//             />
//             <img
//               src={require('!file-loader!assets/images/5g/transportation/light-pole.svg')}
//               alt=""
//               className={s.transportation__lightpole}
//             />
//           </div>
//         </div>

//         <div className={s.transportation__road}>
//           <img
//             src={require('!file-loader!assets/images/5g/transportation/car-green.svg')}
//             alt=""
//             className={s.transportation__greencar}
//             ref={(el) => { this.greencar = el; }}
//           />
//           <img
//             src={require('!file-loader!assets/images/5g/transportation/car-blue.svg')}
//             alt=""
//             className={s.transportation__bluecar}
//             ref={(el) => { this.bluecar = el; }}
//           />
//         </div>
//       </div>
//     );
//   }
// }
