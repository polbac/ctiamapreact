import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import s from './ExternalLinkTile.scss';

export default class ExternalLinkTile extends PureComponent {

  // eslint-disable-next-line react/no-typos
  static propTypes = {
    heading: PropTypes.string,
    image: PropTypes.object,
    blurb: PropTypes.string,
    url: PropTypes.string,
    source: PropTypes.string,
    tags: PropTypes.array,
    logo: PropTypes.object,
  }

  render() {
    const { heading, blurb, url, image, source, tags, logo } = this.props;

    return (
      <Fragment>
        <div className={s.linkTile}>
          <a href={url} rel="noopener noreferrer" target="blank">
            <div className={s.linkTile__row}>
              <div className={s.linkTile__col}>
                <div className={s.linkTile__mainContainer}>
                  {image &&
                    <div className={s.linkTile__imageContainer}>
                      <div className={s.linkTile__imagePadding}>
                        <img src={image.url} alt={heading} className={s.linkTileImage} />
                      </div>
                    </div>}
                  <div className={s.linkTile__textContainer}>
                    <p className={s.linkTile__source}>{source}</p>
                    <div className={s.linkTile__headingContainer}>
                      <p className={s.linkTile__heading}>{heading}</p>
                      {logo && logo.url && (
                        <img src={logo.url} alt={logo.title} className={s.linkTile__logo} />
                      )}
                    </div>
                    <p className={s.linkTile__blurb}>{blurb}</p>
                    <div className={s.linkTile__tagContainer}>
                      {tags && tags.map((tag, index) => (
                        <p key={index} className={s.linkTile__tag}>{tag.name}</p>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </Fragment>
    );
  }
}
