import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { WordPressImage } from 'components/image';

import s from './Hero.scss';

export default class Hero extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    image: WordPressImage.propTypes.image,
    video: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  render() {
    const { heading, location, date, image, video } = this.props;

    return (
      <div className={s.hero}>

        {get(image, 'url') && !video && (
          <img
            ref={(c) => { this.image = c; }}
            className={s.hero__background}
            src={image.url}
            alt={image.alt}
            title={image.title}
          />
        )}

        {video && (
          <video // eslint-disable-line
            ref={(el) => { this.videoEl = el; }}
            src={video}
            className={s.hero__video}
            poster={get(image, 'url')}
            muted
            loop
            playsInline
            autoPlay
          />
        )}

        <div className={s.hero__container}>
          <h1>{heading}</h1>
          <div>{location}</div>
          <div>{date}</div>
        </div>
      </div>
    );
  }
}
