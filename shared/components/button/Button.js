import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TweenLite, TimelineLite } from 'gsap';

import s from './Button.scss';

export default class Button extends PureComponent {

  static propTypes = {
    to: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    blue: PropTypes.bool,
    orange: PropTypes.bool,
  }

  componentDidMount() {
    if (this.border) {
      const timeline = new TimelineLite();

      timeline.set(this.border, { drawSVG: '0%' });
    }
  }

  componentWillUnmount() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }

  mouseOver = () => {
    const timeline = new TimelineLite();
    const { width } = this.button.getBoundingClientRect();
    const ease = 'window.easeInOut';
    const duration = 0.125;

    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    timeline
      .fromTo(
        this.line,
        duration,
        { width: 0 },
        {
          width: width + 15,
          ease,
          onComplete: () => {
            TweenLite.fromTo(
              this.border,
              duration,
              { drawSVG: '0%' },
              { drawSVG: '100%', ease },
              '-=.025',
            );
          },
        },
      )
      .call(() => {
        this.isAnimating = false;
      });

    this.timeline = timeline;
  }

  mouseOut = () => {
    const timeline = new TimelineLite();
    const ease = 'window.easeInOut';
    const duration = 0.075;

    if (this.isAnimating) {
      timeline
        .set(this.border, { drawSVG: '0%' })
        .set(this.line, { width: 0 });

      return;
    }

    timeline
      .to(
        this.border,
        duration,
        { drawSVG: '0%' },
      )
      .to(
        this.line,
        duration,
        { width: 0, ease },
      );
  }

  render() {
    const {
      to,
      children,
      className,
      disabled,
      blue,
      orange,
      ...rest
    } = this.props;

    const isLink = (typeof to !== 'undefined');
    const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to);

    rest.className = s(s.button, className, { disabled, blue, orange });
    rest.disabled = disabled;
    rest.onMouseOver = this.mouseOver;
    rest.onMouseOut = this.mouseOut;
    rest.onFocus = this.mouseOver;
    rest.onBlur = this.mouseOut;

    const wrapper = (
      <div
        className={s.button__inner}
        ref={(c) => { this.button = c; }}
        aria-label={`${isExternal ? 'External Link' :
          isLink ? 'Internal Link' :
           'Submit'}`}
      >
        {children}

        <span
          className={s.button__line}
          ref={(c) => { this.line = c; }}
        />

        <svg
          className={s.button__border}
          width="36px"
          height="36px"
        >
          <path
            ref={(c) => { this.border = c; }}
            fillRule="evenodd"
            stroke="rgb(120, 205, 209)"
            strokeWidth="2px"
            strokeLinecap="round"
            strokeLinejoin="miter"
            fill="none"
            d="M2.500,32.000 C13.096,32.000 22.388,26.413 27.590,18.024 C30.386,13.515 32.000,8.196 32.000,2.500"
          />
        </svg>
      </div>
    );

    if (isExternal) {
      return <a target="_blank" rel="noopener noreferrer" href={to} {...rest}>{wrapper}</a>;
    }

    if (isLink) {
      return <Link to={to} {...rest}>{wrapper}</Link>;
    }

    return <button aria-label="Internal Link" {...rest}>{wrapper}</button>;
  }
}
