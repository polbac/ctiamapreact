import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import { Number } from 'components/assets';

import s from './Heading.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    nbr: PropTypes.number,
    dot: PropTypes.string,
    small: PropTypes.bool,
    icon: PropTypes.object,
    className: PropTypes.string,
    hasAnimation: PropTypes.bool,
  }

  static defaultProps = {
    text: undefined,
    hasAnimation: true,
  }

  state = {
    isAnimationComplete: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { hasAnimation } = this.props;
    const { isAnimationComplete } = this.state;

    if (!hasAnimation) {
      return;
    }

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.addLabel('start');

    if (this.number) {
      t.fromTo(
        this.number,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    if (this.icon) {
      t.fromTo(
        this.icon,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    t.fromTo(
      this.heading,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      this.number ? 'start+=.1' : '',
    );
  }

  render() {
    const { text, nbr, dot: dotColor, small, icon, className, hasAnimation } = this.props;
    const dot = dotColor && <span className={s(s.heading__dot, dotColor)}>.</span>;

    return (
      <div className={s(s.heading, className, { small, hasAnimation })}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.heading__container}>
          <div className={s.heading__row}>
            <div className={s.heading__col}>
              {nbr && (
                <div className={s.heading__number} ref={(c) => { this.number = c; }}>
                  <Number
                    className={s.heading__svg}
                    colors="green-blue"
                  >
                    {nbr}
                  </Number>
                </div>
              )}

              {icon && (
                <div className={s.heading__icon} ref={(c) => { this.icon = c; }}>
                  {icon}
                </div>
              )}

              <h1 className={s.heading__content} ref={(c) => { this.heading = c; }}>
                {text}{dot}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
