import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './ImageCover.scss';

export default class ImageCover extends PureComponent {

  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    caption: PropTypes.string,
    isCover: PropTypes.bool,
    isHero: PropTypes.bool,
    isCenter: PropTypes.bool,
    isAspect: PropTypes.bool,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    src: require('assets/images/temp/img-area.jpg'),
  }

  render() {
    const { src, caption, isCover, isCenter, isAspect, isHero, isWide, alt } = this.props;

    const style = isCover ? { backgroundImage: `url(${src})` } : {};

    return (
      <div
        className={s(s.image, {
          caption,
          isCenter,
          isContained: (!isCover && !isAspect),
          isHero,
          isAspect,
          isWide,
        })}
      >
        <div className={s.image__image} style={style}>
          {isCover && (
            <div className={s.image__coverImageContainer}>
              <img src={src} className={s.image__coverImage} alt={alt} />
            </div>
          )}

          {!isCover && (
            <div className={s.image__container}>
              <img src={src} alt={caption} className={s.image__img} />
            </div>
          )}
        </div>

        {(caption && caption !== '') && (
          <div className={s.image__container}>
            <div className={s.image__row}>
              <div className={s.image__col}>
                <div className={s.image__caption}>
                  <img
                    className={s.image__captionIcon}
                    src={require('!file-loader!assets/images/icons/mediaicon-photo.svg')}
                    alt="Media icon"
                  />

                  <div className={s.image__captionText}>
                    <div className={s.image__captionType}>Photo</div>
                    <p className={s.image__captionContent}>{caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
