import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import { WordPressImage } from 'components/image';

import s from './ImageGallery.scss';

export default class ImageGallery extends PureComponent {

  static propTypes = {
    images: PropTypes.array,
  }

  blocks = []

  static defaultProps = {
    images: [],
  }

  state = {
    isAnimationComplete: false,
  }

  onPositionChange = ({ currentPosition }) => {
    const { isAnimationComplete } = this.state;

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.staggerFromTo(
      this.blocks,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
    );
  }

  handleTouch = () => {
    // Creating an empty touch event make the hover thing working on mobile
    // Don't ask me why ¯\_(ツ)_/¯
  }

  render() {
    const { images } = this.props;
    const imageCount = images.length;

    return (
      <div className={s(s.gallery, `images-${imageCount}`)}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.gallery__container}>
          <div className={s.gallery__row}>
            {images.map((image, index) => (
              <div
                className={s.gallery__col}
                key={`image-${index}`}
                ref={(el) => { this.blocks[index] = el; }}
              >
                <div className={s.gallery__image}>
                  <div
                    className={s.gallery__block}
                    onTouchStart={this.handleTouch}
                  >
                    <WordPressImage image={image} />

                    {(image.description || image.caption) && (
                      <div className={s.gallery__content}>
                        <div className={s.gallery__icon}>
                          <span className={s.gallery__camera} />
                          <span className={s.gallery__plus} />
                        </div>

                        <div className={s.gallery__layout}>
                          <div className={s.gallery__wrapper}>
                            <div className={s.gallery__text}>
                              <h3 className={s.gallery__label}>Photo</h3>

                              <p className={s.gallery__paragraph}>
                                {image.description || image.caption}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
