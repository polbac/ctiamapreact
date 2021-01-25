import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';
import share from 'utils/share';

import Twitter from 'assets/images/icons/actionicon-twitter-optim.svg';
import Facebook from 'assets/images/icons/actionicon-facebook-optim.svg';
import Linkedin from 'assets/images/icons/actionicon-linkedin-optim.svg';

import s from './Share.scss';

const SHARE_HEIGHT = 44;
const SHARE_WIDTH = 240;

export default class Share extends PureComponent {

  static propTypes = {
    pos: PropTypes.object,
    text: PropTypes.string,
    in: PropTypes.bool,
  }

  componentWillEnter(el, cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.fromTo(
      el,
      0.25,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, ease },
    );

    timeline.call(cb);
  }

  componentWillLeave(el, cb) {
    const timeline = new TimelineLite();

    timeline.to(
      el,
      0.1,
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

  position = () => {
    const { top: pt, left: pl, width: pw } = this.props.pos;
    const { scrollY } = window;

    const top = (pt + scrollY) - (SHARE_HEIGHT);
    const left = (pl + (pw / 2)) - (SHARE_WIDTH / 2);

    return {
      top,
      left,
    };
  }

  render() {
    const { text, pos, ...props } = this.props;
    const { length } = text;

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div
          className={s.share}
          style={this.position()}
        >
          <button
            className={s.share__twitter}
            onClick={() => share('twitter', text)}
          >
            <p className={s.share__copy}><span>{length}</span> / 280</p>
            <Twitter className={s.share__icon} />
          </button>

          <button
            className={s.share__button}
            onClick={() => share('facebook', text)}
          >
            <Facebook className={s.share__icon} />
          </button>

          <button
            className={s.share__button}
            onClick={() => share('linkedin', text)}
          >
            <Linkedin className={s.share__icon} />
          </button>
        </div>
      </Transition>
    );
  }
}
