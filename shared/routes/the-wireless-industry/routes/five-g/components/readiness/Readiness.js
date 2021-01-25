import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { TimelineLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';

import Portal, { Modal } from 'components/portal';
import CountryModal from './Modal';

import Country from './Country';
import s from './Readiness.scss';

export default class Readiness extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    chart: PropTypes.arrayOf(PropTypes.object),
    finishLine: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  state = {
    isAnimationComplete: false,
    activeCountry: 0,
    isVisible: false,
  }

  countries = []

  onPositionChange = ({ currentPosition }) => {
    const { isAnimationComplete } = this.state;

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeOut';
    const bubbles = this.list.childNodes;
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    if (isMobile) {
      timeline.set(
        this.race,
        { autoAlpha: 1, y: 0 },
      );

      timeline.set(
        bubbles,
        { scale: 1 },
      );

      return;
    }

    timeline.addLabel('start');

    timeline.fromTo(
      this.race,
      1,
      { autoAlpha: 0, y: 120 },
      { autoAlpha: 1, y: 0, ease },
    );

    timeline.staggerFromTo(
      bubbles,
      0.8,
      { scale: 0.7, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1 },
      0.175,
      'start=+.25',
    );
  }

  toggle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  openCountry = (id) => {
    this.setState({ activeCountry: id });
    this.toggle();
  }

  render() {
    const { children, chart, title, finishLine } = this.props;
    const { activeCountry, isVisible } = this.state;

    return (
      <div className={s.readiness}>
        {children}

        <div className={s.readiness__container}>
          <div className={s.readiness__row}>
            <div className={s.readiness__col}>
              <Waypoint
                topOffset="65%"
                onPositionChange={this.onPositionChange}
              />

              <div className={s.readiness__content}>
                <div
                  className={s.readiness__list}
                  ref={(el) => { this.list = el; }}
                >
                  {chart.map(({ position, flag, name, highlighted, framed }, i) => (
                    <Country
                      key={`${position}_${i}`}
                      index={i}
                      position={position}
                      framed={framed}
                      highlighted={highlighted}
                      name={name}
                      flag={flag}
                      openCountry={this.openCountry}
                    />
                  ))}
                </div>

                <div
                  className={s.readiness__race}
                  ref={(el) => { this.race = el; }}
                >
                  <span className={s.readiness__endline}>
                    {title}
                  </span>

                  <img
                    src={finishLine}
                    className={s.readiness__raceFlag}
                    alt=""
                  />
                </div>

                {/* <p className={s.readiness__hint}>Select a country to see more</p> */}
              </div>
            </div>
          </div>
        </div>

        <Portal>
          <TransitionGroup>
            {isVisible && (
              <Modal
                onClick={this.toggle}
                ref={(el) => { this.modal = el; }}
              >
                <CountryModal
                  activeCountry={activeCountry}
                  chart={chart}
                />
              </Modal>
            )}
          </TransitionGroup>
        </Portal>
      </div>
    );
  }
}
