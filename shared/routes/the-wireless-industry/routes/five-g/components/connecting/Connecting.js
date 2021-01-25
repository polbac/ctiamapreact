import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import Columns from './Columns';
import s from './Connecting.scss';

const columnsType = (<Columns />).type;

export default class Connecting extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isAnimationCompleteSides: false,
    // isAnimationCompleteCity: false,
    // openBox: undefined,
    // isMobile: undefined,
  }

  // componentDidMount() {
  //   setTimeout(this.onResize, 100);

  //   window.addEventListener('resize', this.onResize);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.onResize);
  // }

  // onResize = () => {
  //   this.setState({ isMobile: window.matchMedia('(max-width: 1080px)').matches });
  // }

  onPositionChangeSides = ({ currentPosition }) => {
    const { isAnimationCompleteSides } = this.state;

    if (this.rightIllu && currentPosition === 'above' && !isAnimationCompleteSides) {
      this.animateSides();
      this.setState({ isAnimationCompleteSides: true });
    }
  }

  // onPositionChangeCity = ({ currentPosition }) => {
  //   const { isAnimationCompleteCity } = this.state;

  //   if (this.city && this.girl && this.car && this.drone && currentPosition === 'above' && !isAnimationCompleteCity) {
  //     this.animateCity();
  //     this.setState({ isAnimationCompleteCity: true });
  //   }
  // }

  animateSides = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeOut';

    t.addLabel('start');

    // t.fromTo(
    //   this.leftIllu,
    //   1,
    //   { autoAlpha: 0, x: -150 },
    //   { autoAlpha: 1, x: 0, ease },
    // );

    t.fromTo(
      this.rightIllu,
      1,
      { autoAlpha: 0, x: 150 },
      { autoAlpha: 1, x: 0, ease },
      // 'start+=.2',
    );
  }

  // animateCity = () => {
  //   const { isMobile } = this.state;
  //   const t = new TimelineLite();
  //   const ease = 'Power4.easeOut';
  //   const delay = isMobile ? 'start' : 0;

  //   t.addLabel('start');

  //   t.fromTo(
  //     this.city,
  //     1,
  //     { autoAlpha: 0, y: 450 },
  //     { autoAlpha: 1, y: 0, ease },
  //   );

  //   t.add(this.columns.animate, delay);

  //   t.fromTo(
  //     this.girl,
  //     0.75,
  //     { autoAlpha: 0, scale: 0 },
  //     { autoAlpha: 1, scale: 1, ease },
  //     'start+=.65',
  //   );

  //   t.fromTo(
  //     this.smartwatch,
  //     0.75,
  //     { autoAlpha: 0, scale: 0 },
  //     { autoAlpha: 1, scale: 1, ease },
  //     'start+=.85',
  //   );

  //   t.fromTo(
  //     this.car,
  //     1.05,
  //     { right: '-20%' },
  //     { right: '10%', ease },
  //     'start+=.85',
  //   );

  //   t.fromTo(
  //     this.drone,
  //     1.6,
  //     {
  //       right: '-20%',
  //       rotation: -25,
  //     },
  //     {
  //       right: '20%',
  //       rotation: 4,
  //       ease,
  //     },
  //     'start+=.85',
  //   );
  // }

  // toggleBox = (item) => {
  //   const { openBox } = this.state;

  //   if (openBox === item) {
  //     this.setState({ openBox: undefined });
  //   } else {
  //     this.setState({ openBox: item });
  //   }
  // }

  render() {
    const { children } = this.props;
    // const { openBox, isMobile } = this.state;

    const childs = Children.toArray(children);
    // const isColumns = childs.filter(c => c.type === columnsType);
    const rest = childs.filter(c => c.type !== columnsType);

    // const plus = item => (
    //   <button aria-label="plus svg" className={s(s.connecting__button, item)} onClick={() => this.toggleBox(item)}>
    //     <img
    //       src={require('!file-loader!assets/images/5g/connecting/plus.svg')}
    //       className={s(s.connecting__plus, { cross: openBox === item })}
    //       alt="plus svg"
    //     />
    //   </button>
    // );

    return (
      <div className={s.connecting}>
        <Waypoint
          topOffset="60%"
          onPositionChange={this.onPositionChangeSides}
        />

        {rest}

        <img
          src={require('!file-loader!assets/images/5g/connecting/04-Suburb_1x.jpg')}
          className={s.connecting__rightIllu}
          ref={(c) => { this.rightIllu = c; }}
          alt="animation style rendering of a city block"
        />

        {/* <img
          src={require('!file-loader!assets/images/5g/connecting/left-illu.svg')}
          className={s.connecting__leftIllu}
          ref={(c) => { this.leftIllu = c; }}
          alt=""
        />

        <img
          src={require('!file-loader!assets/images/5g/connecting/right-illu.svg')}
          className={s.connecting__rightIllu}
          ref={(c) => { this.rightIllu = c; }}
          alt=""
        />

        <div className={s.connecting__illustration}>
          <Waypoint
            topOffset={isMobile ? '55%' : '40%'}
            onPositionChange={this.onPositionChangeCity}
          />

          {Children.map(isColumns, c => cloneElement(c, {
            ref: (el) => { this.columns = el; },
            openBox,
          }))}

          <div className={s.connecting__girlWrapper} ref={(c) => { this.girl = c; }}>
            {plus('girl')}

            <img
              src={require('!file-loader!assets/images/5g/connecting/girl.svg')}
              className={s.connecting__girl}
              alt=""
            />
          </div>

          <div className={s.connecting__smartwatchWrapper} ref={(c) => { this.smartwatch = c; }}>
            {plus('smartwatch')}

            <img
              src={require('!file-loader!assets/images/5g/connecting/smartwatch.svg')}
              className={s.connecting__smartwatch}
              alt=""
            />
          </div>

          <img
            src={require('!file-loader!assets/images/5g/connecting/drone.svg')}
            className={s.connecting__drone}
            ref={(c) => { this.drone = c; }}
            alt=""
          />

          <div className={s.connecting__carWrapper} ref={(c) => { this.car = c; }}>
            {plus('car')}

            <img
              src={require('!file-loader!assets/images/5g/connecting/car.svg')}
              className={s.connecting__car}
              alt=""
            />
          </div>

          <img
            src={require('!file-loader!assets/images/5g/connecting/city.svg')}
            className={s.connecting__city}
            ref={(c) => { this.city = c; }}
            alt=""
          />
        </div> */}
      </div>
    );
  }
}
