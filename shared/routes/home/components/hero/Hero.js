import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { assets } from 'utils/themes';

import { Number } from 'components/assets';

import s from './Hero.scss';

const DURATION = 8000;

export default class Hero extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    tabIndex: PropTypes.number,
    handleHeroButton: PropTypes.func,
    slideLinks: PropTypes.array,
  }

  state = { active: 0 }

  progress = []

  componentDidMount() {
    this.onSwitch(this.state.active);
  }

  componentWillUnount() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }

  onSwitch = (index) => {
    const isActive = this.progress.filter(p => p !== null).length > 0;

    if (!isActive) {
      return;
    }

    this.setState({ active: index });

    const timeline = new TimelineLite();
    const { length } = this.props.children;

    const inactive = this.progress.filter((_, i) => i !== index);
    const active = this.progress.find((_, i) => i === index);

    timeline.set(
      inactive,
      { width: '0%' },
    );

    timeline.fromTo(
      active,
      DURATION / 1000,
      { width: '0%' },
      { width: '100%', ease: 'linear' },
    );

    timeline.call(() => {
      const newIndex = index === length - 1 ? 0 : index + 1;

      this.onSwitch(newIndex);
    });

    this.timeline = timeline;
  }

  onClick = (index) => {
    if (this.timeline) {
      this.timeline.kill();
    }

    this.onSwitch(index);
  }

  handleArrow = (direction) => {
    const { active } = this.state;
    const { length } = this.props.children;
    const isNext = direction === 'right';

    let newIndex;

    if (isNext) {
      newIndex = active === length - 1 ? length - 1 : active + 1;
    } else {
      newIndex = active === 0 ? 0 : active - 1;
    }

    this.timeline.kill();
    this.onSwitch(newIndex);
  }

  get slideBar() {
    const { children } = this.props;

    return Children.map(children, c => ({ ...c.props }));
  }

  render() {
    const { children, tabIndex, slideLinks, handleHeroButton } = this.props;
    const { active } = this.state;

    return (
      <div className={s.hero}>
        {Children.map(children, (c, i) => {
          if (i === active) {
            return c;
          }

          return null;
        })}

        <div className={s.hero__bar}>
          <div className={s.hero__container} role="tablist">
            <div className={s.hero__content}>
              {this.slideBar.map((d, i) => (
                <button
                  id={d.buttonId}
                  role="tab"
                  className={s(s.hero__item, { active: i === active })}
                  onClick={() => this.onClick(i)}
                  key={`data-item-${i + 1}`}
                  tabIndex={tabIndex + (i + 1)}
                  onKeyUp={e => handleHeroButton(e, d)}
                >
                  <p className={s.hero__label}>{d.label}</p>
                  <h3 className={s.hero__heading}>{d.heading}</h3>
                  <Number className={s.hero__svg} colors={assets(d.graphics)}>{i + 1}</Number>

                  <span
                    ref={(c) => { this.progress[i] = c; }}
                    className={s.hero__progress}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={s.hero__arrows}>
          <div className={s.hero__container}>
            <div className={s.hero__arrow}>
              <button
                className={s(s.hero__arrowLeft, { enable: active > 0 })}
                onClick={() => this.handleArrow('left')}
                aria-label="arrow left"
              >
                <img
                  className={s.hero__icon}
                  src={require('!file-loader!assets/images/icons/arrow.svg')}
                  alt="Arrow left"
                />
              </button>

              <button
                className={s(s.hero__arrowRight, { enable: active < children.length - 1 })}
                onClick={() => this.handleArrow('right')}
                aria-label="arrow right"
              >
                <img
                  className={s.hero__icon}
                  src={require('!file-loader!assets/images/icons/arrow.svg')}
                  alt="Arrow right"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
