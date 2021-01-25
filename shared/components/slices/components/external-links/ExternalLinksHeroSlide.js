import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import s from './ExternalLinksHeroSlide.scss';

export default class ExternalLinksHeroSlide extends PureComponent {

  // eslint-disable-next-line react/no-typos
  static propTypes = {
    heading: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.object,
    blurb: PropTypes.string,
    source: PropTypes.string,
    isWide: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line react/prop-types
    const { heading, url, image, blurb, source, isWide, children } = this.props;

    return (
      <Fragment>
        <a href={url} target="blank" rel="noopener noreferrer" className={s.slide__externalLink}>
          <div className={s.heroSlide}>
            <div className={s.heroSlide__container}>
              <div className={s.heroSlide__row}>
                <div className={s.heroSlide__col}>
                  <div className={s.heroSlide__imgContainer} >
                    <img
                      src={image.url}
                      alt={heading}
                    />
                    <div className={s.heroSlide__overlay} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          { children }
        </a>
      </Fragment>
    );
  }
}
