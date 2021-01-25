import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Copy.scss';

export default class Copy extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    enableAnim: PropTypes.bool,
    isInversed: PropTypes.bool,
  }

  componentDidMount() {
    const { isLoading, enableAnim } = this.props;

    if (isLoading) {
      return;
    }

    if (enableAnim) {
      this.animate();
    }
  }

  animate = () => {
    if (!this.copy) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.delay(0.3);

    timeline.fromTo(
      this.copy,
      0.4, // 1.2,
      { opacity: 0 },
      { opacity: 1, ease },
    );

    return timeline;
  }

  render() {
    const { children, isLoading, enableAnim, isInversed } = this.props;

    return (
      <p
        className={s(s.copy, { isLoading, enableAnim, isInversed })}
        ref={(c) => { this.copy = c; }}
      >
        {children}
      </p>
    );
  }
}
