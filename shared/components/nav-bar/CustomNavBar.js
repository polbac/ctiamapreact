import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
// import kebabCase from 'lodash/kebabCase';
import { inject, observer } from 'mobx-react';
// import ReactHtmlParser from 'react-html-parser';
import { TweenLite } from 'gsap';
import scrollToElement from 'utils/scrollToElement';
// import share from 'utils/share';

import BackToTop from 'assets/images/icons/icon-backtotop.svg';
// import Arrow from 'assets/images/icons/icon-down-crop.svg';

import s from './CustomNavBar.scss';

export default class CustomNavBar extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    type: 'white',
  }

  isNavOpen = false
  isShareOpen = false

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
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

  render() {
    const { children, location, type } = this.props;
    // const { isVisible } = this.state;
    const isVisible = true;
    const typeAsArray = !Array.isArray(type) ? type.split(' ') : type;

    return (
      <div
        className={s(s.customNavBar, { isVisible }, ...typeAsArray.map(t => s[t]))}
        ref={(el) => { this.el = el; }}
      >
        <div className={s.customNavBar__full}>
          <div
            className={s.customNavBar__info}
            ref={(el) => { this.name = el; }}
          >
            {children}
          </div>

          <a
            className={s.customNavBar__return}
            href={`${location}#top`}
            onClick={() => scrollToElement('#top')}
            ref={(el) => { this.scrollButton = el; }}
          >
            <BackToTop className={s.customNavBar__icon} />
          </a>
        </div>
      </div>
    );
  }
}
