import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Carousel from 'nuka-carousel';
import Slide from './ExternalLinkSlide';

import s from './ExternalLinksSlider.scss';

export default class ExternalLinksSlider extends PureComponent {

  static propTypes = {
    slides: PropTypes.array,
    isWide: PropTypes.bool,
  }

  state = {
    isMobileType: 0,
    hasFocus: false,
  }

  componentDidMount() {
    this.resetDimensions();
    window.addEventListener('resize', this.resetDimensions);
    window.addEventListener('orientationchange', this.resetDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetDimensions);
    window.removeEventListener('orientationchange', this.resetDimensions);
  }

  handleFocus = hasFocus => () => this.setState({ hasFocus })

  resetDimensions = (callbackTime = 200) => {
    let isMobileType;

    if (window.matchMedia('(max-width: 720px)').matches) {
      isMobileType = 2;
    } else if (window.matchMedia('(max-width: 1080px)').matches) {
      isMobileType = 1;
    } else {
      isMobileType = 0;
    }

    setTimeout(() => {
      this.carousel.setDimensions();
    }, callbackTime);

    this.setState({
      isMobileType,
    });
  }

  render() {
    const { isWide } = this.props;
    const { hasFocus } = this.state;
    // Change the number of shown slides
    // Default = 3, Tablet = 2, Mobile = 1
    const slidesToShow = this.state.isMobileType ? (this.state.isMobileType > 1 ? 1 : 2) : 3; // eslint-disable-line

    // Only show controls if number of vidoes exceeds slidesToShow
    const withoutControls = this.props.slides.length <= slidesToShow;

    return (
      <div className={s(s.externalLinks, { isWide })} onBlur={this.handleFocus(false)} onFocus={this.handleFocus(true)}>
        <div className={s.externalLinks__container}>
          {this.props.slides.length > 0 && (
            <div className={s(s.externalLinks__row, s.externalLinks__carousel)}>
              <div className={s.externalLinks__col}>
                {/* <h3 className={s.externalLinks__header}>Latest Headlines</h3> */}
                <Carousel
                  initialSlideHeight={395}
                  initialSlideWidth={422}
                  slidesToShow={slidesToShow}
                  slidesToScroll={slidesToShow}
                  cellSpacing={20}
                  heightMode="max"
                  slideWidth={0.99}
                  wrapAround={!withoutControls}
                  // heightMode="current"
                  enableKeyboardControls={hasFocus}
                  ref={(carousel) => { this.carousel = carousel; }}
                  renderBottomCenterControls={() => null}
                  renderCenterLeftControls={({ currentSlide, previousSlide }) => {
                      const isHidden = currentSlide <= 0;

                      return (
                        <button
                          className={s(s.externalLinks__buttonLeft, { isHidden })}
                          onClick={previousSlide}
                          aria-label="previous"
                        >
                          <img
                            className={s.leftArrow}
                            src={require('!file-loader!assets/images/icons/MaterialIcon.svg')}
                            alt="Arrow left"
                          />
                        </button>
                      );
                    }}
                  renderCenterRightControls={({ /* currentSlide, slideCount, */ nextSlide }) => {
                      const slidesToShow = this.state.isMobileType ? (this.state.isMobileType > 1 ? 1 : 2) : 3; // eslint-disable-line
                      const isHidden = false; // currentSlide >= slideCount - slidesToShow;

                      return (
                        <button
                          className={s(s.externalLinks__buttonRight, { isHidden })}
                          onClick={nextSlide}
                          aria-label="next"
                        >
                          <img
                            className={s.rightArrow}
                            src={require('!file-loader!assets/images/icons/MaterialIcon.svg')}
                            alt="Arrow right"
                          />
                        </button>
                      );
                    }}
                  withoutControls={withoutControls}
                >

                  {this.props.slides.map((slide, i) => {
                  const image = slide.external_link_image;
                  const url = slide.external_link_url;
                  const heading = slide.external_link_heading;
                  const source = slide.external_source;
                  const blurb = slide.external_link_blurb;

                  return (<Slide
                    key={i}
                    heading={heading}
                    url={url}
                    image={image}
                    source={source}
                    blurb={blurb}
                  />);
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
