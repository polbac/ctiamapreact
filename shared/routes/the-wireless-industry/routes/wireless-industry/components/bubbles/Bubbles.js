import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Bubbles.scss';

export default class Bubbles extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    copy: PropTypes.string,
  }

  bubbles = []
  contents = []

  state = {
    isAnimationComplete: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { isAnimationComplete } = this.state;

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.addLabel('start');

    timeline.fromTo(
      this.header,
      1,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, ease },
    );

    timeline.staggerFromTo(
      this.bubbles,
      1,
      { scale: 0 },
      { scale: 1, ease },
      0.1,
      'start+=.2',
    );

    timeline.staggerFromTo(
      this.contents,
      1,
      { autoAlpha: 0, y: -80 },
      { autoAlpha: 1, y: 0, ease },
      0.125,
      'start+=.6',
    );
  }

  render() {
    const { children, heading, copy } = this.props;

    return (
      <div className={s.bubbles}>
        <Waypoint
          topOffset="65%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.bubbles__container}>
          <div className={s.bubbles__row}>
            <div className={s.bubbles__header} ref={(c) => { this.header = c; }}>
              <h3 className={s.bubbles__heading}>{heading}</h3>
              <p className={s.bubbles__copy}>{copy}</p>
            </div>

            <div className={s.bubbles__col}>
              {Children.map(children, (c, i) => cloneElement(c, {
                index: i + 1,
                bubbleRef: (el) => { this.bubbles[i] = el; },
                contentRef: (el) => { this.contents[i] = el; },
              }))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
