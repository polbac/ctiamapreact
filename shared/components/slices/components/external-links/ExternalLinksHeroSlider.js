import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import HeroSlide from './ExternalLinksHeroSlide';
import HeroSlideText from './ExternalLinksHeroSlideText';
import s from './ExternalLinksHeroSlider.scss';

export default class ExternalLinksHeroSlider extends Component {

  static propTypes = {
    slides: PropTypes.array,
  }

  state = {
    hasFocus: false,
  }

  handleFocus = hasFocus => () => this.setState({ hasFocus })

  render() {
    const { slides } = this.props;
    const { hasFocus } = this.state;
    const isServer = typeof window === 'undefined';

    return (
      <Fragment>
        <div
          className={s.heroSlider}
          onBlur={this.handleFocus(false)}
          onFocus={this.handleFocus(true)}
        >
          <div className={s.heroSlider__row}>
            <div className={s.heroSlider__col}>
              <div className={s.heroSlider__content}>
                {isServer ?
                  ( // Show the first slide on its own instead of carousel for server-side rendering
                    <div className={s.heroSlider__loading}>
                      <HeroSlide
                        key="exlhshs-a"
                        image={slides[0].external_link_image}
                        url={slides[0].external_link_url}
                        isWide
                        heading={slides[0].external_link_heading}
                      >
                        <HeroSlideText
                          key="exlhshst-a"
                          heading={slides[0].external_link_heading}
                          url={slides[0].external_link_url}
                          blurb={slides[0].external_link_blurb}
                          source={slides[0].external_source}
                          isWide
                        />
                      </HeroSlide>
                    </div>
                  ) : (
                    <Carousel
                      id="carouselComponent"
                      slidesToShow={1}
                      slidesToScroll="auto"
                      autoplay
                      autoplayInterval={5000}
                      // slideIndex={1}
                      wrapAround
                      enableKeyboardControls={hasFocus}
                      heightMode="max"
                      renderCenterLeftControls={() => null}
                      renderCenterRightControls={() => null}
                    // renderCenterLeftControls={({ previousSlide }) => {

                    //   return (
                    //     <button
                    //       className={s(s.heroSlider__buttonLeft)}
                    //       onClick={previousSlide}
                    //       aria-label="previous"
                    //     >
                    //       <img
                    //         className={s.hero__icon}
                    //         src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                    //         alt="Arrow left"
                    //       />
                    //     </button>
                    //   );
                    // }}
                    // renderCenterRightControls={({ nextSlide }) => {

                    //   return (
                    //     <button
                    //       className={s(s.heroSlider__buttonRight)}
                    //       onClick={nextSlide}
                    //       aria-label="next"
                    //     >
                    //       <img
                    //         className={s.hero__icon}
                    //         src={require('!file-loader!assets/images/icons/arrow-black.svg')}
                    //         alt="Arrow right"
                    //       />
                    //     </button>
                    //   );
                    // }}
                    >
                      {slides.map((slide, index) => {
                        const heading = slide.external_link_heading;
                        const url = slide.external_link_url;
                        const image = slide.external_link_image;
                        const blurb = slide.external_link_blurb;
                        const source = slide.external_source;

                        return (
                          <Fragment key={`exlhsf-${index}`}>
                            <HeroSlide
                              key={`exlhshs-${index}`}
                              image={image}
                              url={url}
                              isWide
                              heading={heading}
                            >
                              <HeroSlideText
                                key={`exlhshst-${index}`}
                                heading={heading}
                                url={url}
                                blurb={blurb}
                                source={source}
                                isWide
                              />
                            </HeroSlide>

                          </Fragment>
                        );
                      })}
                    </Carousel>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
