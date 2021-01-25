import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Carousel from 'nuka-carousel';
import YouTube from 'react-youtube';
import parse from 'utils/getVideoServiceId';
import config from 'utils/config';

import s from './VideoGallery.scss';

export default class Video extends PureComponent {

  static propTypes = {
    videos: PropTypes.array,
    isWide: PropTypes.bool,
    inModal: PropTypes.bool,
  }

  state = {
    videoId: parse(this.props.videos[0].url).id,
    isMobileType: this.props.inModal ? 1 : 0,
    playerVars: {
      rel: 0,
      modestbranding: 1,
      autoplay: 0,
      origin: config('publicUrl'),
    },
    activeSlideNum: 0,
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.carousel.setDimensions();
    // }, 0);
    this.resetDimensions(0);
    window.addEventListener('resize', this.resetDimensions);
    window.addEventListener('orientationchange', this.resetDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetDimensions);
    window.removeEventListener('orientationchange', this.resetDimensions);
  }

  resetDimensions = (callbackTime = 200) => {
    let isMobileType;

    if (window.matchMedia('(max-width: 720px)').matches) {
      isMobileType = 2;
    } else if (this.props.inModal || window.matchMedia('(max-width: 1080px)').matches) {
      isMobileType = 1;
    }

    setTimeout(() => {
      this.carousel.setDimensions();
    }, callbackTime);

    this.setState({
      isMobileType,
    });
  }

  onChangeVideo = (e) => {
    this.setState({
      videoId: e.currentTarget.dataset.vid,
      activeSlideNum: parseInt(e.currentTarget.dataset.index, 10),
      playerVars: {
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        origin: config('publicUrl'),
      },
    });
  }

  render() {
    const { videos, isWide } = this.props;
    const { videoId, playerVars, isMobileType, activeSlideNum } = this.state;
    const opts = {
      playerVars,
    };

    // Change the number of shown slides
    // Default = 3, Tablet = 2, Mobile = 1
    const slidesToShow = isMobileType ? (isMobileType > 1 ? 1 : 2) : 3; // eslint-disable-line

    // Only show controls if number of vidoes exceeds slidesToShow
    const withoutControls = videos.length <= slidesToShow;

    return (
      <div className={s(s.videoGallery, { isWide })}>
        <div className={s.videoGallery__container}>
          <div className={s.videoGallery__row}>
            <div className={s.videoGallery__col}>
              <div className={s.videoGallery__wrapper}>
                <YouTube
                  videoId={videoId}
                  opts={opts}
                />
              </div>
            </div>
          </div>

          {videos.length > 1 && (
            <div className={s(s.videoGallery__row, s.videoGallery__carousel)}>
              <div className={s.videoGallery__col}>
                <Carousel
                  slidesToShow={slidesToShow}
                  slidesToScroll={slidesToShow}
                  cellSpacing={20}
                  heightMode="current"
                  enableKeyboardControls
                  ref={(carousel) => { this.carousel = carousel; }}
                  renderBottomCenterControls={() => null}
                  renderCenterLeftControls={({ currentSlide, previousSlide }) => {
                    const isHidden = currentSlide <= 0;

                    return (
                      <button
                        className={s(s.videoGallery__buttonLeft, { isHidden })}
                        onClick={previousSlide}
                        aria-label="previous"
                      >
                        <img
                          className={s.hero__icon}
                          src={require('!file-loader!assets/images/icons/arrow.svg')}
                          alt="Arrow left"
                        />
                      </button>
                    );
                  }}
                  renderCenterRightControls={({ currentSlide, slideCount, nextSlide }) => {
                    const slidesToShow = isMobileType ? (isMobileType > 1 ? 1 : 2) : 3; // eslint-disable-line
                    const isHidden = currentSlide >= slideCount - slidesToShow;

                    return (
                      <button
                        className={s(s.videoGallery__buttonRight, { isHidden })}
                        onClick={nextSlide}
                        aria-label="next"
                      >
                        <img
                          className={s.hero__icon}
                          src={require('!file-loader!assets/images/icons/arrow.svg')}
                          alt="Arrow right"
                        />
                      </button>
                    );
                  }}
                  withoutControls={withoutControls}
                >
                  {videos.map((item, ii) => {
                    const { title, url } = item;
                    const parsed = parse(url);
                    const activeSlide = ii === activeSlideNum;
                    let videoThumbnail = '';

                    if (parsed && parsed.type === 'youtube') {

                      videoThumbnail = (
                        <div className={s(s.videoGallery__ytImgWrap, { activeSlide })}>
                          <button
                            className={s.videoGallery__thumbnailButton}
                            onClick={this.onChangeVideo}
                            data-vid={parsed.id}
                            data-index={ii}
                            // ref={(el) => { this.videos[ii] = el; }}
                          >
                            <img
                              src={`//img.youtube.com/vi/${parsed.id}/hqdefault.jpg`}
                              alt="video thumbnail"
                            />
                            {title && title.length > 0 && (
                              <div className={s.videoGallery__thumbnailTitle}>{title}</div>
                            )}
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className={s.videoGallery__slide} key={ii}>{videoThumbnail}</div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
