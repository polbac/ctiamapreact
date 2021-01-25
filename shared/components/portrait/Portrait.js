import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';

import Member from 'assets/images/icons/Member-icon.svg';
import Download from 'assets/images/icons/actionicon-download-3.svg';
import Twitter from 'assets/images/icons/socialicon-twitter-2.svg';
import Linkedin from 'assets/images/icons/socialicon-linkedin-2.svg';

import s from './Portrait.scss';

export default class Portrait extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    download: PropTypes.bool,
    to: PropTypes.string,
    isReverse: PropTypes.bool,
  }

  render() {
    const {
      image,
      name,
      title,
      description,
      twitter,
      linkedin,
      download,
      to,
      isReverse,
    } = this.props;

    const hasSocialMedia = Boolean(twitter || linkedin);
    const firstName = name && name !== '' ? name.split(' ')[0] : null;

    return (
      <div className={s(s.portrait, { isReverse })}>
        <div className={s.portrait__container}>
          <div className={s.portrait__row}>
            <div className={s.portrait__col}>
              <div className={s.portrait__wrap}>
                <div className={s.portrait__block}>
                  {name && title && (
                    <div className={s.portrait__info}>
                      <div className={s.portrait__icon}>
                        <Member />
                      </div>
                      <h3 className={s.portrait__name}>{name}</h3>
                      <p className={s.portrait__title}>{title}</p>
                    </div>
                  )}
                  {image && image.url && (
                    <div className={s.portrait__frame}>
                      <div
                        className={s.portrait__image}
                        style={{ backgroundImage: `url(${image.url})` }}
                      >
                        {download && (
                          <a
                            className={s.portrait__download}
                            download={name.split(' ').join('_')}
                            href={image.url}
                          >
                            <Download className={s.portrait__svg} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {description && (
                    <div className={s.portrait__description}>
                      <p className={s.portrait__paragraph}>{description}</p>
                    </div>
                  )}
                  {to && firstName && (
                    <Link to={to} className={s.portrait__link}>
                      {`See ${firstName}'s bio`}
                    </Link>
                  )}
                  {hasSocialMedia && (
                    <ul className={s.portrait__social}>
                      {twitter && (
                        <li className={s.portrait__socialItem}>
                          <a href={twitter} target="_blank" className={s.portrait__twitter}>
                            <Twitter className={s.portrait__svg} />
                          </a>
                        </li>
                      )}
                      {linkedin && (
                        <li className={s.portrait__socialItem}>
                          <a href={linkedin} target="_blank" className={s.portrait__linkedin}>
                            <Linkedin className={s.portrait__svg} />
                          </a>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
