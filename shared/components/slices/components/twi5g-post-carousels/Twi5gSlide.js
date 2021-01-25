import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';
import ReactHtmlParser from 'react-html-parser';
import ellipsis from 'utils/string';
// import { dateParser } from 'utils/wordpress';

import MembersOnlyPrompt from 'containers/members-only-prompt';
import { WordPressImage } from 'components/image';
import { Icon } from 'components/assets';

import s from './Twi5gSlide.scss';

export default class Twi5gSlide extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, WordPressImage.propTypes.image]),
    blurb: PropTypes.string,
    tags: PropTypes.array,
    className: PropTypes.string,
    membersOnly: PropTypes.bool,
  }

  state = {
    isPromptVisible: false,
    mediaMax1180: false,
  }

  componentDidMount() {
    // this.trackMediaSize(); This can be used to set an ellipsis to the heading of the blogposts
  }

  trackMediaSize = () => {
    const matchMedia = window.matchMedia('(max-width:1180px)');

    this.setState({ mediaMax1180: matchMedia.matches });
    matchMedia.onchange = () => this.setState({ mediaMax1180: matchMedia.matches });
  }

  onClick = (e) => {
    const { membersOnly } = this.props;

    if (membersOnly) {
      this.setState({ isPromptVisible: true });

      return e.preventDefault();
    }
  }

  close = () => {
    this.setState({ isPromptVisible: false });
  }

  textEllipsisCheck = (text) => {
    const { mediaMax1180 } = this.state;
    const wordCount = mediaMax1180 ? 10 : 8; // At larger size there are two slides

    if (typeof text !== 'string' || text.length < 20) return text;
    let returnText = text.replace(/&#([0-9]{1,4});/gi, (match, numbStr) => (
      String.fromCharCode(parseInt(numbStr, 10))
    ));

    returnText = text.split(' ').slice(0, wordCount);

    returnText.push('...');
    returnText = returnText.join(' ');
    return returnText;
  };

  render() {
    const {
      type,
      heading,
      url,
      image,
      blurb,
      tags,
      className,
      membersOnly,
    } = this.props;

    const { isPromptVisible } = this.state;
    const hasImage = Boolean(image);
    const horizontal = true;

    let imageUrl = image;
    let imageAlt = '';

    if (hasImage && typeof image === 'object') {
      imageUrl = image.url;
      imageAlt = image.alt;
    }
    const post = (
      <Fragment>
        <h3 className={s.slide__heading}>{ReactHtmlParser(heading)}</h3>
        {hasImage && (
          <img
            className={s.slide__image}
            src={imageUrl}
            alt={imageAlt}
          />
        )}
        {type === 'Blog' && blurb && <div className={s.slide__copy}>{ReactHtmlParser(ellipsis(blurb, 165))}</div>}
      </Fragment>
    );

    const displayType = type === 'Infographics' ? 'Infographic' : type;
    const content = (
      // <div className={s.slide__top}>
      <Fragment>

        <header className={s.slide__header}>
          <Icon type={type} />
          <p className={s.slide__type} title={displayType}>{displayType}</p>
        </header>
        {post}
      </Fragment>
      // </div>
    );

    const hasBottom = tags || membersOnly;

    return (
      <Fragment>
        <Link
          className={s(s.slide, className, {
            image,
            horizontal,
          })}
          onClick={this.onClick}
          to={url}
        >

          <div className={s.slide__inner}>
            {content}
            {hasBottom && (
              <div className={s.slide__bottom}>
                {tags && (
                  <ul className={s.slide__tags}>
                    {tags.slice(0, 3).map((tag, i) => (
                      <li
                        key={`tag-${i}`}
                        className={s.slide__tagsItem}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                {membersOnly && (
                  <span className={s.slide__membersOnly}>
                    Members only
                  </span>
                )}
              </div>
            )}

          </div>
        </Link>
        <MembersOnlyPrompt
          onClick={this.close}
          isVisible={isPromptVisible}
          to={url}
        />
      </Fragment>
    );
  }
}
