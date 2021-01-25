import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite, TweenLite } from 'gsap';
import get from 'lodash/get';

import { WordPressImage } from 'components/image';
import { Graphic } from 'components/assets';
import Button from 'components/button';

import s from './Slide.scss';

export default class Slide extends PureComponent {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string,
    graphics: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    image: WordPressImage.propTypes.image,
    inversed: PropTypes.bool,
    enableAnim: PropTypes.bool,
    video: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    tabIndex: PropTypes.number,
  }

  static defaultProps = {
    graphics: undefined,
    inversed: false,
    enableAnim: true,
  }

  state = { loaded: false }

  componentDidMount() {
    this.loading = setInterval(this.onLoad, 200);
    this.init();
  }

  componentWillUnmount() {
    clearInterval(this.loading);
  }

  onLoad = () => {
    if (this.image) {
      const loaded = this.image.complete;

      if (loaded) {
        clearInterval(this.loading);
      }

      this.setState({ loaded });
    }
  }

  init = () => {
    const el = this.content;

    if (!el) {
      return;
    }

    TweenLite.set(
      el.children,
      { opacity: 0 },
    );

    this.animate(el.children);
  }

  animate = (items) => {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    timeline.staggerFromTo(
      items,
      1,
      { opacity: 0 },
      { opacity: 1, ease },
      0.225,
    );
  }

  render() {
    const { label, heading, button, to, graphics, image, video, inversed, enableAnim, tabIndex, } = this.props;
    const { loaded } = this.state;

    return (
      <div className={s(s.slide, { inversed })} aria-labelledby={this.props.buttonId}>
        <div className={s.slide__container}>
          <div className={s.slide__row}>
            {/* Add to slide: aria-labeledby={} */}
            <div className={s.slide__col} ref={(c) => { this.content = c; }} role="tabpanel" >
              {label && (<p className={s.slide__label}>{label}</p>)}
              <h2 className={s.slide__heading}>{heading}</h2>
              <Button role="tab" className={s.slide__button} to={to} tabIndex={tabIndex}>{button}</Button>
            </div>
          </div>
        </div>

        <Graphic
          className={s(s.slide__graphics, s.slide__graphicsLeft)}
          set={graphics}
          position="left"
          enableAnim={enableAnim}
        />

        <Graphic
          className={s.slide__graphics}
          set={graphics}
          position="right"
          enableAnim={enableAnim}
        />

        {get(image, 'url') && !video && (
          <img
            ref={(c) => { this.image = c; }}
            className={s(s.slide__background, { loaded })}
            src={image.url}
            alt={heading}
          />
        )}

        {video && (
          <div className={s.slide__videoWrap}>
            <video // eslint-disable-line
              ref={(el) => { this.videoEl = el; }}
              src={video}
              className={s.slide__video}
              poster={get(image, 'url')}
              muted
              loop
              playsInline
              autoPlay
            />
          </div>
        )}
      </div>
    );
  }
}
