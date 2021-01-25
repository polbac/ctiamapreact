import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Column.scss';

export default class Column extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string,
    isOpen: PropTypes.bool,
  }

  get animate() {
    const t = new TimelineLite();
    const ease = 'Power4.easeOut';

    t.staggerFromTo(
      [this.image, this.heading, this.copy],
      0.85,
      { autoAlpha: 0, x: -40 },
      { autoAlpha: 1, x: 0, ease },
      0.15,
    );

    return t;
  }

  render() {
    const { heading, copy, className, image, isOpen } = this.props;

    return (
      <div className={s(s.column, className, { isOpen })}>
        <img
          className={s.column__image}
          src={image}
          alt={heading}
          ref={(c) => { this.image = c; }}
        />

        <h3
          className={s.column__heading}
          ref={(c) => { this.heading = c; }}
        >
          {heading}
        </h3>

        <p
          className={s.column__copy}
          ref={(c) => { this.copy = c; }}
        >
          {copy}
        </p>
      </div>
    );
  }
}
