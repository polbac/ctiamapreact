import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';
import VideoGallery from 'components/slices/components/video-gallery';

import s from './VideoModal.scss';

export default class VideoModal extends PureComponent {

  static propTypes = {
    onCloseClick: PropTypes.func,
    videoGallery: PropTypes.array,
  };

  render() {
    const { onCloseClick, videoGallery } = this.props;

    return (
      <div className={s.modal}>
        <div className={s.modal__content}>
          <VideoGallery
            videos={videoGallery}
            isWide
            inModal
          />
          {/* <Button blue onClick={onCloseClick}>Close</Button> */}
        </div>
      </div>
    );
  }
}
