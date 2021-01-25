import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';
import { inject, observer } from 'mobx-react';

import CrossSvg from 'assets/images/icons/cross.svg';

import s from './Modal.scss';

class Modal extends Component {

  static propTypes = {
    ui: PropTypes.object,
    children: PropTypes.node,
    in: PropTypes.bool,
    onClick: PropTypes.func,
    cantClose: PropTypes.bool,
  }

  componentWillEnter(cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    this.props.ui.isScrollDisabled = true;

    timeline.addLabel('start');

    timeline.fromTo(
      this.overlay,
      0.5,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
    );

    timeline.fromTo(
      this.modal,
      0.3,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, ease },
      'start+=.25',
    );

    timeline.call(cb);
  }

  componentWillLeave(el, cb) {
    const timeline = new TimelineLite();

    this.props.ui.isScrollDisabled = false;

    timeline.to(
      el,
      0.2,
      { autoAlpha: 0 },
    );

    timeline.call(cb);
  }

  transitionHandler = (node, cb) => {
    if (this.props.in) {
      this.componentWillEnter(cb);
    } else {
      this.componentWillLeave(node, cb);
    }
  }

  render() {
    const {
      children,
      onClick,
      ui,
      cantClose,
      ...props
    } = this.props;

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div className={s(s.modal, { cantClose })}>
          <div
            className={s.modal__content}
            ref={(c) => { this.modal = c; }}
          >
            <button
              className={s.modal__close}
              onClick={onClick}
              aria-label="responds to click on modal"
            >
              <CrossSvg />
            </button>

            {Children.map(children, c => cloneElement(c, {
              onCloseClick: onClick,
            }))}
          </div>

          <div // eslint-disable-line
            className={s.modal__overlay}
            ref={(c) => { this.overlay = c; }}
            onClick={onClick}
          />
        </div>
      </Transition>
    );
  }
}

export default inject('ui')(observer(Modal));
