import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';
import s from './Cta.scss';

export default class Cta extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    image: WordPressImage.propTypes.image,
    noOffset: PropTypes.bool,
  }

  render() {
    const { children, width, image, noOffset } = this.props;

    return (
      <div className={s(s.cta, `width-${width}`, { noOffset })}>
        <div className={s.cta__content}>
          {children}

          {image && image.url && (
            <div className={s.cta__image}>
              <img src={image.url} alt={image.alt} className={s.cta__imageSrc} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
