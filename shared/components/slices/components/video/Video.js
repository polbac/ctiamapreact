import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getEmbed } from 'utils/getVideoServiceId';

import s from './Video.scss';

export default class Video extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    caption: PropTypes.string,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
  }

  render() {
    const { title, link, caption, isWide } = this.props;

    return (
      <div className={s(s.video, { isWide })}>
        <div className={s.video__container}>
          <div className={s.video__row}>
            <div className={s.video__col}>
              <div className={s.video__content}>
                <div className={s.video__row}>
                  <div className={s.video__wrapper}>
                    <img
                      className={s.video__icon}
                      src={require('!file-loader!assets/images/icons/mediaicon-video.svg')}
                      alt="Media icon"
                    />

                    <p className={s.video__label}>Video</p>
                    <h3 className={s.video__heading}>{title}</h3>
                  </div>
                </div>
              </div>

              <div className={s.video__row}>
                <div className={s.video__wrapper}>
                  <div className={s.video__media}>
                    <div className={s.video__aspect}>
                      <iframe
                        className={s.video__iframe}
                        src={getEmbed(link)}
                        title={title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>

                    {caption && <p className={s.video__caption}>{caption}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
