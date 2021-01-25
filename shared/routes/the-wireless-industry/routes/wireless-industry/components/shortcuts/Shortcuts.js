import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './Shortcuts.scss';

import Shortcut from './Shortcut';

export default class Shortcuts extends PureComponent {

  static propTypes = {
    headings: PropTypes.array,
  }

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
    const ease = 'Power4.easeOut';

    t.staggerFromTo(
      [
        this.shortcut1,
        this.shortcut2,
        this.shortcut3,
        this.shortcut4,
        this.shortcut5,
        this.shortcut6,
      ],
      1,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.3,
    );
  }

  render() {
    const { headings } = this.props;

    return (
      <div className={s.shortcuts}>
        <Waypoint
          topOffset="65%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.shortcuts__container}>
          <div className={s.shortcuts__row}>
            <div className={s.shortcuts__col}>
              <Shortcut
                title={headings[0]}
                altText="first mobile phone"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/firsts.svg')}
                internalRef={(c) => { this.shortcut1 = c; }}
                id="section-1"
              />

              <Shortcut
                title={headings[4]}
                altText="price tags"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/competitive.svg')}
                internalRef={(c) => { this.shortcut2 = c; }}
                id="section-5"
              />
            </div>

            <div className={s.shortcuts__col}>
              <Shortcut
                title={headings[2]}
                altText="radio waveform"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/works.svg')}
                internalRef={(c) => { this.shortcut3 = c; }}
                id="section-3"
              />

              <Shortcut
                title={headings[3]}
                altText="utility worker"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/driver.svg')}
                internalRef={(c) => { this.shortcut4 = c; }}
                id="section-4"
              />
            </div>

            <div className={s.shortcuts__col}>
              <Shortcut
                title={headings[1]}
                altText="person using mobile device"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/consumer.svg')}
                internalRef={(c) => { this.shortcut5 = c; }}
                id="section-2"
              />
            </div>

            <div className={s.shortcuts__col}>
              <Shortcut
                title={headings[5]}
                altText="innovative device"
                image={require('!file-loader!assets/images/wireless-industry/shortcuts/innovation.svg')}
                internalRef={(c) => { this.shortcut6 = c; }}
                id="section-6"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
