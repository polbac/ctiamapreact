import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

export default class WordPressImage extends PureComponent {

  static propTypes = {
    image: PropTypes.oneOfType([
      PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        url: PropTypes.string,
        alt: PropTypes.string,
        sizes: PropTypes.object,
      }),
      PropTypes.bool,
    ]),
    sizeKey: PropTypes.string,
    className: PropTypes.string,
    altFillContainer: PropTypes.bool,
  }

  static defaultProps = {
    sizeKey: 'image',
  }

  render() {
    const { image, sizeKey, className, altFillContainer } = this.props;

    const {
      width,
      height,
      url = '',
      alt = '',
      sizes,
    } = image;

    if (!image) {
      return null;
    }

    const sizeKey1x = `${sizeKey}1x`;
    const sizeKey2x = `${sizeKey}2x`;

    let src2x = url;
    let src1x = url;
    let newHeight = height;
    let newWidth = width;

    if (sizes[sizeKey2x]) {
      src2x = sizes[sizeKey2x];
      newHeight = sizes[`${sizeKey2x}-height`];
      newWidth = sizes[`${sizeKey2x}-width`];
    }

    if (sizes[sizeKey1x]) {
      src1x = sizes[sizeKey1x];
      newHeight = sizes[`${sizeKey1x}-height`];
      newWidth = sizes[`${sizeKey1x}-width`];
    }

    return (
      <Image
        width={newWidth}
        height={newHeight}
        src={src1x}
        src2x={src2x}
        alt={alt}
        className={className}
        altFillContainer={altFillContainer}
      />
    );
  }
}
