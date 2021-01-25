import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import share from 'utils/share';

import { WordPressImage } from 'components/image';
import { ButtonDropdown } from 'components/button';

import PrintSvg from 'assets/images/icons/icon-print-optim.svg';
import DownloadSvg from 'assets/images/icons/icon-download-optim.svg';
import ShareSvg from 'assets/images/icons/actionicon-share-optim.svg';
import FacebookSvg from 'assets/images/icons/actionicon-facebook-optim.svg';
import TwitterSvg from 'assets/images/icons/actionicon-twitter-optim.svg';
import LinkedinSvg from 'assets/images/icons/actionicon-linkedin-optim.svg';

import s from './Author.scss';

export default class Author extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    name: PropTypes.string,
    title: PropTypes.string,
    download: PropTypes.string,
    print: PropTypes.bool,
    hasSecondAuthor: PropTypes.bool,
    secondAuthorImage: PropTypes.object,
    secondAuthorName: PropTypes.string,
    secondAuthorTitle: PropTypes.string,
  }

  static defaultProps = {
    print: true,
  }

  render() {
    const {
      image,
      name,
      title,
      download,
      print,
      hasSecondAuthor,
      secondAuthorImage,
      secondAuthorName,
      secondAuthorTitle,
    } = this.props;

    const noBorderTop = !(name || title || image);

    return (
      <div className={s(s.author, { noBorderTop })}>
        <div className={s.author__wrap}>
          <div className={s.author__block} id="author-block">
            {name && (
              <div className={s.author__header}>
                <div className={s.author__images}>
                  {image && image.url && (
                    <img
                      className={s(s.author__image, { hasSecondAuthor })}
                      src={image.url}
                      alt={image.alt || 'Backup alt text in Author.js'} 
                    />
                    // Displaying images as background-image isn't accessible.
                    // <div
                    //   className={s(s.author__image, { hasSecondAuthor })}
                    //   style={{ backgroundImage: `url(${image.url})` }}
                    // />
                  )}

                  {hasSecondAuthor && (
                    <div
                      className={s.author__image}
                      style={{ backgroundImage: `url(${secondAuthorImage.url})` }}
                    />
                  )}
                </div>

                <div className={s.author__nfo}>
                  <div className={s.author__name}>{name}{hasSecondAuthor && ` & ${secondAuthorName}`}</div>
                  <div className={s.author__title}>{title}{hasSecondAuthor && `, & ${secondAuthorTitle}`}</div>
                </div>
              </div>
            )}

            <div className={s.author__bottom}>
              {(print || (download && download !== '')) && (
                <div className={s(s.author__functions, { noBorderTop })}>
                  {print && (
                    <button
                      className={s.author__print}
                      onClick={() => window.print()}
                      aria-label="for printing"
                    >
                      Print
                      <PrintSvg className={s.author__printIcon} />
                    </button>
                  )}

                  {download && download !== '' && (
                    <a
                      href={download}
                      className={s.author__download}
                    >
                      Download
                      <DownloadSvg className={s.author__downloadIcon} />
                    </a>
                  )}
                </div>
              )}

              <div className={s.author__share}>
                <ButtonDropdown
                  icon={<ShareSvg />}
                  items={[
                    <button aria-label="link to social sites" onClick={() => share('Facebook')}><FacebookSvg /> Facebook</button>,
                    <button aria-label="link to social sites" onClick={() => share('Twitter')}><TwitterSvg /> Twitter</button>,
                    <button aria-label="link to social sites" onClick={() => share('LinkedIn')}><LinkedinSvg /> LinkedIn</button>,
                  ]}
                >
                  Share
                </ButtonDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
