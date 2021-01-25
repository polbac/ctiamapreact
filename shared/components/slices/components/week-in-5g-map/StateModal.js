import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';

import Close from 'assets/images/icons/cross.svg';

import s from './StateModal.scss';

export default class StateModal extends PureComponent {

  static propTypes = {
    stateName: PropTypes.string,
    abbreviation: PropTypes.string,
    text: PropTypes.string,
    data: PropTypes.array,
    sources: PropTypes.array,
    type: PropTypes.oneOf(['4g', '5g']),
    in: PropTypes.bool,
    children: PropTypes.node,
    onCloseClick: PropTypes.func,
  }

  componentWillEnter(el, cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!el) {
      return;
    }

    timeline.fromTo(
      el,
      0.5,
      { opacity: 0 },
      { opacity: 1 },
    );

    if (this.left) {
      timeline.fromTo(
        this.left,
        1.6,
        { x: '-250%' },
        { x: '0%', ease },
        '0',
      );
    }

    if (this.right) {
      timeline.fromTo(
        this.right,
        1.6,
        { x: '250%' },
        { x: '0%', ease },
        '0',
      );
    }

    if (this.content.childNodes) {
      timeline.staggerFromTo(
        this.content.childNodes,
        0.3,
        { x: -10, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease },
        0.1,
        '0.2',
      );
    }

    if (this.statistics) {
      timeline.fromTo(
        this.statistics,
        0.3,
        { x: 10, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease },
        '0.8',
      );
    }

    if (this.resources) {
      timeline.fromTo(
        this.resources,
        0.3,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease },
        '0.8',
      );
    }

    this.timeline = timeline;

    timeline.call(cb);
  }

  componentWillLeave(el, cb) {
    if (!el) {
      return;
    }

    const timeline = new TimelineLite();

    timeline.to(
      el,
      0.5,
      { opacity: 0 },
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
    const {
      stateName,
      abbreviation,
      text,
      data,
      sources,
      type,
      children,
      ui, // eslint-disable-line
      statistics, // eslint-disable-line
      onCloseClick,
      ...props
    } = this.props;

    const is5g = type === '5g';

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div className={s(s.stateModal, { is5g })}>
          <div className={s.stateModal__wrapper}>
            <div className={s.stateModal__container}>
              <div className={s.stateModal__row}>
                <div className={s.stateModal__headingContainer} ref={(c) => { this.content = c; }}>
                  <div className={s.stateModal__heading} ref={(c) => { this.heading = c; }}>
                    <button className={s.stateModal__close} onClick={onCloseClick}>
                      <Close className={s.stateModal__closeSvg} />
                    </button>
                    <h2 className={s.stateModal__stateName}>
                      {stateName}
                    </h2>
                  </div>
                </div>
                <div className={s.stateModal__colStatistics}>
                  <div ref={(c) => { this.statistics = c; }} >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition >
    );
  }
}
