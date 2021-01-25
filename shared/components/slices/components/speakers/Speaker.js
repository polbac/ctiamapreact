import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import Portal, { Modal } from 'components/portal';
import Button from 'components/button';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';

import BioModal from './BioModal';
import VideoModal from './VideoModal';

import s from './Speaker.scss';

export default class Speaker extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    name: PropTypes.string,
    position: PropTypes.string,
    bio: PropTypes.string,
    link: PropTypes.string,
    hasVideo: PropTypes.bool,
    videoGallery: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    isWide: PropTypes.bool,
    handleClick: PropTypes.func,
  }

  state = {
    isActive: false,
    isBioVisible: false,
    isVideoVisible: false,
  }

  bioToggle = () => {
    this.setState({
      isActive: !this.state.isActive,
      isBioVisible: !this.state.isBioVisible,
    });
    this.props.handleClick();
  }

  videoToggle = () => {
    this.setState({
      isActive: !this.state.isActive,
      isVideoVisible: !this.state.isVideoVisible,
    });
    this.props.handleClick();
  }

  render() {
    const {
      image,
      name,
      position,
      bio,
      link,
      hasVideo,
      videoGallery,
      isWide,
      handleClick,
      ...props
    } = this.props;
    const { isActive, isBioVisible, isVideoVisible } = this.state;

    const isLink = (typeof link !== 'undefined');
    const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(link);

    const content = (
      <Fragment>
        <div className={s(s.speaker__image, { isActive })}>
          {image && (
            <img
              className={s.speaker__src}
              src={_get(image, 'sizes.medium', image.url)}
              alt={image.alt || ''}
            />
          )}
          {hasVideo && image && (
            <div className={s.speaker__playHover}>
              <img
                src={require('!file-loader!assets/images/playhover.png')}
                alt="Click to Play"
              />
            </div>
          )}
        </div>
        <h3 className={s.speaker__name}>{name}</h3>
        <p className={s.speaker__position}>{position}</p>
      </Fragment>
    );

    const bioPopup = bio && bio.length > 0 ? (
      <div className={s.speaker__bioButton}>
        <Button onClick={this.bioToggle}>View Bio</Button>
        <Portal>
          <TransitionGroup>
            {isBioVisible && (
              <Modal
                onClick={this.bioToggle}
                ref={(el) => { this.modal = el; }}
              >
                <BioModal name={name} position={position} content={bio} />
              </Modal>
            )}
          </TransitionGroup>
        </Portal>
      </div>
    ) : '';

    const videoPopup = hasVideo && videoGallery ? (
      <Fragment>
        <button aria-label="toggle video" className={s.speaker__videoButton} onClick={this.videoToggle}>{content}</button>
        <Portal>
          <TransitionGroup>
            {isVideoVisible && (
              <Modal
                onClick={this.videoToggle}
                ref={(el) => { this.modal = el; }}
              >
                <VideoModal videoGallery={videoGallery} />
              </Modal>
            )}
          </TransitionGroup>
        </Portal>
      </Fragment>
    ) : '';

    if (isExternal) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className={s(s.speaker, { isWide })}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        className={s(s.speaker, { isWide, hasVideo })}
        {...props}
      >
        {/* <Link
          to={link}
          className={s.speaker__link}
          {...props}
        >
          {content}
        </Link> */}
        {hasVideo && videoGallery && videoGallery.length > 0 ? (
          <Fragment>
            { videoPopup }
          </Fragment>
        ) : (
          <Fragment>
            { content }
          </Fragment>
        )}
        {bioPopup}
      </div>
    );
  }
}
