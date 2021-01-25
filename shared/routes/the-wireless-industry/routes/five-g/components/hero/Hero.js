import React, { PureComponent } from 'react';
import { TimelineLite } from 'gsap';
import config from 'utils/config';

import ArrowScroll from 'components/arrow-scroll';

import s from './Hero.scss';

export default class Hero extends PureComponent {

  showGsapTools = config('gsapDevtools')
  state = { isMobile: false }

  componentDidMount() {
    setTimeout(() => {
      this.onResize();
      this.animation();
    }, 200);

    window.addEventListener('resize', this.onResize);

    if (this.showGsapTools) {
      this.gsapCheck = setInterval(() => {
        if (GSDevTools) {
          GSDevTools.create({
            globalSync: false,
            animation: this.timeline,
            css: { position: 'fixed', zIndex: 9999 },
          });

          clearInterval(this.gsapCheck);
        }
      }, 200);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    if (this.showGsapTools) {
      clearInterval(this.gsapCheck);
    }
  }

  onResize = () => {
    this.setState({ isMobile: window.matchMedia('(max-width: 1080px)').matches });
  }

  animation = () => {
    const { isMobile } = this.state;

    const timeline = new TimelineLite({ id: '5g hero' });
    const ease = 'Power4.easeOut';
    const duration = 2;

    timeline.addLabel('start');

    timeline.fromTo(
      this.heroGradient,
      duration * 2,
      {
        attr: { x1: 1440, x2: 2880 },
      },
      {
        attr: { x1: -1440, x2: 1 },
      },
    );

    // timeline.fromTo(
    //   this.cityBack,
    //   duration / 1.15,
    //   {
    //     x: 300,
    //     y: 150,
    //     scale: 4,
    //     opacity: 0,
    //   },
    //   {
    //     x: 0,
    //     y: 0,
    //     scale: 1,
    //     opacity: 1,
    //     ease,
    //   },
    // );

    // timeline.fromTo(
    //   this.cityFront,
    //   duration / 1.15,
    //   {
    //     x: 150,
    //     y: 75,
    //     scale: 4,
    //     opacity: 0,
    //   },
    //   {
    //     x: 0,
    //     y: 0,
    //     scale: 1,
    //     opacity: 1,
    //     ease,
    //   },
    //   'start+=.25',
    // );

    // if (!isMobile) {
    //   timeline.fromTo(
    //     this.streak,
    //     duration / 1.2,
    //     { x: '-100%' },
    //     { x: '100%', ease },
    //     'start+=.3',
    //   );
    // }

    // timeline.to(
    //   this.streakLeft,
    //   duration / 4,
    //   { opacity: 1 },
    //   'start+=.4',
    // );

    // timeline.staggerFromTo(
    //   [
    //     this.streakHeadingLeft3,
    //     this.streakHeadingLeft4,
    //   ],
    //   duration / 2,
    //   { drawSVG: '0% 0%', opacity: 1 },
    //   { drawSVG: '0% 100%', ease },
    //   0.125,
    //   'start+=.5',
    // );

    // timeline.staggerFromTo(
    //   [
    //     this.streakHeadingLeft1,
    //     this.streakHeadingLeft2,
    //     this.streakHeadingLeft5,
    //   ],
    //   duration / 2,
    //   {
    //     scale: 0,
    //     transformOrigin: '50% 50%',
    //     opacity: 1,
    //   },
    //   {
    //     scale: 1,
    //     ease,
    //   },
    //   0.125,
    //   'start+=.5',
    // );

    // timeline.fromTo(
    //   this.heading,
    //   duration / 1.5,
    //   { autoAlpha: 0 },
    //   { autoAlpha: 1, ease },
    //   'start+=.65',
    // );

    // timeline.to(
    //   this.streakRight,
    //   duration / 4,
    //   { opacity: 1 },
    //   'start+=.7',
    // );

    // timeline.staggerFromTo(
    //   [
    //     this.streakHeadingRight1,
    //     this.streakHeadingRight2,
    //   ],
    //   duration / 2,
    //   { drawSVG: '0% 0%', opacity: 1 },
    //   { drawSVG: '0% 100%', ease },
    //   0.125,
    //   'start+=.8',
    // );

    // timeline.staggerFromTo(
    //   [
    //     this.streakHeadingRight3,
    //     this.streakHeadingRight4,
    //     this.streakHeadingRight5,
    //     this.streakHeadingRight6,
    //   ],
    //   duration / 2,
    //   {
    //     scale: 0,
    //     transformOrigin: '50% 50%',
    //     opacity: 1,
    //   },
    //   {
    //     scale: 1,
    //     ease,
    //   },
    //   0.125,
    //   'start+=.8',
    // );

    // if (!isMobile) {
    //   timeline.fromTo(
    //     this.carLeft,
    //     duration,
    //     { x: '-100%' },
    //     { x: '0%', ease },
    //     'start+=.4',
    //   );
    // }

    // timeline.fromTo(
    //   this.manLeft,
    //   duration,
    //   { x: '-100%' },
    //   { x: '0%', ease },
    //   'start+=.6',
    // );

    // if (!isMobile) {
    //   timeline.fromTo(
    //     this.carRight,
    //     duration,
    //     { x: '100%' },
    //     { x: '0%', ease },
    //     'start+=.4',
    //   );
    // }

    // timeline.fromTo(
    //   this.womanRight,
    //   duration,
    //   { x: '150%' },
    //   { x: '0%', ease },
    //   'start+=.6',
    // );

    // if (!isMobile) {
    //   timeline.fromTo(
    //     this.drone,
    //     duration / 1.5,
    //     {
    //       right: '-25%',
    //       rotation: -25,
    //     },
    //     {
    //       right: '15%',
    //       rotation: 4,
    //       ease,
    //     },
    //     'start+=0.6',
    //   );

    //   timeline.fromTo(
    //     this.cloud,
    //     6,
    //     {
    //       right: '-25%',
    //     },
    //     {
    //       right: '8%',
    //       ease,
    //     },
    //     'start+=.4',
    //   );
    // }

    timeline.fromTo(
      this.button,
      duration / 2,
      {
        y: 300,
        x: '-50%',
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        ease,
      },
      'start+=.4',
    );

    this.timeline = timeline;
    return timeline;
  }

  render() {
    return (
      <div className={s.hero}>
        <div className={s.hero__container}>
          {/* <img
            src={require('!file-loader!assets/images/5g/hero/streak.svg')}
            className={s.hero__streak}
            ref={(c) => { this.streak = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/drone.svg')}
            className={s.hero__drone}
            ref={(c) => { this.drone = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/cloud.svg')}
            className={s.hero__cloud}
            ref={(c) => { this.cloud = c; }}
            alt=""
          />

          <svg
            viewBox="0 0 313.2 176.5"
            className={s.hero__streakHeadingLeft}
            ref={(c) => { this.streakLeft = c; }}
          >
            <path ref={(c) => { this.streakHeadingLeft1 = c; }} fill="#C6D3E0" d="M196,160.4c4.3,0,7.7,3.5,7.7,7.7s-3.5,7.7-7.7,7.7c-4.3,0-7.7-3.5-7.7-7.7C188.3,163.9,191.7,160.4,196,160.4z" />
            <path ref={(c) => { this.streakHeadingLeft2 = c; }} fill="#FA7A47" d="M300.4,93.5c7.1,0,12.8,5.8,12.8,12.9c0,7.1-5.8,12.8-12.9,12.8c-7.1,0-12.8-5.8-12.8-12.9 C287.5,99.2,293.3,93.5,300.4,93.5z" />
            <path ref={(c) => { this.streakHeadingLeft3 = c; }} fill="none" stroke="#C6D3E0" strokeWidth="20" strokeLinecap="round" strokeMiterlimit="10" d="M59.5,42.2c0,0,17.5-5.5,66-17.8s68.8-15,68.8-15" />
            <path ref={(c) => { this.streakHeadingLeft4 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" strokeMiterlimit="10" d="M15.5,109.4c0,0,60.3-23.9,139.3-42.1S294,43.6,294,43.6" />
            <path ref={(c) => { this.streakHeadingLeft5 = c; }} fill="#593C81" d="M15.5,93.9c8.6,0,15.5,6.9,15.5,15.5s-6.9,15.5-15.5,15.5S0,117.9,0,109.4S6.9,93.9,15.5,93.9L15.5,93.9z" />
          </svg>

          <img
            src={require('!file-loader!assets/images/5g/hero/heading.svg')}
            className={s.hero__heading}
            ref={(c) => { this.heading = c; }}
            alt=""
          />

          <svg
            viewBox="0 0 319.5 154.6"
            className={s.hero__streakHeadingRight}
            ref={(c) => { this.streakRight = c; }}
          >
            <path ref={(c) => { this.streakHeadingRight1 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeMiterlimit="10" d="M96.2,125.7c0,0,61.2-7.7,130.8-31.3" />
            <path ref={(c) => { this.streakHeadingRight2 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" strokeMiterlimit="10" d="M15,89.2c0,0,148.2-14.7,289.5-73.8" />
            <path ref={(c) => { this.streakHeadingRight3 = c; }} fill="#FA7A47" d="M75.7,1c3.7-2.1,8.4-0.8,10.5,2.9c2.1,3.7,0.8,8.4-2.9,10.5c-3.7,2.1-8.4,0.9-10.5-2.8C70.7,7.9,72,3.2,75.7,1z" />
            <path ref={(c) => { this.streakHeadingRight4 = c; }} fill="#D1E141" d="M182.6,140.2c3.7-2.1,8.4-0.9,10.5,2.8c2.1,3.7,0.9,8.4-2.8,10.5c-3.7,2.1-8.4,0.9-10.5-2.8C177.6,147.1,178.9,142.4,182.6,140.2z" />
            <path ref={(c) => { this.streakHeadingRight5 = c; }} fill="#78CDD1" d="M7.7,76.7c6.9-4,15.8-1.6,19.8,5.3c4,6.9,1.6,15.8-5.3,19.8c-6.9,4-15.8,1.6-19.8-5.3c0,0,0,0,0,0C-1.6,89.6,0.8,80.7,7.7,76.7z" />
            <path ref={(c) => { this.streakHeadingRight6 = c; }} fill="#78CDD1" d="M221.9,85.7c4.8-2.8,10.9-1.1,13.7,3.7s1.1,10.9-3.7,13.7s-10.9,1.1-13.7-3.7c0,0,0,0,0,0C215.5,94.5,217.1,88.4,221.9,85.7z" />
          </svg>

          <img
            src={require('!file-loader!assets/images/5g/hero/car-left.svg')}
            className={s.hero__carLeft}
            ref={(c) => { this.carLeft = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/man-left.svg')}
            className={s.hero__manLeft}
            ref={(c) => { this.manLeft = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/car-right.svg')}
            className={s.hero__carRight}
            ref={(c) => { this.carRight = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/woman-right.svg')}
            className={s.hero__womanRight}
            ref={(c) => { this.womanRight = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/city-front.svg')}
            className={s.hero__cityFront}
            ref={(c) => { this.cityFront = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/5g/hero/city-back.svg')}
            className={s.hero__cityBack}
            ref={(c) => { this.cityBack = c; }}
            alt=""
          /> */}

          {/* <img
            src={require('!file-loader!assets/images/5g/hero/00-Hero-BG_1x.jpg')}
            className={s.hero__background}
            alt=""
          /> */}

          <svg
            viewBox="0 0 1440 1024"
            xmlSpace="preserve"
            preserveAspectRatio="xMinYMax slice"
          >
            <defs>
              <mask id="heroMasker">
                <rect className="gradientBox" fill="url(#heroGradient)" x="0" y="0" width="1440" height="1024" />
              </mask>

              <pattern id="heroBG" patternUnits="userSpaceOnUse" width="1440" height="1024">
                <image xlinkHref={require('!file-loader!assets/images/5g/hero/00-Hero-BG_1x.jpg')} x="0" y="0" width="1440" height="1024" />
              </pattern>

              <linearGradient
                id="heroGradient"
                gradientUnits="userSpaceOnUse"
                x1="1440"
                y1="720"
                x2="2880"
                y2="720"
                ref={(c) => { this.heroGradient = c; }}
              >
                <stop offset="0" stopColor="#000000" />
                <stop offset="1" stopColor="#ffffff" />
              </linearGradient>

            </defs>

            <g mask="url(#heroMasker)">
              <rect width="1440" height="1024" x="0" y="0" fill="url(#heroBG)" />
            </g>
          </svg>

          <div className={s.hero__title}>
            The 5G Economy
            <ArrowScroll
              internalRef={(el) => { this.button = el; }}
              className={s.hero__arrow}
            />
          </div>


        </div>
      </div>
    );
  }
}
