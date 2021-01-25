import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Label.scss';

export default class Label extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    enableAnim: PropTypes.bool,
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
    if (!this.label) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.delay(0.3);

    timeline.fromTo(
      this.label,
      0.4, // 1.2,
      { opacity: 0 },
      { opacity: 1, ease },
    );

    return timeline;
  }

  render() {
    const { children, isLoading, enableAnim } = this.props;

    return (
      <h2
        className={s(s.label, { isLoading, enableAnim })}
        ref={(c) => { this.label = c; }}
      >
        {children}
      </h2>
    );
  }
}
