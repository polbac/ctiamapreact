import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import range from 'lodash/range';

import s from './Lamp.scss';

export default class Lamp extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    src: PropTypes.string,
    color: PropTypes.string,
  }

  get timeline() {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.fromTo(
      this.lamp,
      0.4,
      { autoAlpha: 0, y: -40 },
      { autoAlpha: 1, y: 0, ease },
    );

    return timeline;
  }

  render() {
    const { className, index, src, color } = this.props;

    return (
      <div
        className={s(s.lamp, `lamp-${index}`, `color-${color}`, className)}
        ref={(c) => { this.lamp = c; }}
      >
        <img
          src={src}
          className={s.lamp__src}
          alt=""
        />

        <div className={s.lamp__circles}>
          {range(0, 4).map((_, i) => (
            <div
              className={s(s.lamp__circle, `circle-${i + 1}`)}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}
