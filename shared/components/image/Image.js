import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Image.scss';

export default class Image extends PureComponent {

  static propTypes = {
    src: PropTypes.string,
    src2x: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    className: PropTypes.string,
    altFillContainer: PropTypes.bool,
  }

  static defaultProps = {
    alt: '',
  }

  state = {
    loaded: false,
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.onLoad();
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onLoad = () => {
    if (this.image) {
      const loaded = this.image.complete;

      if (loaded) {
        clearInterval(this.timer);
      }

      this.setState({
        loaded,
      });
    }
  }

  render() {
    const { width, height, src, src2x, alt, className, altFillContainer } = this.props;
    const { loaded } = this.state;

    if (!src) {
      return null;
    }

    const srcSet = src2x ? `${src} 1x, ${src2x} 2x` : undefined;

    const hasRatio = width && height;

    return (
      <div className={s('image', { loaded, altFillContainer })}>
        {hasRatio && (
          <div
            className={s.image__ratio}
            style={{ paddingBottom: `${(height / width) * 100}%` }}
          />
        )}
        <img
          ref={(el) => { this.image = el; }}
          className={s(s.image__image, className)}
          src={src}
          srcSet={srcSet}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
    );
  }
}
