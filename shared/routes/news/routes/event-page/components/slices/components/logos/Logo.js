import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';

import s from './Logo.scss';

export default class Logo extends PureComponent {

  static propTypes = {
    link: PropTypes.string,
    image: WordPressImage.propTypes.image,
  }

  render() {
    const { link, image } = this.props;

    return (
      <div className={s.Logo__col}>
        <div className={s.Logo__container}>
          {link && (
            <a href={link}>
              {image && image.url && (
                <img
                  ref={(c) => { this.image = c; }}
                  className={s.Logo__image}
                  src={image.url}
                  alt={image.alt}
                  title={image.title}
                />
              )}
            </a>
          )}
        </div>
      </div>
    );
  }
}
