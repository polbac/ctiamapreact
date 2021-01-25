import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import { Icon } from 'components/assets';

import s from './Meta.scss';

export default class Meta extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    date: PropTypes.string,
    center: PropTypes.bool,
    enableAnim: PropTypes.bool,
    isInversed: PropTypes.bool,
  }

  componentDidMount() {
    const { enableAnim } = this.props;

    if (enableAnim) {
      this.animate();
    }
  }

  animate = () => {
    if (!this.meta) {
      return;
    }

    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.delay(0.3);

    timeline.fromTo(
      this.meta,
      0.4, // 1.2,
      { opacity: 0 },
      { opacity: 1, ease },
    );

    return timeline;
  }

  render() {
    const { type, date, center, enableAnim, isInversed } = this.props;

    return (
      <div
        className={s(s.meta, { center, enableAnim, isInversed })}
        ref={(c) => { this.meta = c; }}
      >
        <Icon className={s(s.meta__icon, { isInversed })} type={type} />
        {type && (<p className={s.meta__title}>{type}</p>)}
        <p className={s.meta__date}>{date}</p>
      </div>
    );
  }
}
