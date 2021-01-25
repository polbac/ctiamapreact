import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { WordPressImage } from 'components/image';
import convertToRouterLink from 'utils/convertToRouterLink';

import s from './GridGalleryItem.scss';

export default class ImageGalleryItem extends PureComponent {

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
    index: PropTypes.number,
    handleHover: PropTypes.func,
  }

  state = {
    hoverActive: undefined,
    hoverInactive: undefined,
  }

  handleTouch = () => {
    // Creating an empty touch event make the hover thing working on mobile
    // Don't ask me why ¯\_(ツ)_/¯
    this.props.handleHover(this.props.index);

    if (this.state.hoverInactive === undefined) {
      this.setState({
        hoverActive: true,
        hoverInactive: false,
      });
    } else {
      this.setState({
        hoverActive: !this.state.hoverActive,
        hoverInactive: !this.state.hoverInactive,
      });
    }
  }

  touchReset = () => {
    setTimeout(() => {
      this.setState({
        hoverActive: false,
        hoverInactive: undefined,
      });
    }, 350);
  }

  render() {
    const { image } = this.props;
    const { hoverActive, hoverInactive } = this.state;

    return (

      <div className={s.gridgalleryitem__image}>

        <div
          className={s(s.gridgalleryitem__block, { hoverInactive })}
          onTouchStart={this.handleTouch}
        >
          <WordPressImage image={image} />

          {(image.description || image.caption) && (
            <div className={s.gridgalleryitem__content}>
              <div className={s.gridgalleryitem__icon}>
                <span className={s.gridgalleryitem__camera} />
                <span className={s.gridgalleryitem__plus} />
              </div>

              <div className={s.gridgalleryitem__layout}>
                <div className={s.gridgalleryitem__wrapper}>
                  <div className={s.gridgalleryitem__text}>
                    <h3 className={s.gridgalleryitem__label}>Photo</h3>

                    <p className={s.gridgalleryitem__paragraph}>
                      {ReactHtmlParser(image.description, { transform: convertToRouterLink }) || image.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
