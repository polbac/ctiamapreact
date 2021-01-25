import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';
import ShareButton from 'containers/share-button';

import s from './Downloader.scss';

export default class Downloader extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    image: WordPressImage.propTypes.image,
    extension: PropTypes.string,
    size: PropTypes.string,
    href: PropTypes.string,
    inSidebar: PropTypes.bool,
  }

  render() {
    const { title, image, extension, size, href, inSidebar } = this.props;

    const noSize = !size;

    return (
      <div className={s(s.downloader, { noSize, inSidebar })}>
        <div className={s.downloader__container}>
          <div className={s.downloader__row}>
            <div className={s.downloader__col}>
              <div className={s.downloader__content}>
                {image && image.url
                  ? (
                    <img
                      className={s.downloader__image}
                      src={_get(image, 'sizes.medium', image.url)}
                      alt={`${title} document cover`}
                    />
                  ) : (
                    <img
                      className={s.downloader__icon}
                      src={require('!file-loader!assets/images/icons/icon-document.svg')}
                      alt="Document icon"
                    />
                  )
                }

                <div className={s.downloader__infos}>
                  <div className={s.downloader__left}>
                    {extension && (
                      <p className={s.downloader__extension}>{extension}</p>
                    )}
                    {size && (
                      <p className={s.downloader__size}>{size}</p>
                    )}
                  </div>

                  <div className={s.downloader__buttons}>
                    <a className={s.downloader__link} href={href}>
                      <img
                        className={s.downloader__download}
                        src={require('!file-loader!assets/images/icons/actionicon-download.svg')}
                        alt=""
                      />
                    </a>

                    {/* <a className={s.downloader__link} href={href} target="_blank">
                      <img
                        className={s.downloader__download}
                        src={require('!file-loader!assets/images/icons/actionicon-link.svg')}
                        alt=""
                      />
                    </a> */}

                    <div className={s.downloader__link}>
                      <ShareButton />
                    </div>
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
