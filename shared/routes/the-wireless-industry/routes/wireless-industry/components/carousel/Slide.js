import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';

import Restart from 'assets/images/wireless-industry/wireless-works/restart.svg';

import { Number } from 'components/assets';
import Button from 'components/button';

import s from './Slide.scss';

export default class Slide extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string,
    index: PropTypes.number,
    length: PropTypes.number,
    onClick: PropTypes.func,
    in: PropTypes.bool,
    hasExtraSpacing: PropTypes.bool,
  }

  componentWillEnter(el, cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.delay(0.25);

    timeline.fromTo(
      el,
      0.8,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
    );

    timeline.call(cb);
  }

  componentWillLeave(el, cb) {
    const timeline = new TimelineLite();

    timeline.to(
      el,
      0.4,
      { autoAlpha: 0 },
    );

    timeline.call(cb);
  }

  transitionHandler = (node, cb) => {
    if (this.props.in) {
      this.componentWillEnter(node, cb);
    } else {
      this.componentWillLeave(node, cb);
    }
  }

  render() {
    const { heading, copy, index, length, onClick, hasExtraSpacing, ...props } = this.props;

    const button = index === length
      ? <Restart className={s.slide__arrow} />
      : 'Next';

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div className={s(s.slide, { hasExtraSpacing })}>
          <Number className={s.slide__number} colors="green-blue">{index}</Number>
          <h3 className={s.slide__heading}>{heading}</h3>
          <p className={s.slide__copy}>{copy}</p>
          <Button onClick={onClick}>{button}</Button>
        </div>
      </Transition>
    );
  }
}
