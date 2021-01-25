import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Animator.scss';

export default class Animator extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    hasAnimation: PropTypes.bool,
    width: PropTypes.string,
  }

  static defaultProps = {
    hasAnimation: true,
    width: 'auto',
  }

  state = {
    isAnimationComplete: false,
  };

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

    if (!this.animator) {
      return;
    }

    t.fromTo(
      this.animator,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
    );
  }

  render() {
    const { children, hasAnimation, width } = this.props;
    const style = { width };

    return (
      <div
        className={s(s.animator, { hasAnimation })}
        ref={(c) => { this.animator = c; }}
        style={style}
      >
        {hasAnimation && (
          <Waypoint
            topOffset="95%"
            onPositionChange={this.onPositionChange}
          />
        )}
        <Fragment>
          {children}
        </Fragment>
      </div>
    );
  }
}
