import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Subheading.scss';

export default class Subheading extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
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

    t.fromTo(
      this.subheading,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
    );
  }

  render() {
    const { text, hasAnimation } = this.props;

    return (
      <div className={s(s.subheading, { hasAnimation })}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.subheading__container}>
          <div className={s.subheading__row}>
            <div className={s.subheading__col}>
              <h2
                className={s.subheading__content}
                ref={(c) => { this.subheading = c; }}
              >
                {text}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
