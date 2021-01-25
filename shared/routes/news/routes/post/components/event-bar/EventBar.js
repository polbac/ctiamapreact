import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
// import { inject, observer } from 'mobx-react';
// import ReactHtmlParser from 'react-html-parser';
import { TweenLite } from 'gsap';
import scrollToElement from 'utils/scrollToElement';
// import share from 'utils/share';

import BackToTop from 'assets/images/icons/icon-backtotop.svg';
import Arrow from 'assets/images/icons/icon-down-crop.svg';

import { Number } from 'components/assets';

import s from './EventBar.scss';

export default class EventBar extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    type: 'white',
  }

  state = {
    // isVisible: false,
    currentSection: undefined,
  }

  isNavOpen = false;
  isShareOpen = false;
  headings = [];

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);

    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  toggle(el, name = 'Nav', forceClose = false) {
    const state = this[`is${name}Open`];

    if (!state && forceClose) {
      return;
    }

    const start = { y: '-100%', pointerEvents: 'none' };
    const end = { y: '0%', pointerEvents: 'all' };

    const from = state ? end : start;
    const to = state ? start : end;

    TweenLite.fromTo(
      el,
      0.4,
      from,
      {
        ...to,
        ease: 'Power2.easeOut',
      },
    );

    this[`is${name}Open`] = !this[`is${name}Open`];
  }

  onScroll = () => {
    const scrollY = window.pageYOffset;
    // const wrapper = document.querySelector('#top');

    // if (this.currentY === undefined) {
    //   this.onResize();
    // }

    // if (wrapper) {
    //   const { innerHeight } = window;
    //   const { height } = wrapper.getBoundingClientRect();
    //   const percentage = (this.el.offsetTop / (height - innerHeight)) * 100;

    //   TweenLite.set(
    //     this.progress,
    //     { width: `${percentage}%` },
    //   );
    // }

    // this.setState({ isVisible: this.el.offsetTop > 0 });

    if (!this.headingCords) {
      return;
    }

    const percentages = this.headingCords.map(({ el, from, to, i }) => ({
      id: el.id,
      name: el.innerText,
      inView: scrollY >= from && scrollY < to,
      index: i,
    }));

    const currentSection = percentages.find(x => x.inView) || percentages[percentages.length - 1];

    this.setState({ currentSection });
  }

  onResize = () => {

    if (this.headings.length === 0) {
      return;
    }

    const { pageYOffset } = window;
    let from = 0;

    this.headingCords = this.headings.map((heading, i) => {
      const el = document.getElementById(heading);
      const next = this.headings[i + 1];

      let to = document.body.offsetHeight;

      if (next) {
        const nextEl = document.getElementById(next);

        to = (pageYOffset + nextEl.getBoundingClientRect().top) - 200;
      }

      const out = {
        el,
        from,
        to,
        i,
      };

      from = to;

      return out;
    });
  }

  toggleContents = (e) => {
    if (!this.isNavOpen) {
      this.toggle(this.share, 'Share', true);
    }

    this.toggle(this.contents, 'Nav');

    e.stopPropagation();
  }

  toggleShare = (e) => {
    if (!this.isShareOpen) {
      this.toggle(this.contents, 'Nav', true);
    }

    this.toggle(this.share, 'Share');

    e.stopPropagation();
  }

  onWindowClick = () => {
    this.toggle(this.contents, 'Nav', true);
    this.toggle(this.share, 'Share', true);
  }

  renderTitleLinks() {
    const { children } = this.props;
    const { currentSection } = this.state;
    const c = Children.toArray(children);
    const first = c.length > 0 ? c[0].props.children : '';

    return (
      <div className={s.eventbar__tlcontainer}>
        <div className={s.eventbar__row}>
          <div className={s.eventbar__col}>
            <ul className={s.eventbar__titlelinks} ref={(el) => { this.contents = el; }}>
              {Children.map(children, (component, i) => (
                <li
                  key={i}
                  className={s(s.eventbar__titleitem, {
                    active: currentSection
                      ? currentSection.index === i
                      : 0,
                  })}
                >
                  {cloneElement(component, {
                    ref: (el) => {
                      if (!el) {
                        return;
                      }

                      const id = kebabCase(el.props.children);

                      if (!this.headings.includes(id)) {
                        this.headings.push(id);
                      }
                    },
                    className: s.eventbar__titlelink,
                    target: '_self',
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderDropdown() {
    const { children, theme } = this.props;
    const { currentSection } = this.state;
    const c = Children.toArray(children);
    const first = c.length > 0 ? c[0].props.children : '';

    return (
      <div className={s.eventbar__ddcontainer}>
        <div className={s.eventbar__row}>
          <div className={s.eventbar__col}>
            <div className={s.eventbar__dropdown}>
              <div // eslint-disable-line
                className={s.eventbar__current}
                onClick={this.toggleContents}
                ref={(el) => { this.current = el; }}
              >
                <div className={s.eventbar__left}>
                  <Number className={s.eventbar__number} colors={theme}>
                    {currentSection ? (currentSection.index + 1).toString() : '0'}
                  </Number>
                </div>

                <p className={s.eventbar__title}>
                  {currentSection ? currentSection.name : first}
                </p>

                <div className={s.eventbar__right}>
                  <Arrow className={s.eventbar__arrow} />
                </div>
              </div>

              <div className={s.eventbar__mask}>
                <ul className={s.eventbar__list} ref={(el) => { this.contents = el; }}>
                  {Children.map(children, (component, i) => (
                    <li
                      key={i}
                      className={s(s.eventbar__item, {
                        active: currentSection
                          ? currentSection.index === i
                          : 0,
                      })}
                    >

                      <div className={s.eventbar__numberWrap}>
                        <Number
                          className={s(s.eventbar__number, s.eventbar__numberDropdown)}
                          colors={theme}
                        >
                          {(i + 1).toString()}
                        </Number>
                      </div>

                      {cloneElement(component, {
                        ref: (el) => {
                          if (!el) {
                            return;
                          }

                          const id = kebabCase(el.props.children);

                          if (!this.headings.includes(id)) {
                            this.headings.push(id);
                          }
                        },
                        className: s.eventbar__link,
                        target: '_self',
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { children, location, type } = this.props;
    // const { isVisible } = this.state;
    const isVisible = true;
    const typeAsArray = !Array.isArray(type) ? type.split(' ') : type;

    return (
      <div
        className={s(s.eventbar, { isVisible }, ...typeAsArray.map(t => s[t]))}
        ref={(el) => { this.el = el; }}
      >
        <div className={s.eventbar__full}>
          {children && this.renderTitleLinks()}

          {children && this.renderDropdown()}

          <a
            className={s.eventbar__return}
            href={`${location}#top`}
            onClick={() => scrollToElement('#top')}
            ref={(el) => { this.scrollButton = el; }}
          >
            <BackToTop className={s.eventbar__icon} />
          </a>
        </div>
      </div>
    );
  }
}
