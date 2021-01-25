import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { inject, observer } from 'mobx-react';
import ReactHtmlParser from 'react-html-parser';
import { TweenLite } from 'gsap';
import scrollToElement from 'utils/scrollToElement';
import share from 'utils/share';

import BackToTop from 'assets/images/icons/icon-backtotop.svg';
import Arrow from 'assets/images/icons/icon-down-crop.svg';

import { Number } from 'components/assets';

import s from './NavBar.scss';

class NavBar extends Component {

  // type: white, gray, blue, dotted
  static propTypes = {
    ui: PropTypes.object,
    name: PropTypes.string,
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
    isVisible: false,
    currentSection: undefined,
  }

  isNavOpen = false
  isShareOpen = false
  headings = []

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
    const wrapper = document.querySelector('#top');

    if (this.currentY === undefined) {
      this.onResize();
    }

    if (wrapper) {
      const { innerHeight } = window;
      const { height } = wrapper.getBoundingClientRect();
      const percentage = (this.el.offsetTop / (height - innerHeight)) * 100;

      TweenLite.set(
        this.progress,
        { width: `${percentage}%` },
      );
    }

    this.setState({ isVisible: this.el.offsetTop > 0 });

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

  nameWidth = () => {
    const { children } = this.props;
    const { innerWidth } = window;

    if (!children) {
      return (innerWidth * 80) / 100;
    }

    const { width: dw } = this.current.getBoundingClientRect();
    const { width: bw } = this.scrollButton.getBoundingClientRect();
    const sw = this.shareWidth();
    const width = innerWidth - dw - bw - sw;

    return width;
  }

  shareWidth = () => {
    const { children, ui } = this.props;
    const { innerWidth } = window;

    if (!children) {
      return ((innerWidth * 20) / 100) - ui.scrollBarWidth;
    }

    const { width: dw, left: dl } = this.current.getBoundingClientRect();
    const { width: bw } = this.scrollButton.getBoundingClientRect();
    const width = innerWidth - dw - dl - bw - ui.scrollBarWidth;

    return width;
  }

  widthComponents = () => {
    TweenLite.set(
      this.name,
      { width: this.nameWidth() },
    );

    TweenLite.set(
      this.share,
      { width: this.shareWidth() },
    );
  }

  onResize = () => {
    this.widthComponents();

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

  renderDropdown() {
    const { children, theme } = this.props;
    const { currentSection } = this.state;
    const c = Children.toArray(children);
    const first = c.length > 0 ? c[0].props.children : '';

    return (
      <div className={s.navbar__container}>
        <div className={s.navbar__row}>
          <div className={s.navbar__col}>
            <div className={s.navbar__dropdown}>
              <div // eslint-disable-line
                className={s.navbar__current}
                onClick={this.toggleContents}
                ref={(el) => { this.current = el; }}
              >
                <div className={s.navbar__left}>
                  <Number className={s.navbar__number} colors={theme}>
                    {currentSection ? (currentSection.index + 1).toString() : '0'}
                  </Number>
                </div>

                <p className={s.navbar__title}>
                  {currentSection ? currentSection.name : first}
                </p>

                <div className={s.navbar__right}>
                  <Arrow className={s.navbar__arrow} />
                </div>
              </div>

              <div className={s.navbar__mask}>
                <ul className={s.navbar__list} ref={(el) => { this.contents = el; }}>
                  {Children.map(children, (component, i) => (
                    <li
                      key={i}
                      className={s(s.navbar__item, {
                        active: currentSection
                          ? currentSection.index === i
                          : 0,
                      })}
                    >
                      <div className={s.navbar__numberWrap}>
                        <Number
                          className={s(s.navbar__number, s.navbar__numberDropdown)}
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
                        className: s.navbar__link,
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
    const { name, children, location, type } = this.props;
    const { isVisible } = this.state;
    const typeAsArray = !Array.isArray(type) ? type.split(' ') : type;

    return (
      <div
        className={s(s.navbar, { isVisible }, ...typeAsArray.map(t => s[t]))}
        ref={(el) => { this.el = el; }}
      >
        {children && this.renderDropdown()}

        <div
          className={s.navbar__progress}
          ref={(el) => { this.progress = el; }}
        />

        <div className={s.navbar__full}>
          <div ref={(el) => { this.name = el; }}>
            <p className={s.navbar__name}>{ReactHtmlParser(name)}</p>
          </div>

          <div className={s.navbar__share}>
            <div // eslint-disable-line
              className={s.navbar__shareRow}
              onClick={this.toggleShare}
            >
              <img
                src={require('!file-loader!assets/images/icons/actionicon-link.svg')}
                className={s.navbar__circleIcon}
                alt=""
              />

              <p className={s.navbar__text}>Share</p>
            </div>

            <div className={s.navbar__mask}>
              <ul className={s.navbar__list} ref={(el) => { this.share = el; }}>
                {['Facebook', 'Twitter', 'LinkedIn'].map(item => (
                  <li className={s.navbar__item} key={item} >
                    <button aria-label="shares item" onClick={() => share(item)}>
                      <div className={s(s.navbar__link, s.navbar__linkShare)}>
                        <img
                          src={require(`!file-loader!assets/images/icons/actionicon-${item.toLowerCase()}.svg`)} // eslint-disable-line
                          className={s.navbar__circleIcon}
                          alt=""
                        />

                        <p className={s.navbar__text}>{item}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            className={s.navbar__return}
            href={`${location}#top`}
            onClick={() => scrollToElement('#top')}
            ref={(el) => { this.scrollButton = el; }}
          >
            <BackToTop className={s.navbar__icon} />
          </a>
        </div>
      </div>
    );
  }
}

export default inject('ui')(observer(NavBar));
