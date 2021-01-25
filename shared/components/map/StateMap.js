import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import Map from 'assets/images/map.svg';

import s from './StateMap.scss';

export default class StateMap extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func,
    blue: PropTypes.bool,
    green: PropTypes.bool,
    isNew5g: PropTypes.bool,
  }

  static defaultProps = {
    isNew5g: false,
  }

  componentDidMount() {
    const { green } = this.props;

    this.colorHover = green ? '#fa7a47' : '#c4d438';
    this.colorShadow = green ? '#d46d43' : '#aab928';
    this.colorDefault = green ? '#dcedd8' : '#c2dcdd';
  }

  componentWillReceiveProps(props) {
    const { isInteractive } = props;

    if (!this.el || !isInteractive) {
      return;
    }

    const mapEl = this.el.children[0];

    TweenLite.to(
      mapEl.querySelectorAll('path'),
      0.2,
      {
        fill: this.colorDefault,
        strokeOpacity: 0,
      },
    );
  }

  reset(target, shadow) {
    TweenLite.to(
      target,
      0.2,
      {
        fill: this.colorDefault,
        y: 0,
        onComplete: () => {
          shadow.remove();
        },
      },
    );
  }

  onMouseMove = (e) => {
    const { isInteractive } = this.props;
    const { target } = e;

    if (this.currentTarget === target || isInteractive !== true || target.tagName !== 'path') {
      return;
    }

    const shadow = target.cloneNode();

    TweenLite.set(shadow, { fill: this.colorShadow, pointerEvents: 'none' });

    if (target.parentElement) {
      target.parentElement.append(shadow);
      target.parentElement.append(target);
    }

    TweenLite.to(
      target,
      0.4,
      {
        fill: this.colorHover,
        strokeOpacity: 0.3,
        y: -5,
      },
    );

    if (this.currentTarget) {
      const cShadow = this.currentShadow;

      TweenLite.to(
        this.currentTarget,
        0.2,
        {
          fill: this.colorDefault,
          y: 0,
          onComplete: () => {
            cShadow.remove();
          },
        },
      );
    }

    this.currentTarget = target;
    this.currentShadow = shadow;
  }

  onMouseLeave = () => {
    if (!this.currentShadow || !this.currentTarget) {
      return;
    }

    this.reset(this.currentTarget, this.currentShadow);

    this.currentTarget = undefined;
    this.currentShadow = undefined;
  }

  render() {
    const { blue, green, className, isInteractive, onClick, isNew5g } = this.props;

    return (
      <div // eslint-disable-line
        onClick={onClick}
        className={s(s.stateMap, className, { green, blue, isInteractive, isNew5g })}
        ref={(el) => { this.el = el; }}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <Map className={s.stateMap__map} />
      </div>
    );
  }
}
