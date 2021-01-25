import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './ExternalLinkSlide.scss';

export default class ExternalLinkSlide extends PureComponent {

  static PropsTypes = {
    heading: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.object,
    blurb: PropTypes.string,
    source: PropTypes.string,
  }

  render() {
    const { heading, url, image, blurb, source } = this.props;

    return (
      <div className={s.slide}>
        <div className={s.slide__container}>
          <div className={s.slide__row}>
            <div className={s.slide__col}>
              <a href={url} rel="noopener noreferrer" target="blank" className={s.slide__externalLink}>
                <div className={s.slide__imgContainer} >
                  <img src={image.url} alt={heading} />
                </div>
                <p className={s.slide__source}>{source}</p>
                <p className={s.slide__heading}>{heading}</p>
                <p className={s.slide__blurb}>{blurb}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
