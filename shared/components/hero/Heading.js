import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';

import s from './Heading.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    full: PropTypes.bool,
    isLoading: PropTypes.bool,
    color: PropTypes.string,
    enableAnim: PropTypes.bool,
    isInversed: PropTypes.bool,
  }

  word = []

  componentDidMount() {
    const { isLoading, enableAnim, isInversed } = this.props;

    if (isLoading || !enableAnim) {
      return;
    }

    setTimeout(() => {
      this.onResize();
      this.animate();
    }, 100);

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    if (this.isAnimationComplete) {
      TweenLite.set(
        this.heading,
        { backgroundPositionX: `${this.maskOffset()}px` },
      );
    } else {
      this.lines();
      this.maskOffset();
    }
  }

  lines = () => {
    if (!this.heading) {
      return;
    }

    const { offsetHeight: h } = this.heading;
    const { offsetHeight: lh } = this.word[0];

    return Math.round(h / lh);
  }

  maskOffset = () => {
    if (!this.heading) {
      return;
    }

    const { offsetWidth } = this.heading;
    const offset = (offsetWidth * this.lines()) + 10;

    return offset;
  }

  animate = () => {
    if (!this.heading || this.isAnimationComplete) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    const duration = 0.4;

    /*
    let duration;

    if (this.lines() === 1) {
      duration = 0.4;
    } else if (this.lines() === 2) {
      duration = 1.2;
    } else if (this.lines() === 3) {
      duration = 1.2;
    } else {
      duration = 0.8;
    } */

    timeline
      .addLabel('start')
      .fromTo(
        this.heading,
        duration,
        { backgroundPositionX: `-${this.maskOffset()}px` },
        { backgroundPositionX: '0vw', ease },
      )
      .staggerFromTo(
        this.word,
        duration * (1 / 3),
        { opacity: 0 },
        { opacity: 1 },
        0.05,
        `-=${duration * (1 / 3)}`,
      )
      .fromTo(
        this.dot,
        duration * (1 / 3),
        { opacity: 0 },
        { opacity: 1 },
        `-=${duration * (1 / 3)}`,
      )
      .to(
        this.heading,
        duration * (2 / 3),
        { backgroundPositionX: `${this.maskOffset()}px` },
        `-=${duration * (1 / 3)}`,
      )
      .call(() => {
        this.isAnimationComplete = true;
      });

    return timeline;
  }

  render() {
    const { children, full, isLoading, color, enableAnim, isInversed } = this.props;
    const words = Children.map(children, c => c.split(' '));

    return (
      <h1 className={s(s.heading, color, { full, isLoading, enableAnim, isInversed })}>
        <span
          className={s.heading__wrapper}
          ref={(el) => { this.heading = el; }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={s.heading__word}
              ref={(el) => { this.word[i] = el; }}
            >
              {`${word} `}
              {i === words.length - 1 && (
                <span ref={(el) => { this.dot = el; }} className={s.heading__dot}>.</span>
              )}
            </span>
          ))}
        </span>
      </h1>
    );
  }
}
