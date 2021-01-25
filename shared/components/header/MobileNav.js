import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { TweenLite, TimelineLite } from 'gsap';
import { inject, observer } from 'mobx-react';
import _get from 'lodash/get';

import Arrow from 'assets/images/icons/icon-down-crop.svg';

import SideItem from './SideItem';

import s from './MobileNav.scss';

class MobileNav extends Component {

  static propTypes = {
    ui: PropTypes.object,
    children: PropTypes.node,
    showNav: PropTypes.bool,
  }

  expandable = []
  menu = []
  opened = []
  sizes = new Map()
  timelines = new Map()

  componentDidMount() {
    setTimeout(this.getHeights, 300);

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showNav === this.lastToggle) {
      return;
    }

    if (nextProps.showNav) {
      this.lastToggle = true;
      this.props.ui.isScrollDisabled = true;
      this.props.ui.isNavOpen = true;

      TweenLite.fromTo(
        this.nav,
        0.2,
        { y: -40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, pointerEvents: 'all' },
      );
    } else if (!nextProps.showNav) {
      this.lastToggle = false;
      this.props.ui.isScrollDisabled = false;
      this.props.ui.isNavOpen = false;

      TweenLite.to(
        this.nav,
        0.2,
        { y: -20, autoAlpha: 0, pointerEvents: 'none' },
      );
    }
  }

  onResize = () => {
    if (this.timelines.size > 0) {
      this.timelines.forEach((val) => {
        if (val.isOpen) {
          val.timeline.reversed(val.isOpen);
          val.isOpen = !val.isOpen;
        }
      });
    } else {
      this.timelines.clear();
    }

    this.getHeights();
  }

  getHeights = () => {
    TweenLite.set(
      this.expandable,
      { display: 'block' },
    );

    this.expandable.forEach((e, i) => {
      if (!e) {
        return;
      }

      const { height } = e.getBoundingClientRect();

      this.sizes.set(i, { height: height + 125 });
    });

    this.timelines.forEach((val, i) => {
      val
        .timeline
        .set(
          this.menu[i],
          { height: this.size(i).height },
        );
    });

    TweenLite.set(
      this.expandable,
      { display: 'none' },
    );
  }

  size = index => this.sizes.get(index)

  toggleRow = (index) => {
    if (this.timelines.has(index)) {
      const obj = this.timelines.get(index);
      const t = obj.timeline;

      t.reversed(obj.isOpen);
      obj.isOpen = !obj.isOpen;

      return;
    }

    const timeline = new TimelineLite();

    timeline
      .set(
        this.expandable[index],
        { display: 'block' },
      )
      .fromTo(
        this.menu[index],
        0.4,
        { height: 105 },
        { height: this.size(index).height },
      )
      .staggerFromTo(
        this.expandable[index].querySelectorAll(':scope > *'),
        0.25,
        { y: -20, autoAlpha: 0, pointerEvents: 'none' },
        { y: 0, autoAlpha: 1, pointerEvents: 'all' },
        '.075',
        '-=.2',
      );

    this.timeline = timeline;
    this.timelines.set(index, { timeline, isOpen: true });

    return this.timeline;
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.nav} ref={(c) => { this.nav = c; }}>
        <div className={s.nav__container}>
          <div className={s.nav__row}>
            <div className={s.nav__col}>
              <div>
                {Children.map(children, (component, i) => {
                  const { children: subChildren, content } = component.props;
                  const sideItem = content.side_item;
                  const hasSideItem = _get(content, 'side_item.title', '') !== '';

                  if (!subChildren) {
                    return null;
                  }

                  return (
                    <div className={s.nav__menu} ref={(c) => { this.menu[i] = c; }}>
                      <button aria-label="toggles row" className={s.nav__header} onClick={() => this.toggleRow(i)}>
                        <p className={s.nav__heading}>{component.props.name}</p>
                        <Arrow className={s.nav__arrow} />
                      </button>

                      <div className={s.nav__expandable} ref={(c) => { this.expandable[i] = c; }}>
                        {component.props.content && (
                          <p className={s.nav__text}>
                            {component.props.content.text}
                          </p>
                        )}

                        <ul className={s.nav__list}>
                          {Children.map(subChildren, subComponent => (
                            <NavLink
                              className={s.nav__item}
                              key={subComponent.key}
                              to={subComponent.props.to}
                              tabIndex={-1}
                            >
                              {subComponent.props.children}
                            </NavLink>
                          ))}
                        </ul>

                        {hasSideItem && (
                          <div className={s.nav__sideitem}>
                            <SideItem
                              title={sideItem.title}
                              text={sideItem.text}
                              icon={sideItem.icon}
                              iconUrl={sideItem.icon.url}
                              buttonText={sideItem.button_text}
                              buttonLink={sideItem.button_link}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ui')(observer(MobileNav));
