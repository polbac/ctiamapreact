import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import s from './ExternalLinksHeroSlideText.scss';

export default class ExternalLinksHeroSlide extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    blurb: PropTypes.string,
    source: PropTypes.string,
  }

  render() {
    const { heading, blurb, source } = this.props;

    return (
      <Fragment>
        <div className={s.slideText}>
          <div className={s.slideText__container}>
            <div className={s.slideText__row}>
              <div className={s.slideText__col}>
                <div className={s.slideText__infoWrapper}>
                  <p className={s.slideText__source}>{source}</p>
                  <p className={s.slideText__heading}>{heading}</p>
                  <p className={s.slideText__blurb}>{blurb}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
