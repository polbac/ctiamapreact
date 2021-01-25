import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';
import s from './PageLink.scss';

export default class PageLink extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    image: WordPressImage.propTypes.image,
  }

  render() {
    const { children, image } = this.props;

    return (
      <div className={s(s.pageLink, { image })}>
        <div className={s.pageLink__content}>
          {children}
        </div>

        {image && image.url && (
          <div className={s.pageLink__image}>
            <img src={image.url} alt={image.alt} className={s.pageLink__imageSrc} />
          </div>
        )}
      </div>
    );
  }
}
