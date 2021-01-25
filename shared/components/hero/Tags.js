import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Tags.scss';

export default class Tags extends PureComponent {

  static propTypes = {
    tags: PropTypes.node,
    center: PropTypes.bool,
    enableAnim: PropTypes.bool,
  }

  componentDidMount() {
    const { enableAnim } = this.props;

    if (enableAnim) {
      this.animate();
    }
  }

  animate = () => {
    if (!this.tags) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.delay(0.3);

    timeline.fromTo(
      this.tags,
      0.4, // 1.2,
      { opacity: 0 },
      { opacity: 1, ease },
    );

    return timeline;
  }

  render() {
    const { tags, center, enableAnim } = this.props;

    return (
      <ul
        className={s(s.tags, { center, enableAnim })}
        ref={(c) => { this.tags = c; }}
      >
        {tags.map((tag, i) => (
          <li className={s.tags__tag} key={i}>{tag}</li>
        ))}
      </ul>
    );
  }
}
