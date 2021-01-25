import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Carousel from 'nuka-carousel';
import Slide from './Twi5gSlide';
import s from './Twi5gPostSlider.scss';

export default class Twi5gPostSlider extends Component {

  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    slides: PropTypes.array,
    isWide: PropTypes.bool,
    mobileViewInstructions: PropTypes.string,
  }

  state = {
    isMobileType: 0,
    hasFocus: false,
  }

  componentDidMount() {
    this.resetDimensions();
    ['resize', 'orientationchange'].forEach(evt => window.addEventListener(evt, this.resetDimensions));
  }

  componentWillUnmount() {
    ['resize', 'orientationchange'].forEach(evt => window.removeEventListener(evt, this.resetDimensions));
  }

  handleFocus = hasFocus => () => this.setState({ hasFocus })

  slides = []; // holds references to each slide
  resetDimensions = (callbackTime = 200) => {
    let isMobileType;

    { // this block is to create a scope
      const maxHeight = window.matchMedia('(max-width: 1180px)').matches ? 475 : 501;

      this.slides.forEach((slide) => { slide.closest('.slider-slide').style.height = `${maxHeight.toString()}px`; });
    }

    if (window.matchMedia('(max-width: 1180px)').matches) {
      isMobileType = 2;
    }

    setTimeout(() => {
      this.carousel.setDimensions();
    }, callbackTime);

    this.setState({
      isMobileType,
    });
  }

  carousel = () => null // Will have the value of the nukka carousel after one render
  findSlideImage(slide) {
    const coverImageObject = slide.fields.document && slide.fields.document.cover_image;
    const premiumImageObject = slide.fields.premium_image;
    const heroImageObject = slide.fields.header.hero_image;
    // const layoutImage = slide.fields.components && slide.fields.components.find(element => element.acf_fc_layout === 'image');

    if (coverImageObject) return coverImageObject;
    if (premiumImageObject) return premiumImageObject;
    if (heroImageObject) return heroImageObject;
    // if (layoutImage) return layoutImage.image;
  }

  render() {
    const { type, isWide, mobileViewInstructions } = this.props;
    const { hasFocus } = this.state;
    const slidesToShow = this.state.isMobileType ? 1 : 2; // eslint-disable-line

    // Only show controls if number of slides exceeds slidesToShow
    const withoutControls = this.props.slides.length <= slidesToShow;

    return (
      <div className={s(s.twi5PostSlider, { isWide })} onBlur={this.handleFocus(false)} onFocus={this.handleFocus(true)}>
        <div className={s.twi5PostSlider__container}>
          {this.props.slides.length > 0 && (
            <div className={s(s.twi5PostSlider__row, s.twi5PostSlider__carousel)}>
              <div className={s.twi5PostSlider__col}>
                {mobileViewInstructions && (
                  <p className={s.instructions}>
                    {mobileViewInstructions}
                  </p>
                )}
                <Carousel
                  initialSlideHeight={500}
                  initialSlideWidth={340}
                  slidesToShow={slidesToShow}
                  slidesToScroll={slidesToShow}
                  cellSpacing={20}
                  slideWidth={0.99}
                  heightMode="current"
                  enableKeyboardControls={hasFocus}
                  ref={(carousel) => { this.carousel = carousel; }}
                  renderBottomCenterControls={() => null}
                  renderCenterLeftControls={({ currentSlide, previousSlide }) => {
                    const isHidden = currentSlide <= 0;

                    return (
                      <button
                        className={s(s.twi5PostSlider__buttonLeft, { isHidden })}
                        onClick={previousSlide}
                        aria-label="previous"
                      >
                        <img
                          className={s.hero__icon}
                          src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                          alt="Arrow left"
                        />
                      </button>
                    );
                  }}
                  renderCenterRightControls={({ currentSlide, slideCount, nextSlide }) => {
                    const slidesToShow = this.state.isMobileType ? (this.state.isMobileType > 1 ? 1 : 2) : 3; // eslint-disable-line
                    const isHidden = currentSlide >= slideCount - slidesToShow;

                    return (
                      <button
                        className={s(s.twi5PostSlider__buttonRight, { isHidden })}
                        onClick={nextSlide}
                        aria-label="next"
                      >
                        <img
                          className={s.hero__icon}
                          src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                          alt="Arrow right"
                        />
                      </button>
                    );
                  }}
                  withoutControls={withoutControls}
                >

                  {

                  this.props.slides.map((slide, i) => {
                    const image = this.findSlideImage(slide);
                    const url = `/news/${slide.slug}`;
                    const heading = slide.title;
                    const tags = [];
                    const blurb = slide.fields.summary;

                    Object.values(slide.tags).forEach((tag) => {
                      tags.push(tag.name);
                    });

                    return (<div style={{ height: 'inherit' }} key={i} ref={_slide => _slide && this.slides.push(_slide)}>
                      {/* There is a div here so we can utilize the ref */}
                      <Slide
                        // key={i}
                        heading={heading}
                        url={url}
                        image={image}
                        type={type}
                        blurb={blurb}
                        tags={tags}
                      />
                    </div>);

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
