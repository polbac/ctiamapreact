import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';
import { inject, observer } from 'mobx-react';

import Cross from 'assets/images/icons/cross.svg';

import s from './Video.scss';

class Video extends Component {

  static propTypes = {
    ui: PropTypes.object,
    video: PropTypes.string,
    onClick: PropTypes.func,
    in: PropTypes.bool,
  }

  componentWillEnter(el, cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    this.props.ui.isScrollDisabled = true;

    timeline.addLabel('start');

    timeline.fromTo(
      el,
      0.5,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease },
    );

    timeline.fromTo(
      this.player,
      0.35,
      { autoAlpha: 0, y: '-30%' },
      { autoAlpha: 1, y: '-50%', ease },
      'start+=.2',
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
      this.componentWillEnter(node, cb);
    } else {
      this.componentWillLeave(node, cb);
    }
  }

  render() {
    const { video, onClick, ...props } = this.props;

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div className={s.video}>
          <div className={s.video__container}>
            <div className={s.video__row}>
              <div className={s.video__col}>
                <div className={s.video__player} ref={(c) => { this.player = c; }}>
                  <button aria-label="responds to click on video" className={s.video__button} onClick={onClick}>
                    <Cross className={s.video__svg} />
                  </button>

                  <iframe // eslint-disable-line
                    className={s.video__iframe}
                    title="Video"
                    src={video}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}

export default inject('ui')(observer(Video));
