import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
// import config from 'utils/config';

import ArrowScroll from 'components/arrow-scroll';

import Heading from './Heading';
import Lamp from './Lamp';
import s from './Hero.scss';

const lamps = [
  { color: 'green', src: require('!file-loader!assets/images/wireless-industry/hero/lamp-1.svg') },
  { color: 'blue', src: require('!file-loader!assets/images/wireless-industry/hero/lamp-2.svg') },
  { color: 'orange', src: require('!file-loader!assets/images/wireless-industry/hero/lamp-3.svg') },
  { color: 'greenn', src: require('!file-loader!assets/images/wireless-industry/hero/lamp-4.svg') },
];

export default class Hero extends PureComponent {

  static propTypes = {
    subheading: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.showGsapTools = false; // config('gsapDevtools');
    this.lamps = [];
    this.state = { isMobile: false };
  }

  componentDidMount() {
    this.animation();

    if (this.showGsapTools) {
      this.gsapCheck = setInterval(() => {
        if (GSDevTools) {
          GSDevTools.create({
            globalSync: false,
            animation: this.timeline,
            hideGlobalTimeline: true,
            css: { position: 'fixed', zIndex: 9999 },
          });

          clearInterval(this.gsapCheck);
        }
      }, 200);
    }
  }

  componentWillUnmount() {
    if (this.showGsapTools) {
      clearInterval(this.gsapCheck);
    }
  }

  animation = () => {
    const { isMobile } = this.state;

    if (isMobile) {
      return;
    }

    const timeline = new TimelineLite({ id: 'wireless-industry hero' });
    const ease = 'Power4.easeOut';
    const duration = 2;

    timeline.addLabel('start');

    timeline.fromTo(
      this.map,
      duration,
      {
        autoAlpha: 0,
        rotationX: 45,
        x: '-5%',
      },
      {
        autoAlpha: 1,
        rotationX: 0,
        ease,
      },
    );

    timeline.fromTo(
      this.alaska,
      duration / 2,
      { autoAlpha: 0, y: -60 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.55',
    );

    timeline.fromTo(
      this.hawaii,
      duration / 2,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.55',
    );

    timeline.fromTo(
      this.mapGradient,
      duration,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
      'start+=.75',
    );

    timeline.fromTo(
      this.mapMask,
      duration,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
      'start+=.75',
    );

    timeline.staggerFromTo(
      [this.cloud1, this.cloud2, this.cloud3],
      6,
      { x: -200 },
      { x: 150, ease },
      0.015,
      'start',
    );

    timeline.staggerFromTo(
      [this.cloud1, this.cloud2, this.cloud3],
      duration / 1.5,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
      0.015,
      'start',
    );

    timeline.fromTo(
      this.streak,
      duration,
      { x: '-100%' },
      { x: '100%', ease },
      'start+=.5',
    );

    timeline.add(this.heading.timeline, 'start+=.65');

    timeline.fromTo(
      this.scroll,
      0.65,
      { autoAlpha: 0, y: -40, zIndex: 5 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.85',
    );

    this.lamps.forEach((l, i) => timeline.add(l.timeline, `start+=${0.8 + (i * 0.075)}`));

    this.timeline = timeline;
    return timeline;
  }

  render() {
    const { subheading } = this.props;

    return (
      <div className={s.hero}>
        <img
          src={require('!file-loader!assets/images/5g/hero/streak.svg')}
          className={s.hero__streak}
          ref={(c) => { this.streak = c; }}
          alt=""
        />

        <Heading
          className={s.hero__heading}
          ref={(c) => { this.heading = c; }}
          subheading={subheading}
        />

        <ArrowScroll internalRef={(c) => { this.scroll = c; }} />

        <img
          className={s.hero__cloud1}
          src={require('!file-loader!assets/images/wireless-industry/hero/cloud.svg')}
          ref={(c) => { this.cloud1 = c; }}
          alt=""
        />

        <img
          className={s.hero__cloud2}
          src={require('!file-loader!assets/images/wireless-industry/hero/cloud.svg')}
          ref={(c) => { this.cloud2 = c; }}
          alt=""
        />

        <img
          className={s.hero__cloud3}
          src={require('!file-loader!assets/images/wireless-industry/hero/cloud.svg')}
          ref={(c) => { this.cloud3 = c; }}
          alt=""
        />

        <div className={s.hero__mapWrapper}>
          {lamps.map((l, i) => (
            <Lamp
              key={i}
              ref={(c) => { this.lamps[i] = c; }}
              index={i + 1}
              src={l.src}
              color={l.color}
            />
          ))}

          <img
            src={require('!file-loader!assets/images/wireless-industry/hero/map.svg')}
            className={s.hero__map}
            ref={(c) => { this.map = c; }}
            alt=""
          />

          <div className={s.hero__container}>
            <div className={s.hero__row}>
              <div className={s.hero__col}>
                <div className={s.hero__wrapper}>
                  <img
                    src={require('!file-loader!assets/images/wireless-industry/hero/alaska.svg')}
                    className={s.hero__alaska}
                    ref={(c) => { this.alaska = c; }}
                    alt=""
                  />

                  <img
                    src={require('!file-loader!assets/images/wireless-industry/hero/hawaii.svg')}
                    className={s.hero__hawaii}
                    ref={(c) => { this.hawaii = c; }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={s.hero__mapMask}
            ref={(c) => { this.mapMask = c; }}
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/hero/map-gradient.svg')}
            className={s.hero__mapGradient}
            ref={(c) => { this.mapGradient = c; }}
            alt=""
          />
        </div>
      </div>
    );
  }
}
