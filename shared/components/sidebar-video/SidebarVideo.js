import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';

import Portal, { Video } from 'components/portal';

import s from './SidebarVideo.scss';

export default class SidebarVideo extends PureComponent {

  static propTypes = {
    caption: PropTypes.string,
    image: WordPressImage.propTypes.image,
    youtubeId: PropTypes.string,
  }

  state = {
    openModal: false,
  }

  handleClick = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    const { caption, image, youtubeId } = this.props;
    const { openModal } = this.state;
    const video = `//www.youtube.com/embed/${youtubeId}?enablejsapi=1&autohide=1&showsearch=0&rel=0&quality=hd720&autoplay=1`;

    return (
      <Fragment>
        <div className={s.sidebarVideo}>
          <div className={s.sidebarVideo__content}>
            <button aria-label="interacts with video" className={s.sidebarVideo__card} onClick={this.handleClick}>
              <div className={s.sidebarVideo__map}>
                <div className={s.sidebarVideo__circle}>
                  <img
                    src={require('!file-loader!assets/images/5g/hero/play-btn.svg')}
                    className={s.sidebarVideo__svg}
                    alt="play button"
                  />
                </div>
                {image ? (
                  <img
                    className={s.sidebarVideo__image}
                    src={_get(image, 'sizes.medium', image.url)}
                    alt={image.alt || 'video thumbnail'}
                  />
                ) : (
                  <div className={s.sidebarVideo__ytImgWrap}>
                    <img
                      className={s.sidebarVideo__image}
                      src={`//img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                      alt="video thumbnail"
                    />
                  </div>
                )}
              </div>

              <div className={s.sidebarVideo__title}>{caption}</div>
            </button>
          </div>
        </div>

        <Portal>
          <TransitionGroup>
            {openModal && (
              <Video
                video={video}
                onClick={this.handleClick}
              />
            )}
          </TransitionGroup>
        </Portal>
      </Fragment>
    );
  }
}
