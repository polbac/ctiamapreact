import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';

import s from './SidebarImage.scss';

export default class SidebarImage extends PureComponent {

  static propTypes = {
    caption: PropTypes.string,
    image: WordPressImage.propTypes.image,
  }

  render() {
    const { caption, image } = this.props;

    return (
      <Fragment>
        <div className={s.sidebarImage}>
          <div className={s.sidebarImage__content}>
            {image && (
            <img
              className={s.sidebarImage__image}
              src={_get(image, 'sizes.large', image.url)}
              alt={image.alt || ''}
            />
            )}

            <div className={s.sidebarImage__title}>{caption}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
