import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './ConnectingCards.scss';

export default class ConnectingCards extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  blocks = [];

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
      0.85,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.25,
    );
  }

  render() {
    const { children } = this.props;
    const { length } = children;

    return (
      <div className={s.connectingCards}>
        <Waypoint
          topOffset="90%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.connectingCards__container}>
          <div className={s.connectingCards__row}>
            <div className={s(s.connectingCards__wrapper, `width-${length}`)}>
              {Children.map(children, (c, i) => cloneElement(c, {
                internalRef: (el) => { this.blocks[i] = el; },
                className: s.connectingCards__block,
              }))}
            </div>
          </div>
        </div>

        <img
          src={require('!file-loader!assets/images/5g/connecting/04-City_1x.jpg')}
          className={s.connectingCards__bottomIllu}
          ref={(c) => { this.bottomIllu = c; }}
          alt=""
        />

      </div>
    );
  }
}
