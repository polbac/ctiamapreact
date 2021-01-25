import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';

import GridGalleryItem from './GridGalleryItem';

import s from './GridGallery.scss';

export default class ImageGallery extends PureComponent {

  static propTypes = {
    images: PropTypes.array,
    isWide: PropTypes.bool,
  }

  blocks = [];
  ggitems = [];

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

  handleHover = (index) => {
    for (let i = 0, len = this.ggitems.length; i < len; i++) {
      if (i !== index) {
        this.ggitems[i].touchReset();
      }
    }
  }

  render() {
    const { images, isWide } = this.props;
    const imageCount = images.length;

    return (
      <div className={s(s.gridgallery, `images-${imageCount}`, { isWide })}>
        <Waypoint
          topOffset="95%"
          onPositionChange={this.onPositionChange}
        />

        <div className={s.gridgallery__container}>
          <div className={s.gridgallery__row}>
            {images.map((image, index) => (
              <div
                className={s.gridgallery__col}
                key={`image-${index}`}
                ref={(el) => { this.blocks[index] = el; }}
              >
                <GridGalleryItem
                  image={image}
                  index={index}
                  handleHover={this.handleHover}
                  ref={(el) => { this.ggitems[index] = el; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
