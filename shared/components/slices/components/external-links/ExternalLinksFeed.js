import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExternalLinkTile from './ExternalLinkTile';
import s from './ExternalLinksFeed.scss';

export default class ExternalLinksFeed extends PureComponent {

  // eslint-disable-next-line react/no-typos
  static propTypes = {
    slides: PropTypes.array,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
  }

  render() {
    const { slides, startIndex, endIndex } = this.props;

    return (
      <div className={s.ExternalLinksFeed}>
        <div className={s.ExternalLinksFeed__container}>
          <div className={s.ExternalLinksFeed__row}>
            <div className={s.ExternalLinksFeed__col}>
              {/* <h3 className={s.linksFeedHeader}>5G News from Around the World</h3> */}
              {slides.slice(startIndex, endIndex).map((slide, i) => {
                const heading = slide.external_link_heading;
                const blurb = slide.external_link_blurb;
                const url = slide.external_link_url;
                const source = slide.external_source;
                const image = slide.external_link_image ? slide.external_link_image : null;
                // eslint-disable-next-line prefer-destructuring
                const tags = slide.tags !== false ? slide.tags : [];
                const logo = slide.logo !== false ? slide.logo : {};

                return (
                  <Fragment key={`exlf-${i}`}>
                    <ExternalLinkTile
                      key={`exlft-${i}`}
                      heading={heading}
                      blurb={blurb}
                      image={image}
                      url={url}
                      source={source}
                      tags={tags}
                      logo={logo}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
