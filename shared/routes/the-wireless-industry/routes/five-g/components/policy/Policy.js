import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Waypoint from 'react-waypoint';
import { TimelineLite } from 'gsap';

import Arrow from 'assets/images/icons/arrow-link.svg';

// import { Number } from 'components/assets';

import s from './Policy.scss';

export default class Policy extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    number: PropTypes.number,
    title: PropTypes.string,
    colors: PropTypes.string,
    link: PropTypes.string,
    alignment: PropTypes.oneOf(['top', 'center', 'bottom']),
    children: PropTypes.node,
  }

  static defaultProps = {
    alignment: 'center',
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
    const ease = 'Power4.easeInOut';
    const detailsEl = this.details.childNodes;

    t.fromTo(
      this.details,
      0.4,
      { autoAlpha: 0, y: '10%' },
      { autoAlpha: 1, y: '0%', ease },
    ).staggerFromTo(
      detailsEl,
      0.6,
      { autoAlpha: 0, y: '8%' },
      { autoAlpha: 1, y: '0%', ease },
      0.15,
    );
  }

  render() {
    const { number, title, text, colors, link, alignment, children } = this.props;

    return (
      <div className={s.policy}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.policy__container}>
          <div className={s.policy__row}>
            <div className={s.policy__col}>
              <div className={s.policy__content} ref={(el) => { this.details = el; }}>
                <div className={s.policy__number}>
                  {/* <Number
                    className={s.policy__numberSvg}
                    colors={colors}
                  >
                    {number}
                  </Number> */}
                  {number < 10 ? `0${number}` : number}
                </div>

                <h2 className={s.policy__heading}>{title}</h2>
                <div className={s.policy__copy}>{text}</div>

                {link && (
                  <div className={s.policy__cta}>
                    <Link to={link} className={s.policy__link}>
                      <Arrow className={s.policy__linkIcon} />
                      <span>Learn More</span>
                    </Link>
                  </div>
                )}

                <div className={s(s.policy__image, alignment)}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
