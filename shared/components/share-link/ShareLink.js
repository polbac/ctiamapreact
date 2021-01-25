import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import s from './ShareLink.scss';

export default class ShareLink extends PureComponent {

  static propTypes = {
    link: PropTypes.string,
    withWrapper: PropTypes.bool,
    hasAnimation: PropTypes.bool,
  }

  static defaultProps = {
    hasAnimation: false,
  }

  state = {
    isAnimationComplete: false,
    toggleSuccess: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { hasAnimation } = this.props;
    const { isAnimationComplete } = this.state;

    if (!hasAnimation) {
      return;
    }

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!this.link) {
      return;
    }

    t.fromTo(
      this.link,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
    );
  }

  copyLink = (link) => {
    const inputEl = document.createElement('textarea');

    inputEl.style.position = 'absolute';
    inputEl.style.opacity = 0;
    inputEl.value = link;

    this.el.appendChild(inputEl);

    inputEl.focus();
    inputEl.select();

    try {
      document.execCommand('copy');

      this.setState({ toggleSuccess: true });

      setTimeout(() => {
        this.setState({ toggleSuccess: false });
      }, 1200);
    } catch (e) {
      console.error(e);
    }

    this.el.removeChild(inputEl);
  }

  render() {
    const { link, withWrapper, hasAnimation } = this.props;
    const { toggleSuccess } = this.state;

    const button = (
      <div className={s(s.link, { hasAnimation })} ref={(c) => { this.link = c; }}>
        <button aria-label="copy item" className={s.link__button} onClick={() => this.copyLink(link)}>
          {link}
        </button>

        <span className={s(s.link__success, { toggleSuccess })}>Copied!</span>
      </div>
    );

    const wrapper = (
      <div className={s.link__container}>
        <div className={s.link__row}>
          <div className={s.link__col}>
            {button}
          </div>
        </div>
      </div>
    );

    const content = withWrapper ? wrapper : button;

    return (
      <Fragment>
        {hasAnimation && (
          <Waypoint
            topOffset="95%"
            onPositionChange={this.onPositionChange}
          />
        )}

        {content}
        <div ref={(el) => { this.el = el; }} style={{ opacity: 0, position: 'absolute' }} />
      </Fragment>
    );
  }
}
