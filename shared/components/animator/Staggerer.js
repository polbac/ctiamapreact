import React, { PureComponent, Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Staggerer.scss';

export default class Staggerer extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  blocks = []

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
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.staggerFromTo(
      this.blocks,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
    );
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />
        {Children.map(children, (c, i) => cloneElement(c, {
          internalRef: (el) => { this.blocks[i] = el; },
          className: s.staggerer__block,
        }))}
      </Fragment>
    );
  }
}
