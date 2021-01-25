import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineMax, TweenLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';
import config from 'utils/config';
import rdm from 'utils/random';

import Illustration from './Illustration';
import Dots from './Dots';
import Lines from './Lines';
import s from './Carousel.scss';

export default class Carousel extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);

    this.showGsapTools = config('gsapDevtools');
    this.length = props.children.length;
    this.state = { active: 1 };
  }

  componentDidMount() {
    this.animate();
    this.carousel.tweenTo('slide-1');
    this.registerGSDevTools();
  }

  registerGSDevTools = () => {
    if (this.showGsapTools) {
      this.gsapCheck = setInterval(() => {
        if (GSDevTools) {
          GSDevTools.create({
            globalSync: false,
            animation: this.carousel,
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

  onClick = () => {
    const { active } = this.state;
    const newActive = active === this.length ? 1 : active + 1;
    const isRestart = newActive === 1;

    if (isRestart) {
      this.carousel.seek(0).tweenTo('slide-1');
    } else {
      this.lines.animate();
      this.carousel.tweenTo(`slide-${newActive}`);
    }

    this.setState({ active: newActive });
  }

  animate = () => {
    const timeline = new TimelineMax({ paused: true, id: 'wireless-industry carousel' });
    const isMobile = window.matchMedia('(max-width: 1079px)').matches;

    const enter = 1.5;
    const ease = 'Power4.easeInOut';
    const easeOut = 'Power4.easeOut';

    this.movingDots();

    timeline.fromTo(
      this.svg,
      enter,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
    );

    timeline.fromTo(
      this.msg,
      enter,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
    );

    timeline.addLabel('slide-1');

    timeline.to(
      this.svg,
      enter,
      { autoAlpha: 0, x: '-80%', ease: easeOut },
    );

    timeline.fromTo(
      this.illu3,
      enter,
      { scale: 0, y: '-50%', x: isMobile ? '-50%' : 0 },
      { scale: 1, ease },
      'slide-1',
    );

    timeline.addLabel('slide-2');

    timeline.to(
      this.illu3,
      enter,
      { scale: 0, y: '-50%', ease: easeOut },
    );

    timeline.fromTo(
      this.illu4,
      enter,
      { x: '100%' },
      { x: '0%', ease },
      'slide-2',
    );

    timeline.fromTo(
      this.illu5,
      enter / 2,
      { x: '100%' },
      { x: '78.12%', ease: easeOut },
      `slide-2+=${enter * 0.575}`,
    );

    timeline.addLabel('slide-3');

    timeline.to(
      this.illu4,
      enter,
      { x: '-78.12%', ease },
    );

    timeline.to(
      this.illu5,
      enter,
      { x: '0%', ease },
      'slide-3',
    );

    timeline.addLabel('slide-4');

    timeline.to(
      this.illu4,
      enter,
      { x: '-100%', ease },
    );

    timeline.to(
      this.illu5,
      enter,
      { x: '-100%', ease },
      'slide-4',
    );

    timeline.fromTo(
      this.illu6,
      enter,
      { autoAlpha: 0, x: '20%' },
      { autoAlpha: 1, x: isMobile ? '-50%' : '0%', ease },
      `slide-4+=${enter * 0.2}`,
    );

    timeline.addLabel('slide-5');

    this.carousel = timeline;
  }

  movingDots = () => {
    if (!this.dots) {
      return;
    }

    Array.from(this.dots.childNodes).forEach((d) => {
      TweenLite.to(
        d,
        0.85,
        {
          x: rdm(-12, 12),
          y: rdm(-12, 12),
          ease: 'Sine.easeInOut',
          onComplete: this.movingDots,
        },
      );
    });
  }

  render() {
    const { children } = this.props;
    const { active } = this.state;

    return (
      <div className={s.carousel}>
        <div className={s.carousel__timeline}>
          <Illustration
            className={s.carousel__illu1}
            svgRef={(c) => { this.svg = c; }}
            msgRef={(c) => { this.msg = c; }}
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/wireless-works/illu-3.svg')}
            className={s.carousel__illu3}
            ref={(c) => { this.illu3 = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/wireless-works/illu-4.svg')}
            className={s.carousel__illu4}
            ref={(c) => { this.illu4 = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/wireless-works/illu-5.svg')}
            className={s.carousel__illu5}
            ref={(c) => { this.illu5 = c; }}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/wireless-works/illu-6.svg')}
            className={s.carousel__illu6}
            ref={(c) => { this.illu6 = c; }}
            alt=""
          />

          <Dots
            className={s.carousel__dots}
            internalRef={(c) => { this.dots = c; }}
          />

          <Lines
            className={s.carousel__lines}
            ref={(c) => { this.lines = c; }}
          />
        </div>

        <div className={s.carousel__container}>
          <div className={s.carousel__row}>
            <div className={s.carousel__col}>
              <div className={s.carousel__wrapper}>
                <TransitionGroup>
                  {Children.map(children, (c, i) => {
                    if (i + 1 === active) {
                      return cloneElement(c, {
                        index: i + 1,
                        length: this.length,
                        onClick: this.onClick,
                      });
                    }

                    return null;
                  })}
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
