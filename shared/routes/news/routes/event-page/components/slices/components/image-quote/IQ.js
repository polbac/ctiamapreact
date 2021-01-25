import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { WordPressImage } from 'components/image';

import s from './IQ.scss';

export default class IQ extends PureComponent {

  static propTypes = {
    quote: PropTypes.string,
    attribution: PropTypes.string,
    image: WordPressImage.propTypes.image,
  }

  render() {
    const { quote, attribution, image } = this.props;
    const hasImage = get(image, 'url');

    return (
      <div className={s.IQ__col}>
        <div className={s(s.IQ__container, { hasImage })}>
          {image && image.url && (
            <img
              ref={(c) => { this.image = c; }}
              className={s.IQ__image}
              src={image.url}
              alt={image.alt}
              title={image.title}
            />
          )}

          {!image && (
            <div>
              <div className={s.IQ__quote}>{quote}</div>
              {attribution && (
                <div className={s.IQ__attribution}>– {attribution}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
